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
</footer>
