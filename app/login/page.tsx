"use client";
import { EmailIcon, PasswordIcon } from "@/components/icons/inputIcons";
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
      <h2 className="mt-28 text-center text-4xl font-bold leading-9 tracking-tight text-neutral">
        Sign in
      </h2>

      <div className="form-control mt-10 mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <p className="font-medium text-neutral">Login details</p>
          <div className="flex items-center text-gray-500 mt-4">
            <EmailIcon />
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
            <PasswordIcon />
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
          {/* Preppat för fel inlogg när vi väl gör fetch */}
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
