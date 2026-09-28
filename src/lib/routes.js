import { absoluteUrl, buildPath, PAGE_IDS, parsePath, SITE_ORIGIN } from "../content/seo";

export { SITE_ORIGIN };

export const PAGE_ROUTES = PAGE_IDS.map((id) => ({ id, path: buildPath(id, "en") }));

export function getPathForPageId(pageId, locale = "en") {
  return buildPath(pageId, locale);
}

export function getRouteForPath(pathname = "/") {
  return parsePath(pathname);
}

export function getAbsoluteUrl(pathname = "/") {
  return absoluteUrl(pathname);
}
