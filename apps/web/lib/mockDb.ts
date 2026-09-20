export const MOCK_DB = {
  users: [
    { id: "1", email: "student@astra.edu", roles: ["STUDENT"], tenantName: "Astra Institute of Technology" },
    { id: "2", email: "alan@astra.edu", roles: ["TEACHER"], tenantName: "Astra Institute of Technology" },
    { id: "3", email: "coord@astra.edu", roles: ["COORDINATOR"], tenantName: "Astra Institute of Technology" },
    { id: "4", email: "owner@platform.io", roles: ["PLATFORM_OWNER"], tenantName: "LMS Platform" },
  ],
  students: [
    { id: "s1", firstName: "Alex", lastName: "Student", studentIdStr: "AIT-001", email: "student@astra.edu", status: "ACTIVE", enrollments: [] },
    { id: "s2", firstName: "Sarah", lastName: "Connor", studentIdStr: "AIT-002", email: "sarah@astra.edu", status: "ACTIVE", enrollments: [] },
    { id: "s3", firstName: "John", lastName: "Doe", studentIdStr: "AIT-003", email: "john@astra.edu", status: "ACTIVE", enrollments: [] },
  ],
  teacherClasses: [
    { id: "c1", term: "Fall 2026", course: { name: "Data Structures", code: "CS102" }, class: { name: "Class II-B" } },
    { id: "c2", term: "Fall 2026", course: { name: "Machine Learning", code: "CS301" }, class: { name: "Class III-A" } },
  ],
  studentCourses: [
    { id: "c1", term: "Fall 2026", course: { name: "Data Structures", code: "CS102" }, teacherAssignments: [{ teacher: { firstName: "Alan", lastName: "Turing" } }] },
    { id: "c2", term: "Fall 2026", course: { name: "Machine Learning", code: "CS301" }, teacherAssignments: [{ teacher: { firstName: "Alan", lastName: "Turing" } }] },
  ],
  assignments: [
    { 
      id: "a1", 
      title: "Binary Tree Inversion", 
      description: "Given the root of a binary tree, invert the tree, and return its root.\n\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]", 
      language: "python", 
      courseOffering: { course: { name: "Data Structures" }, class: { name: "Class II-B" } }, 
      submissions: [],
      _count: { submissions: 4 }
    }
  ]
};
