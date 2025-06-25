import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const commonPrivateRoutes = [
  '/dashboard',
  '/dashboard/change-password',
  '/dashboard/profile',
  '/dashboard/notifications',
  '/dashboard/support',
  '/dashboard/dining-report',
];

const publicRoutes = ['/login'];

const roleBasedPrefixes = {
  superAdmin: '/dashboard/superAdmin',
  admin: '/dashboard/admin',
  manager: '/dashboard/manager',
  moderator: '/dashboard/moderator',
  student: '/dashboard/student',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  const isPublic = publicRoutes.includes(pathname);
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname === '/' ||
    pathname === '/home' ||
    pathname === '/dining';

  // Redirect unauthenticated users trying to access protected routes
  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublic || !isProtectedRoute) {
    return NextResponse.next();
  }

  // Decode JWT and extract role
  let decoded: any;
  try {
    decoded = jwtDecode(accessToken!);
  } catch (err: any) {
    console.log(err)
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = decoded?.role;

  // Access logic
  if (pathname === '/' || pathname === '/home') {
    return NextResponse.next(); // All roles allowed
  }

  if (pathname === '/dining') {
    if (role !== 'student') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url)); // Deny student
  }

  // Allow common dashboard routes
  if (commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Role-specific dashboard prefix check
  const expectedPrefix = roleBasedPrefixes[role as keyof typeof roleBasedPrefixes];
  if (expectedPrefix && pathname.startsWith(expectedPrefix)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/home', '/dining', '/'],
};
