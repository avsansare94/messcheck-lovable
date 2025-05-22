// This file is used to configure Next.js
// Learn more: https://nextjs.org/docs/api-reference/next.config.js/introduction

/** @type {import('next').NextConfig} */

// Import the Sentry Next.js plugin
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // Your existing Next.js config
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

// Sentry webpack plugin configuration
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG || '',
  project: process.env.SENTRY_PROJECT || '',
  authToken: process.env.SENTRY_AUTH_TOKEN || '',
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
