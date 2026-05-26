import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthQueryProvider>{children}</AuthQueryProvider>;
}
