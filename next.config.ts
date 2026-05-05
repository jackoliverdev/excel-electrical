import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.0.21", "192.168.0.41", "192.168.0.32", "192.168.0.141", "192.168.0.197"],
};

export default nextConfig;
