<script>
  import Constants from "../routes/_constants.js";
  import Values from "../routes/_values.js";
  import lang from "../routes/_lang.js";
  let strings = lang.strings;
  import { onMount, onDestroy } from "svelte";

  let show = false;
  // const timeoutId = setTimeout(() => {
  //   show = true;

  //   let element = document.querySelector('[aria-label="Your email address"]');
  //   console.log(element);
  //   element.setAttribute("placeholder", "Username");
  // }, 400);
  // onDestroy(() => clearTimeout(timeoutId));

  let timeoutId;
  onMount(async () => {
    timeoutId = setTimeout(() => {
      show = true;

      let element = document.querySelector('[aria-label="Your email address"]');
      if (element) element.setAttribute("placeholder", strings.email);

      let sendButton = document.querySelector(".subscribe-bottom span");
      if (sendButton) sendButton.innerHTML = strings.sendPatterns;
    }, 400);
  });
  onDestroy(() => clearTimeout(timeoutId));

  let crowdinLang = {
    title: [
      "Afrikaans30% • 30%",
      "Arabic100% • 100%",
      "Catalan2% • 2%",
      "Chinese Simplified100% • 100%",
      "Chinese Traditional2% • 2%",
      "Czech6% • 6%",
      "Danish2% • 2%",
      "Dutch100% • 100%",
      "Finnish5% • 5%",
      "French100% • 100%",
      "German100% • 100%",
      "Greek2% • 2%",
      "Hebrew17% • 17%",
      "Hungarian2% • 2%",
      "Italian100% • 100%",
      "Japanese3% • 3%",
      "Korean2% • 2%",
      "Norwegian Bokmal2% • 2%",
      "Norwegian Nynorsk0% • 0%",
      "Polish54% • 54%",
      "Portuguese7% • 7%",
      "Portuguese, Brazilian100% • 100%",
      "Romanian100% • 100%",
      "Russian81% • 81%",
      "Serbian (Cyrillic)2% • 2%",
      "Spanish100% • 100%",
      "Swedish100% • 100%",
      "Turkish100% • 100%",
      "Ukrainian100% • 100%",
      "Vietnamese5% • 5%",
    ],
    percent: [
      "30% • 30%",
      "100% • 100%",
      "2% • 2%",
      "100% • 100%",
      "2% • 2%",
      "6% • 6%",
      "2% • 2%",
      "100% • 100%",
      "5% • 5%",
      "100% • 100%",
      "100% • 100%",
      "2% • 2%",
      "17% • 17%",
      "2% • 2%",
      "100% • 100%",
      "3% • 3%",
      "2% • 2%",
      "2% • 2%",
      "0% • 0%",
      "54% • 54%",
      "7% • 7%",
      "100% • 100%",
      "100% • 100%",
      "81% • 81%",
      "2% • 2%",
      "100% • 100%",
      "100% • 100%",
      "100% • 100%",
      "100% • 100%",
      "5% • 5%",
    ],
  };

  let concatList = crowdinLang.title.map(
    (a, i) =>
      a.replace(crowdinLang.percent[i], "") +
      "-" +
      crowdinLang.percent[i].replace(/ • /g, "-").replace(/%/g, "")
  );

  let languages = [];
  for (const lang of concatList) {
    let splitString = lang.split("-");
    languages.push(splitString);
    // 	languages.push({name: splitString[0], translated: splitString[1], approved: splitString[2]})
  }
</script>

