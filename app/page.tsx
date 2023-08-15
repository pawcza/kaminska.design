import {
  ISbStoriesParams,
  StoryblokClient,
  StoryblokStory,
  getStoryblokApi,
} from '@storyblok/react/rsc';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <>
      {/*<h1>Story: {data.story.id}</h1>*/}
      <StoryblokStory story={data.story} />
    </>
  );
}

export async function fetchData() {
  const sbParams: ISbStoriesParams = {
    version: 'draft',
    resolve_relations: 'home-page.projects',
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get('cdn/stories/home', sbParams);
}
