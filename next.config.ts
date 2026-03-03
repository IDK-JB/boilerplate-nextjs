import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/index.ts');
export default withNextIntl(nextConfig);
