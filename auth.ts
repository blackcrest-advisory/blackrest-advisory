import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { JWT } from "@auth/core/jwt";
import { prisma } from "@/lib/db/client";
import { sendWelcomeEmail } from "@/lib/services/email.service";

const GOOGLE_SIGNUP_INDUSTRY_COOKIE = "blackcrest-google-signup-industry";

function getJwtSecret(secret: string | string[]) {
  return Array.isArray(secret) ? secret[0] : secret;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    async encode({ token, secret, maxAge }) {
      if (!token) return "";

      const expiresAt =
        Math.floor(Date.now() / 1000) + (maxAge ?? 24 * 60 * 60);

      return new SignJWT(token as JWTPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(new TextEncoder().encode(getJwtSecret(secret)));
    },
    async decode({ token, secret }) {
      if (!token) return null;

      try {
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(getJwtSecret(secret)),
        );

        return payload as JWT;
      } catch {
        return null;
      }
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const normalizedEmail = credentials.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

        if (!user?.password) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "CLIENT",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google") return true;

      const email = user.email?.trim().toLowerCase();
      const googleProfile = profile as { email_verified?: boolean } | undefined;

      if (!email || googleProfile?.email_verified === false) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        user.id = existingUser.id;
        user.name = existingUser.name;
        user.role = existingUser.role;

        return true;
      }

      const industry = (await cookies())
        .get(GOOGLE_SIGNUP_INDUSTRY_COOKIE)
        ?.value.trim();

      if (!industry) {
        return "/select-industry?provider=google";
      }

      const newUser = await prisma.user.create({
        data: {
          name: user.name?.trim() || email.split("@")[0],
          email,
          industry,
          avatarUrl: user.image || undefined,
        },
      });

      user.id = newUser.id;
      user.name = newUser.name;
      user.role = newUser.role;

      void sendWelcomeEmail(newUser.email, newUser.name);

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },
  },
});

export { handlers, signIn, signOut, auth };
