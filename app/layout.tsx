import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { Lexend } from 'next/font/google';
import React from 'react';

import StoryblokProvider from '@/components/storyblok/StoryblokProvider';

// These styles apply to every route in the application
import './globals.css';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS,
  use: [apiPlugin],
});

export const metadata = {
  title: 'kaminska.design',
  description: 'A portfolio website',
};
interface RootLayoutType {
  children: React.ReactNode;
}

const lexend = Lexend({ subsets: ['latin-ext'] });

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={lexend.className}>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
