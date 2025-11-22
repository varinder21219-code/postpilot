export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  certifications: Certification[];
}

export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export function createInitialResumeData(): ResumeData {
  return {
    personalDetails: {
      fullName: 'Your Name',
      jobTitle: 'Job Title',
      email: 'your.email@example.com',
      phone: '(123) 456-7890',
      location: 'City, State',
      website: 'yourportfolio.com'
    },
    summary: 'A brief professional summary about yourself. Highlight your key skills and experience.',
    experience: [
      {
        company: 'Awesome Company',
        role: 'Software Engineer',
        startDate: '2022-01',
        endDate: 'Present',
        description: '- Developed and maintained web applications using modern technologies.\n- Collaborated with cross-functional teams to deliver high-quality products.'
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'B.S. in Computer Science',
        startDate: '2018-09',
        endDate: '2022-05'
      }
    ],
    projects: [
      {
        name: 'Cool Project',
        description: 'A description of a project you worked on, highlighting the technologies used and your role.'
      }
    ],
    skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Problem Solving'],
    certifications: [
      {
        name: 'Certified Awesome Developer',
        issuer: 'Tech Institute',
        date: '2023-06'
      }
    ]
  };
}
