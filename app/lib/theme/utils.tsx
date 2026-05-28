export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;

export const DEFAULT_THEME: Theme = "system";

export const THEME_COOKIE_NAME = "shadcn-admin-ui-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const PREFERS_LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
