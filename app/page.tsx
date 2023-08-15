import {
  ISbStoriesParams,
  StoryblokClient,
  StoryblokStory,
  getStoryblokApi,
} from '@storyblok/react/rsc';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <div>
      <h1>Story: {data.story.id}</h1>
      <StoryblokStory story={data.story} />
    </div>
  );
}

export async function fetchData() {
  let sbParams: ISbStoriesParams = { version: 'draft' };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
