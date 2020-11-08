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
  import { onMount } from "svelte";
  export let posts;
  $: newPosts = posts;
  import { themeStore } from "./stores.js";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  // let count_value;
  // themeStore.subscribe(value => {
  //   count_value = value;
  //   // console.log("store Theme: " + value);
  // });

  // import cldrData from "cldr-data";
  // import Globalize from "globalize";
  // import RelativeTime from "relative-time";

  dayjs.extend(relativeTime);

  // console.log(dayjs().from(dayjs("1990"))); // 2 years ago
  // console.log(dayjs().from(dayjs(), true)); // 2 years

  // console.log(dayjs().fromNow());

  // console.log(dayjs().to(dayjs()));

  // console.log(dayjs().toNow());

  onMount(async () => {});

  $: index = "all";
  let filterOptions = [
    { text: "All", value: "all" },
    { text: "Stroke", value: "stroke" },
    { text: "Fill", value: "fill" },
  ];
  // let sortOptions = [
  //   { text: "Alphabetical A-Z", value: "az" },
  //   { text: "Alphabetical Z-A", value: "za" },
  //   { text: "Oldest first", value: "old" },
  //   { text: "Newest first", value: "new" },
  // ];

  function filterChanged() {
    if (index === "fill") newPosts = posts.filter((pattern) => pattern.mode === "fill");
    else if (index === "stroke") newPosts = posts.filter((pattern) => pattern.mode === "stroke" || pattern.mode === "stroke-join");
    else newPosts = posts;
  }

  function sortAlphabetical() {
    newPosts = newPosts.sort(function (x, y) {
      let a = x.title.toUpperCase(),
        b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    });
  }

  function sortAlphabeticalReverse() {
    newPosts = newPosts.sort(function (x, y) {
      let a = x.title.toUpperCase(),
        b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? -1 : 1;
    });
  }

  function sortLatest() {
    sortAlphabetical();
    newPosts = newPosts.sort(function (x, y) {
      let a = new Date(x.creationDate),
        b = new Date(y.creationDate);
      return a == b ? 0 : a > b ? -1 : 1;
    });
  }

  function sortOldest() {
    sortAlphabetical();
    newPosts = newPosts.sort(function (x, y) {
      let a = new Date(x.creationDate),
        b = new Date(y.creationDate);
      return a == b ? 0 : a > b ? 1 : -1;
    });
  }

  let website = "https://pattern.monster";

  // $: colors = ["white", "black"];
  $: colors = [
    $themeStore === "light" ? "white" : "rgb(42,42,48)",
    $themeStore === "light" ? "rgb(128,90,213)" : "rgb(236,201,75)",
    "red",
    "green",
    "purple",
  ];

  // let Pickr;

  $: svgPattern = (width, height, path, mode) => {
    let strokeGroup = "";

    for (let i = 0; i < path.split("~").length; i++) {
      let strokeFill = "stroke-width='1' stroke='" + colors[i + 1] + "' fill='none'";
      if (mode === "fill") strokeFill = "stroke='none' fill='" + colors[i + 1] + "'";

      strokeGroup += path.split("~")[i].replace("/>", " " + strokeFill + "/>");
    }

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
      "'/>" +
      strokeGroup +
      "</pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
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
    color: var(--secondary-text-color);
    /* padding: 2em 0; */
  }
  .outerPattern {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: var(--border-radius);
    overflow: hidden;
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
    /* opacity: 0.75; */
    color: var(--gray-text);
    gap: 0.75em;
    place-content: start;
  }
  .highlight {
    color: var(--accent-text);
  }
  .outerGrid {
    display: grid;
    /* width: 100%; */
    grid-auto-flow: column;
    /* justify-items: center; */
    /* place-content: start; */
    place-items: center;
    gap: 1em;
    color: var(--secondary-text-color);
    padding-bottom: 2em;
  }
  .filterGrid {
    display: grid;
    grid-auto-flow: column;
    /* justify-items: center; */
    place-content: start;
    place-items: center;
    justify-self: start;
    gap: 1em;
  }
  .sortGrid {
    display: grid;
    place-items: start;
    align-items: center;
    grid-auto-flow: column;
    justify-self: end;
    /* gap: 1em; */
  }
  .sortInner {
    display: flex;
    /* gap: 0; */
    place-items: start;
    align-items: center;
    flex-wrap: nowrap;
    /* grid-template-columns: auto auto auto auto; */
    /* justify-items: center; */
    /* place-content: end;
    place-items: center; */
    justify-self: end;
    /* gap: 1em; */
  }
  .sortInner button {
    margin-left: 1em;
  }

  button {
    border: 0.125em solid var(--accent-text);
    color: var(--accent-text);
    background-color: transparent;
  }

  .details {
    background-color: var(--svg-bg);
    color: var(--gray-text);
    font-size: 0.9em;
    display: grid;
    grid-auto-flow: column;
    gap: 1em;
    padding: 0.5em;
    line-height: 1;
  }

  .postDate {
    text-align: right;
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
    .outerGrid {
      grid-auto-flow: row;
    }
    .sortGrid {
      justify-self: start;
    }
  }
  @media (max-width: 440px) {
    .outerGrid {
      padding-bottom: 1em;
    }
    .sortGrid {
      align-items: flex-start;
    }
    .sortGrid span {
      margin-top: 0.5em;
      margin-right: 1em;
    }
    .sortInner {
      place-items: start;
      flex-wrap: wrap;
      align-items: center;
    }
    .sortInner button {
      margin-left: 0;
      margin-right: 1em;
      margin-bottom: 1em;
    }
    .sortInner button:last-child {
      margin-right: 0;
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
    color: var(--secondary-text-color);
    line-height: 1.3;
    padding: 0.6em 2.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: var(--border-radius);
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--input-bg);
    /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference
        
    */
    background-image: var(--input-background);
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right 0.7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: 1.2em auto, 100%;
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
    color: var(--secondary-text-color);
    outline: none;
  }

  /* Set options to normal weight */
  .select-css option {
    font-weight: normal;
    padding: 10px 10px;
  }

  /* Support for rtl text, explicit support for Arabic and Hebrew */
  *[dir="rtl"] .select-css,
  :root:lang(ar) .select-css,
  :root:lang(iw) .select-css {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
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

  <div class="outerGrid">
    <div class="filterGrid">
      Filter
      <select class="select-css" bind:value={index} on:change={filterChanged}>
        {#each filterOptions as option, i}
          <option value={option.value}>{option.text}</option>
        {/each}
      </select>
    </div>
    <div class="sortGrid">
      <span>Sort</span>
      <div class="sortInner">
        <button on:click={sortLatest}>Latest</button>
        <button on:click={sortOldest}>Oldest</button>
        <button on:click={sortAlphabetical}>A-Z</button>
        <button on:click={sortAlphabeticalReverse}>Z-A</button>
      </div>
    </div>
  </div>
  <div class="samples">
    {#each newPosts as post}
      <div class="outerPattern">
        <a rel="prefetch" href={post.slug} class="pattern" style={svgPattern(post.width, post.height, post.path, post.mode)}>
          <span>{post.title}</span>
        </a>
        <div class="details">
          <div class="numColors">{post.colors} colors</div>
          <div class="postDate" title="Date Added">{dayjs().to(dayjs(post.creationDate), false)}</div>
        </div>
      </div>
    {/each}
  </div>
</div>

<Footer />
