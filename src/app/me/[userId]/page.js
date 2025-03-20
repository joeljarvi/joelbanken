"use client";

import { useContext } from "react";
import { HandleAccountContext } from "../../../../context/accountContext";

export default function UserPage() {
  const { account } = useContext(HandleAccountContext);



  return (
    <div>
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
        <h2 className="text-6xl">{account.username}</h2>
        <h2 className="text-3xl">{account.amount}€</h2>
      </div>
    </div>
  );
}
