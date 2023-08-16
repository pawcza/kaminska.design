'use client';

import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import HomePage from '@/components/storyblok/HomePage';
import Project from '@/components/storyblok/Project';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS,
  use: [apiPlugin],
  components: {
    'home-page': HomePage,
    project: Project,
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
