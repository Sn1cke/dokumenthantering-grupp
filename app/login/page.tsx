"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectDetails, setIncorrectDetails] = useState(false);

  const handleSubmit = () => {
    // User login fetch
    // KOD123
  };

  return (
    <div className="container mx-auto">
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Sign in
      </h2>

      <div className="form-control mt-10 mx-auto sm:w-full sm:max-w-sm">
        <button onClick={() => signIn("google", { callbackUrl: "/documents" })} className="btn btn-active btn-secondary mt-10 w-full">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
