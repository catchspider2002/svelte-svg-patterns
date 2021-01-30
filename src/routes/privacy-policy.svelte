<script>
  import Footer from "../components/Footer.svelte";
  import { webStore } from "./stores.js";

  let website = $webStore || "https://pattern.monster";
  let title = "Privacy Policy - Pattern Monster";
  let page = "/privacy-policy/";
  let url = website + page;
  let keywords = "svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker";
  let desc =
    "Privacy Policy for Pattern Monster. Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more.";
  let image = website + "/TwitterBG2.png";
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
  <meta name="twitter:image:alt" content={title} />
</svelte:head>
<div>
  <h1>PRIVACY POLICY</h1>
  <p>This app does not collect or store any user data</p>
</div>

<Footer />

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
  p {
    color: var(--secondary-text-color);
    padding-bottom: 1.5em;
    padding-top: 0.5em;
    text-align: center;
  }
  div {
    background-color: var(--pattern-bg);
    padding: 2em;
  }
</style>
