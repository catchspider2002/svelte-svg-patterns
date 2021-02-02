<!--<script context="module" ✂prettier:content✂="CiAgZXhwb3J0IGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHsKICAgIHJldHVybiB0aGlzLmZldGNoKAogICAgICBgaHR0cHM6Ly9wdXJwbGUtZmVhdGhlci0xNjJkLmNhdGNoc3BpZGVyMjAwMi53b3JrZXJzLmRldi9gCiAgICApCiAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSkKICAgICAgLnRoZW4oKHgpID0+IHguaGVsbG8uc3BsaXQoIiwiKSkKICAgICAgLnRoZW4oKG5ld1Bvc3RzKSA9PiB7CiAgICAgICAgcmV0dXJuIHsgbmV3UG9zdHMgfTsKICAgICAgfSk7CiAgfQo=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>-->
<script>
  import Footer from "../components/Footer.svelte";
  import { webStore } from "./stores.js";
  import lang from "./_lang.js";
  let strings = lang.strings;

  let website = $webStore || "https://pattern.monster";
  let title = strings.downloads + " - Pattern Monster";
  let page = "/downloads/";
  let url = website + page;
  let keywords = "download, free downloads, " + strings.keywords;
  let desc = "Downloads for Pattern Monster." + " " + strings.description + " " + strings.description3;
  let image = website + "/TwitterBG2.png";

  export let newPosts = [
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
    "Ocean Floor",
    "Electric Summer",
    "Asian Inspiration",
    "Floating Ice",
    "Blushing Pink",
    "Crisp Citrus",
    "Berry Blues",
    "Garden Fresh",
    "Spicy Neutrals",
    "Arctic Sunrise",
    "Neon Night",
    "Hazy Morning",
    "Mediterranean Noon",
    "Sea Breeze",
    "Desert Night",
    "Bamboo Beach",
    "Volcano Floor",
    "Arctic Camouflage",
    "Barren Rock",
    "Pacific Sunset",
    "Vintage Wrapper",
    "Tropic Popsicles",
    "Natural Environment",
    "Vibrant Vibes",
    "Exotic Orchid",
    "Citrus Peel",
    "Bold Geometry",
    "Succulent Garden",
    "Summer Getaway",
    "Royal Bouquet",
    "Caffe Latte",
    "Aqua Splash",
    "Petal Party",
    "Night Sky",
    "Crystal River",
    "Dusty Grass",
    "Deep Relief",
  ];
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(Math.abs((new Date() - new Date(2020, 11, 19)) / oneDay));
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  <link rel="alternate" href={"https://pattern.monster" + page} hreflang="en" />
  <link rel="alternate" href={"https://de.pattern.monster" + page} hreflang="de" />
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
  <meta name="twitter:image:alt" content={title} /><script defer src="https://gumroad.com/js/gumroad.js">
  </script></svelte:head
>
<div class="outer">
  <h1>{strings.downloads}</h1>

  <div class="downloadGrid">
    {#each newPosts as post, i}
      {#if i < diffDays}
        <div class="elementGrid">
          <img src={"downloads/" + post.toLowerCase().replace(/ /g, "-") + "_Twitter.png"} alt={post} title={post} />
          <h2>{post} patterns</h2>
          <a
            class="gumroad-button"
            href={"https://gum.co/" + post.toLowerCase().replace(/ /g, "-") + "?wanted=true"}
            target="_blank"
            data-gumroad-single-product="true">{strings.download}</a
          >
        </div>
      {/if}
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
<style>
  h1 {
    font-size: 2em;
    text-align: center;
    font-weight: 600;
    padding: 0.5em;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
    margin-top: 0;
    text-transform: uppercase;
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
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
