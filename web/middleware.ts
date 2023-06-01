import {NextResponse} from 'next/server'
import {i18n} from '../languages'

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const localeIds = i18n.languages.map((locale) => locale.id)
  console.log({localeIds, pathname})
  const pathnameIsMissingLocale = localeIds.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.base
    console.log(`redirect!!!! ${locale}`, new URL(`/${locale}${pathname}`, request.url).toString())

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    '/',
  ],
}
