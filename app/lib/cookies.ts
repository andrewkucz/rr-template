/* biome-ignore-all lint/suspicious/noDocumentCookie: this utility intentionally manages cookies with document.cookie for browser compatibility. */
/**
 * Cookie utility functions using manual document.cookie approach
 * Replaces js-cookie dependency for better consistency
 */

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Get a cookie value by name
 */
export function getCookie<T>(name: string, fallback: T): T {
	if (typeof document === "undefined") return fallback;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		const cookieValue = parts.pop()?.split(";").shift();
		return cookieValue as T;
	}
	return fallback;
}

export function getCookieFromReq<T>(
	request: Request,
	name: string,
	fallback: T,
): T {
	const cookie = request.headers.get("cookie");
	if (!cookie) return fallback;

	const value = `; ${cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		const cookieValue = parts.pop()?.split(";").shift();
		return cookieValue as T;
	}
	return fallback;
}

/**
 * Set a cookie with name, value, and optional max age
 */
export function setCookie(
	name: string,
	value: string,
	maxAge: number = DEFAULT_MAX_AGE,
): void {
	if (typeof document === "undefined") return;

	document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

/**
 * Remove a cookie by setting its max age to 0
 */
export function removeCookie(name: string): void {
	if (typeof document === "undefined") return;

	document.cookie = `${name}=; path=/; max-age=0`;
}
