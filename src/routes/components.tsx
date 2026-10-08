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

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">Task 5: Reusable Components</h1>

      <Card title="Button">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
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
