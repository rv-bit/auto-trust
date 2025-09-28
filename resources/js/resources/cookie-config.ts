import { COOKIE_PREFIX } from "./app-config";

export const THEME_COOKIE_NAME = `${COOKIE_PREFIX}-theme_state`;
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 365; // 1 year

export const SIDEBAR_COOKIE_NAME = `${COOKIE_PREFIX}-sidebar_state`;
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
