import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { Bitter } from 'next/font/google';
import React from 'react';

import StoryblokProvider from '@/components/storyblok/StoryblokProvider';

// These styles apply to every route in the application
import './globals.css';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS,
  use: [apiPlugin],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
interface RootLayoutType {
  children: React.ReactNode;
}

const bitter = Bitter({ subsets: ['latin-ext'] });

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={bitter.className}>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
