import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, Input, Modal } from "@/components/ui-kit";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Reusable Components — Task 5" },
      { name: "description", content: "Reusable Button, Input, Card and Modal React components." },
      { property: "og:title", content: "Reusable Components — Task 5" },
      { property: "og:description", content: "Reusable Button, Input, Card and Modal React components." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ComponentsPage,
});

function ComponentsPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [lastAction, setLastAction] = useState("Koi button abhi tak click nahi hua.");
  const [locked, setLocked] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const handle = (name: string, message: string) => {
    setProcessing(name);
    setTimeout(() => {
      setCounts((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
      setLastAction(message);
      setProcessing(null);
    }, 400);
  };

  const label = (name: string) =>
    processing === name ? "Processing..." : `${name}${counts[name] ? ` (${counts[name]})` : ""}`;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">Task 5: Reusable Components</h1>

      <Card title="Button">
        <div className="flex flex-wrap gap-2">
          <Button disabled={processing !== null} onClick={() => handle("Primary", "Primary button: data save ho gaya ✅")}>{label("Primary")}</Button>
          <Button variant="secondary" disabled={processing !== null} onClick={() => handle("Secondary", "Secondary button: draft save ho gaya 📝")}>{label("Secondary")}</Button>
          <Button variant="danger" disabled={processing !== null} onClick={() => handle("Danger", "Danger button: item delete ho gaya 🗑️")}>{label("Danger")}</Button>
          <Button variant="ghost" disabled={processing !== null} onClick={() => handle("Ghost", "Ghost button: action cancel ho gaya ↩️")}>{label("Ghost")}</Button>
          <Button disabled={locked || processing !== null} onClick={() => handle("Disabled", "Disabled button ab enable hokar chal gaya 🔓")}>{locked ? "Disabled" : label("Disabled")}</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="ghost" onClick={() => setLocked((l) => !l)}>
            {locked ? "Enable Disabled Button" : "Disable it again"}
          </Button>
          <Button variant="ghost" onClick={() => { setCounts({}); setLastAction("Sab counts reset ho gaye."); }}>
            Reset Counts
          </Button>
        </div>
        <p className="mt-4 rounded-md bg-muted px-3 py-2 text-sm text-foreground" role="status">{lastAction}</p>
      </Card>

      <Card title="Input">
        <div className="flex flex-col gap-3">
          <Input id="demo" label="Your name" placeholder="Type here..." value={value} onChange={(e) => setValue(e.target.value)} />
          <Input id="demo-err" label="With error" defaultValue="bad@" error="This field has an error" />
        </div>
      </Card>

      <Card title="Card">
        <p className="text-sm text-muted-foreground">
          This whole box is a Card component with an optional title.
        </p>
      </Card>

      <Card title="Modal">
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Hello from Modal">
          <p className="text-sm text-muted-foreground">
            Press Escape, click outside, or use the button to close.
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Modal>
      </Card>
    </div>
  );
}
