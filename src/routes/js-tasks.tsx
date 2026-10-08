import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui-kit";
import {
  reverseString,
  findDuplicates,
  secondLargest,
  charFrequency,
  uniquePreserveOrder,
  myMap,
  myFilter,
} from "@/lib/js-tasks";

export const Route = createFileRoute("/js-tasks")({
  head: () => ({
    meta: [
      { title: "JavaScript Tasks 8–14 — Code & Output" },
      { name: "description", content: "JavaScript algorithm tasks with code and live output." },
      { property: "og:title", content: "JavaScript Tasks 8–14 — Code & Output" },
      { property: "og:description", content: "JavaScript algorithm tasks with code and live output." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JsTasksPage,
});

const tasks = [
  {
    title: "8. Reverse a string without reverse()",
    code: `function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}
reverseString("hello world");`,
    output: reverseString("hello world"),
  },
  {
    title: "9. Find duplicate values",
    code: `function findDuplicates(arr) {
  const seen = new Set(), dupes = new Set();
  for (const item of arr) seen.has(item) ? dupes.add(item) : seen.add(item);
  return [...dupes];
}
findDuplicates([1, 2, 3, 2, 4, 5, 1, 6, 5]);`,
    output: findDuplicates([1, 2, 3, 2, 4, 5, 1, 6, 5]),
  },
  {
    title: "10. Second-largest number",
    code: `function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const n of arr) {
    if (n > first) { second = first; first = n; }
    else if (n > second && n < first) second = n;
  }
  return second === -Infinity ? null : second;
}
secondLargest([10, 45, 32, 45, 8, 27]);`,
    output: secondLargest([10, 45, 32, 45, 8, 27]),
  },
  {
    title: "11. Character frequency",
    code: `function charFrequency(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}
charFrequency("banana");`,
    output: charFrequency("banana"),
  },
  {
    title: "12. Remove duplicates (preserve order)",
    code: `function uniquePreserveOrder(arr) {
  const seen = new Set(), result = [];
  for (const item of arr) if (!seen.has(item)) { seen.add(item); result.push(item); }
  return result;
}
uniquePreserveOrder([3, 1, 3, 2, 1, 4, 2]);`,
    output: uniquePreserveOrder([3, 1, 3, 2, 1, 4, 2]),
  },
  {
    title: "13. Custom map()",
    code: `function myMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) result.push(fn(arr[i], i));
  return result;
}
myMap([1, 2, 3, 4], (x) => x * 2);`,
    output: myMap([1, 2, 3, 4], (x) => x * 2),
  },
  {
    title: "14. Custom filter()",
    code: `function myFilter(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) if (fn(arr[i], i)) result.push(arr[i]);
  return result;
}
myFilter([1, 2, 3, 4, 5, 6], (x) => x % 2 === 0);`,
    output: myFilter([1, 2, 3, 4, 5, 6], (x) => x % 2 === 0),
  },
];

function JsTasksPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">JavaScript Tasks — Code & Output</h1>
      {tasks.map((t) => (
        <Card key={t.title} title={t.title}>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs text-foreground">
            <code>{t.code}</code>
          </pre>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output</p>
          <pre className="mt-1 overflow-x-auto rounded-md border border-border bg-background p-3 text-sm text-primary">
            {JSON.stringify(t.output)}
          </pre>
        </Card>
      ))}
    </div>
  );
}
