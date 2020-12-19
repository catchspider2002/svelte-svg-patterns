<script>
  import Footer from "../components/Footer.svelte";

  let website = "https://pattern.monster";
  let title = "Downloads - Pattern Monster";
  let url = website + "/downloads/";
  let keywords =
    "download, free downloads, svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker";
  let desc =
    "Downloads for Pattern Monster. Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more.";
  let image = website + "/TwitterBG2.png";

  let newPosts = [
    { slug: "christmas-joy", title: "Christmas Joy", colors: 2 },
    { slug: "retro-christmas", title: "Retro Christmas", colors: 2 },
  ];
</script>

<style>
  h1 {
    font-size: 2em;
    text-align: center;
    font-weight: 600;
    padding: 0.5em;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
    margin-top: 0;
  }
  h2{
    font-weight: 400;
    line-height: 0;
  }
  .outer {
    background-color: var(--pattern-bg);
    padding: 2em;
    color: var(--secondary-text-color);
  }
  .downloadGrid {
    display: grid;
    gap: 4em;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .elementGrid {
    display: grid;
    gap: 1.5em;
    justify-items: center;
  }

@media (max-width: 2400px) {
  .downloadGrid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

  @media (max-width: 1280px) {
    .downloadGrid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .downloadGrid {
      grid-template-columns: 1fr;
    }
  }
</style>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  <meta name="description" content={desc} />
  <meta name="keywords" content={keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={desc} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={desc} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:src" content={image} />
  <meta name="twitter:image:alt" content={title} />
  <script src="https://gumroad.com/js/gumroad.js">
  </script>
</svelte:head>
<div class="outer">
  <h1>DOWNLOADS</h1>

  <div class="downloadGrid">
    {#each newPosts as post}
      <div class="elementGrid">
        <h2>{post.title} patterns</h2>
        <img
          src={'downloads/' + post.slug + '.png'}
          alt={post.title}
          title={post.title} />
        <a
          class="gumroad-button"
          href={'https://gum.co/' + post.slug + '?wanted=true'}
          target="_blank"
          data-gumroad-single-product="true">Download</a>
      </div>
    {/each}
  </div>
</div>

<Footer />

<!-- <a
          rel="prefetch"
          href="https://www.redbubble.com/shop/ap/64961293"
          class="pattern">
          <span>{post.title}</span>
        </a> -->
