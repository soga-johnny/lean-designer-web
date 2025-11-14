/**
 * テキストを指定文字数でトリミングして三点リーダーを追加
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

