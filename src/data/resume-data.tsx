import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Charles Tang",
  initials: "CT",
  location: "Massachusetts, USA",
  locationLink: "https://www.google.com/maps/place/Massachusetts",
  about: "Incoming Freshman at Brown University",
  summary:
    "I am an incoming student at Brown University, pursuing an interest in Applied Mathematics, Computer Science, Artificial Intelligence, and Education. I am most interested in problems regarding using AI and mathematical modeling to solve real-world problems.",
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
      degree: "Bachelor's Degree in Applied Mathematics and Computer Science",
      coursework: "TBD",
      gpa: null,
      start: "2024",
      end: "(2028)",
    },
    {
      school: "Massachusetts Academy of Math and Science",
      degree: "High School Diploma + Dual Enrollment @ WPI",
      coursework:
        "Calculus, ODEs, LinAlg, Discrete, Probability Theory, Real Analysis, Stochastic Models, Econometrics, Object Oriented Programming, Algorithms, Intro to ECE",
      gpa: "4.0",
      start: "2020",
      end: "2024",
    },
  ],
  work: [
    {
      company: "IOMICS",
      link: "https://iomics.us/",
      badges: ["Remote"],
      title: "Machine Learning Intern",
      start: "2023",
      end: "2024",
      description:
        "Implemented SOTA CNNs with Tensorflow for Scientific/Medical Image Analysis. Technologies: Tensorflow, Keras",
    },
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
    "Raspberry Pi",
    "MySQL",
    "Firebase",
    "CPanel/Apache",
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
    },
    {
      title: "Iridium Tutoring Portal",
      techStack: ["Django", "MySQL", "Bootstrap", "CPanel/Apache"],
      description: "B2C tutoring portal for students and tutors",
      link : {
        label: "github.com/charlestang06/iridisite",
        href: "https://github.com/charlestang06/iridisite"
      }
    },
    {
      title: "Proj-X",
      techStack: ["Firebase", "ExpressJS", "ReactJS", "NodeJS", "Ant-Design"],
      description: "Kickstarting your career with projects",
      link: {
        label: "projx-hbp.web.app",
        href: "https://projx-hbp.web.app",
      },
    },
    {
      title: "WPI Roadmap",
      techStack: ["Firebase", "ExpressJS", "ReactJS", "NodeJS", "Ant-Design"],
      description: "Plan your academic success at WPI (2024 WPI GoatHacks Winner)",
      link: {
        label: "roadmap-wpi.web.app",
        href: "https://roadmap-wpi.web.app",
      },
    },
    {
      title: "Pantry Access",
      techStack: ["ReactJS", "HTML/CSS", "Firebase"],
      description: "A universal food pantry management system",
      link: {
        label: "pantryaccess.web.app",
        href: "https://pantryaccess.web.app",
      },
    },

    {
      title: "Cyclist Detection",
      techStack: ["Python", "Rasbperry Pi", "Tensorflow Lite"],
      description: "SOTA vision-based cyclist detection model",
      link: {
        label: "arXiv",
        href: "https://arxiv.org/abs/2303.11223",
      },
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
      title: "Land Use Analysis",
      awards: ["USA Outstanding Winner", "Intl. Meritorious (Top 6)"],
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
