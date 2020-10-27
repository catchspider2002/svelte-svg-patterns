<script context="module">
  export function preload({ params, query }) {
    return (
      this.fetch(`index.json`)
        .then(r => r.json())
        // .then((r, postMode) => r.filter(pattern => pattern.mode === postMode))
        .then(posts => {
          return { posts };
        })
    );
  }
</script>

<script>
  // function reload() {
  //   console.log("Reload");
  //   return posts => {
  //     posts.filter(pattern => pattern.mode === "fill");
  //   };
  // }
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";
  export let posts;
  import { themeStore } from "./stores.js";

  // let count_value;
  // themeStore.subscribe(value => {
  //   count_value = value;
  //   // console.log("store Theme: " + value);
  // });

  let website = "https://pattern.monster";

  // $: colors = ["white", "black"];
  $: colors = [$themeStore === "light" ? "white" : "black", $themeStore === "light" ? "black" : "white"];

  // let Pickr;

  $: svgPattern = (width, height, path, mode) => {
    let strokeFill = "stroke-width='1' stroke='" + colors[1] + "' fill='none'";
    if (mode === "fill") strokeFill = "stroke='none' fill='" + colors[1] + "'";

    let patternNew =
      "<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
      "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
      width +
      "' height='" +
      height +
      "'><rect x='0' y='0' width='" +
      width +
      "' height='" +
      height +
      "' fill='" +
      colors[0] +
      "'/><g " +
      strokeFill +
      ">" +
      path +
      "</g></pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return 'background-image: url("data:image/svg+xml,' + patternNew.replace("#", "%23") + '")';
  };

  // let defaultColors
  // onMount(async () => {
  //   defaultColors = localStorage.getItem("defaultColors");

  //   if (!defaultColors) {
  //     defaultColors = ["white", "black"];

  //     localStorage.setItem("defaultColors", defaultColors);
  //   }
  //   // document.documentElement.setAttribute("dat/a-theme", defaultColors);
  // });
</script>

<style>
  .patternsList {
    color: #1a202c;
    background-color: var(--pattern-bg);
    padding: 2em;
  }

  a {
    display: flex;
    height: 100%;
    align-content: center;
    justify-content: center;
    text-decoration: none;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  a span {
    color: var(--accent-text-color);
    background-color: var(--secondary-text-color);
    align-self: center;
    padding: 4px 8px;
  }

  .samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2em;
    align-items: center;
    /* padding: 2em 0; */
  }

  .pattern {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .pattern:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(10 / 16 * 100%);
  }
  h1 {
    font-size: 2em;
    text-align: center;
    padding: 0.5em;
    color: var(--secondary-text-color);
  }
  p {
    color: var(--secondary-text-color);
    padding-bottom: 1.5em;
  }
</style>

<svelte:head>
  <title>Pattern Monster - SVG Pattern Generator</title>
  <link rel="canonical" href="{website}/" />
  <meta
    name="description"
    content="Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more." />
  <meta name="keywords" content="svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker" />

  <!-- Open Graph / Facebook -->
  <meta property="og:site_name" content="Pattern.Monster" />
  <meta property="og:title" content="Pattern Monster" />
  <meta
    property="og:description"
    content="Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more." />
  <meta property="og:image" content="{website}/TwitterBG1.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{website}/" />

  <!-- Twitter -->
  <meta name="twitter:title" content="Pattern Monster" />
  <meta
    name="twitter:description"
    content="Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pattern_monster" />
  <meta name="twitter:image" content="{website}/TwitterBG1.png" />
  <meta name="twitter:image:src" content="{website}/TwitterBG1.png" />

  <!-- <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{website}/{post.slug}" />
  <meta property="twitter:title" content={post.title} />
  <meta property="twitter:description" content={post.slug} />
  <meta property="twitter:image" content="{website}/social/{post.slug}.png" /> -->
</svelte:head>

<div class="patternsList">
  <h1>{posts.length} free customizable patterns for your projects</h1>
  <p class="container mx-auto">
    A simple online pattern generator to create repeatable SVG patterns. Speed up your website without compromising on image quality.
    Perfect for website backgrounds, apparel, branding, packaging design and more.
  </p>

  <!-- <div>
    <button
      on:click={() => {
        console.log('Clciked');
        reload();
      }}>All</button>
    <button>Stroke</button>
    <button>Fill</button>
    <button>All</button>
    <button>All</button>
  </div> -->
  <div class="samples">
    {#each posts as post}
      <a rel="prefetch" href={post.slug} class="pattern" style={svgPattern(post.width, post.height, post.path, post.mode)}>
        <span>{post.title}</span>
      </a>
    {/each}
  </div>
</div>

<Footer />
