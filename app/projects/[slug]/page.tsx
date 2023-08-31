import { getBase64ImageUrl, getBasedImages } from '@/helpers/images';
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
  const { story: originalStory } = data;
  const gallery = await getBasedImages(originalStory.content.gallery);
  const mainImage = originalStory.content.mainImage;
  const appendedStory = {
    ...originalStory,
    content: {
      ...originalStory.content,
      gallery,
      mainImage: {
        ...mainImage,
        data64Blur: await getBase64ImageUrl(
          `${mainImage.filename}/m/100x0/filters:blur(50):quality(30)`,
        ),
      },
    },
  };

  return <StoryblokStory story={appendedStory} />;
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
