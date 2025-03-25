import { createEventHandler } from '@cloudflare/next-on-pages';

export const onRequest = createEventHandler({
  // Example configuration
  bypassToken: process.env.BYPASS_TOKEN,
  
  // Optional: Configure caching
  cache: {
    // Enable caching for successful responses
    browser: {
      name: 'cache-control',
      values: ['public', 'max-age=3600']
    }
  }
});