import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </>
  );
}
