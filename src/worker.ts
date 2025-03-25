export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      const url = new URL(request.url);
      
      // Serve static assets from bucket
      if (url.pathname.startsWith('/static/')) {
        const asset = await env.ASSETS.fetch(request);
        if (asset.status === 200) {
          return asset;
        }
      }

      // Forward to Next.js
      const response = await env.NEXT_APP.fetch(request);
      return response;
    } catch (e) {
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};