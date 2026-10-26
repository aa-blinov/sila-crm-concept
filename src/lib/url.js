import { base } from '$app/paths';

/**
 * Ссылка внутри сайта с учётом базового пути.
 * На GitHub Pages сайт живёт под /repo/, на своём домене — в корне.
 * BASE_PATH приходит из workflow (configure-pages отдаёт его сам).
 */
export const u = (path) => `${base}${path}`;
