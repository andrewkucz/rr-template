import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { handleServerError } from "../handle-server-error";
import { TRPCProvider } from "./client";
import type { AppRouter } from "./router";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: (failureCount, error) => {
					if (import.meta.env.DEV) {
						return false;
					}
					if (failureCount > 3) {
						return false;
					}
					return !(
						error instanceof AxiosError &&
						[401, 403].includes(error.response?.status ?? 0)
					);
				},
				refetchOnWindowFocus: import.meta.env.PROD,
				staleTime: 10 * 1000,
			},
			mutations: {
				onError: (error) => {
					handleServerError(error);

					if (error instanceof AxiosError && error.response?.status === 304) {
						toast.error("Content not modified!");
					}
				},
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				if (!(error instanceof AxiosError)) {
					return;
				}

				if (error.response?.status === 401) {
					toast.error("Session expired!");
					const redirect = window.location.pathname + window.location.search;
					window.location.assign(
						`/sign-in?${new URLSearchParams({ redirect }).toString()}`,
					);
				}

				if (error.response?.status === 500) {
					toast.error("Internal Server Error!");
					if (import.meta.env.PROD) {
						window.location.assign("/500");
					}
				}
			},
		}),
	});
}
let browserQueryClient: QueryClient | undefined;
function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export function TRPCQueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: "/api/trpc",
				}),
			],
		}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
			</TRPCProvider>
		</QueryClientProvider>
	);
}
