import { ensureSession } from "@better-auth-ui/react/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { auth } from "@/lib/auth/server";
import { getServerQueryClient } from "@/lib/trpc/server.utils";
import type { Route } from "./+types/_authenticated";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const queryClient = getServerQueryClient();

	const session = await ensureSession(queryClient, auth, {
		headers: request.headers,
	});

	if (!session) {
		const url = new URL(request.url);
		const currentPath = `${url.pathname}${url.search}`;
		const redirectPath =
			currentPath && currentPath !== "/"
				? `?${new URLSearchParams({ redirectTo: currentPath }).toString()}`
				: "";

		throw redirect(`/sign-in${redirectPath}`);
	}

	return {
		dehydratedState: dehydrate(queryClient),
	};
};

export default function AuthenticatedRouteLayout({
	loaderData,
}: Route.ComponentProps) {
	return (
		<HydrationBoundary state={loaderData.dehydratedState}>
			<AuthenticatedLayout />
		</HydrationBoundary>
	);
}
