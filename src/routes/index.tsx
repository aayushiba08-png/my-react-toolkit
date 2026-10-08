import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "React & JavaScript Practice Tasks" },
      { name: "description", content: "Counter, Todo, Product Search, Registration Form, FAQ, API fetch states, JS algorithms and an Employee Management System." },
      { property: "og:title", content: "React & JavaScript Practice Tasks" },
      { property: "og:description", content: "All React and JavaScript practice tasks with live demos and outputs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const reactTasks = [
  { to: "/counter", title: "1. Counter App", desc: "Increment, Decrement, Reset" },
  { to: "/todo", title: "2. Todo App", desc: "Add, Edit, Delete, Complete" },
  { to: "/products", title: "3. Product Search", desc: "Search, Category filter, Price sort" },
  { to: "/register", title: "4. Registration Form", desc: "Full field validation" },
  { to: "/components", title: "5. Reusable Components", desc: "Button, Input, Card, Modal" },
  { to: "/faq", title: "6. FAQ Accordion", desc: "Expand & Collapse" },
  { to: "/users", title: "7. API Users", desc: "Loading, Error, Empty states" },
];

const jsTasks = [
  "8. Reverse a string (no reverse())",
  "9. Find duplicates in an array",
  "10. Second-largest number",
  "11. Character frequency count",
  "12. Remove duplicates (keep order)",
  "13. Custom map()",
  "14. Custom filter()",
];

function Index() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">React & JavaScript Practice Tasks</h1>
      <p className="mt-2 text-muted-foreground">
        Har task ka live demo — click karke code aur output dekhein.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">React Tasks</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reactTasks.map((t) => (
          <Link key={t.to} to={t.to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h3 className="font-semibold text-card-foreground">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold text-foreground">JavaScript Tasks (with output)</h2>
      <Link to="/js-tasks">
        <Card className="mt-4 transition-shadow hover:shadow-md">
          <ul className="grid gap-1 text-sm text-card-foreground sm:grid-cols-2">
            {jsTasks.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium text-primary">View all outputs →</p>
        </Card>
      </Link>

      <h2 className="mt-10 text-xl font-semibold text-foreground">Final Project</h2>
      <Link to="/employees">
        <Card className="mt-4 transition-shadow hover:shadow-md">
          <h3 className="font-semibold text-card-foreground">20. Employee Management System</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, Edit, Delete, Search, Filter, validation & error handling
          </p>
        </Card>
      </Link>
    </div>
  );
}
