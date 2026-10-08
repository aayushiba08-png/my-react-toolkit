import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Braces, CheckSquare, Code2, Component, Hash, HelpCircle, Search, UserRoundPlus, Users, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Aayushi Rajput | React & JavaScript" },
      { name: "description", content: "Aayushi Rajput's dashboard for seven React tasks, seven JavaScript exercises, and the Employee Management final project." },
      { property: "og:title", content: "Aayushi Rajput — Practice Dashboard" },
      { property: "og:description", content: "React tasks, JavaScript exercises with outputs, and an Employee Management System." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const reactTasks: { to: "/counter" | "/todo" | "/products" | "/register" | "/components" | "/faq" | "/users"; title: string; desc: string; icon: LucideIcon }[] = [
  { to: "/counter", title: "Counter App", desc: "Increment, Decrement, Reset", icon: Hash },
  { to: "/todo", title: "Todo App", desc: "Add, Edit, Delete, Complete", icon: CheckSquare },
  { to: "/products", title: "Product Search", desc: "Search, Category filter, Price sort", icon: Search },
  { to: "/register", title: "Registration Form", desc: "Name, Email, Phone, Password validation", icon: UserRoundPlus },
  { to: "/components", title: "Reusable Components", desc: "Button, Input, Card, Modal", icon: Component },
  { to: "/faq", title: "FAQ Accordion", desc: "Expand & Collapse", icon: HelpCircle },
  { to: "/users", title: "API Users", desc: "Loading, Error, Empty states", icon: Users },
];

const jsTasks = [
  "Reverse a string (no reverse())",
  "Find duplicates in an array",
  "Second-largest number",
  "Character frequency count",
  "Remove duplicates (keep order)",
  "Custom map()",
  "Custom filter()",
];

function SectionHeading({ title, count }: { title: string; count: string }) {
  return <div className="mb-5 flex items-center gap-4">
    <h2 className="shrink-0 text-base font-bold uppercase text-workspace-ink">{title}</h2>
    <div className="h-px flex-1 bg-workspace-border" />
    <span className="shrink-0 text-xs font-medium text-workspace-muted">{count}</span>
  </div>;
}

function Index() {
  return (
    <main className="practice-dashboard min-h-screen bg-workspace text-workspace-ink">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
        <header className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-workspace-primary"><Code2 size={17} aria-hidden="true" /> PRACTICE WORKSPACE</div>
            <h1 className="text-3xl font-bold leading-tight">React & JavaScript Practice Tasks</h1>
            <p className="mt-3 text-sm text-workspace-muted">Welcome back, <span className="font-semibold text-workspace-primary">Aayushi Rajput</span>.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-workspace-border bg-workspace-card px-4 py-2 text-xs font-medium text-workspace-muted md:self-auto">
            <span className="h-2 w-2 rounded-full bg-workspace-success" />Project Dashboard
          </div>
        </header>

        <section className="mb-10" aria-label="React tasks">
          <SectionHeading title="React Tasks" count="7 tasks" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reactTasks.map((task, index) => (
              <Link key={task.to} to={task.to} className="practice-task group rounded-lg border border-workspace-border bg-workspace-card p-6 hover:border-workspace-primary/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-primary">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-workspace-primary">{String(index + 1).padStart(2, "0")}</span>
                  <task.icon size={21} strokeWidth={1.6} className="text-workspace-muted group-hover:text-workspace-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold group-hover:text-workspace-primary">{task.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-workspace-muted">{task.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-label="JavaScript tasks">
          <SectionHeading title="JavaScript Tasks" count="7 exercises" />
          <div className="bg-workspace-console px-6 py-7 text-workspace-console-ink sm:px-8">
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-workspace-console-muted"><Braces size={18} aria-hidden="true" /> EXERCISES 08–14</div>
            <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
              {jsTasks.map((task, index) => (
                <Link key={task} to="/js-tasks" className="group flex min-w-0 items-center gap-3 rounded-sm text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-console-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-workspace-console-ink/10 text-xs font-semibold text-workspace-console-muted">{String(index + 8).padStart(2, "0")}</span>
                  <span className="group-hover:underline">{task}</span>
                </Link>
              ))}
              <Link to="/js-tasks" className="flex items-center gap-2 text-sm font-semibold text-workspace-console-muted hover:text-workspace-console-ink">View all outputs <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section aria-label="Final project">
          <SectionHeading title="Final Capstone" count="Project 20" />
          <Link to="/employees" className="practice-task group block rounded-lg border border-workspace-border bg-workspace-card p-6 hover:border-workspace-primary sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-workspace-soft px-3 py-1 text-xs font-bold text-workspace-primary">Project 20</span>
                <h3 className="mt-4 text-2xl font-bold">Employee Management System</h3>
              </div>
              <Users className="mt-2 hidden shrink-0 text-workspace-primary/25 sm:block" size={56} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-workspace-muted">Add, edit, delete, search and filter employees with full validation and error handling.</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">{["CRUD", "Validation", "Filters"].map(label => <span key={label} className="rounded border border-workspace-border bg-workspace px-3 py-1 text-xs font-medium text-workspace-muted">{label}</span>)}</div>
              <span className="flex items-center gap-2 text-sm font-semibold text-workspace-primary">Open project <ArrowUpRight size={17} aria-hidden="true" /></span>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
