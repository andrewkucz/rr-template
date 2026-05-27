import type { KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: [
		"app/components/ui/**",
		"app/components/layout/app-title.tsx",
		"app/lib/auth/hooks.ts",
	],
};

export default config;
