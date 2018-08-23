export function paragraphString(text: string): string[] {
  return !text ? [] : text.split('\n')
    .map(a => a.trim())
    .filter(a => !!a);
}
