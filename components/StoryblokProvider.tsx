/** 1. Tag it as client component */
'use client';

/** 2. Import your components */
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import Page from '@/components/Page';
import Teaser from '@/components/Teaser';

/** 1. Tag it as client component */

/** 3. Initialize it as usual */
storyblokInit({
  accessToken: 'OurklwV5XsDJTIE1NJaD2wtt',
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
