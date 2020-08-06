<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	button {
		background: none;
		border: none;
		border-bottom: 4px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
		padding: 1em;
	}
	
	.selected {
		border-bottom: 4px solid var(--accent-color);
		color: var(--accent-color);
	}
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>
