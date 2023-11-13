"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function UserValidation({ children }: Props) {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="container justify-center flex mx-auto">
        <span className="loading loading-spinner loading-lg mt-[calc(30vh)]"></span>
      </div>
    )
  }
  if (!session && (pathName !== "/" && pathName !== "/login")) {
    return (
      <div className="container mx-auto">
        <h3 className="mt-[calc(30vh)] text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
          Access denied
        </h3>
        <p className="text-center mt-2">You are not logged in.</p>
      </div>
    )
  } else return children
}
