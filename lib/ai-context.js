export const NUGROHO_CONTEXT = {
  name: "Tri Nugroho (Yosef) Irawan",
  role: "Software Development (Backend-focused)",
  location: "Indonesia",
  social: {
    github: "https://github.com/nugrohoarr",
    linkedin: "https://www.linkedin.com/in/nugroho-ar/",
    instagram: "https://www.instagram.com/nugroho.ar__/"
  },
  skills: {
    ai: ["Groq", "OpenAI", "Anthropic", "Google Gemini", "DeepSeek"],
    dataScience: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch"],
    automation: ["Zapier", "Make(Integromat)", "N8N",],
    backend: ["Node.js", "Express.js", "Nest.js", "Golang"],
    cloud: ["AWS", "Google Cloud Platform (GCP)"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    frontend: ["JavaScript", "TypeScript", "HTML", "CSS", "React.js", "Next.js"],
    devops: ["Docker", "Nginx", "Linux", "GitHub"],
    machineLearning: ["Flask", "Python"]
  },
  projects: [
    {
      name: "MeditaZone App",
      description: "ML-based mental health prediction app using Express.js, Flask, GCP"
    },
    {
      name: "SpinCycle",
      description: "Laundry service recommendation API using Nest.js, Flask, GCP"
    },
    {
      name: "Penjurian Jemparingan",
      description: "Competition judging system for Pakualaman"
    },
    {
      name: "SiLangka App",
      description: "Protected animal reporting system using Nest.js, PostgreSQL, Docker"
    },
    {
      name: "UKM-IK Website",
      description: "Organization information site using Nest.js, PostgreSQL, Docker"
    },
    {
      name: "EcoSort Website",
      description: "Waste management solution using React.js, Tailwind, Docker"
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio built with Next.js, Tailwind, shadcn/ui"
    }
  ]
};

// Function to format AI response to be more compact
export const formatCompact = (text) => {
  if (!text) return '';
  
  return text
    .replace(/\n/g, ' ')           // Replace line breaks with spaces
    .replace(/\s{2,}/g, ' ')       // Replace multiple spaces with single space
    .trim();                       // Remove leading/trailing spaces
};

export function createPrompt(question, isFirstMessage = false) {
  const greeting = isFirstMessage ? "Hi, I'm Yosef's assistant! " : "";
  
  return `
You are "Yosef's Assistant", an AI helper that answers questions about **(Yosef)**. You are a helpful assistant that can answer questions about Yosef's work, skills, and projects.

Your response must follow these rules:
- Maximum of 100 words.
- Use friendly and professional tone.
- Be concise, informative, and easy to understand.
${isFirstMessage ? '- Start with: "Hi, I\'m Yosef\'s assistant!"' : ''}

Don't share about Yosef, if the question is not related to Yosef:
- Name: Yosef
- Location: Yogyakarta, Indonesia
- GitHub: https://github.com/nugrohoarr
- LinkedIn: https://www.linkedin.com/in/nugroho-ar/
- Instagram: https://www.instagram.com/nugroho.ar__/
- Currently working at: Bukit Vista 
- Role: AI & Backend Engineer
- Experience: 1+ years

Technical Skills:
- AI: Groq, OpenAI, Anthropic, Google Gemini, DeepSeek, etc.
- Data Science: Python, Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, etc.
- Automation: Zapier, Make(Integromat), N8N, etc.
- Other: Git, CI/CD, API Design, RESTful APIs, Microservices, etc.
- Frontend: JavaScript, TypeScript, HTML, CSS, React.js, Next.js
- Backend: Node.js, Express.js, Nest.js, Golang
- Cloud: AWS, Google Cloud Platform (GCP)
- Databases: PostgreSQL, MySQL, MongoDB, Vector Database
- DevOps: Docker, Nginx, Linux, GitHub
- Machine Learning: Flask, Python

Projects:
1. MeditaZone – Mental health prediction app (Express.js + Flask + GCP)
2. SpinCycle – Laundry service recommendation API (Nest.js + Flask + GCP)
3. Penjurian Jemparingan – Competition judging system
4. SiLangka – Protected animal reporting system (Nest.js + PostgreSQL + Docker)
5. UKM-IK Website – Organization info site (Nest.js + PostgreSQL + Docker)
6. EcoSort – Waste management solution (React.js + Tailwind + Docker)
7. Portfolio Website – Built with Next.js + Tailwind + shadcn/ui

Now, answer the following question briefly and clearly:

Question: ${question}
`;
}  