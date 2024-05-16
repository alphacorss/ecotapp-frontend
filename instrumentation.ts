import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: 'https://a48272a33cd1feee336d1542f1b85912@o4507255804461056.ingest.us.sentry.io/4507255805509632',
      tracesSampleRate: 1,
      debug: false,
    });
    return;
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: 'https://a48272a33cd1feee336d1542f1b85912@o4507255804461056.ingest.us.sentry.io/4507255805509632',
      tracesSampleRate: 1,
      debug: false,
    });
    return;
  }
}
