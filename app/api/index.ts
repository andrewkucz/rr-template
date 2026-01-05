import { authProcedure, publicProcedure, router } from "~/lib/trpc/server";
import { postsRouter } from "./posts";

const appRouter = router({
	posts: postsRouter,
	hello: publicProcedure.query(async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return "Hello from tRPC";
	}),
	authReq: authProcedure.query(async ({ ctx }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return ctx.user.name;
	}),
});

export { appRouter };

export type AppRouter = typeof appRouter;
