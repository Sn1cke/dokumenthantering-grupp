"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  if (session) {
    return (
      <div className="container mx-auto">
        <h2 className="mt-[calc(30vh)] text-center text-3xl font-bold leading-9 tracking-tight text-neutral">
          Signed in as{" "}
          <span className="text-primary">{session.user?.name}</span>
        </h2>

        <div className="form-control mx-auto sm:w-full max-w-xs sm:max-w-sm">
          <button
            onClick={handleSignOut}
            className="btn btn-warning shadow-md mt-8"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="mt-[calc(30vh)] text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Sign in to <span className="text-primary">Dokke</span>
      </h2>
      <div className="form-control mx-auto sm:w-full max-w-xs sm:max-w-sm">
        <button
          onClick={() => signIn("google", { callbackUrl: "/documents" })}
          className="btn btn-inherit shadow-md mt-8 w-full"
        >
          <Image
            className="w-6"
            src={"/google_logo.ico"}
            width={24}
            height={24}
            alt={"google"}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
