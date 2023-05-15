export function extname(filename: string): string {
  const index = filename.lastIndexOf('.');
  if (index !== -1) { return filename.slice(index + 1); }
  return '';
}