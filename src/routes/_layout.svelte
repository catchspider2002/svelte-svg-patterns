<script context="module">
  export async function preload({ page, session }) {
    const res = await this.fetch(`https://api.github.com/search/repositories?q=svelte-svg-patterns`);
    const github = await res.json();
    return { github };
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";

  // import { onMount } from "svelte";
  export let segment;
  export let github;
  let starsCount = github.items[0].stargazers_count;

  // const sayHello = e => {
  //   let defaultNewTheme = e.detail;
  //   localStorage.setItem("defaultNewTheme", defaultNewTheme);
  //   document.documentElement.setAttribute("data-theme", defaultNewTheme);
  // };

  // let defaultNewTheme;
  // onMount(async () => {
  //   defaultNewTheme = localStorage.getItem("defaultNewTheme");

  //   if (!defaultNewTheme) {
  //     defaultNewTheme = "light";

  //     if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
  //       if (window.matchMedia("(prefers-color-scheme: dark)").matches) defaultNewTheme = "dark";
  //       else defaultNewTheme = "light";
  //     }

  //     localStorage.setItem("defaultNewTheme", defaultNewTheme);
  //   }
  //   document.documentElement.setAttribute("data-theme", defaultNewTheme);
  // });
</script>

<!-- <Nav {segment} on:theme={sayHello} /> -->
<Nav {segment} {starsCount} />

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    background-color: var(--main-bg-color);
    margin: 0 auto;
    box-sizing: border-box;
    display: grid;
    min-height: calc(100vh - 3.2em);
    grid-template-rows: 1fr auto;
  }
</style>
