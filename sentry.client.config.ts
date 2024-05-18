import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://a48272a33cd1feee336d1542f1b85912@o4507255804461056.ingest.us.sentry.io/4507255805509632',
  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
