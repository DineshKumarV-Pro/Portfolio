export type EducationEntry = {
  institution: string;
  degree: string;
  field?: string;
  board?: string;
  duration: string;
  status?: "Current" | "Completed";
  coursework?: string[];
  highlights?: string[];
};

export const education: EducationEntry[] = [
  {
    institution: "Alpha College of Engineering",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science and Engineering",
    board: "Anna University",
    duration: "2025 — 2029 (Expected)",
    status: "Current",
    coursework: [
      "Programming Fundamentals",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Software Engineering",
      "Artificial Intelligence",
      "Cloud Computing",
    ],
    highlights: [
      "100% attendance across Semester 1 and Semester 2",
      "Represented Alpha College of Engineering at Chess Zonals",
      "Building production-grade frontend and product projects in parallel with coursework",
      "Self-directed learning across modern web, AI, and product",
    ],
  },
  {
    institution: "Vailankanni Matriculation Higher Secondary School",
    degree: "Higher Secondary Education (Class XII)",
    field: "Biology stream",
    board: "Tamil Nadu State Board",
    duration: "Completed 2025",
    status: "Completed",
    highlights: [
      "100% attendance across Classes X, XI, and XII",
      "Completed schooling in the Biology stream",
      "Developed an independent interest in technology that led to switching tracks to Computer Science",
    ],
  },
  {
    institution: "Vailankanni Matriculation Higher Secondary School",
    degree: "Secondary Education (Class X)",
    board: "Tamil Nadu State Board",
    duration: "Completed 2023",
    status: "Completed",
    highlights: ["Foundation years with consistent academic discipline and full attendance."],
  },
];
