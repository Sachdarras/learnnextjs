import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Rediriger vers cette page si non authentifié
  },
});

export const config = {
  matcher: ["/protected/:path*"], // Protéger toutes les pages sous /protected
};
