import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createTRPCClient } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { Spinner } from "./components/ui/spinner";
import { routeTree } from "./routeTree.gen";
import type { AppRouter } from "./server/trpc";
import { handleTRPC } from "./server/functions";

export function createTrpcClient(queryClient: QueryClient) {
  return createTRPCOptionsProxy<AppRouter>({
    client: createTRPCClient({
      links: [
        () =>
          ({ op }) =>
            observable((observer) => {
              handleTRPC({
                data: {
                  path: op.path,
                  input: op.input,
                },
              })
                .then((data: any) => {
                  observer.next({ result: { data } });
                  observer.complete();
                })
                .catch((err: any) => {
                  observer.error(err);
                });
            }),
      ],
    }),
    queryClient,
  });
}

export function getRouter() {
  const queryClient = new QueryClient();
  const trpc = createTrpcClient(queryClient);

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        <Spinner />
      </div>
    ),
    context: {
      trpc,
      queryClient,
    },
    Wrap: function WrapComponent({ children }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
