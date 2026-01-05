import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/protected", "routes/protected.tsx"),
	route("/login", "routes/login.tsx"),
	...prefix("/api", [
		route("/auth/*", "routes/api/auth.ts"),
		route("/trpc/*", "routes/api/trpc.ts"),
	]),
] satisfies RouteConfig;
