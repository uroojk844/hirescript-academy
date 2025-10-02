import type { NavigationMenuItem } from "@nuxt/ui";

export const tutorialsList: NavigationMenuItem[] = [
  {
    label: "HTML",
    description: "Learn the basic blocks of web development.",
    to: "/courses/html",
    icon: "uil:html5",
  },
  {
    label: "CSS",
    description: "Learn the basic of styling your webpage.",
    to: "/courses/css",
    icon: "ri:css3-fill",
  },
  {
    label: "JavaScript",
    description: "Learn the basic of javascript to control events.",
    to: "/courses/js",
    icon: "ri:javascript-fill",
  },
  {
    label: "Do it yourself",
    description: "Learn building basic blocks of website.",
    to: "/courses/diy",
    icon: "ri:dashboard-fill",
  },
  {
    label: "React",
    description: "Learn building basic of React",
    to: "/courses/react",
    icon: "famicons:logo-react",
  },
  {
    label: "Tailwind",
    description: "Learn building basic of Tailwind",
    to: "/courses/tailwind",
    icon: "ri:tailwind-css-fill",
  },
   {
    label: "Python",
    description: "Learn building basic of Python",
    to: "/courses/python",
    icon: "simple-icons:python",
  },
   {
    label: "Express",
    description: "Learn building basic of Express",
    to: "/courses/express",
    icon: "simple-icons:express",
  },
  {
    label: "Node",
    description: "Learn building basic of Node",
    to: "/courses/node",
    icon: "simple-icons:nodedotjs"
  }
];
