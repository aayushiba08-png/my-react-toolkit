import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Button, Card } from "@/components/ui-kit";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "API Users — Task 7" },
      { name: "description", content: "Fetch users from a REST API with loading, error and empty states." },
      { property: "og:title", content: "API Users — Task 7" },
      { property: "og:description", content: "Fetch users with loading, error and empty states." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UsersPage,
});

type User = { id: number; name: string; email: string; company: { name: string } };
type Mode = "normal" | "error" | "empty";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("normal");

  const load = useCallback(async (m: Mode) => {
    setLoading(true);
    setError(null);
    try {
      const url =
        m === "error"
          ? "https://jsonplaceholder.typicode.com/invalid-endpoint-404"
          : "https://jsonplaceholder.typicode.com/users";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data: User[] = await res.json();
      setUsers(m === "empty" ? [] : data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(mode);
  }, [mode, load]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card title="Task 7: Users from REST API">
        <div className="mb-4 flex flex-wrap gap-2">
          <Button variant={mode === "normal" ? "primary" : "ghost"} onClick={() => setMode("normal")}>Normal</Button>
          <Button variant={mode === "error" ? "primary" : "ghost"} onClick={() => setMode("error")}>Simulate Error</Button>
          <Button variant={mode === "empty" ? "primary" : "ghost"} onClick={() => setMode("empty")}>Simulate Empty</Button>
        </div>

        {loading && (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
            ))}
            <p className="text-center text-sm text-muted-foreground">Loading users...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-md border border-destructive p-4 text-center">
            <p className="text-sm font-medium text-destructive">Error: {error}</p>
            <Button variant="ghost" className="mt-3" onClick={() => load(mode)}>Retry</Button>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <ul className="flex flex-col gap-2">
            {users.map((u) => (
              <li key={u.id} className="rounded-md border border-border bg-background p-3">
                <p className="text-sm font-medium text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email} · {u.company.name}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
