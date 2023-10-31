"use client";
import Link from "next/link";
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
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in
      </h2>

      <div className="form-control mt-10 mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <p className="font-medium">Login details</p>
          <div className="flex items-center text-gray-500 mt-4">
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
              className={`input input-bordered ${
                incorrectDetails && `input-error`
              } w-full pl-10`}
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
              className={`input input-bordered ${
                incorrectDetails && `input-error`
              } w-full pl-9`}
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          {incorrectDetails && (
            <label className="label">
              <span className="label-text-alt text-red-700 font-semibold">
                Your email or password is incorrect
              </span>
            </label>
          )}
          <div className="mt-4 text-sm">
            <span>New member? </span>
            <Link href="/signup" className="link link-secondary">
              Join here
            </Link>
          </div>
          <button className="btn btn-active btn-secondary mt-10 w-full">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
