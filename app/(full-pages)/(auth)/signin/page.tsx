
import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

// import signIn form component from components/auth

export const metadata: Metadata = {
  title: "SignIn Admin Dashboard",
  description: "Signin Page Admin Dashboard",
};

export default function SignIn() {
  return (
    <>
        <SignInForm />
    </>
  );
}
