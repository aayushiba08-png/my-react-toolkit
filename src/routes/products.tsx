import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, Input } from "@/components/ui-kit";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Search — Task 3" },
      { name: "description", content: "Product search with category filter and price sorting." },
      { property: "og:title", content: "Product Search — Task 3" },
      { property: "og:description", content: "Product search with category filter and price sorting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 799 },
  { id: 2, name: "Mechanical Keyboard", category: "Electronics", price: 3499 },
  { id: 3, name: "Cotton T-Shirt", category: "Clothing", price: 499 },
  { id: 4, name: "Denim Jeans", category: "Clothing", price: 1499 },
  { id: 5, name: "Coffee Mug", category: "Kitchen", price: 299 },
  { id: 6, name: "Non-stick Pan", category: "Kitchen", price: 1199 },
  { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 2199 },
  { id: 8, name: "Running Shoes", category: "Footwear", price: 2799 },
  { id: 9, name: "Sandals", category: "Footwear", price: 899 },
  { id: 10, name: "Water Bottle", category: "Kitchen", price: 399 },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card title="Task 3: Product Search">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            aria-label="Sort by price"
          >
            <option value="none">Sort: Default</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {results.length === 0 && (
            <li className="py-6 text-center text-sm text-muted-foreground">
              No products match your search.
            </li>
          )}
          {results.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-md border border-border bg-background p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">₹{p.price.toLocaleString("en-IN")}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">{results.length} product(s) found</p>
      </Card>
    </div>
  );
}
