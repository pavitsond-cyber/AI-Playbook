import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    instrumentationHook: true,   // enables instrumentation.ts → runs downloadLogos on startup
  },
};

export default nextConfig;
