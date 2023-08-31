import { getBasedImages } from '@/helpers/images';
import {
  ISbStoriesParams,
  StoryblokClient,
  StoryblokStory,
  getStoryblokApi,
} from '@storyblok/react/rsc';

async function getData() {
  const sbParams: ISbStoriesParams = {
    version: 'draft',
    resolve_relations: 'home-page.projects',
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get('cdn/stories/home', sbParams);
}

export default async function Home() {
  const { data } = await getData();
  const { story: originalStory } = data;
  const projectThumbnails = originalStory.content.projects.map(
    (p) => p.content.thumbnail,
  );
  const basedThumbnails = await getBasedImages(projectThumbnails);
  const projects = originalStory.content.projects.map((project, i) => ({
    ...project,
    content: { ...project.content, thumbnail: basedThumbnails[i] },
  }));

  const story = {
    ...originalStory,
    content: {
      ...originalStory.content,
      projects,
    },
  };

  return <StoryblokStory story={story} />;
}

// Revalidate every request to avoid local caching, remove before going to prod
export const revalidate = 0;
