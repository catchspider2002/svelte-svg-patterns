<script>
  import Nav from "../components/Nav.svelte";

  // import { onMount } from "svelte";
  export let segment;
  // export let github;
  // let starsCount;

  // onMount(async () => {
  //   starsCount = github.items[0].stargazers_count;
  // });

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

<!-- <svelte:head>
  <script async src="https://cdn.headwayapp.co/widget.js"></script>
  <script>
    var config = {
      account: "7N3Q9J",
      selector: ".logPopup",
    };
    // var HW_config = {
    //   account: "7N3Q9J",
    //   selector: ".logPopup",
    // };
    Headway.init(config);
  </script>
</svelte:head> -->
<!-- <Nav {segment} on:theme={sayHello} /> -->
<Nav {segment} />

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
