const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * public/ altındaki statik dosyalar için basePath önekli URL üretir.
 * GitHub Pages (proje sayfası) derlemesinde NEXT_PUBLIC_BASE_PATH=/mebenyani olarak ayarlanır;
 * diğer ortamlarda boştur ve yol olduğu gibi döner.
 */
export function asset(src: string): string {
  return basePath && src.startsWith("/") ? `${basePath}${src}` : src;
}
