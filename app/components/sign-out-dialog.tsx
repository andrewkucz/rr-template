import { AuthQueryContext } from "@daveyplate/better-auth-tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { authClient } from "@/lib/auth/browser";

interface SignOutDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const { sessionKey } = useContext(AuthQueryContext);
	const queryClient = useQueryClient();

	const { mutate: signOut } = useMutation({
		mutationFn: () => {
			return authClient.signOut();
		},
		onSuccess: () => {
			const currentPath = location.pathname;
			queryClient.resetQueries({ queryKey: sessionKey });
			navigate(
				{
					pathname: "/sign-in",
					search: `redirect=${currentPath}`,
				},
				{
					replace: true,
				},
			);
		},
	});

	return (
		<ConfirmDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Sign out"
			desc="Are you sure you want to sign out? You will need to sign in again to access your account."
			confirmText="Sign out"
			destructive
			handleConfirm={signOut}
			className="sm:max-w-sm"
		/>
	);
}
