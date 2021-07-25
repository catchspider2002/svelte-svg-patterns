<script>
  import Nav from "../components/Nav.svelte";

  // import { onMount } from "svelte";
  export let segment;
</script>

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
