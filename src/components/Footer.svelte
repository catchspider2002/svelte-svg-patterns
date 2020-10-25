<script>
  import Logo from "../components/Logo.svelte";
  import Constants from "../routes/_constants.js";
</script>

<style>
  .footerOuter {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 0 1fr 1fr;
    padding-bottom: 20px;
    align-items: center;
    background-color: var(--main-bg-color);
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    padding-bottom: 2rem;
    color: white;
  }

  .subscribe-bottom {
    padding: 1.5rem;
    max-width: 520px;
  }
  p {
    color: white;
  }
  .iconLinks {
    grid-auto-flow: column;
    gap: 1.5em;
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

<!-- <footer class="accent-bg light-text"> -->
<footer>
  <div class="footerOuter container mx-auto justify-center">
    <a name="subscribe" />
    <div class="subscribe-bottom grid mx-auto">
      <p class="text-center pb-5">Sign up for project updates and free patterns delivered monthly to your inbox</p>
      <script async data-uid="1f3a13ab3c" src="https://crafty-artist-9316.ck.page/1f3a13ab3c/index.js">
      </script>
    </div>
    <div>
      <div class="grid justify-center">
        <a href=".">
          <Logo className="mx-auto" />
        </a>
      </div>
      <div class="iconLinks grid justify-center">
        <a rel="prefetch" target="_blank" href="https://github.com/catchspider2002/svelte-svg-patterns">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.github} />
          </svg></a>
        <a rel="prefetch" target="_blank" href="https://twitter.com/Pattern_Monster">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.twitter} />
          </svg></a>
        <a rel="prefetch" target="_blank" href="https://www.instagram.com/patternmonster/">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={Constants.icons.instagram} />
          </svg></a>
      </div>

      <div class="footer justify-center light-text">
        Made with&nbsp;
        <span style="color:#e25555">❤</span>
        &nbsp;by&nbsp;<a class="secondary-text" href="https://twitter.com/Mrnaveencs">Naveen CS</a>
      </div>
    </div>
  </div>
</footer>
