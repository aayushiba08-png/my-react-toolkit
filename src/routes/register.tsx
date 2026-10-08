import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button, Card, Input } from "@/components/ui-kit";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registration Form — Task 4" },
      { name: "description", content: "Registration form with name, email, phone and password validation." },
      { property: "og:title", content: "Registration Form — Task 4" },
      { property: "og:description", content: "Registration form with full validation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be under 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string().trim().email("Enter a valid email address").max(255),
    phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;
const empty: FormData = { name: "", email: "", phone: "", password: "", confirmPassword: "" };

function RegisterPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [success, setSuccess] = useState<string | null>(null);

  const update = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Partial<Record<keyof FormData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setSuccess(`Welcome, ${result.data.name}! Registration successful.`);
    setForm(empty);
    setErrors({});
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card title="Task 4: Registration Form">
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Input id="name" label="Name" value={form.name} error={errors.name} onChange={(e) => update("name", e.target.value)} />
          <Input id="email" label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => update("email", e.target.value)} />
          <Input id="phone" label="Phone" type="tel" value={form.phone} error={errors.phone} onChange={(e) => update("phone", e.target.value)} maxLength={10} />
          <Input id="password" label="Password" type="password" value={form.password} error={errors.password} onChange={(e) => update("password", e.target.value)} />
          <Input id="confirm" label="Confirm Password" type="password" value={form.confirmPassword} error={errors.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
          <Button type="submit">Register</Button>
          {success && (
            <p className="rounded-md bg-secondary p-3 text-sm text-secondary-foreground">{success}</p>
          )}
        </form>
      </Card>
    </div>
  );
}
