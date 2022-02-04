import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const QUERY_CLIENT = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={QUERY_CLIENT}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
