"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  EmailIcon,
  NameIcon,
  PasswordIcon,
} from "@/components/icons/inputIcons";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successNewUser, setSuccessNewUser] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Här kör vi anropet för att registrera sig
    // KOD123

    setName("");
    setEmail("");
    setPassword("");
    setSuccessNewUser(true);

    setTimeout(() => {
      setSuccessNewUser(false);
      // Navigera till login eller bli inloggad direkt
    }, 2000);
  };

  return (
    <div className="container mx-auto">
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Register account
      </h2>
      <div className="form-control mt-10 mx-auto max-w-xs sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <p className="font-medium text-neutral">Account details</p>
          <div className="relative flex items-center text-gray-500 mt-2">
            <NameIcon />
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="input input-bordered w-full pl-10"
              onChange={e => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
          <div className="relative flex items-center text-gray-500 mt-2">
            <EmailIcon />
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered w-full pl-10"
              onChange={e => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </div>
          <div className="mt-2 relative flex items-center text-gray-500">
            <PasswordIcon />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full pl-9"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="mt-4 text-sm">
            <span>Already a member? </span>
            <Link href="/login" className="link link-secondary">
              Sign in
            </Link>
          </div>

          <button className="btn btn-active btn-secondary mt-10 w-full">
            {successNewUser ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
