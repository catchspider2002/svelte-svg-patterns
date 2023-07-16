<div class="bottomSticky">
  <div>
    Create free certificates at Creaze.
    <a
      href="https://creaze.co/certificate-creator"
      rel="noopener noreferrer"
      title="Creaze - Certificate Creator"
      target="_blank"
    >
      Start designing now!
    </a>
  </div>
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .bottomSticky {
    --sticky-gradient: linear-gradient(-45deg, #86efac, #67e8f9, #a5b4fc);
    position: sticky;
    bottom: 0;
    right: 0;
    left: 0;
    background: var(--sticky-gradient);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    font-size: 0.8em;
    padding: 0.5em;
    display: flex;
  }
  .bottomSticky div {
    place-content: center;
    align-items: center;
    margin: 0 auto;
  }
  .bottomSticky a {
    color: black;
    font-weight: 700;
    text-underline-offset: 0.2em;
    text-decoration: underline;
    text-decoration-thickness: 0.15em;
  }
</style>
