import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { type ActionResult } from "@/components/auth/form";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  return <AuthPageShell type="signup" onSubmit={signup} />;
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  await db`INSERT INTO "user" (id, username, password_hash) VALUES (${userId}, ${username}, ${passwordHash})`;

  // await db.table("user").insert({
  // 	id: userId,
  // 	username: username,
  // 	password_hash: passwordHash
  // });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  cookies().set("userId", userId, {
    maxAge: sessionCookie.attributes.maxAge,
  });
  return redirect("/");
}
