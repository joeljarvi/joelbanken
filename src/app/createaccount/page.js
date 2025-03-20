"use client";
import Link from "next/link";
import { useState } from "react";

export default function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  async function createNewAccount() {
    const newAccount = { username: userName, password: passWord };
    setPassWord("");
    setUserName("");

    await fetch("http://localhost:4000/createaccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      <input
        type="text"
        value={userName}
        placeholder="username"
        className="input"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={passWord}
        placeholder="password"
        className="input"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <Link href="/login">
        <button className="btn" onClick={createNewAccount}>
          Create Account
        </button>
      </Link>
    </div>
  );
}
