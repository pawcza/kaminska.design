import {
  ISbStoriesParams,
  StoryblokClient,
  StoryblokStory,
  getStoryblokApi,
} from '@storyblok/react/rsc';

export async function getData(slug: string) {
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