<footer>
  <div
    class="footerOuter grid grid-flow-row md:grid-flow-col container mx-auto justify-center items-center pb-5 pt-2 main-bg white-text"
  >
    <!-- <a name="subscribe" />
    <div class="subscribe-bottom grid mx-auto p-6 max-w-lg">
      <p class="text-center pb-5">{strings.signUp}</p>
      <script
        async
        data-uid="1f3a13ab3c"
        src="https://crafty-artist-9316.ck.page/1f3a13ab3c/index.js"
      >
      </script>
    </div> -->
    <div class="grid justify-center px-6">
      <div class="flex flex-wrap justify-center p-4 -mx-3">
        <a class="secondary-link my-2 mx-3" href="changelog/"
          >{strings.changelog}</a
        >
        <a class="secondary-link my-2 mx-3" href="features/"
          >{strings.features}</a
        >
        <a class="secondary-link my-2 mx-3" href="privacy-policy/"
          >{strings.privacy}</a
        >
      </div>
      <div class="grid grid-flow-col gap-6 justify-center pt-2 pb-4">
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="GitHub"
          target="_blank"
          href="https://github.com/catchspider2002/svelte-svg-patterns"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={Values.icons.github} />
          </svg></a
        >
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="Twitter"
          target="_blank"
          href="https://twitter.com/Pattern_Monster"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={Values.icons.twitter} />
          </svg></a
        >
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="Instagram"
          target="_blank"
          href="https://www.instagram.com/pattern.monster/"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={Values.icons.instagram} />
          </svg></a
        >
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="Facebook"
          target="_blank"
          href="https://www.facebook.com/pattern.monster/"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={Values.icons.facebook} />
          </svg></a
        >
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="Pinterest"
          target="_blank"
          href="https://www.pinterest.com/patternmonster/"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={Values.icons.pinterest} />
          </svg></a
        >
      </div>

      <a
        rel="noopener noreferrer"
        title={strings.buyCoffee}
        class="bmcCta secondary-link block lg:hidden"
        target="_blank"
        href="https://www.buymeacoffee.com/naveencs"
      >
        <div
          class=""
          style="display: flex; background-color: #ffc800; padding: 0.65rem 1rem; border-radius: 0.75rem; align-items: center;"
        >
          <svg
            style="height: 42px;"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 67.64 97.92"
            ><path
              d="m60.56 22.78-.06-.04-.16-.05c.06.05.14.08.22.1zm.98 7-.07.01.08-.02zm-.95-7.02h-.03v.02h.03zm-.03.02h.02zm.93 6.98.1-.06.05-.03.04-.04a.65.65 0 0 0-.2.13zm-.73-6.83-.12-.1-.07-.04c.04.07.1.12.19.14zM32.92 90.81a.57.57 0 0 0-.23.18l.07-.05zm16.17-3.18c0-.1-.05-.08-.04.28l.02-.09c0-.06 0-.12.02-.19zm-1.67 3.18a.57.57 0 0 0-.23.18l.07-.05zm-25.9.76a.48.48 0 0 0-.23-.1l.2.1zm-2.55-2.45z"
              fill="#0d0c22"
            /><path
              d="M36.18 45.23c-3.52 1.5-7.51 3.23-12.7 3.23a24 24 0 0 1-6.4-.89l3.59 36.74a6.14 6.14 0 0 0 6.12 5.63s5.07.26 6.76.26c1.83 0 7.29-.26 7.29-.26a6.14 6.14 0 0 0 6.12-5.63l3.83-40.6a16.3 16.3 0 0 0-5.4-.97c-3.36 0-6.08 1.16-9.21 2.5z"
              fill="#fff"
            /><path
              d="m6.02 29.56.07.06.03.02a.6.6 0 0 0-.1-.08z"
              fill="#0d0c22"
            /><path
              d="m67.34 26.17-.54-2.72c-.48-2.43-1.58-4.74-4.08-5.62-.8-.28-1.72-.4-2.33-.99-.62-.58-.8-1.49-.94-2.33l-.78-4.62c-.23-1.33-.42-2.8-1.03-4.03-.8-1.63-2.43-2.58-4.06-3.2-.83-.33-1.7-.59-2.55-.8C46.95.77 42.67.38 38.48.15c-5.03-.28-10.08-.2-15.1.25-3.73.34-7.67.75-11.22 2.04A9.5 9.5 0 0 0 8.54 4.5a3.92 3.92 0 0 0-.72 4.67 6.05 6.05 0 0 0 2.82 2.37c1.47.66 3 1.16 4.58 1.5 4.39.96 8.93 1.34 13.4 1.5 4.98.2 9.96.04 14.9-.48 1.22-.14 2.44-.3 3.66-.49 1.44-.22 2.36-2.1 1.93-3.4-.5-1.56-1.86-2.17-3.4-1.93l-.68.1-.16.02a95.5 95.5 0 0 1-4.8.47 107.24 107.24 0 0 1-19.14-.4l-.47-.07h-.1l-.48-.08a50.9 50.9 0 0 1-2.96-.53.44.44 0 0 1 0-.87h.02a47.95 47.95 0 0 1 3.42-.6c.54-.03 1.08-.13 1.6-.2a102.3 102.3 0 0 1 22.2.1l.57.08.38.05c1.09.16 2.17.36 3.25.6 1.6.34 3.66.45 4.37 2.2.22.56.33 1.18.45 1.76l.16.75v.04l1.14 5.27a.95.95 0 0 1-.15.75.97.97 0 0 1-.66.4h-.01l-.23.04-.23.03a128.48 128.48 0 0 1-6.45.68 149.64 149.64 0 0 1-12.9.52 151.25 151.25 0 0 1-19.17-1.24l-.51-.07-1.2-.17c-1.32-.2-2.63-.45-3.96-.66a6.9 6.9 0 0 0-4.58.66 6.66 6.66 0 0 0-2.76 2.86c-.62 1.3-.8 2.7-1.08 4.08-.28 1.4-.72 2.88-.55 4.3a6.87 6.87 0 0 0 5.59 6.13 161.9 161.9 0 0 0 46.27 1.53 1.98 1.98 0 0 1 2.19 2.17l-.3 2.85a1089465 1089465 0 0 1-4.15 40.42c-.17 1.67-.2 3.4-.5 5.04-.5 2.6-2.27 4.2-4.83 4.78-2.35.54-4.76.82-7.17.84-2.67.01-5.34-.1-8.01-.1-2.86.02-6.35-.24-8.55-2.36-1.94-1.87-2.2-4.79-2.47-7.3l-1.04-10.04-1.94-18.59-1.25-12.02-.07-.6c-.15-1.43-1.16-2.84-2.76-2.77-1.37.06-2.93 1.23-2.77 2.77l.93 8.92 1.92 18.44 1.64 15.72.3 3.01c.6 5.5 4.8 8.44 9.99 9.27 3.03.5 6.14.6 9.2.64 3.95.06 7.93.22 11.8-.5 5.75-1.05 10.06-4.89 10.68-10.84l.53-5.15 1.75-17.05 1.9-18.58.87-8.5a1.98 1.98 0 0 1 1.6-1.75c1.64-.32 3.2-.87 4.38-2.12 1.86-1.99 2.23-4.58 1.57-7.2zm-61.8 1.84c.03 0-.02.2-.04.3 0-.15 0-.28.05-.3zm.16 1.23c.02 0 .06.04.1.1zm.16.2c.06.1.09.16 0 0zm.32.26.02.03a.21.21 0 0 0-.03-.03zm55.13-.38c-.6.56-1.48.82-2.36.95a166.3 166.3 0 0 1-29.81 1.9A200.69 200.69 0 0 1 7.9 30.12c-.7-.1-1.44-.23-1.92-.74-.9-.96-.46-2.9-.22-4.06.2-1.06.62-2.48 1.88-2.63 1.98-.23 4.28.6 6.23.9a136.85 136.85 0 0 0 37.57.3c1.84-.26 3.67-.54 5.5-.87 1.62-.3 3.42-.84 4.4.84.67 1.15.76 2.68.66 3.98a2.2 2.2 0 0 1-.7 1.48z"
              fill="#0d0c22"
            /></svg
          >
          <span class="coffee test-xl">{strings.buyCoffee}</span>
        </div>
        <!-- {@html Constants.bmcFooter} -->
      </a>
      <div class="footer flex flex-wrap justify-center light-text p-2">
        Made with&nbsp;
        <span style="color:#ff5454">❤</span>
        &nbsp;by&nbsp;<a
          rel="noopener noreferrer"
          class="secondary-text secondary-link"
          href="https://twitter.com/MrNaveenCS">Naveen CS</a
        >
      </div>
    </div>
  </div>

  <section
    class="container mx-auto pb-6 mb-4 pt-2 px-4 flex flex-wrap place-content-center"
  >
    {#each languages as lang}
      <a
        class="langOuter"
        target="_blank"
        href="https://crowdin.com/project/pattern-monster"
        ><span>{lang[0]}</span>
        {#if lang[1] == 100}
          <span class="brightgreen">{lang[1]}%</span>
        {:else if lang[1] > 79}
          <span class="green">{lang[1]}%</span>
        {:else if lang[1] > 64}
          <span class="yellow">{lang[1]}%</span>
        {:else if lang[1] > 49}
          <span class="orange">{lang[1]}%</span>
        {:else}
          <span class="red">{lang[1]}%</span>
        {/if}
      </a>
    {/each}
  </section>
</footer>
