import { redirect } from "react-router";
import { auth } from "./server";

export const requireAuth = async (req: Request) => {
	const session = await auth.api.getSession({
		headers: req.headers,
	});
	if (!session) {
		throw redirect("/login");
	}
	return session.user.id;
};

export const getUser = async (req: Request) => {
	const session = await auth.api.getSession({
		headers: req.headers,
	});

	return session?.user ?? null;
};
