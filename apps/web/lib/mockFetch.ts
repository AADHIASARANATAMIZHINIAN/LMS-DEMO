"use client";
import { MOCK_DB } from "./mockDb";

const originalFetch = typeof window !== 'undefined' ? window.fetch : null;

if (typeof window !== 'undefined') {
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    
    // Only intercept API calls
    if (!url.includes('/api/')) {
      return originalFetch!(input, init);
    }

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    await delay(300); // Simulate network latency

    const createResponse = (data: any) => new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    // ---------------------------------------------------------
    // AUTHENTICATION
    // ---------------------------------------------------------
    if (url.includes('/api/auth/login')) {
      const body = JSON.parse(init?.body as string || '{}');
      const user = MOCK_DB.users.find(u => u.email === body.email);
      if (user) {
        if (typeof window !== 'undefined') localStorage.setItem('demo_session', JSON.stringify(user));
        return createResponse({ success: true, user });
      }
      return new Response("Unauthorized", { status: 401 });
    }

    if (url.includes('/api/auth/me')) {
      if (typeof window === 'undefined') return new Response("Unauthorized", { status: 401 });
      const session = localStorage.getItem('demo_session');
      if (session) return createResponse(JSON.parse(session));
      return new Response("Unauthorized", { status: 401 });
    }

    if (url.includes('/api/auth/logout')) {
      if (typeof window !== 'undefined') localStorage.removeItem('demo_session');
      return createResponse({ success: true });
    }

    // ---------------------------------------------------------
    // COORDINATOR
    // ---------------------------------------------------------
    if (url.includes('/api/coordinator/stats')) {
      return createResponse({ departments: 2, students: 120, teachers: 8, classes: 4 });
    }
    if (url.includes('/api/coordinator/students')) {
      if (init?.method === 'POST') {
        const body = JSON.parse(init?.body as string);
        const newStudent = { id: Math.random().toString(), ...body, enrollments: [] };
        MOCK_DB.students.push(newStudent);
        return createResponse(newStudent);
      }
      return createResponse(MOCK_DB.students);
    }

    // ---------------------------------------------------------
    // TEACHER
    // ---------------------------------------------------------
    if (url.includes('/api/teacher/classes')) {
      return createResponse(MOCK_DB.teacherClasses);
    }
    if (url.includes('/api/teacher/assignments')) {
      if (init?.method === 'POST') {
        const body = JSON.parse(init?.body as string);
        const newAssn = { 
          id: Math.random().toString(), 
          ...body, 
          courseOffering: MOCK_DB.teacherClasses.find(c => c.id === body.courseOfferingId),
          _count: { submissions: 0 } 
        };
        MOCK_DB.assignments.unshift(newAssn);
        return createResponse(newAssn);
      }
      return createResponse(MOCK_DB.assignments);
    }

    // ---------------------------------------------------------
    // STUDENT
    // ---------------------------------------------------------
    if (url.includes('/api/student/courses')) {
      return createResponse(MOCK_DB.studentCourses);
    }
    if (url.includes('/api/student/assignments') && !url.includes('/submit')) {
      return createResponse(MOCK_DB.assignments);
    }
    if (url.includes('/submit')) {
      const body = JSON.parse(init?.body as string);
      const isSuccess = !body.code.includes("error");
      return createResponse({
        status: isSuccess ? "COMPLETED" : "ERROR",
        score: isSuccess ? 100 : 80,
        executionMs: 420,
        outputLog: isSuccess ? "All tests passed successfully in 0.42s" : "SyntaxError: unexpected EOF"
      });
    }

    // ---------------------------------------------------------
    // EXECUTION ENGINE
    // ---------------------------------------------------------
    if (url.includes('/api/execution/run')) {
      const body = JSON.parse(init?.body as string);
      if (body.type === 'practice') {
        let output = "Execution completed successfully in 0.1s.";
        if (body.code.includes('print')) {
          const match = body.code.match(/print\(['"](.*?)['"]\)/);
          if (match) output = match[1] + "\n\n" + output;
        }
        if (body.code.includes('error')) return createResponse({ status: 'error', output: 'SyntaxError: unexpected EOF' });
        return createResponse({ status: 'success', output });
      }
    }

    return createResponse([]);
  };
}
