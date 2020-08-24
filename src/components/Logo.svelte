<script>
export let className=""
</script>

<style>
  .logo {
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    align-items: flex-end;
  }
  .logoText {
    color: var(--accent-text-color);
    font-weight: 600;
    padding-left: 8px;
  }
  .normal-icon .iconify {
    font-size: 2em;
    line-height: 1em;
  }
  @media (max-width: 1280px) {
    .logo {
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
  }
  @media (max-width: 1024px) {
    .logo {
      padding-bottom: 1rem;
    }
  }
</style>

<div class="logo grid {className}">
  <div class="normal-icon">
    <span class="iconify" data-icon="noto-v1:alien-monster" data-inline="false" />
  </div>
  <span class="logoText">PATTERN MONSTER</span>
</div>
