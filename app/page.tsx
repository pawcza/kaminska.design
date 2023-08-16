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

  return (
    <>
      {/*<h1>Story: {data.story.id}</h1>*/}
      <StoryblokStory story={data.story} />
    </>
  );
}
