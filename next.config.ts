import type { NextConfig } from "next";

const BASE_PATH = "/ai-playbook";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  async redirects() {
    return [
      // keep the bare *.vercel.app domain working after the basePath move
      { source: "/", destination: BASE_PATH, basePath: false, permanent: false },
    ];
  },
};

export default nextConfig;
