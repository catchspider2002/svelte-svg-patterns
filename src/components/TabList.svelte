<style>
  .tab-list {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: black;
    width: 100%;
    height: 72px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>

<div class="tab-list">
  <slot />
</div>
