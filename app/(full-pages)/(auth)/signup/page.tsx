
import { Metadata } from "next";

import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "SignUp Page ",
  description: "SignUp Page Admin Dashboard ",
  // other metadata
};

export default function SignUp() {
  return (
    <>
        <SignUpForm />
    </>
  );
}
