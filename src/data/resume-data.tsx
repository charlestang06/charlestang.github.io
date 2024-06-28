import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Charles Tang",
  initials: "CT",
  location: "Massachusetts, USA",
  locationLink: "https://www.google.com/maps/place/Massachusetts",
  about: "APMA at Brown University",
  summary:
    "I am student at Brown University, pursuing an interest in Applied Mathematics, Computer Science, and Artificial Intelligence. I am most interested in problems regarding using AI and mathematical modeling to solve real-world problems.",
  avatarUrl: "https://portfolio.charlestang.dev/profile5.jpg",
  personalWebsiteUrl: "https://charlestang.dev",
  contact: {
    email: "charles_tang@brown.edu",
    // tel: "+19784939450",
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
  },
  education: [
    {
      school: "Brown University",
      degree: "Bachelor's Degree in APMA-CS (Applied Mathematics + Computer Science)",
      coursework: "TBD",
      gpa: null,
      start: "2024",
      end: "(2027)",
    },
    {
      school: "Worcester Polytechnic Institute",
      degree: "Computer Science and Mathematics",
      coursework:
        "Calculus, ODEs, LinAlg, Discrete, Probability Theory, Real Analysis, Stochastic Models, Econometrics, Object Oriented Programming, Algorithms, Intro to ECE",
      gpa: "4.0",
      start: "2023",
      end: "2024",
    },
  ],
  work: [
    {
      company: "BJ's Wholesale Club",
      link: "https://bjs.com",
      badges: ["Westborough, MA"],
      title: "Robotics & Automation Intern",
      start: "Jun. 2024", 
      end: "Aug. 2024",
      description: `Analyzed 3 months of forklift data to optimize DC layouts. Created first-ever DC maps & simulated millions of routes (Matplotlib) to streamline picking/delivery. Standardized Xdocking KPIs & recommended improvements to DC Operations.
                    Optimized DC forklift picking operations using shortest path algorithms (BFS) and route optimization techniques (greedy algorithms, VRP, constraint programming). Improved operator efficiency by 30% with an ROI of $1 million+ annually.
                    Designed Robotics team status report (Excel) delivered to COO weekly, as well as an Excel data dashboard extracting performance insights on Tally (BJ's flagship club robot) across 200+ clubs nationwide.
                    `,
    },
    {
      company: "IOMICS Corporation",
      link: "https://iomics.us/",
      badges: ["Cambridge, MA"],
      title: "Machine Learning Intern",
      start: "Dec. 2023",
      end: "Aug. 2024",
      description:
        ` Researched and delivered recommendations (50+ papers read/literature review) to medical specialists on various deep learning techniques, including computer vision architectures (ViTs, CNNs, FCNs, image processing) for traumatic brain injury analysis.
          Developed RAG app with LangChain, Ollama (mistral, llama3, dbrx, openbiollm), Docker, and FastAPI. Answered 90-95% of questions accurately on expert-grade medical questions with web-search capabilities to be on par with billion-dollar platforms like PerplexityAi, SciSpace, etc. Implemented custom evaluation framework for 10+ LLMs and deployed to a multi-million dollar advanced life sciences platform. 
          Contributed to HuggingFace open-source with quantized and merged medical models. Researched fine-tune, merging, and other LLM optimizations.
        `,
    },
    {
      company: "Iridium Tutoring",
      link: "https://iridiumtutoring.com/",
      badges: ["Southborough, MA"],
      title: "Founder & Lead Director",
      start: "2020",
      end: "2024",
      description:  `
        Founded and led 501c3 organization providing free tutoring to K-12 students nationwide, impacting 500+ students with 10K+ tutoring sessions, fundraised $15K+, and featured nationwide on television. 
        Implemented organization-wide tutor training and educational resources and onboarded 100+ tutors and volunteers with an average tutor quality of 4.8/5.0. Pioneered Courses@Iridium, Coding for Kids, and Webinars@Iridium projects with hundreds of students attending.
        Developed Django + MySQL web portal for hundreds of tutors, students, and administrators. Eliminated tutoring session management saving $5000/yr and enhanced student data privacy. 
      `
    }
  ],
  skills: [
    "Python",
    "Keras/Tensorflow",
    "LaTeX",
    "Java",
    "ReactJS",
    "NodeJS",
    "Django",
    "HTML/CSS",
    "MatLab Image Processing",
    "MySQL",
    "Firebase",
    "LangChain", 
    "Math modeling", 
    "Data Visualization/Analysis",
    "Math modeling"
  ],
  projects: [
    {
      title: "MAMS SISO",
      techStack: ["ReactJS", "NodeJS", "ExpressJS", "MySQL", "Raspberry Pi", "Python"],
      description: "A digital student attendance system",
      link: {
        label: "mams-siso.wpi.edu",
        href: "https://mams-siso.wpi.edu",
      },
      production: true,
    },
    {
      title: "Finsight (FinnAI)",
      techStack: ["LangChain", "FastAPI", "ReactJS", "Ant-Design", "Firebase"],
      description: "Financial market AI RAG app with dashboard UI",
      link : {
        label: "github.com/charlestang06/finsight",
        href: "https://github.com/charlestang06/finsight"
      },
      production: false,
    },
    {
      title: "Iridium Tutoring Portal",
      techStack: ["Django", "MySQL", "Bootstrap", "CPanel"],
      description: "B2C tutoring portal for students and tutors",
      link : {
        label: "github.com/charlestang06/iridisite",
        href: "https://github.com/charlestang06/iridisite"
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
      title: "Dandelion Populations",
      awards: ["USA Outstanding Winner (1st/967)", "NCTM Award"],
      description: "Math modeling paper written for 2023 HiMCM challenge",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/HiMCM2023.pdf",
      },
    },
    {
      title: "MA Mortgage Markets",
      awards: ["ECON 3130"],
      description: "Logit regression analysis of discrimination",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/ECON3130_Paper.pdf",
      },
    },
    {
      title: "Land Use Analysis",
      awards: ["Intl. Meritorious (Top 6)"],
      description: "Math modeling paper written for 2023 IMMC challenge",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/2023_IM2C_12519_Solution.pdf",
      },
    },
    {
      title: "Honeybee Populations",
      awards: ["USA Finalist (Top 6%)"],
      description: "Math modeling paper written for 2022 HiMCM challenge",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/HiMCM2022.pdf",
      },
    },
    {
      title: "E-Bike Demand",
      awards: ["2nd Round Selection"],
      description: "Math modeling paper written for 2022 M3 Modeling challenge",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/2023_mathworks_scand_paper.pdf",
      },
    },
  ],
  certificates: [
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
