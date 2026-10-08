import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button, Card, Input, Modal } from "@/components/ui-kit";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Employee Management System — Final Project" },
      { name: "description", content: "Add, edit, delete, search and filter employees with validation." },
      { property: "og:title", content: "Employee Management System — Final Project" },
      { property: "og:description", content: "Add, edit, delete, search and filter employees with validation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmployeesPage,
});

const DEPARTMENTS = ["Engineering", "HR", "Sales", "Marketing", "Finance"] as const;
const STORAGE_KEY = "ems-employees";

const employeeSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name too long")
    .regex(/^[a-zA-Z\s.]+$/, "Only letters, spaces and dots allowed"),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  department: z.enum(DEPARTMENTS, { message: "Select a department" }),
  salary: z.coerce.number({ message: "Salary must be a number" })
    .positive("Salary must be greater than 0").max(10000000, "Salary too high"),
});

type Employee = z.infer<typeof employeeSchema> & { id: number };
type FormState = { name: string; email: string; phone: string; department: string; salary: string };
type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: "", email: "", phone: "", department: "", salary: "" };

const SEED: Employee[] = [
  { id: 1, name: "Aarav Sharma", email: "aarav@company.com", phone: "9876543210", department: "Engineering", salary: 85000 },
  { id: 2, name: "Priya Patel", email: "priya@company.com", phone: "9123456780", department: "HR", salary: 55000 },
  { id: 3, name: "Rohan Verma", email: "rohan@company.com", phone: "9988776655", department: "Sales", salary: 60000 },
];

function loadEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED;
  } catch {
    return SEED;
  }
}

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(SEED);
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setEmployees(loadEmployees());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
      setNotice({ type: "error", text: "Could not save data to local storage." });
    }
  }, [employees, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((e) => {
      const matchesSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.phone.includes(q);
      const matchesDept = deptFilter === "All" || e.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, search, deptFilter]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, email: emp.email, phone: emp.phone, department: emp.department, salary: String(emp.salary) });
    setErrors({});
    setModalOpen(true);
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = employeeSchema.safeParse(form);
      if (!result.success) {
        const errs: Errors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof FormState;
          if (!errs[key]) errs[key] = issue.message;
        }
        setErrors(errs);
        return;
      }
      const data = result.data;
      const duplicate = employees.find(
        (x) => x.email.toLowerCase() === data.email.toLowerCase() && x.id !== editingId
      );
      if (duplicate) {
        setErrors({ email: "An employee with this email already exists" });
        return;
      }
      if (editingId !== null) {
        setEmployees((list) => list.map((x) => (x.id === editingId ? { ...data, id: editingId } : x)));
        setNotice({ type: "success", text: `${data.name} updated successfully.` });
      } else {
        setEmployees((list) => [...list, { ...data, id: Date.now() }]);
        setNotice({ type: "success", text: `${data.name} added successfully.` });
      }
      setModalOpen(false);
    } catch (err) {
      setNotice({ type: "error", text: err instanceof Error ? err.message : "Unexpected error occurred." });
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setEmployees((list) => list.filter((x) => x.id !== deleteTarget.id));
    setNotice({ type: "success", text: `${deleteTarget.name} deleted.` });
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employee Management System</h1>
          <p className="text-sm text-muted-foreground">{employees.length} total employees</p>
        </div>
        <Button onClick={openAdd}>+ Add Employee</Button>
      </div>

      {notice && (
        <div
          className={`mb-4 rounded-md border p-3 text-sm ${
            notice.type === "success" ? "border-border bg-secondary text-secondary-foreground" : "border-destructive text-destructive"
          }`}
          role="status"
        >
          {notice.text}
        </div>
      )}

      <Card>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Input placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} maxLength={100} />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            aria-label="Filter by department"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Phone</th>
                <th className="py-2 pr-3">Department</th>
                <th className="py-2 pr-3">Salary</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">No employees found.</td>
                </tr>
              )}
              {filtered.map((emp) => (
                <tr key={emp.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-medium text-foreground">{emp.name}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{emp.email}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{emp.phone}</td>
                  <td className="py-3 pr-3"><span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{emp.department}</span></td>
                  <td className="py-3 pr-3 text-foreground">₹{emp.salary.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => openEdit(emp)}>Edit</Button>
                      <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => setDeleteTarget(emp)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Employee" : "Add Employee"}>
        <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
          <Input id="emp-name" label="Name" value={form.name} error={errors.name} onChange={(e) => update("name", e.target.value)} />
          <Input id="emp-email" label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => update("email", e.target.value)} />
          <Input id="emp-phone" label="Phone" value={form.phone} error={errors.phone} maxLength={10} onChange={(e) => update("phone", e.target.value)} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="emp-dept" className="text-sm font-medium text-foreground">Department</label>
            <select
              id="emp-dept"
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              className={`rounded-md border bg-background px-3 py-2 text-sm ${errors.department ? "border-destructive" : "border-input"}`}
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
            {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
          </div>
          <Input id="emp-salary" label="Salary (₹)" type="number" value={form.salary} error={errors.salary} onChange={(e) => update("salary", e.target.value)} />
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingId ? "Save Changes" : "Add Employee"}</Button>
          </div>
        </form>
      </Modal>

      <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="Delete Employee">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <strong className="text-foreground">{deleteTarget?.name}</strong>? This cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
