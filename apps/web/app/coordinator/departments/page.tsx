"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Building2, Plus } from "lucide-react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/coordinator/departments", { credentials: "include" })
      .then((r) => r.ok ? r.json() : [])
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Departments"
        description="Manage academic departments in your institution"
        breadcrumb={[{ label: "Coordinator" }, { label: "Departments" }]}
        action={
          <Button variant="primary" size="md" leftIcon={<Plus size={15} />}>
            Add Department
          </Button>
        }
      />

      <Card padding="none">
        <DataTable
          columns={[
            { key: "name", header: "Department Name", render: (r) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                  <Building2 size={14} className="text-indigo-400" />
                </div>
                <span className="font-medium text-white">{r.name}</span>
              </div>
            )},
            { key: "code", header: "Code", render: (r) => (
              <code className="text-xs bg-slate-100 border border-slate-300 px-2 py-1 rounded-lg text-slate-300">{r.code}</code>
            )},
            { key: "programs", header: "Programs", render: () => "—" },
            { key: "students", header: "Students",  render: () => "—" },
            { key: "status",   header: "Status",    render: () => <StatusBadge status="active" label="Active" /> },
            { key: "actions",  header: "", render: () => (
              <Button variant="ghost" size="sm">Edit</Button>
            )},
          ]}
          data={departments}
          keyField="id"
          loading={loading}
          emptyMessage="No departments yet. Add your first department."
          emptyIcon={<Building2 size={32} />}
        />
      </Card>
    </div>
  );
}
