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
      "Arabic50% • 50%",
      "Catalan2% • 2%",
      "Chinese Simplified100% • 100%",
      "Chinese Traditional2% • 2%",
      "Czech6% • 6%",
      "Danish2% • 2%",
      "Dutch100% • 100%",
      "Finnish5% • 5%",
      "French34% • 34%",
      "German100% • 100%",
      "Greek2% • 2%",
      "Hebrew17% • 17%",
      "Hungarian2% • 2%",
      "Italian100% • 100%",
      "Japanese3% • 3%",
      "Korean2% • 2%",
      "Norwegian Bokmal2% • 2%",
      "Norwegian Nynorsk0% • 0%",
      "Polish52% • 52%",
      "Portuguese2% • 2%",
      "Portuguese, Brazilian100% • 100%",
      "Romanian100% • 100%",
      "Russian18% • 18%",
      "Serbian (Cyrillic)2% • 2%",
      "Spanish64% • 64%",
      "Swedish100% • 100%",
      "Turkish100% • 100%",
      "Ukrainian27% • 27%",
      "Vietnamese2% • 2%",
    ],
    percent: [
      "30% • 30%",
      "50% • 50%",
      "2% • 2%",
      "100% • 100%",
      "2% • 2%",
      "6% • 6%",
      "2% • 2%",
      "100% • 100%",
      "5% • 5%",
      "34% • 34%",
      "100% • 100%",
      "2% • 2%",
      "17% • 17%",
      "2% • 2%",
      "100% • 100%",
      "3% • 3%",
      "2% • 2%",
      "2% • 2%",
      "0% • 0%",
      "52% • 52%",
      "2% • 2%",
      "100% • 100%",
      "100% • 100%",
      "18% • 18%",
      "2% • 2%",
      "64% • 64%",
      "100% • 100%",
      "100% • 100%",
      "27% • 27%",
      "2% • 2%",
    ],
  };

  let concatList = crowdinLang.title.map(
    (a, i) => a.replace(crowdinLang.percent[i], "") + "-" + crowdinLang.percent[i].replace(/ • /g, "-").replace(/%/g, "")
  );

  let languages = [];
  for (const lang of concatList) {
    let splitString = lang.split("-");
    languages.push(splitString);
    // 	languages.push({name: splitString[0], translated: splitString[1], approved: splitString[2]})
  }
</script>

<footer>
  <div class="footerOuter grid grid-flow-row md:grid-flow-col container mx-auto justify-center items-center pb-5 pt-2 main-bg white-text">
    <a name="subscribe" />
    <div class="subscribe-bottom grid mx-auto p-6 max-w-lg">
      <p class="text-center pb-5">{strings.signUp}</p>
      <script async data-uid="1f3a13ab3c" src="https://crafty-artist-9316.ck.page/1f3a13ab3c/index.js">
      </script>
    </div>
    <div class="grid justify-center px-6">
      <div class="flex flex-wrap justify-center p-4 -mx-3">
        <a class="secondary-link my-2 mx-3" href="changelog/">{strings.changelog}</a>
        <a class="secondary-link my-2 mx-3" href="features/">{strings.features}</a>
        <a class="secondary-link my-2 mx-3" href="privacy-policy/">{strings.privacy}</a>
      </div>
      <div class="grid grid-flow-col gap-6 justify-center pt-2 pb-4">
        <a
          class="secondary-link"
          rel="noopener noreferrer"
          title="GitHub"
          target="_blank"
          href="https://github.com/catchspider2002/svelte-svg-patterns"
        >
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Values.icons.github} />
          </svg></a
        >
        <a class="secondary-link" rel="noopener noreferrer" title="Twitter" target="_blank" href="https://twitter.com/Pattern_Monster">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Values.icons.twitter} />
          </svg></a
        >
        <a class="secondary-link" rel="noopener noreferrer" title="Instagram" target="_blank" href="https://www.instagram.com/pattern.monster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Values.icons.instagram} />
          </svg></a
        >
        <a class="secondary-link" rel="noopener noreferrer" title="Facebook" target="_blank" href="https://www.facebook.com/pattern.monster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Values.icons.facebook} />
          </svg></a
        >
        <a class="secondary-link" rel="noopener noreferrer" title="Pinterest" target="_blank" href="https://www.pinterest.com/patternmonster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Values.icons.pinterest} />
          </svg></a
        >
      </div>

      <a
        rel="noopener noreferrer"
        title={strings.buyCoffee}
        class="bmcCta secondary-link block lg:hidden"
        target="_blank"
        href="https://www.buymeacoffee.com/naveencs">{@html Constants.bmcFooter}</a
      >
      <div class="footer flex flex-wrap justify-center light-text p-2">
        Made with&nbsp;
        <span style="color:#ff5454">❤</span>
        &nbsp;by&nbsp;<a rel="noopener noreferrer" class="secondary-text secondary-link" href="https://twitter.com/MrNaveenCS">Naveen CS</a>
      </div>
    </div>
  </div>

  <section class="container mx-auto pb-6 mb-4 pt-2 px-4 flex flex-wrap place-content-center">
    {#each languages as lang}
      <a class="langOuter" target="_blank" href="https://crowdin.com/project/pattern-monster"
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
