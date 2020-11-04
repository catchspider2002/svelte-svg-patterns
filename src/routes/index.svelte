<script context="module">
  export function preload({ params, query }) {
    return (
      this.fetch(`index.json`)
        .then((r) => r.json())
        // .then((r, postMode) => r.filter(pattern => pattern.mode === postMode))
        .then((posts) => {
          return { posts };
        })
    );
  }
</script>

<script>
  // function fillPatterns() {
  //   newPosts = posts.filter((pattern) => pattern.mode === "fill");
  // }
  // function strokePatterns() {
  //   newPosts = posts.filter((pattern) => pattern.mode === "stroke" || pattern.mode === "stroke-join");
  // }
  // function allPatterns() {
  //   newPosts = posts;
  // }

  import Footer from "../components/Footer.svelte";
  import Constants from "../routes/_constants.js";
  // import { onMount } from "svelte";
  export let posts;
  $: newPosts = posts;
  import { themeStore } from "./stores.js";

  // let count_value;
  // themeStore.subscribe(value => {
  //   count_value = value;
  //   // console.log("store Theme: " + value);
  // });
  $: index = "all";
  let options = [
    { text: "All", value: "all" },
    { text: "Stroke", value: "stroke" },
    { text: "Fill", value: "fill" },
  ];

  function selectChanged() {
    if (index === "fill") newPosts = posts.filter((pattern) => pattern.mode === "fill");
    else if (index === "stroke") newPosts = posts.filter((pattern) => pattern.mode === "stroke" || pattern.mode === "stroke-join");
    else newPosts = posts;
  }

  let website = "https://pattern.monster";

  // $: colors = ["white", "black"];
  $: colors = [$themeStore === "light" ? "white" : "rgb(42,42,48)", $themeStore === "light" ? "rgb(128,90,213)" : "rgb(236,201,75)"];

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
    border-radius: var(--border-radius);
  }

  a span {
    color: var(--accent-text-color);
    background-color: var(--secondary-text-color);
    align-self: center;
    border-radius: var(--border-radius);
    padding: 0.25em 0.625em;
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
  .stats {
    color: var(--secondary-text-color);
    margin: 0 auto;
    display: grid;
    /* grid-auto-flow: column; */
    grid-template-columns: auto auto auto auto;
    column-gap: 2em;
    row-gap: 0.5em;
    place-content: center;
  }
  .stats-grid {
    display: grid;
    grid-auto-flow: column;
    opacity: 0.75;
    gap: 0.75em;
    place-content: start;
  }
  .highlight {
    color: var(--accent-text);
  }
  .outerGrid {
    display: grid;
    grid-auto-flow: column;
    /* justify-items: center; */
    place-content: start;
    place-items: center;
    gap: 1em;
    color: var(--accent-text);
    padding-bottom: 2em;
  }
  .filterGrid {
    display: grid;
    grid-auto-flow: column;
    /* justify-items: center; */
    place-content: start;
    place-items: center;
    gap: 1em;
  }

  @media (max-width: 768px) {
    h1 {
      text-align: left;
      padding: 0.5em 0;
    }
    p {
      text-align: left;
    }
    .stats {
      place-content: start;
    }
    .samples {
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    }
  }

  @media (max-width: 640px) {
    .patternsList {
      padding: 1.5em;
    }
    .stats {
      grid-template-columns: auto auto;
    }
  }

  @media (max-width: 380px) {
    .patternsList {
      padding: 1em;
    }
    .stats {
      grid-template-columns: auto;
    }
  }

  /* Select Styling */
  /* class applies to select element itself, not a wrapper element */
  .select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference
        
    */
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right 0.7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: 0.65em auto, 100%;
  }
  /* Hide arrow icon in IE browsers */
  .select-css::-ms-expand {
    display: none;
  }
  /* Hover style */
  .select-css:hover {
    border-color: #888;
  }
  /* Focus style */
  .select-css:focus {
    border-color: #aaa;
    /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
    box-shadow: 0 0 1px 3px var(--secondary-color-hover);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  /* Set options to normal weight */
  .select-css option {
    font-weight: normal;
  }

  /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"] .select-css,
  :root:lang(ar) .select-css,
  :root:lang(iw) .select-css {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  }

  /* Disabled styles */
  .select-css:disabled,
  .select-css[aria-disabled="true"] {
    color: graytext;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  }

  .select-css:disabled:hover,
  .select-css[aria-disabled="true"] {
    border-color: #aaa;
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
  <meta property="og:image" content="{website}/TwitterBG2.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{website}/" />

  <!-- Twitter -->
  <meta name="twitter:title" content="Pattern Monster" />
  <meta
    name="twitter:description"
    content="Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@pattern_monster" />
  <meta name="twitter:image" content="{website}/TwitterBG2.png" />
  <meta name="twitter:image:src" content="{website}/TwitterBG2.png" />

  <!-- <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{website}/{post.slug}" />
  <meta property="twitter:title" content={post.title} />
  <meta property="twitter:description" content={post.slug} />
  <meta property="twitter:image" content="{website}/social/{post.slug}.png" /> -->
</svelte:head>

<div class="patternsList">
  <h1>Customizable <span class="highlight">SVG patterns</span> for your projects</h1>
  <div class="stats">
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.trending} />
      </svg>
      {posts.length}
      patterns
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.download} />
      </svg>
      CSS, SVG, PNG
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.license} />
      </svg>
      MIT License
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.release} />
      </svg>
      Free
    </div>
  </div>
  <p class="container mx-auto">
    A simple online pattern generator to create repeatable SVG patterns. Speed up your website without compromising on image quality. Perfect for
    website backgrounds, apparel, branding, packaging design and more.
  </p>

  <!-- <div>
    <button on:click={allPatterns}>All</button>
    <button on:click={strokePatterns}>Stroke</button>
    <button on:click={fillPatterns}>Fill</button>
  </div> -->
  <div class="outerGrid">
    <div class="filterGrid">
      Filter
      <select class="select-css" bind:value={index} on:change={selectChanged}>
        {#each options as option, i}
          <option value={option.value}>{option.text}</option>
        {/each}
      </select>
    </div>
    {#if index !== 'all'}{newPosts.length} patterns{/if}
  </div>
  <div class="samples">
    {#each newPosts as post}
      <a rel="prefetch" href={post.slug} class="pattern" style={svgPattern(post.width, post.height, post.path, post.mode)}>
        <span>{post.title}</span>
      </a>
    {/each}
  </div>
</div>

<Footer />
