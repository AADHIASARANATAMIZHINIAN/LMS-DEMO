"use client";
import { MOCK_DB } from "./mockDb";

const originalFetch = typeof window !== "undefined" ? window.fetch.bind(window) : null;

if (typeof window !== "undefined") {
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (!url.includes("/api/")) return originalFetch!(input, init);

    await new Promise(r => setTimeout(r, 200 + Math.random() * 200));
    const ok = (data: any) => new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
    const method = init?.method?.toUpperCase() ?? "GET";

    // ── Auth ────────────────────────────────────────────────
    if (url.includes("/api/auth/login")) {
      const body = JSON.parse(init?.body as string ?? "{}");
      const user = MOCK_DB.users.find(u => u.email === body.email);
      if (user) { localStorage.setItem("demo_session", JSON.stringify(user)); return ok({ success: true, user }); }
      return new Response("Unauthorized", { status: 401 });
    }
    if (url.includes("/api/auth/me")) {
      const s = localStorage.getItem("demo_session");
      return s ? ok(JSON.parse(s)) : new Response("Unauthorized", { status: 401 });
    }
    if (url.includes("/api/auth/logout")) { localStorage.removeItem("demo_session"); return ok({ success: true }); }

    // ── Coordinator ─────────────────────────────────────────
    if (url.includes("/api/coordinator/stats")) return ok(MOCK_DB.coordinatorStats);
    if (url.includes("/api/coordinator/students")) {
      if (method === "POST") {
        const body = JSON.parse(init?.body as string ?? "{}");
        const s = { id: `s${Date.now()}`, ...body, status: "ACTIVE", gpa: 0, enrollments: [] };
        MOCK_DB.students.push(s); return ok(s);
      }
      return ok(MOCK_DB.students);
    }
    if (url.includes("/api/coordinator/departments")) {
      return ok([
        { id: "d1", name: "School of Computer Science",        head: "Dr. Alan Turing",  courses: 12, students: 680 },
        { id: "d2", name: "School of Electrical Engineering",  head: "Dr. Nikola Tesla", courses: 8,  students: 420 },
      ]);
    }

    // ── Teacher ─────────────────────────────────────────────
    if (url.includes("/api/teacher/classes")) return ok(MOCK_DB.teacherClasses);
    if (url.includes("/api/teacher/assignments")) {
      if (method === "POST") {
        const body = JSON.parse(init?.body as string ?? "{}");
        const a = { id: `a${Date.now()}`, ...body, submitted: 0, total: 38, avgScore: 0,
          courseOffering: MOCK_DB.teacherClasses.find(c => c.id === body.courseOfferingId), _count: { submissions: 0 } };
        MOCK_DB.assignments.unshift(a); return ok(a);
      }
      return ok(MOCK_DB.assignments);
    }

    // ── Student ─────────────────────────────────────────────
    if (url.includes("/api/student/courses")) return ok(MOCK_DB.studentCourses);
    if (url.includes("/api/student/assignments") && !url.includes("/submit")) return ok(MOCK_DB.assignments);
    if (url.includes("/submit")) {
      const body = JSON.parse(init?.body as string ?? "{}");
      const pass = body.code && body.code.length > 10 && !body.code.toLowerCase().includes("syntax error");
      return ok({ status: pass ? "COMPLETED" : "ERROR", score: pass ? 100 : 60,
        executionMs: 380 + Math.floor(Math.random() * 200),
        outputLog: pass ? "All test cases passed successfully." : "SyntaxError: unexpected EOF" });
    }

    // ── Execution ────────────────────────────────────────────
    if (url.includes("/api/execution/run")) {
      const body = JSON.parse(init?.body as string ?? "{}");
      if (body.code?.toLowerCase().includes("error") || body.code?.toLowerCase().includes("undefined")) {
        return ok({ status: "error", output: "NameError: name 'undefined_var' is not defined\n  File \"main.py\", line 3" });
      }
      let output = "";
      const printMatch = body.code?.match(/print\s*\(\s*['"](.+?)['"]\s*\)/g);
      if (printMatch) output = printMatch.map((m: string) => m.replace(/print\s*\(\s*['"](.+?)['"]\s*\)/, "$1")).join("\n") + "\n";
      else output = `Program executed successfully in ${200 + Math.floor(Math.random() * 300)}ms.\nProcess exited with code 0.`;
      return ok({ status: "success", output });
    }

    // ── Owner ────────────────────────────────────────────────
    if (url.includes("/api/owner/tenants")) {
      if (method === "POST") return ok({ id: `t${Date.now()}`, ...JSON.parse(init?.body as string ?? "{}"), status: "ACTIVE" });
      return ok([
        { id: "t1", name: "Astra Institute of Technology", domain: "astra.edu",      plan: "Professional", seatsUsed: 600,  seatsTotal: 600,  mrr: 12000, status: "ACTIVE", expiry: "2027-06-30" },
        { id: "t2", name: "Global Tech University",         domain: "globaltech.edu", plan: "Enterprise",   seatsUsed: 647, seatsTotal: 1200, mrr: 12800, status: "ACTIVE", expiry: "2027-12-31" },
      ]);
    }

    return ok([]);
  };
}
