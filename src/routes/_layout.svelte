<script>
  import Nav from "../components/Nav.svelte";
  // import { onMount } from "svelte";
  export let segment;

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

<style>
  main {
    position: relative;
    background-color: var(--main-bg-color);
    margin: 0 auto;
    box-sizing: border-box;
    display: grid;
    min-height: calc(100vh - 4em);
    grid-template-rows: 1fr auto;
  }
</style>

<!-- <Nav {segment} on:theme={sayHello} /> -->
<Nav {segment} />

<main>
  <slot />
</main>
