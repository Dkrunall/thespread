import type { NextConfig } from "next";
import path from "path";

const nextConfig: any = {
  turbopack: {
    // Set explicit root to this project folder
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
