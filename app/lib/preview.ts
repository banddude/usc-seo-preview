export const previewBasePath = "/usc-seo-preview";
export const previewUrl = `https://banddude.github.io${previewBasePath}`;

export function assetPath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//") || src.startsWith(`${previewBasePath}/`)) return src;
  return `${previewBasePath}${src}`;
}
