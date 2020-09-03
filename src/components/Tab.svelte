<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>

<style>
  button {
    background: none;
    border: none;
    border-top: 4px solid #ccc;
    border-radius: 0;
    margin: 0;
    color: #ccc;
    padding: 1em;
  }

  .selected {
    border-top: 4px solid var(--secondary-color);
    color: var(--secondary-color);
  }
</style>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot />
</button>
