import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Authentification par GitHub
    {
      id: "github",
      name: "GitHub",
      // Configuration de l'authentification GitHub...
    },
    // Authentification par e-mail et mot de passe
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Redirige vers ta page de connexion personnalisée
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
