import { writable } from "svelte/store";

export const themeStore = writable("light");
export const langStore = writable("en");