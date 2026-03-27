import type { QueryClient } from "@tanstack/react-query";

export interface MyRouterContext {
  trpc: any;
  queryClient: QueryClient;
}
