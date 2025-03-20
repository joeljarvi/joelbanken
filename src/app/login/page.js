"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { HandleAccountContext } from "../../../context/accountContext";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [session, setSession] = useState({ userId: "", token: null });
  const router = useRouter(); // Ensure this is used inside a page component

  const { setAccount } = useContext(HandleAccountContext);

  useEffect(() => {
    console.log(session); // For debugging
  }, [session]);

  async function handleLogin() {
    const login = { username: userName, password: passWord };

    setPassWord("");
    setUserName("");

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      setSession(data);
      setAccount(data.account);

      // Redirect user to their profile page using the userId from the response

      router.push(`/me/${data.session.userId}`);
    } catch (error) {
      alert(error.message); // Display error message
    }
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
      <button className="btn" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}
