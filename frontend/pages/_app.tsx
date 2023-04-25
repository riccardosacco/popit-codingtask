import "@/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
