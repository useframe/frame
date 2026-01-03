import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In - Frame AI",
  description:
    "Sign in to your Frame AI account to access your interactive web development workspace",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-3xl">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <SignIn />
        </div>
      </section>
    </div>
  );
}
