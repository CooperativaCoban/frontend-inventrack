import { NextResponse } from "next/server";

export function middleware(request) {
  // Obtenemos el token de las cookies de la solicitud
  let token = request.cookies.get("token");

  // Si no hay token, redirigimos al usuario a la página de inicio de sesión
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token, la función termina sin hacer nada, permitiendo que la solicitud continúe
}

// Configuración para especificar en qué rutas se aplicará el middleware
export const config = {
  // Array de rutas donde se aplicará el middleware
  matcher: ["/menu", "/countInventory", "/roles", "/countReport", "/comInventory", "/thInventory", "/"],
};