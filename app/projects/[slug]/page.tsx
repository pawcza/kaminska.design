import { getBase64ImageUrl } from '@/helpers/images';
import {
  ISbStoriesParams,
  StoryblokClient,
  StoryblokStory,
  getStoryblokApi,
} from '@storyblok/react/rsc';

async function getData(slug: string) {
  const sbParams: ISbStoriesParams = { version: 'draft' };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/projects/${slug}`, sbParams);
}

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { data } = await getData(slug);
  const { story } = data;

  const blur = await getBase64ImageUrl(
    'https://a.storyblok.com/f/39898/3310x2192/e4ec08624e/demo-image.jpeg/m/500x0/filters:blur(50):quality(30)',
  );

  const gallery = story.content.gallery.map((image) => {
    const { filename, alt, id } = image;

    return {
      filename,
      alt,
      id,
      blur,
    };
  });

  console.dir(gallery);

  // const gallery = story.content.gallery.map(async ({ filename, alt, id }) => {
  //   const data64Blur = await getBase64ImageUrl(
  //     `${filename}/m/500x0/filters:blur(50):quality(30)`,
  //   );
  //
  //   return {
  //     data64Blur,
  //     filename,
  //     alt,
  //     id,
  //   };
  // });

  return <StoryblokStory story={story} />;
}

// Generate paths dynamically
export async function generateStaticParams() {
  const sbParams: ISbStoriesParams = {
    version: 'draft',
    starts_with: 'projects/',
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories', sbParams);
  const { stories } = data;

  return stories.map((story) => ({
    slug: story.slug,
  }));
}

// Revalidate every request to avoid local caching, remove before going to prod
export const revalidate = 0;
