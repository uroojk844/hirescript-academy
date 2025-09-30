import type { NavigationMenuItem } from "@nuxt/ui";
import { tutorialsList } from "./assets/data/tutorials-list";

export const menuItems: NavigationMenuItem[] = [
  {
    icon:"ri:home-5-line",
    label: "Home",
    to: "/",
  },
  {
    icon:"uil:books",
    label: "Tutorials",
    children: tutorialsList,
  },
  {
    icon: "mdi:cube-outline",
    label: "Playground",
    to: "/playground",
  }
];