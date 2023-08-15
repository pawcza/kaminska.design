'use client';

import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import Page from '@/components/Page';
import Teaser from '@/components/Teaser';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS,
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
