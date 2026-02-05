import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler:true,
  cacheComponents:true, // this nd the above one enables automatic use memo and use call back implementation to automatically memoize our code and  to avoid unneccecary re renders by watching our code at buildtime
  experimental: {
    turbopackFileSystemCacheForDev : true, // for significantly fast rcompile times across restarts
  },
  // PostHog reverse proxy configuration
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

// [] for separate link for ids, () for hiding the route
// btw SSR components are rendered on the server while CSR without the browser interaction part is rendered on the server as well while the browser interaction part is left as placeholders which are then rendered in the client side
// the main page.tsx file is also shown in the client even tho when its a server component cuz why not
// in server side fetching we dont even need use effect for fetching data on every reload . as it renders on server first thus better SEO and less time to re fetch using caching
// SSF prevents duplicate requests. if multiple api requests at same time to same place only one request is sent. also API calls in server gives more security to our private information
// "use cache" at function level,file level nd any level for caching,we can control cache functions using another functions. static part of a "use cache" file is pre rendered and the dyanamic part is done using react suspense
// metadata(data stored anywhere to be used in the UI) is rendred in server and sent to browser directly with bettwe SEO
//data fetching is done in server as well and sent to browser improvinf SEO