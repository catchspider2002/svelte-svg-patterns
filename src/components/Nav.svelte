<script>
  export let segment;
  import { fly, scale, fade } from "svelte/transition";
  // import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  // import Constants from "../routes/_constants.js";
  import Values from "../routes/_values.js";
  import { themeStore } from "../routes/stores.js";
  import LangSelect from "./LangSelect.svelte";
  // import ShopSelect from "./ShopSelect.svelte";
  import lang from "../routes/_lang.js";
  let strings = lang.strings;
  let visible = true;
  let bellCount = "0";

  let starsCount = 422;

  // const dispatch = createEventDispatcher();

  // const triggerEvent = () => {
  //   dispatch("hello", "Rock");
  // };
  let dark = Values.icons.dark;
  let light = Values.icons.light;
  let theme = light;
  let toClose = false;

  let defaultNewTheme, latestUpdate;
  onMount(async () => {
    defaultNewTheme = localStorage.getItem("defaultNewTheme");

    if (!defaultNewTheme) {
      defaultNewTheme = "light";

      // if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
      //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) defaultNewTheme = "dark";
      //   else defaultNewTheme = "light";
      // }

      localStorage.setItem("defaultNewTheme", defaultNewTheme);
    }
    document.documentElement.setAttribute("data-theme", defaultNewTheme);
    themeStore.set(defaultNewTheme);
    userAction();

    latestUpdate = localStorage.getItem("latestUpdate");

    if (!latestUpdate) {
      // console.log("No latest update");
      latestUpdate = Values.changeLog[0].date;
      bellCount = "3";
    } else {
      const index = Values.changeLog.findIndex((element) => {
        if (element.date === latestUpdate) return true;
      });
      // console.log(index);
      bellCount = index > 3 ? "3+" : index.toString();
    }

    // console.log(latestUpdate);
    // localStorage.setItem("latestUpdate", "June 8, 2021");
  });

  function changeTheme() {
    if (defaultNewTheme === "dark") {
      theme = light;
      defaultNewTheme = "light";
    } else {
      theme = dark;
      defaultNewTheme = "dark";
    }

    // theme = theme === dark ? light : dark;
    // themeColor = themeColor === "dark" ? "light" : "dark";
    localStorage.setItem("defaultNewTheme", defaultNewTheme);
    document.documentElement.setAttribute("data-theme", defaultNewTheme);
    themeStore.set(defaultNewTheme);

    // dispatch("theme", themeColor);
  }

  const userAction = async () => {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=svelte-svg-patterns"
    );
    const myJson = await response.json();
    starsCount = myJson.items[0].stargazers_count;
  };

  function showNotifications(e) {
    visible = false;
    localStorage.setItem("latestUpdate", Values.changeLog[0].date);
    e.stopPropagation();
    let menu = this.nextSibling;

    while (menu && menu.nodeType != 1) {
      menu = menu.nextSibling;
    }
    if (!menu) return;
    if (menu.style.display !== "grid") {
      menu.style.display = "grid";
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

<svelte:window on:click={closeWindow} />
<!-- <div class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
  <div class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
    <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"></div>
  </div>
  <div class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
    <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"></div>
  </div>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
    <p class="text-sm leading-6 text-gray-900">
      <strong class="font-semibold">GeneriCon 2023</strong><svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>Join us in Denver from June 7 – 9 to see what’s coming next.
    </p>
    <a href="#" class="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Register now <span aria-hidden="true">&rarr;</span></a>
  </div>
  <div class="flex flex-1 justify-end">
    <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
      <span class="sr-only">Dismiss</span>
      <svg class="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </div>
</div> -->

<nav>
  <div class="logoOuter grid items-center">
    <a
      aria-current={segment === undefined ? "page" : undefined}
      href="."
      class="justify-self-start"
    >
      <div class="logo" style="color: var(--secondary-color)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 128 128"
          data-inline="false"
        >
          <g transform="translate(0 -3)" style="fill: var(--secondary-color)">
            <path
              d="M64.01 30.39c-34.48 0-51.26 20.65-51.26 46.11 0 4.45.71 8.74 2.03 12.81 2.48 7.64 6.49 15.25 6.23 23.48-.15 4.94-2.97 7.47-6.43
                10.44-1.07.92-1.27 2.42.08 3.19 3.1 1.78 8.32-.19 11.33-1.4 2.69-1.08 5.21-2.93 7.31-5.08 1.08-1.1 2.08-2.27 3.07-3.44.82-.96
                2.18-3.42 3.74-2.72 3.4 1.53-.58 7.86-2.3 9.38-.7.62-1.65 1.18-1.97 2.12-.36 1.03.37 1.93 1.3 2.3 2.6 1.04 8.28-.72 10.88-2.46
                1.86-1.25 3.41-2.85 4.71-4.68.81-1.14 2.21-4.74 4.02-4.31 3.32.8 1.92 6.03 2.14 8.3.11 1.16.78 2.32 1.94 2.77 2.52.99 4.74-.79
                6.22-2.63 1.65-2.05 2.44-4.32 3.73-6.54 1.03-1.79 2.83-2.16 4.12-.31 1.88 2.69 3.04 5.25 6.03 6.96 2.46 1.4 5.3 2.27 8.14 2.29 1.25
                0 6.79-.66 4.92-3.11-.82-1.06-2.39-1.32-3.46-2.11-1.76-1.31-2.57-3.48-2.63-5.62-.08-3.05 2.87-2.27 4.32-.8 2.35 2.38 3.75 5.76 6.78
                7.39 3.63 1.95 9.29 2.9 13.29 1.67 1.36-.42 2.92-1.01
                3.01-2.65.09-1.55-1.23-1.92-2.47-2.27-1.59-.44-2.69-.84-3.91-2.06-.92-.88-1.42-2.08-1.63-3.33-.43-2.59.02-5.5.48-7.83.82-4.19
                2.31-8.22 3.78-12.21.47-1.29.95-2.58 1.4-3.87 1.5-4.32 2.32-8.9 2.32-13.67 0-25.47-16.78-46.11-51.26-46.11zM43.928 67.25a8.75 6.789
                0 01.072 0 8.75 6.789 0 018.75 6.79A8.75 6.789 0 0144 80.827a8.75 6.789 0 01-8.75-6.789 8.75 6.789 0 018.678-6.789zm40 0a8.75 6.789
                0 01.072 0 8.75 6.789 0 018.75 6.79A8.75 6.789 0 0184 80.827a8.75 6.789 0 01-8.75-6.789 8.75 6.789 0 018.678-6.789zM71.88
                92.57c1.31.05 2.599 1.13 2.969 2.38 1.19 3.97-4.71 6.17-7.54 6.9-4.06
                1.04-8.94.39-12.08-2.58-.8-.75-1.55-1.9-1.61-3.03-.05-.86.27-1.71.86-2.33 1.24-1.3 2.99-1.29 4.39-.3 1.54 1.1 2.6 2.45 4.61 2.64
                1.66.15 3.33-.52 4.67-1.46 1.16-.81 2.16-2.28 3.73-2.22z"
            />
            <path
              d="M102.26 27.7s-1.19-1.83-3.65-2.22c-3.06-.48-6.08.07-7.05 4.51-.96 4.42-1.45 10.11 3.49 14.08l-7.6 2.13-6.51-7.89s2.52.96
                2.86-.91c.42-2.29.42-4.36.97-7.87.58-3.67 1.73-7.51 5.25-9.54 1.92-1.11 4.98-1.74 5.99-2.55.78-.63.99-2.65 1.33-4.84l5.42 4.16 1.7
                7.4z"
            />
            <circle r="11.93" cy="18.02" cx="107.39" />
            <path
              d="M25.74 27.7s1.19-1.83 3.65-2.22c3.06-.48 6.08.07 7.05 4.51.96 4.42 1.46 10.11-3.49 14.08l7.6 2.13
                6.51-7.89s-2.52.96-2.86-.91c-.42-2.29-.42-4.36-.97-7.87-.59-3.67-1.73-7.51-5.25-9.54-1.92-1.11-4.98-1.74-5.99-2.55-.78-.63-.99-2.65-1.33-4.84l-5.42
                4.16-1.7 7.4z"
            />
            <circle r="11.93" cy="18.02" cx="20.61" />
          </g>
        </svg>
        <div class="brandName">PATTERN MONSTER</div>
      </div>
    </a>
    <div class="logPopup" />

    <button
      class="bellIcon menuButton"
      title={strings.changelog}
      on:click={showNotifications}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <path
          d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
        />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
      </svg>
      {#if visible && parseInt(bellCount) > 0}
        <span
          transition:scale={{ duration: 2000 }}
          id="bellCount"
          class="bellCount">{bellCount}</span
        >
      {/if}
    </button>
    <div class="notifications">
      <h3>{strings.changelog}</h3>
      <ul>
        {#each Values.changeLog.slice(0, 3) as log}
          <li class="versionHeader">{log.date}</li>
          {#each log.updates as logData}
            <li>{@html logData}</li>
          {/each}
        {/each}
      </ul>
      <div class="viewLink">
        <a href="changelog">{strings.viewMore} </a>
      </div>
    </div>
  </div>

  <div class="rightLinks grid grid-flow-col items-center justify-self-end">
    <!-- <a
      rel="noopener noreferrer"
      title={strings.buyCoffee}
      class="bmc"
      target="_blank"
      href="https://www.buymeacoffee.com/naveencs"
    >
      {@html Constants.bmcHeader}
    </a> -->
    <a
      rel="noopener noreferrer"
      title={strings.buyCoffee}
      class="bmc"
      target="_blank"
      href="https://www.buymeacoffee.com/naveencs"
    >
      <div
        class="flex items-center"
        style="background-color: #805ad5; padding: 0.5rem 0.8rem; border-radius: 0.75rem;"
      >
        <svg
          style="height: 24px;"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 67.64 97.92"
          ><path
            d="M36.18 45.23c-3.52 1.5-7.51 3.23-12.7 3.23a24 24 0 0 1-6.4-.89l3.59 36.74a6.14 6.14 0 0 0 6.12 5.63s5.07.26 6.76.26c1.83 0 7.29-.26 7.29-.26a6.14 6.14 0 0 0 6.12-5.63l3.83-40.6a16.3 16.3 0 0 0-5.4-.97c-3.36 0-6.08 1.16-9.21 2.5z"
            fill="#ffc800"
          /><path
            d="m67.34 26.17-.54-2.72c-.48-2.43-1.58-4.74-4.08-5.62-.8-.28-1.72-.4-2.33-.99-.62-.58-.8-1.49-.94-2.33l-.78-4.62c-.23-1.33-.42-2.8-1.03-4.03-.8-1.63-2.43-2.58-4.06-3.2-.83-.33-1.7-.59-2.55-.8C46.95.77 42.67.38 38.48.15c-5.03-.28-10.08-.2-15.1.25-3.73.34-7.67.75-11.22 2.04A9.5 9.5 0 0 0 8.54 4.5a3.92 3.92 0 0 0-.72 4.67 6.05 6.05 0 0 0 2.82 2.37c1.47.66 3 1.16 4.58 1.5 4.39.96 8.93 1.34 13.4 1.5 4.98.2 9.96.04 14.9-.48 1.22-.14 2.44-.3 3.66-.49 1.44-.22 2.36-2.1 1.93-3.4-.5-1.56-1.86-2.17-3.4-1.93l-.68.1-.16.02a95.5 95.5 0 0 1-4.8.47 107.24 107.24 0 0 1-19.14-.4l-.47-.07h-.1l-.48-.08a50.9 50.9 0 0 1-2.96-.53.44.44 0 0 1 0-.87h.02a47.95 47.95 0 0 1 3.42-.6c.54-.03 1.08-.13 1.6-.2a102.3 102.3 0 0 1 22.2.1l.57.08.38.05c1.09.16 2.17.36 3.25.6 1.6.34 3.66.45 4.37 2.2.22.56.33 1.18.45 1.76l.16.75v.04l1.14 5.27a.95.95 0 0 1-.15.75.97.97 0 0 1-.66.4h-.01l-.23.04-.23.03a128.48 128.48 0 0 1-6.45.68 149.64 149.64 0 0 1-12.9.52 151.25 151.25 0 0 1-19.17-1.24l-.51-.07-1.2-.17c-1.32-.2-2.63-.45-3.96-.66a6.9 6.9 0 0 0-4.58.66 6.66 6.66 0 0 0-2.76 2.86c-.62 1.3-.8 2.7-1.08 4.08-.28 1.4-.72 2.88-.55 4.3a6.87 6.87 0 0 0 5.59 6.13 161.9 161.9 0 0 0 46.27 1.53 1.98 1.98 0 0 1 2.19 2.17l-.3 2.85a1089465 1089465 0 0 1-4.15 40.42c-.17 1.67-.2 3.4-.5 5.04-.5 2.6-2.27 4.2-4.83 4.78-2.35.54-4.76.82-7.17.84-2.67.01-5.34-.1-8.01-.1-2.86.02-6.35-.24-8.55-2.36-1.94-1.87-2.2-4.79-2.47-7.3l-1.04-10.04-1.94-18.59-1.25-12.02-.07-.6c-.15-1.43-1.16-2.84-2.76-2.77-1.37.06-2.93 1.23-2.77 2.77l.93 8.92 1.92 18.44 1.64 15.72.3 3.01c.6 5.5 4.8 8.44 9.99 9.27 3.03.5 6.14.6 9.2.64 3.95.06 7.93.22 11.8-.5 5.75-1.05 10.06-4.89 10.68-10.84l.53-5.15 1.75-17.05 1.9-18.58.87-8.5a1.98 1.98 0 0 1 1.6-1.75c1.64-.32 3.2-.87 4.38-2.12 1.86-1.99 2.23-4.58 1.57-7.2zm-61.8 1.84c.03 0-.02.2-.04.3 0-.15 0-.28.05-.3zm.16 1.23c.02 0 .06.04.1.1zm.16.2c.06.1.09.16 0 0zm.32.26.02.03a.21.21 0 0 0-.03-.03zm55.13-.38c-.6.56-1.48.82-2.36.95a166.3 166.3 0 0 1-29.81 1.9A200.69 200.69 0 0 1 7.9 30.12c-.7-.1-1.44-.23-1.92-.74-.9-.96-.46-2.9-.22-4.06.2-1.06.62-2.48 1.88-2.63 1.98-.23 4.28.6 6.23.9a136.85 136.85 0 0 0 37.57.3c1.84-.26 3.67-.54 5.5-.87 1.62-.3 3.42-.84 4.4.84.67 1.15.76 2.68.66 3.98a2.2 2.2 0 0 1-.7 1.48z"
            fill="#0d0c22"
          /></svg
        >
        <span class="coffee">{strings.buyCoffee}</span>
      </div>
    </a>
    <!-- <ShopSelect /> -->
    <!-- <a class="downloadsButton" title={strings.downloads} href="downloads">{strings.downloads}</a> -->
    <LangSelect />
    <a
      class="tweetNav"
      rel="noopener noreferrer"
      title={strings.tweet}
      target="_blank"
      href="https://twitter.com/intent/tweet?text=If%20you%20love%20creating%20SVG%20patterns%20and%20backgrounds%2C%20you%20should%20check%20this%20out.%20Generate%20fully%20customizable%20SVG%20patterns%20for%20free.%0A%0A280%2b%20patterns%20available%20at%20https%3A%2F%2Fpattern.monster%0A%0Avia%20%40Pattern_Monster%0A%0A%23svgpatterns%20%23patterns%20%23svgbackgrounds%20%23PatternMonster"
    >
      Tweet
    </a>

    <a
      class="gitHubIcon"
      rel="noopener noreferrer"
      title="GitHub"
      target="_blank"
      href="https://github.com/catchspider2002/svelte-svg-patterns"
    >
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Values.icons.github} />
      </svg>
      <span class="starsCount">{starsCount}</span>
    </a>
    <button
      class="iconButton"
      aria-label={strings.changeTheme}
      title={strings.changeTheme}
      on:click={() => changeTheme()}
    >
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {#if theme === light}
          <path transition:fly={{ y: 100, duration: 300 }} d={theme} />
        {:else}
          <path transition:fly={{ y: -100, duration: 300 }} d={theme} />
        {/if}
      </svg>
    </button>
  </div>
</nav>
