import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old text-version site was retired; send old links to the passport.
  async redirects() {
    return [{ source: '/classic', destination: '/', permanent: true }];
  },
};

export default nextConfig;
