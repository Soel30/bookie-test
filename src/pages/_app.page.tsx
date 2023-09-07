import "../styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto, Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <main className={quicksand.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
