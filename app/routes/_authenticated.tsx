import type { LoaderFunctionArgs } from "react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
// import { requireAuth } from "@/lib/auth/server-utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// await requireAuth(request);
	return null;
};

export default function AuthenticatedRouteLayout() {
	return <AuthenticatedLayout />;
}
