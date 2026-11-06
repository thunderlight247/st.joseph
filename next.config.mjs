/** @type {import('next').NextConfig} */
const nextConfig = {
  // PERF: AVIF/WebP are 30-50% smaller than JPEG, which matters on 3G.
  images: { formats: ['image/avif', 'image/webp'], minimumCacheTTL: 60 * 60 * 24 * 30 },
  compress: true,
  poweredByHeader: false,
};
export default nextConfig;
