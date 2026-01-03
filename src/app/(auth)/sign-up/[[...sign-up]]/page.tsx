import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up - Frame AI",
  description:
    "Sign up for Frame AI to start creating and sharing interactive web experiences and code-based frames",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-3xl">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <SignUp />
        </div>
      </section>
    </div>
  );
}
