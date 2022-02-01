import { PropsWithChildren, useEffect, useState } from "react";

export default function RequireMount({ children }: PropsWithChildren<{}>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [setMounted]);

  return <>{mounted && children}</>;
}
