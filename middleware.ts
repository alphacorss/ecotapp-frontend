import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { baseUrl } from './lib/utils';

const cache = new Map();

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const role = request.cookies.get('role')?.value || '';

    const cacheKey = token;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && cachedResponse.expiry > Date.now()) {
      return cachedResponse.response;
    }

    if (!token || !role) {
      throw new Error('Token or role not found');
    }

    const response = await fetch(`${baseUrl}/profile/get${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        role,
      },
    });

    if (!response.ok) {
      throw new Error('User not found');
    }

    const cacheDuration = 3 * 60 * 1000; // 5 minutes
    const expiry = Date.now() + cacheDuration;

    const nextResponse = NextResponse.next();

    cache.set(token, {
      response: nextResponse,
      expiry,
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
