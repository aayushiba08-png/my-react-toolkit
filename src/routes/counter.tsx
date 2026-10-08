import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card } from "@/components/ui-kit";

export const Route = createFileRoute("/counter")({
  head: () => ({
    meta: [
      { title: "Counter App — Task 1" },
      { name: "description", content: "Counter with Increment, Decrement and Reset." },
      { property: "og:title", content: "Counter App — Task 1" },
      { property: "og:description", content: "Counter with Increment, Decrement and Reset." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CounterPage,
});

function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card title="Task 1: Counter App" className="text-center">
        <p className="text-6xl font-bold tabular-nums text-card-foreground">{count}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => setCount((c) => c + 1)}>+ Increment</Button>
          <Button variant="secondary" onClick={() => setCount((c) => c - 1)}>
            − Decrement
          </Button>
          <Button variant="danger" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}
