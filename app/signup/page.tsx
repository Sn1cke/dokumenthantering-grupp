"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";

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
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
        Register account
      </h2>
      <div className="form-control mt-10 mx-auto max-w-xs sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <p className="font-medium">Account details</p>
          <div className="relative flex items-center text-gray-500 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-3 absolute pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-3 absolute pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-3 absolute pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
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
