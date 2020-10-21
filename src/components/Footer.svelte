<script>
  import Logo from "../components/Logo.svelte";
</script>

<style>
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
</style>

<!-- <footer class="accent-bg light-text"> -->
<footer>
  <div class="container mx-auto justify-center">
    <a name="subscribe" />
    <div class="subscribe-bottom grid mx-auto">
      <p class="text-center pb-5">Sign up for project updates and beta access</p>
      <script async data-uid="1f3a13ab3c" src="https://crafty-artist-9316.ck.page/1f3a13ab3c/index.js">
      </script>
    </div>
    <div class="grid justify-center pt-20">
      <Logo className="mx-auto" />
    </div>

    <div class="footer justify-center light-text">Made with&nbsp; <span style="color:#e25555">❤</span> &nbsp;by Naveen CS</div>
  </div>
</footer>
