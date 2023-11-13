"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image'

const Login = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  if (session) {
    return (
      <div className="container mx-auto">
        <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
          Signed in as {session.user?.name}
        </h2>

        <div className="form-control mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={handleSignOut}
            className="btn btn-active bg-inherit border-current-secondary shadow-md mt-10 w-full"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Sign in
      </h2>
      <div className="form-control mx-auto sm:w-full sm:max-w-sm">
        <button
          onClick={() => signIn("google", { callbackUrl: "/documents" })}
          className="btn btn-active bg-inherit border-current-secondary shadow-md mt-10 w-full"
        >
          <Image className="w-6" src={'/google.png'} width={24} height={24} alt={"google"} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
