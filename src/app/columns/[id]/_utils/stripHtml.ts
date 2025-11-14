/**
 * HTMLタグを除去してプレーンテキストにする
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

