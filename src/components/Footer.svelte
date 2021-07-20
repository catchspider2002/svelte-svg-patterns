<script>
  import Constants from "../routes/_constants.js";
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
      element.setAttribute("placeholder", strings.email);

      let sendButton = document.querySelector(".subscribe-bottom span");
      sendButton.innerHTML = strings.sendPatterns


    }, 400);
  });
  onDestroy(() => clearTimeout(timeoutId));
</script>

<footer>
  <div class="footerOuter container mx-auto justify-center">
    <a name="subscribe" />
    <div class="subscribe-bottom grid mx-auto">
      <p class="text-center pb-5">{strings.signUp}</p>
      <script async data-uid="1f3a13ab3c" src="https://crafty-artist-9316.ck.page/1f3a13ab3c/index.js">
      </script>
    </div>
    <div class="grid justify-center">
      <div class="iconLinks grid justify-center">
        <a href="changelog/">{strings.changelog}</a>
        <a href="features/">{strings.features}</a>
        <a href="privacy-policy/">{strings.privacy}</a>
      </div>
      <div class="iconLinks grid justify-center">
        <a rel="noopener noreferrer" title="GitHub" target="_blank" href="https://github.com/catchspider2002/svelte-svg-patterns">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.github} />
          </svg></a
        >
        <a rel="noopener noreferrer" title="Twitter" target="_blank" href="https://twitter.com/Pattern_Monster">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.twitter} />
          </svg></a
        >
        <a rel="noopener noreferrer" title="Instagram" target="_blank" href="https://www.instagram.com/pattern.monster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.instagram} />
          </svg></a
        >
        <a rel="noopener noreferrer" title="Facebook" target="_blank" href="https://www.facebook.com/pattern.monster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.facebook} />
          </svg></a
        >
        <a rel="noopener noreferrer" title="Pinterest" target="_blank" href="https://www.pinterest.com/patternmonster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.pinterest} />
          </svg></a
        >
      </div>

      <a rel="noopener noreferrer" title={strings.buyCoffee} class="cta" target="_blank" href="https://www.buymeacoffee.com/naveencs"
        >{@html Constants.icons.bmc}</a
      >
      <div class="footer justify-center light-text">
        Made with&nbsp;
        <span style="color:#ff9a9a">❤</span>
        &nbsp;by&nbsp;<a rel="noopener noreferrer" class="secondary-text" href="https://twitter.com/MrNaveenCS">Naveen CS</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footerOuter {
    display: grid;
    font-size: 0.9em;
    grid-auto-flow: column;
    grid-template-columns: 0 1fr 1fr;
    padding-top: 10px;
    padding-bottom: 20px;
    align-items: center;
    background-color: var(--main-bg-color);
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    /* padding-bottom: 2rem; */
    color: white;
  }

  .subscribe-bottom {
    padding: 1.5rem;
    max-width: 520px;
  }

  .cta {
    /* padding: 1em; */
    margin: 0.5em 0.5em 1em;
    /* color: var(--accent-color); */
    /* justify-items: center; */
    /* align-items: center; */
    justify-self: center;
    /* background-color: #44337a;
    border-radius: var(--border-radius); */
  }

  .cta:hover,
  .cta:focus {
    /* color: var(--accent-color-hover); */
    opacity: 0.85;
  }
  p {
    color: white;
  }
  .iconLinks {
    grid-auto-flow: column;
    gap: 1.5em;
    padding: 0.5em 0 1em;
  }

  a {
    color: var(--secondary-color);
    text-decoration: none;
  }
  a:hover {
    color: var(--secondary-color-hover);
    text-decoration: none;
  }
  @media (max-width: 768px) {
    .footerOuter {
      grid-auto-flow: row;
      grid-template-columns: 1fr;
    }
  }
</style>
