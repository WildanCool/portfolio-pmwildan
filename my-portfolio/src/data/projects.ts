export interface Project {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "To-do List",
    description: "A task management application to organize daily activities.",
    image: "/projects/to-doList.png",
  },
  {
    number: "02",
    title: "BMI Calculator",
    description: "A calculator interface for checking Body Mass Index.",
    image: "/projects/BMIcalculator.png",
  },
  {
    number: "03",
    title: "FinTrack",
    description: "A personal finance interface to track income and expenses.",
    image: "/projects/finTrack.png",
  },
  {
    number: "04",
    title: "UROTRAMAN",
    description:
      "An online shopping website with a modern shopping experience.",
    image: "/projects/urotraman.png",
  },
];
