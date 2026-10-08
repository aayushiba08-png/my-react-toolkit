import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui-kit";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ Accordion — Task 6" },
      { name: "description", content: "FAQ accordion with expand and collapse." },
      { property: "og:title", content: "FAQ Accordion — Task 6" },
      { property: "og:description", content: "FAQ accordion with expand and collapse." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  { q: "What is React?", a: "React is a JavaScript library for building user interfaces using components." },
  { q: "What is a hook?", a: "Hooks like useState and useEffect let function components use state and side effects." },
  { q: "What is JSX?", a: "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript." },
  { q: "What are props?", a: "Props are inputs passed from a parent component to a child component." },
];

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Card title="Task 6: FAQ Accordion">
        <div className="flex flex-col divide-y divide-border">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span className={`transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
