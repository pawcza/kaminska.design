export async function getBase64ImageUrl(
  url: string,
): Promise<string | undefined> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `webp;base64,${data}`;
}
