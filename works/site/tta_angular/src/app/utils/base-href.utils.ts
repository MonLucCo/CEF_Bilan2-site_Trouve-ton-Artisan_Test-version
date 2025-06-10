/**
 * Génère dynamiquement un chemin basé sur la metadonnée `href` de `<base>`.
 *
 * @param {string} path - Le chemin relatif à adapter.
 * @returns {string} Le chemin complet basé sur `baseHref`.
 *
 * @remarks
 * Cette adresse varie selon l’environnement :
 * - **Développement** : `'/'`
 * - **Production** : `'trouve-ton-artisan/'`
 *
 * @example
 * ```typescript
 * const dataUrl = baseHref('datas/datas.json'); // Résultat : '/datas/datas.json' ou 'trouve-ton-artisan/datas/datas.json'
 * ```
 */
export function baseHref(path: string): string {
    const base = (document.getElementsByTagName('base')[0]?.getAttribute('href') || '/').replace(/\/$/, '');
    const value = `${base}/${path}`.replace(/\/\//g, '/'); // Correction des doubles '/'
    console.log('[baseHref] : valeur calculée du chemin', { initial: path, result: value })
    return value;
}
