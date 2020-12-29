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
    "Christmas Joy",
    "Retro Christmas",
    "Winter Sky",
    "Winter Forest",
    "Winter Rains",
    "Holiday Cheers",
    "Rosy Flamingo",
    "Speckled Eggs",
    "Scooping Ice Cream",
    "Icy Gradient",
    "Velvet Petals",
    "Emerald Garden",
    "Mango Mojito",
    "Rosy Dew",
    "Zesty Lime",
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
  h2 {
    font-weight: 600;
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .outer {
    background-color: var(--pattern-bg);
    color: var(--secondary-text-color);
    padding: 2em;
  }
  .downloadGrid {
    display: grid;
    gap: 5em;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-bottom: 3em;
  }
  .elementGrid {
    background-color: var(--svg-bg);
    display: grid;
    gap: 0.75em;
    justify-items: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: var(--border-radius);
    overflow: hidden;
    padding-bottom: 2em;
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
        <img
          src={'downloads/' + post
              .toLowerCase()
              .replace(/ /g, '-') + '_Twitter.png'}
          alt={post}
          title={post} />
        <h2>{post} patterns</h2>
        <a
          class="gumroad-button"
          href={'https://gum.co/' + post
              .toLowerCase()
              .replace(/ /g, '-') + '?wanted=true'}
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
