<script>
  import { langStore } from "../routes/stores.js";
  import lang from "../routes/_lang.js";
  let strings = lang.strings;
  let toClose = false;

  let language = $langStore || "en";
  let languageList = [
    { id: "en", name: "English", link: "https://pattern.monster" },
    { id: "de", name: "Deutsch", link: "https://de.pattern.monster" },
    { id: "pl", name: "Polski", link: "https://pl.pattern.monster" },
    { id: "tr", name: "Türkçe", link: "https://tr.pattern.monster" },
  ];

  const languageName = languageList.find(({ id }) => id === language).name;

  function toggle(e) {
    e.stopPropagation();
    let menu = this.nextSibling;

    while (menu && menu.nodeType != 1) {
      menu = menu.nextSibling;
    }
    if (!menu) return;
    if (menu.style.display !== "block") {
      menu.style.display = "block";
      if (toClose) toClose.style.display = "none";
      toClose = menu;
    } else closeAll();
  }
  function closeAll() {
    toClose.style.display = "none";
    toClose = false;
  }

  function closeWindow(event) {
    if (toClose) closeAll.call(event.target);
  }
</script>

<!-- https://codepen.io/vlastapolach/pen/EXdLMy -->
<svelte:window on:click={closeWindow} />

<div class="menu">
  <button class="menuButton" title={strings.translate} on:click={toggle}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" />
      <path d="M11 19l4 -9l4 9m-.9 -2h-6.2" />
    </svg>
    <span>{languageName}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>
  <ul class="menuItems">
    {#each languageList as lang}
      {#if lang.name === languageName}
        <a href={lang.link}><li class="px-4 py-3 selectedLang">{lang.name}</li></a>
      {:else}
        <a href={lang.link}><li class="px-4 py-3">{lang.name}</li></a>
      {/if}
    {/each}
    <a href="https://crwd.in/pattern-monster" target="_blank"><li class="px-4 py-3 translateLink">{strings.translate}</li></a>
  </ul>
</div>

<style>
  .menu {
    display: grid;
    margin: 0 auto;
    justify-items: end;
    font-size: 1em;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .translateLink {
    border-top: 2px solid var(--secondary-color);
  }

  .menuButton {
    /* border: 1px solid #dedede; */
    /*   border-bottom: 1px solid #b5b5b5; */
    /* padding: 0.5em 0.75em; */
    /* 	background: linear-gradient(#fff, #EFEFEF); */
    /* position: relative; */
    display: flex;
    /* grid-auto-flow: column;
    grid-template-columns: auto auto auto; */
    align-items: center;
    /* gap: 0.5em; */
    font-weight: 500;
    border-radius: var(--border-radius);
  }
  .menuButton > span {
    padding: 0 0.5em;
  }
  .menuButton:hover {
    background: var(--gray-800);
  }
  .menuButton:active,
  .menuButton:focus {
    outline: none;
    background: var(--main-bg-color);
  }

  .menuItems {
    z-index: 1000;
    display: none;
    min-width: 160px;
    margin-top: 3em;
    position: fixed;
    list-style: none;
    background-color: var(--main-bg-color);
    border: 1px solid var(--main-bg-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
    border-radius: var(--border-radius);
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --tw-ring-offset-shadow: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    padding: 0;
  }
  .menuItems a {
    text-decoration: none;
    padding: 0;
  }
  .menuItems a li {
    color: var(--gray-300);
  }
  .menuItems a li.selectedLang {
    color: var(--secondary-color);
    background-color: var(--gray-800);
  }
  .menuItems a li:hover {
    background-color: var(--gray-700);
  }
</style>
