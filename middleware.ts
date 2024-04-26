import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();
  const { pathname } = request.nextUrl
  console.log('Ruta visitada:', pathname)
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  else{
    return NextResponse.next();
  }
  
}

export const config = {
  matcher: ['/:path*'],
};