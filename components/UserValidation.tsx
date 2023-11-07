"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function UserValidation({ children }: Props) {
  const pathName = usePathname();
  const { data: session } = useSession();

  if (session || pathName === "/" || pathName === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto">
      <h3 className="mt-[calc(30vh)] text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Access denied
      </h3>
      <p className="text-center mt-2">You are not logged in.</p>
    </div>
  );
}
