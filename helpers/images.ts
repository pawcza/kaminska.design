export async function getBase64ImageUrl(
  url: string,
): Promise<string | undefined> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `webp;base64,${data}`;
}
export async function getBasedImages(images: []) {
  return await Promise.all(
    images.map(async (item: unknown & { filename: string }) => {
      const data64Blur = await getBase64ImageUrl(
        `${item.filename}/m/100x0/filters:blur(50):quality(30)`,
      );

      return {
        data64Blur,
        ...item,
      };
    }),
  );
}
