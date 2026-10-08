import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, Input } from "@/components/ui-kit";

export const Route = createFileRoute("/todo")({
  head: () => ({
    meta: [
      { title: "Todo App — Task 2" },
      { name: "description", content: "Todo app with Add, Edit, Delete and Complete." },
      { property: "og:title", content: "Todo App — Task 2" },
      { property: "og:description", content: "Todo app with Add, Edit, Delete and Complete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TodoPage,
});

type Todo = { id: number; text: string; done: boolean };

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React hooks", done: true },
    { id: 2, text: "Build a todo app", done: false },
  ]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((t) => [...t, { id: Date.now(), text: trimmed, done: false }]);
    setText("");
  };

  const deleteTodo = (id: number) => setTodos((t) => t.filter((x) => x.id !== id));

  const toggleTodo = (id: number) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed || editingId === null) return;
    setTodos((t) => t.map((x) => (x.id === editingId ? { ...x, text: trimmed } : x)));
    setEditingId(null);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Card title="Task 2: Todo App">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
            maxLength={200}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {todos.length === 0 && (
            <li className="py-6 text-center text-sm text-muted-foreground">No todos yet. Add one!</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 rounded-md border border-border bg-background p-3"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label="Mark complete"
                className="h-4 w-4 accent-primary"
              />
              {editingId === todo.id ? (
                <>
                  <input
                    className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    maxLength={200}
                    autoFocus
                  />
                  <Button onClick={saveEdit} className="px-2 py-1 text-xs">
                    Save
                  </Button>
                  <Button variant="ghost" onClick={() => setEditingId(null)} className="px-2 py-1 text-xs">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 text-sm ${
                      todo.done ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button variant="ghost" onClick={() => startEdit(todo)} className="px-2 py-1 text-xs">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteTodo(todo.id)} className="px-2 py-1 text-xs">
                    Delete
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          {todos.filter((t) => t.done).length} of {todos.length} completed
        </p>
      </Card>
    </div>
  );
}
