import { GitHubIcon, LinkedInIcon } from "@/components/icons";
export const RESUME_DATA = {
  name: "Charles Tang",
  initials: "CT",
  location: "Massachusetts, USA",
  locationLink: "https://www.google.com/maps/place/Massachusetts",
  about: "APMA-CS at Brown University",
  summary:
    "I am student at Brown University, pursuing an interest in Applied Mathematics and Computer Science. This summer, I will be joining Cisco Meraki as a Software Engineering Intern (Test Automation Team).",
  djSummary:
    "I'm currently a DJ spinning the latest tracks in the Boston/Providence area. I started in December 2023 to mix for my friends and began to get into house, pop, and hip-hop music.",
  avatarUrl: "https://charlestang06.github.io/photos/pfp.jpg",
  djAvatarUrl: "https://charlestang06.github.io/photos/IMG_0710.JPEG",
  personalWebsiteUrl: "https://charlestang.dev",
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
      name: "DJ EQ",
      url: "/dj",
    },
  },
  education: [
    {
      school: "Brown University",
      degree:
        "Bachelor's Degree in APMA-CS (Applied Mathematics + Computer Science)",
      coursework:
        "Stochastic Calculus, Optimization, Operations Research, Functional Programming",
      gpa: "4.0",
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
      company: "Full Stack @ Brown",
      link: "https://github.com/fullstackatbrown",
      badges: ["Providence, RI"],
      title: "Project Manager",
      start: "Aug. 2024",
      end: "Present",
      description:
        "Led team of 15 developers to create Django (Python) app for NECYSC, serving 100+ campers and 50+ staff annually. Coordinated weekly team standups and served as a liaison between developers and the client organization. Set up CI/CD pipeline with GitHub Actions to automate testing, build, and deployment onto AWS.",
    },
    {
      company: "BJ's Wholesale Club",
      link: "https://bjs.com",
      badges: ["Marlborough, MA"],
      title: "Data Science Intern",
      start: "Jun. 2024",
      end: "Aug. 2024",
      description:
        "Developed CLI to simulate millions of historical forklift routes (Python/Pandas) to streamline picking/delivery. Optimized forklift pick path by 20% with an annual ROI of $851K with integer and linear programming. Pioneered robotic forklift deployment initiatives (annual ROI of $331K) in East Coast distribution centers. Designed Excel dashboard for 200+ clubs nationwide on performance insights on Tally (BJ's flagship robot).",
    },
    {
      company: "IOMICS Corporation",
      link: "https://iomics.us/",
      badges: ["Cambridge, MA"],
      title: "Software Engineering Intern",
      start: "Dec. 2023",
      end: "Aug. 2024",
      description:
        "Developed a chatbot app with LangChain, Django, Postgres, and Docker answering 95% correctly on medical Q/A. Increased brain injury analysis accuracy by 10% by delivering computer vision recommendations to specialists. Reduced feature selection software computational time by 80% by implementing parallel processing (sklearn).",
    },
    {
      company: "Iridium Tutoring",
      link: "https://iridiumtutoring.com/",
      badges: ["Southborough, MA"],
      title: "Founder & Lead Director",
      start: "2020",
      end: "2024",
      description: `
       Founded and led a 501c3 organization providing free tutoring to 500+ K-12 students nationwide, delivering 10K+ sessions, raising $15K+, and gaining nationwide TV coverage. Implemented training for 100+ tutors with an average quality rating of 4.8/5.0, pioneered educational projects, and developed a Django + MySQL web portal, saving $5K annually and enhancing student data privacy.`,
    },
  ],
  skills: [
    "Python",
    "Javascript",
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
    "Pandas",
    "Sklearn",
    "Tensorflow",
    "LangChain",
    "Computer Vision Toolbox",
    "OR Tools",
    "PULP",
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
      title: "March Madness",
      awards: ["Pending submission"],
      description: "Math modeling paper written for 2024 Brown MCM challenge",
      link: {
        label: "paper",
        href: "https://portfolio.charlestang.dev/projects/Team_01_BMCM_Final_Paper.pdf",
      },
    },
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
