import type { NavigationMenuItem } from "@nuxt/ui";
import { tutorialsList } from "./assets/data/tutorials-list";

export const menuItems: NavigationMenuItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Tutorials",
    children: tutorialsList,
  },
  {
    label: "Playground",
    to: "/playground"
  }
];