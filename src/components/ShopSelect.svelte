<script>
  import lang from "../routes/_lang.js";
  let strings = lang.strings;
  let toClose = false;

  let shopList = [
    { name: "Accessories", link: "pattern-accessories" },
    { name: "Home & Living", link: "pattern-home-living" },
    { name: "Phone Cases", link: "pattern-phone-cases" },
    { name: "Stationery & Office", link: "pattern-stationery-office" },
    { name: "Stickers & Skins", link: "pattern-stickers-skins" },
    { name: "Wall Art", link: "pattern-wall-art" },
  ];

  function toggle(e) {
    e.stopPropagation();
    let menu = this.nextSibling;
    // let menu = document.getElementById('shopMenu')
    document.getElementById('langMenu').style.display = "none";

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
  <button class="menuButton flex items-center" title={strings.shop} on:click={toggle}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.4em"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="3" y1="21" x2="21" y2="21" />
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
      <line x1="5" y1="21" x2="5" y2="10.85" />
      <line x1="19" y1="21" x2="19" y2="10.85" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    </svg>
    <span class="dropDownName">{strings.shop}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>
  <ul id="shopMenu" class="menuItems p-0">
    {#each shopList as shop}
      <li><a class="px-4 py-3" href={shop.link}>{shop.name}</a></li>
    {/each}
  </ul>
</div>

<style>
  .menu {
    display: grid;
    margin: 0 auto;
    justify-items: end;
    font-size: 1em;
    padding-left: 0.5em;
  }
  .menuButton {
    font-weight: 500;
    border-radius: var(--border-radius);
    padding: 0.5em 0.25em;
  }
  .menuButton > span {
    padding: 0 0.5em;
  }
  .menuButton:hover {
    border-radius: var(--border-radius);
    background-color: var(--gray-800);
  }
  .menuButton:active,
  .menuButton:focus {
    /* outline: none; */
    background-color: var(--gray-800);
    outline: 1px solid #fff;
  }

  .menuItems {
    z-index: 20;
    overflow-y: auto;
    max-height: 75vh;
    display: none;
    min-width: 160px;
    margin-top: 3em;
    position: fixed;
    list-style: none;
    background-color: var(--main-bg-color);
    border: 1px solid var(--main-bg-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  }
  .menuItems a {
    text-decoration: none;
  }
  .menuItems li a {
    color: var(--gray-300);
  }
  .menuItems li a:hover {
    background-color: var(--gray-700);
  }
</style>
