---
title: Static SQL
publishedAt: '2022-07-05T21:02:53-04:00'
---

# 🤒 Symptoms

There's a central conflict between the goals of feature development and database management.

## 🚀 Feature development

Queries often share important business logic, especially around authorization. I'd like to encapsulate portions of queries to be shared across use cases. Dynamic ORMs like ActiveRecord, SQLAlchemy, or Prisma are powerful tools to define composable queries from smaller query fragments. By composing a query from different fragments, engineers developing a feature don't need to worry about all the underlying SQL concerns, and can instead focus on business logic.

```ruby
class TodosController < ApplicationController
  def index
    @todos = current_user.todos.incomplete
  end

  def show
    @todo = current_user.todos.incomplete.find(params[:id])
  end
end
```

For example, in this snippet taken from a todo list app, we encapsulate a few useful concerns:

- `User#todos` encapsulates the SQL to identify all the `Todo` records belonging to a specific `User`.
- `Todo.incomplete` encapsulates the SQL to identify all incomplete `Todo` records.
- `Todo.find` encapsulates the SQL to find a specific `Todo` from a set of `Todo` records, given its `id`.

As an engineer implementing a new feature, I don't necessarily need to understand how `incomplete` is implented. Maybe it's defined as a `completed_at` timestamp column, or a `is_complete` boolean column, or even the existence of a `TodoCompletion` record associated with the `Todo` in question. I can confidently consume the `incomplete` scope and trust its results.

## 🐘 Database management

When new features are deployed to production, I'd like to ensure that my database can handle the load generated from all the new queries that power those features. Dynamic ORMs like ActiveRecord or SQLAlchemy are opaque tools which make it virtually impossible for me to know ahead of time whether my database will perform well. I won't even know what queries my app is capable of issuing to the database until after we've deployed and actual users have interacted with the features in question. This introduces unacceptable risk.

For example, with some implementation of `Todo`, we might observe something like the following SQL query for the `show` action:

```sql
SELECT id, user_id, content, completed_at
FROM todos
WHERE user_id = $1 AND completed_at IS NULL AND id = $2
LIMIT 1
```

In this case we'd need to ensure the `todos` table is appropriately indexed, surely by `id` and `user_id`, but maybe also by `completed_at`, or depending on the load of the database, all three columns.

But given a different implementation of `Todo`, we might see something entirely different:

```sql
SELECT id, user_id, content
FROM todos
JOIN todo_lists ON todos.todo_list_id = todo_lists.id
JOIN todo_lists_users ON todo_lists_users.todo_list_id = todo_lists.id
JOIN users ON users.id = todo_lists_users.user_id
WHERE users.id = $1
  AND todos.id = $2
  AND NOT EXISTS (
    SELECT *
    FROM todo_completions
    WHERE todo_completions.todo_id = todos.id
  )
```

In this case, we'd have an entirely different problem. What if we can't optimize this query as written? What if we have a horizontally scaled database cluster sharded by `todo_list_id`, so we can't join on it?

The single line of code `current_user.todos.incomplete.find(params[:id])` can resolve to a massive possible set of SQL queries, and there aren't great ways to demystify things: we'd have to either read through the entire codebase or manually run every permutation of every query and see what we get.

## 💥 Conflict

In order to ship features quckly, we'd like powerful, expressive tools that let us compose complex business logic into reusable query fragments as necessary.

But in order to manage our production database, we'd like observable, statically analyzable tools that let us prepare the database for all the queries our app can throw at it.

This conflict can easily become a massive issue as teams get larger, and as the responsibilities of feature devlopment and database management are managed by different people.

# 💩 The problem

One frustrating aspect of this problem is that feature code almost never requires the dynamic combination of novel snippets of SQL into a query that wasn't known at code authoring time. Or, in terms of the exmaple above, `current_user.todos.incomplete.find(params[:id])` will always resolve to the same SQL query. Many performance monitoring tools rely on this consistency to identify and debug slow queries in production.

Why can't we know, ahead of time, the full set of queries an application is capable of issuing to a database?

