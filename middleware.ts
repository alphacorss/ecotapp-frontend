import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { baseUrl } from './lib/utils';

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const role = request.cookies.get('role')?.value || '';

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

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
