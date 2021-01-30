import { writable } from 'svelte/store';
// import { onMount } from "svelte";

export const themeStore = writable("light");
export const langStore = writable("en");

// export let themeStore;