## 🌊 Dynamic languages are too dynamic

One obvious answer to this problem is that Ruby (or Python, or JavaScript) is just too dynamic of a language to be suitable for this use case. Once projects grow to a scale where this kind of database performance is challenging, it's time to abandon our flexible, expressive tools, since their dynamic nature demands all query composition work be deferred until the last possible moment, when the code is actually run.

Due to the nature of these tools, generating a list of possible SQL queries that might be generated at runtime might be a completely impossible problem.

## 🧊 Static langages aren't static enough

On the other hand, porting to a language like Go or Rust isn't much of a solution either. While it's true that these languages tend not to allow as many surprises behind a query snippet, they nonetheless tend to generate SQL queries at runtime, in production.

# ☝🏻 A solution

Surely there are many possible solutions to this problem. Maybe there's a clever set of constraints that can be applied to Ruby ActiveRecord code (or similar) which would allow this kind of static analysis. But I hold that there's a missing idea in mainstream programming languages that could solve this problem elegantly: arbitrary compile-time evaluation.

Limited compile-time evaluation has been a feature of many languages. Even C has support for compile-time macros. But full, first-class access to a programming language both during compilation and during runtime is a rare feature in mainstream languages. It is, however a feature of the languages [Zig](https://ziglang.org/) and Jai.

With this feature, we can require that SQL expressions be known at compile time, without compromising on the feature development experience. I'll be using a Jai-like syntax for the following code samples, since I did much of my exploring here in Jai, but I suspect the same approach is possible in Zig.

## 🤖 Executing compile-time SQL queries

Let's start with the root of the solution: the `execute` procedure, which allows us to query our database. This procedure's signature is a bit of a doozy, but it'll let us get a lot of ideas out at once:

```c
execute :: (conn: *PGconn, $command: string, $ResultType: Type, args: $ArgsType) -> []ResultType, success: bool {
  // ...
}
```

Let's take this apart piece by piece.

- At the highest level we're defining a compile-time constant called `execute`, using the `::` operator, whose value is a procedure.
- These arguments have a lot going on:
  - `conn: *PGconn`: we accept a connection whose type is a pointer to a `PGconn` struct, which is an opaque type provided and consumed by the C postgres client library.
  - `$command: string`: we accept a value, `command`, which is of type `string`, and due to its leading `$`, its value must be known at compile-time. In Jai, this concept is called a "baked argument", meaning that each distinct argument for `command` will result in a specific version of this procedure being compiled, with the specified `command` baked into the generated code. In our case, when this procedure is specialized for a new value for `command`, we can inject a snippet of our own compile-time code to log that novel SQL query.
  - `$ResultType: Type` and `args: $ArgsType` are each Jai's equivalent of generic type parameters. This `execute` method can accept parameterized queries including named arguments, and returns Jai structs filled with the data retrieved from the database. So we require that each of these types are known at compile-time, but that the actual value of `args` can be left until runtime.
- This procedure returns a tuple of an array of `ResultType` structs, and a `success` boolean, which is Jai's convention for error handling.

Let's look at a little code that consumes this `execute` procedure:

```c
Todo :: struct {
  id: int;
  user_id: int;
  description: string;
  completed: bool;
}

GetTodosArgs :: struct {
  user_id: int;
}

get_todos :: (conn: *PGconn, user_id: int) -> []Todo, success: bool {
  args: GetTodosArgs;
  args.user_id = user_id;

  todos, success := execute(
    conn,
    "SELECT * FROM todos WHERE user_id = :user_id AND NOT completed",
    args
  );

  return todos, success;
}
```

With this alone, we've solved the database manager's side of the problem: we have an obvious place to inject static analysis logic and track every novel SQL query our app might generate.

However, for a feature developer, we're required to pass a compile-time string literal into every call to `execute`, which seems to fly in the face of composable queries. Let's see what we can do about that.

## 💊 Encapsulating compile-time query snippets

Before we'll be able to compose arbitrary SQL snippets into one coherent expression, we'll need to break the problem down into smaller pieces. Let's start by allowing just the composition of the "select" part of a query with its "from" and "where" clauses.

One way we can use Jai to do this is to use a concept called struct parameters. Let's define a couple of parameterized structs:

```c
SqlSelect :: struct(SQL_EXPRESSION: string, Record: Type) {}

SqlWhere :: struct(SQL_EXPRESSION: string, Args: Type) {
  using args: Args;
  to_string :: () -> string { return SQL_EXPRESSION; };
}
```

Here, we're defining two new compile-time constants, `SqlSelect` and `SqlWhere`, each of which is an abstract struct, awaiting its parameters.

Struct parameters are very comparable to generic type parameters in other languages, with a key difference being that they can hold any arbitrary data.

`SqlSelect` is deceptively simple: it only captures the compile-time constant of the SQL snippet to inject into a `SELECT ...` expression, and the parameter `Record`, which is the Jai type we'll receive when we execute this SQL select.

`SqlWhere` is more involved:
- It captures the compile-time constant of the SQL snippet to inject into a `WHERE ...` expression, and  and an associated type called `Args`, which is the type of its arguments.
- While the type `Args` must be known at compile-time, the values of those arguments can't be known until runtime, so our `SqlWhere` struct has a dynamic property called `args`, of type `Args`. The single `:` operator declares `args` as an instance variable. The `using` keyword before `args` is a bit of an implementation detail, but it makes it much easier for us to traverse our `Where` instances.
- Finally, we define a `to_string` procedure, using the `::` operator to declare it as a compile-time constant on the type, which allows us to access `SQL_EXPRESSION`. This procedure will be important down the road.

Let's also write some code to consume a `SqlWhere` instance in order to execute a query:

```c
sql_select_execute :: (conn: *PGconn, $Select: Type, $sql_from: string, where: $Where) -> []Select.Record, success: bool {
  expression_string :: #run sql_select_to_string(Select.SQL_EXPRESSION, sql_from, Where);
  results, success := execute(conn, expression_string, Select.Record, where.args);
  return results, success;
}

sql_select_to_string :: ($select: string, $from: string, $Where: Type) -> string {
  return #run () -> string {
    string_builder: String_Builder;

    print_to_builder(*string_builder, "SELECT % ", select);
    print_to_builder(*string_builder, "FROM % ", from);
    print_to_builder(*string_builder, "WHERE % ", Where.to_string());

    return builder_to_string(*string_builder);
  }();
}
```

Here's where we begin to flex the power of compile-time evaluation: we've defined a pair of procedures with arguments that must be known at compile time, each of which depends on a `#run` directive, which is how Jai supports arbitrary compile-time execution.

`sql_select_execute` takes arguments for the `SELECT`, `FROM`, and `WHERE` parts of a SQL expression, delegates to `#run sql_select_to_string(...)` to build the SQL query at compile time, and then calls our original `execute` with the compile-time SQL query and our runtime `where` arguments.

`sql_select_to_string` uses a `String_Builder` in a `#run` directive to stitch together the `SELECT ... FROM ... WHERE ...` snippets of our expression, entirely during compilation.

Now our story for feature development has improved a bit:

```c
SelectTodo :: SqlSelect("id, user_id, description, completed", Todo);
WithUser :: SqlWhere("user_id = $user_id", struct { user_id: int; });

get_todos :: (conn: *PGconn, user_id: int) -> []Todo, success: bool {
  with_user: WithUser;
  with_user.user_id = user_id;

  todos, success := sql_select_execute(
    conn,
    SelectTodo,
    "todos",
    with_user
  );

  return todos, success;
}
```

This might not seem like much of an improvement, but we've already crossed our first major hurdle: we've made it possible to decompose a single SQL expression into multiple parts, without sacrificing on our compile-time knowledge of the expression they'll be combined into when we call `get_todos`.

From here, the last hurdle is making our where expressions composable, and we'll have a compelling prototype.

## 🎼 Composing compile-time where expressions

Types with compile-time parameters have served us well so far, let's try leaning on them again to define `SqlWhereAnd`:

```c
SqlWhereAnd :: struct(LhsSqlWhere: Type, RhsSqlWhere: Type) {
  to_string :: () ->  string {
    // ...
  }
  lhs: *LhsSqlWhere;
  rhs: *RhsSqlWhere;
}

sql_where_and :: (lhs: *$LhsSqlWhere, rhs: *$RhsSqlWhere) -> SqlWhereAnd(LhsSqlWhere, RhsSqlWhere) {
  result: SqlWhereAnd(LhsSqlWhere, RhsSqlWhere);
  result.lhs = lhs;
  result.rhs = rhs;

  return result;
}
```

This looks simple enough, right?

First, we've defined a new type that represents the conjunction of two existing where expressions. It has a `to_string` procedure whose implementation I've left out for now, and pointers to instances of `lhs` and `rhs`, the left- and right-hand side of the SQL `AND` expression we're modeling. As a reminder, it's important that `to_string` be a compile-time constant that can build up a SQL expression, but `lhs` and `rhs` must be dynamic run-time values so they can be useful.

Next, we've defined a `sql_where_and` procedure, which encapsulates the boilerplate of stitching together two SQL where expressions.

Before we jump into the definition of `SqlWhereAnd.to_string`, let's lay out how we'd like to consume this abstraction:

```c
WithStatus :: SqlWhere("completed = :completed", struct { completed: bool; });

get_incomplete_todos :: (conn: *PGconn, user_id: int) -> []Todo, success: bool {
  with_user: WithUser;
  with_user.user_id = user_id;

  with_status: WithStatus;
  with_status.completed = false;

  incomplete_with_user = sql_where_and(*with_user, *with_status);

  todos, success := sql_select_execute(
    conn,
    SelectTodo,
    "todos",
    incomplete_with_user
  );
  return todos, success;
}
```

Now we're getting somewhere! It's certainly more verbose than the Rails equivalent, but we've come a long way here. Let's review what we've got:
- We've encapsulated the schema of a `Todo` into a type and a SQL select expression
- We've encapsulated the business of filtering `Todo` records by their associated user into a `WithUser` snippet
- We've encapsulated the business of filtering `Todo` records by whether they've been completed or not into a `WithStatus` snippet
- We've allowed our feature developer to compose these snippets togehter into a single SQL query
- We've ensured that all SQL queries are known at compile time.

## 🔁 Closing the loop

Now that we have a way to express composable SQL queries as compile-time constants, let's finally build our static analysis tool to log each possible SQL query. It's only a one line change:

```c
execute :: (conn: *PGconn, $command: string, $ResultType: Type, args: $ArgsType) -> []ResultType, success: bool {
  #run print("SQL query: %\n, command);
  // ...
}
```

By inserting a single new `#run` directive here, we ensure that each time the `execute` procedure is specialized with a new compile-time value for `command`, we log it during compilation. If we wanted to, it wouldn't be hard to capture this output and perform an `EXPLAIN` on each query. We could even implement an integration test that asserts no queries involve sequential scans on large tables, or other slow operations.

# 🫠 The future

So, we've named a common problem in web development, and identified a programming language feature that can solve that problem. Now what?

Well, I'm not convinced the right language exists for this. My Jai prototypes were very fruitful, but adapting a language designed for game development to support web programming feels like an uphill battle. Zig has a lot of promise too, but I find myself concerned with its deep ties to C and rejection of metaprogramming.

This investigation has left me convinced that the ideal solution is a new programming langauge, and to that end I've started some work on a language of my own.

## 👻 What about `SqlWhereAnd.to_string`?

It turns out I couldn't find a simple way to implement `to_string` on `SqlWhereAnd`. Merging two parameterized SQL where expressions like this requires parsing the SQL to identify parameter names, and namespacing each name to avoid naming conflicts between the parameters in the two sides of the merged expression. I've left the code out from this blog post for brevity (along with a few other small changes), but [here you can find a version that worked for an early beta of Jai](https://github.com/kfinn/jai-record/blob/main/src/sql/sql_where.jai#L13).
