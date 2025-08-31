"use client";
import { useState } from "react";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const password = "password";
  const [result, setResult] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(`User added: ${data.name} (${data.email})`);
      } else {
        setResult(`Error: ${data.details || "Unknown error"}`);
      }
    } catch (err) {
      setResult("Network error");
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", padding: 20 }}>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {result && <p>{result}</p>}
    </main>
  );
}
