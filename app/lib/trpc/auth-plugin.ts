import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../auth/server";
import type { Context } from "./server";

function createAuthPlugin() {
	const t = initTRPC.context<Context>().create();

	return {
		authRequired: t.procedure.use(async (opts) => {
			const session = await auth.api.getSession({
				headers: opts.ctx.req.headers,
			});

			if (!session) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Not authenticated",
				});
			}

			return opts.next({
				ctx: session,
			});
		}),
	};
}

export const authPlugin = createAuthPlugin();
