"use client";

import { getFunctionResponse } from "@root/lib/api";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await getFunctionResponse(name);
    setResponse(res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hello, this is my next js app using azure function</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </main>
  );
}
