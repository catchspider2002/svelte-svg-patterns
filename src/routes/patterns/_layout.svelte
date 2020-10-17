<script>
  import Nav from "../../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    /* max-width: 56em; */
    background-color: white;
    /* padding: 2em; */
    margin: 0 auto;
    box-sizing: border-box;
    display: grid;
    min-height: calc(100vh - 4em);
    grid-template-rows: 1fr auto;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
