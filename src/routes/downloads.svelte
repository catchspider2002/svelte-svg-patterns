<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  import Constants from "./_constants.js";
  let page = "downloads";
  let { title, url, keywords, desc, image, versions } =
    Constants.pageDetails(page);

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
    "Juicy Peach",
    "Spring Pastels",
    "Night Party",
    "Snowy Mint",
    "Beach Day",
    "Dense Water",
    "Heaven Peach",
    "Summer Splash",
    "Cosmic Fusion",
    "Harvest Gold",
    "Alchemist Lab",
    "Dark Salmon",
    "Rare Wind",
    "Frozen Berry",
    "Shady Water",
    "Backdoor Casual",
    "Summer Games",
    "Cheeky Marguerita",
    "Rich Metal",
    "Secret Romance",
    "Evening Night",
    "Beauty Bush",
    "Plum Bath",
    "Jungle Day",
    "Fresh Oasis",
    "Faraway River",
    // "Sand Strike",
    // "Morpheus Den",
    // "Mars Party",
    // "Morning Salad",
    // "Teen Notebook",
    // "Party Bliss",
    // "Lemon Gate",
    // "Plum Plate",
    // "Fruit Blend",
  ];
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(
    Math.abs((new Date() - new Date(2020, 11, 19)) / oneDay)
  );

  let imagePrefix = "https://giguom.com/pattern.monster/images/";
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  {#if versions}
    {#each versions as version}
      <link rel="alternate" href={version.website} hreflang={version.lang} />
    {/each}
  {/if}
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
  <script defer src="https://gumroad.com/js/gumroad.js"></script>
</svelte:head>
<div class="outer">
  <h1 class="text-center mt-0">{strings.downloads}</h1>

  <div class="downloadGrid">
    {#each newPosts as post, i}
      {#if i < diffDays}
        <div class="elementGrid">
          <img
            loading="lazy"
            src={imagePrefix +
              "downloads/" +
              post.toLowerCase().replace(/ /g, "-") +
              "_Twitter.png"}
            alt={post}
            title={post}
          />
          <h2>{post} patterns</h2>
          <a
            class="button-gumroad"
            href={"https://gum.co/" +
              post.toLowerCase().replace(/ /g, "-") +
              "?wanted=true"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="logo" />
            <span>{strings.download}</span></a
          >
          <!-- <a
            class="gumroad-button"
            href={"https://gum.co/" + post.toLowerCase().replace(/ /g, "-") + "?wanted=true"}
            target="_blank"
            data-gumroad-single-product="true">{strings.download}</a
          > -->
        </div>
      {/if}
    {/each}
  </div>
</div>

<Footer />

<style>
  h1 {
    font-size: 2em;
    font-weight: 600;
    padding: 0.5em;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
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
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: var(--border-radius);
    overflow: hidden;
    padding-bottom: 2em;
  }
  .button-gumroad {
    background-color: white;
    background-image: url(https://app.gumroad.com/button/button_bar.jpg);
    background-repeat: repeat-x;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 40%) 0 0 2px;
    color: #999;
    display: flex;
    font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 44px;
    padding: 0 7.5px;
    text-decoration: none;
    align-items: center;
  }
  .button-gumroad span {
    padding: 0 7.5px;
  }
  .logo {
    background-image: url(https://app.gumroad.com/button/button_logo.png);
    background-size: cover;
    height: 17px;
    width: 16px;
    display: inline-block;
    /* margin-bottom: -3px; */
    margin: 0 7.5px;
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
