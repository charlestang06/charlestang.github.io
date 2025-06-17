import { GitHubIcon, LinkedInIcon } from "@/components/icons";
export const RESUME_DATA = {
  name: "Charles Tang",
  initials: "CT",
  location: "Massachusetts, USA",
  locationLink: "https://www.google.com/maps/place/Massachusetts",
  about: "CS & Applied Math at Brown University",
  summary:
    "I am student at Brown University, pursuing an interest in Applied Mathematics and Computer Science. I am interested in software engineering (full-stack, back-end, DevOps). This summer, I will be joining Cisco Meraki in San Francisco as a Software Engineering Intern.",
  djSummary:
    "I'm currently a DJ spinning the latest tracks in the Boston/Providence area. I started in December 2023 to mix for my friends and began to get into house, pop, and hip-hop music.",
  avatarUrl: "pfp.jpg",
  djAvatarUrl: "https://charlestang06.github.io/photos/IMG_0710.JPEG",
  personalWebsiteUrl: "https://charlestang.dev",
  resumeUrl: "Charles_Tang_resume.pdf",
  contact: {
    email: "charles_tang@brown.edu",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/charlestang06",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/charlestang06/",
        icon: LinkedInIcon,
      },
    ],
    dj: {
      name: "DJ",
      url: "/dj",
    },
  },
  education: [
    {
      school: "Brown University",
      degree: "Bachelor's Degree in Computer Science & Applied Mathematics",
      coursework:
        "Stochastic Optimization, Operations Research, Data Structures & Algorithms, Machine Learning",
      gpa: "4.0",
      start: "2023",
      end: "(2027)",
    },
  ],
  work: [
    {
      company: "Cisco Meraki",
      link: "https://meraki.cisco.com/",
      badges: ["San Francisco, CA"],
      title: "Software Engineering Intern",
      start: "May 2025",
      end: "Aug. 2025",
      description:
        "E2E testing library for Meraki's cloud-managed switches platform.",
    },
    {
      company: "Full Stack @ Brown",
      link: "https://www.fullstackatbrown.com/",
      badges: ["Providence, RI"],
      title: "Project Manager",
      start: "Aug. 2024",
      end: "Dec. 2024",
      description: "Led team developers to create app for NECYSC.",
    },
    {
      company: "BJ's Wholesale Club",
      link: "https://bjs.com",
      badges: ["Marlborough, MA"],
      title: "Data Science Intern",
      start: "Jun. 2024",
      end: "Aug. 2024",
      description:
        "Optimizing warehouse operations with math modeling and software engineering.",
    },
    {
      company: "IOMICS Corporation",
      link: "https://iomics.us/",
      badges: ["Cambridge, MA"],
      title: "Software Engineering Intern",
      start: "Dec. 2023",
      end: "Aug. 2024",
      description: "Developed a AI applications (RAG/chatbot apps).",
    },
    {
      company: "Iridium Tutoring",
      link: "https://iridiumtutoring.com/",
      badges: ["Southborough, MA"],
      title: "Founder & Lead Director",
      start: "2020",
      end: "2024",
      description: `
       Founded and led a 501c3 organization providing free tutoring.`,
    },
  ],
  skills: [
    "Python",
    "JavaScript",
    "Java",
    "HTML/CSS",
    "MATLAB",
    "Linux",
    "REST APIs",
    "LaTeX",
    "MySQL/PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "Postman",
    "VS Code",
    "NodeJS",
    "Firebase",
    "Profilers (Scalene)",
    "Bootstrap",
    "Django",
    "React.js",
    "Next.js",
    "Pandas",
    "Sklearn",
    "Tensorflow",
    "LangChain",
    "Computer Vision Toolbox",
    "OR Tools",
    "FastAPI",
  ],
  projects: [
    {
      title: "MAMS SISO",
      techStack: [
        "ReactJS",
        "NodeJS",
        "ExpressJS",
        "MySQL",
        "Raspberry Pi",
        "Python",
      ],
      description: "A digital student attendance system",
      link: {
        label: "mams-siso.wpi.edu",
        href: "https://mams-siso.wpi.edu",
      },
      production: true,
    },
    {
      title: "NECYSC Camp App",
      techStack: ["Django", "MySQL", "Bootstrap", "AWS"],
      description: "A summer camp management system",
      link: {
        label: "github.com/fullstackatbrown/project-necysc",
        href: "https://github.com/fullstackatbrown/project-necysc",
      },
      production: true,
    },
    {
      title: "Finsight (FinnAI)",
      techStack: ["LangChain", "FastAPI", "ReactJS", "Ant-Design", "Firebase"],
      description: "Financial market AI RAG app with dashboard UI",
      link: {
        label: "github.com/charlestang06/finsight",
        href: "https://github.com/charlestang06/finsight",
      },
      production: false,
    },
    {
      title: "Iridium Tutoring Portal",
      techStack: ["Django", "MySQL", "Bootstrap", "CPanel"],
      description: "B2C tutoring portal for students and tutors",
      link: {
        label: "github.com/charlestang06/iridisite",
        href: "https://github.com/charlestang06/iridisite",
      },
      production: true,
    },
    {
      title: "Proj-X",
      techStack: ["Firebase", "ExpressJS", "ReactJS", "NodeJS", "Ant-Design"],
      description: "Career advancement with micro-projx",
      link: {
        label: "projx-hbp.web.app",
        href: "https://projx-hbp.web.app",
      },
      production: false,
    },
    {
      title: "WPI Roadmap",
      techStack: ["Firebase", "ExpressJS", "ReactJS", "NodeJS", "Ant-Design"],
      description: "Academic planner (2024 WPI GoatHacks Winner)",
      link: {
        label: "roadmap-wpi.web.app",
        href: "https://roadmap-wpi.web.app",
      },
      production: false,
    },
    {
      title: "Pantry Access",
      techStack: ["ReactJS", "HTML/CSS", "MUI", "Firebase"],
      description: "Food pantry management system",
      link: {
        label: "pantryaccess.web.app",
        href: "https://pantryaccess.web.app",
      },
      production: false,
    },
    {
      title: "Buzz Board",
      techStack: ["NextJS", "Supabase", "Vercel"],
      description: "Social leaderboard for students",
      link: {
        label: "buzz-leaderboard.vercel.app",
        href: "https://buzz-leaderboard.vercel.app/",
      },
      production: false,
    },
    {
      title: "Mortgage Markets",
      techStack: ["Python", "Pandas", "Streamlit"],
      description: "Identifying trends in mortgage discrimination",
      link: {
        label: "hmda-visualization.streamlit.app",
        href: "https://hmda-visualization.streamlit.app/",
      },
      production: true,
    },
    {
      title: "Cafe Providence",
      techStack: ["NextJS", "HeroUI", "Vercel"],
      description: "Recommending cafes in Providence",
      link: {
        label: "cafe-providence.vercel.app/",
        href: "https://cafe-providence.vercel.app/",
      },
      production: false,
    },
    {
      title: "Cyclist Detection",
      techStack: ["Python", "Rasbperry Pi", "Tensorflow Lite"],
      description: "SOTA vision-based cyclist detection model",
      link: {
        label: "arXiv",
        href: "https://arxiv.org/abs/2303.11223",
      },
      production: false,
    },
  ],
  papers: [
    {
      title: "Food Web & Agriculture",
      awards: ["Pending submission"],
      description: "Math modeling paper written for 2025 MCM/ICM contest",
      link: {
        label: "paper",
        href: "/2025_MCM.pdf",
      },
    },
    {
      title: "March Madness",
      awards: ["Outstanding Winner (1st/22)"],
      description: "Math modeling paper written for 2024 Brown MCM contest",
      link: {
        label: "paper",
        href: "/Team_01_BMCM_Final_Paper.pdf",
      },
    },
    {
      title: "Dandelion Populations",
      awards: ["USA Outstanding Winner (1st/967)", "NCTM Award"],
      description: "Math modeling paper written for 2023 HiMCM challenge",
      link: {
        label: "paper",
        href: "HiMCM2023.pdf",
      },
    },
    {
      title: "MA Mortgage Markets",
      awards: ["ECON 3130"],
      description: "Logit regression analysis of discrimination (ECON 3130)",
      link: {
        label: "paper",
        href: "ECON3130_Paper.pdf",
      },
    },
    {
      title: "Land Use Analysis",
      awards: ["Intl. Meritorious (Top 6)"],
      description: "Math modeling paper written for 2023 IMMC challenge",
      link: {
        label: "paper",
        href: "2023_IM2C_12519_Solution.pdf",
      },
    },
    {
      title: "Honeybee Populations",
      awards: ["USA Finalist (Top 6%)"],
      description: "Math modeling paper written for 2022 HiMCM challenge",
      link: {
        label: "paper",
        href: "HiMCM2022.pdf",
      },
    },
    {
      title: "E-Bike Demand",
      awards: ["2nd Round Selection"],
      description: "Math modeling paper written for 2022 M3 Modeling challenge",
      link: {
        label: "paper",
        href: "2023_mathworks_scand_paper.pdf",
      },
    },
  ],
  certificates: [
    {
      title: "AWS Certified Cloud Practitioner",
      awardee: ["Amazon Web Services"],
      description: "Cloud computing, AWS services",
      link: {
        label: "certificate",
        href: "https://www.credly.com/badges/34da7b8b-c623-43ba-8421-01d90216d653",
      },
    },
    {
      title: "MatLab Image Processing",
      awardee: ["MathWorks"],
      description: "Image/video segmentation algorithms specialization",
      link: {
        label: "certificate",
        href: "https://coursera.org/verify/specialization/R9NF498A6XFW",
      },
    },
    {
      title: "Tensorflow Advanced Techniques",
      awardee: ["DeepLearning.AI"],
      description:
        "Computer vision, generative models, custom fxs specialization",
      link: {
        label: "certificate",
        href: "https://coursera.org/verify/specialization/9QYJU4ZA6X6L",
      },
    },
    {
      title: "Tensorflow Developer Certificate",
      awardee: ["DeepLearning.AI"],
      description: "TF CNNs, RNNs, LSTMs, time-series analysis specialization",
      link: {
        label: "certificate",
        href: "https://coursera.org/verify/professional-cert/3ST535EFVLWR",
      },
    },
    {
      title: "Deep Learning",
      awardee: ["DeepLearning.AI"],
      description: "Principles of DL specialization",
      link: {
        label: "certificate",
        href: "https://coursera.org/verify/specialization/KYHNBX4NFNTU",
      },
    },
  ],
} as const;
