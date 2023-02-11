<script context="module">
  export async function preload(params, session) {
    if (session.SUPABASE_URL) {
      const supabase = createClient(session.SUPABASE_URL, session.SUPABASE_KEY);
      let page = "stationery-office";

      const { data, error } = await supabase
        .from("patterns_v")
        .select("pattern_id,pattern_name,category_id,category_name,image_id,item_id,creation_date,cost,from_cost,short_name,image_suffix")
        .match({ category_name: page })
        .order("creation_date", { ascending: false });

      return { data };
    }
  }
</script>

<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;
  let page = "stationery-office";

  import Constants from "./_constants.js";

  import { createClient } from "@supabase/supabase-js";
  export let data;

  let { title, url, keywords, desc, image, versions } = Constants.pageDetails(page);
  data.sort((a, b) => strings[a.item_id].localeCompare(strings[b.item_id]));

  let selection = data[0].category_id;

  $: selectedCategory = data.filter((category) => category.category_id === selection);

  let categories = data.map((cat) => {
    return {
      category_id: cat.category_id,
      item_id: cat.item_id,
      cost: cat.cost,
      from_cost: cat.from_cost,
    };
  });
  const uniqCategories = [...new Map(categories.map((item) => [item["category_id"], item])).values()];

  $: selectedUnique = uniqCategories.filter((category) => category.category_id === selection);
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
</svelte:head>

<section class="p-2 py-6 secondary-text-color pattern-bg pb-20">
  <h1 class="text-center mt-12 p-2 mb-2 pb-6 font-semibold text-4xl uppercase">{strings[page]}</h1>

  <div class="container mx-auto">
    <!-- <div class="range2Controls mt-8"> -->
    <div class="radio-toolbar">
      {#each uniqCategories as cat}
        <input type="radio" id={cat.category_id} name="bg" value={cat.category_id} bind:group={selection} />
        <label class="disable-select" for={cat.category_id}>{strings[cat.item_id]}</label>
      {/each}
    </div>
    <!-- </div> -->
  </div>
  <div class="container mx-auto gray-text p-4 pt-12 pb-4 title">
    <h2 class="inline-block font-semibold secondary-text-color">{strings[selectedUnique[0].item_id]}</h2>
    <h3 class="inline-block font-normal">
      &nbsp;({selectedUnique[0].from_cost ? "From " : ""}
      {selectedUnique[0].cost})
    </h3>
    <ul class="shopFeatures">
      {@html strings[`${selectedUnique[0].item_id}-desc`]}
    </ul>
  </div>
  <div class="shop container mx-auto grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
    {#each selectedCategory as link, i}
      {#if i % 10 == 4}
        <a
          target="_blank" rel="noopener noreferrer"
          href="https://www.redbubble.com/i/{link.short_name}/{link.pattern_name.replace(
            ' ',
            '-'
          )}-Pattern-Monster-by-catchspider2002/{link.pattern_id}.{link.category_id}?asc=u"
          class="col-span-2 row-span-2 md:col-start-3 md:row-start-{(i % 10) * Math.round(i / 10) + 1}"
        >
          <img src="https://ih1.redbubble.net/image.{link.image_id}/{link.image_suffix}.jpg" alt="" class="right min-h-96 transition" />
        </a>
      {:else if i % 10 == 5}
        <a
          target="_blank" rel="noopener noreferrer"
          href="https://www.redbubble.com/i/{link.short_name}/{link.pattern_name.replace(
            ' ',
            '-'
          )}-Pattern-Monster-by-catchspider2002/{link.pattern_id}.{link.category_id}?asc=u"
          class="col-span-2 row-span-2 md:col-start-1 md:row-start-3"
        >
          <img src="https://ih1.redbubble.net/image.{link.image_id}/{link.image_suffix}.jpg" alt="" class="left rounded min-h-96 transition" />
        </a>
      {:else}
        <a
          target="_blank" rel="noopener noreferrer"
          href="https://www.redbubble.com/i/{link.short_name}/{link.pattern_name.replace(
            ' ',
            '-'
          )}-Pattern-Monster-by-catchspider2002/{link.pattern_id}.{link.category_id}?asc=u"
        >
          <img src="https://ih1.redbubble.net/image.{link.image_id}/{link.image_suffix}.jpg" alt="" class="min-h-48 transition" />
        </a>
      {/if}
    {/each}
  </div>
</section>

<Footer />

<style>
  .shop,
  .radio-toolbar {
    box-sizing: border-box;
    width: 100%;
    margin: -0.5rem;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    /* gap: 1rem; */
    padding: 1rem;
  }
  img,
  img.right,
  img.left {
    border: 0px solid;
    box-sizing: border-box;
    border-style: solid;
    display: block;
    height: 100%;
    max-width: 100%;
    --tw-border-opacity: 1;
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
    width: 100%;
    border-radius: 0.25rem;
    --tw-bg-opacity: 1;
    background-color: rgba(var(--gray-500), var(--tw-bg-opacity));
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  @media (min-width: 768px) {
    .shop {
      grid-template-columns: repeat(4, minmax(0px, 1fr));
    }
    .md\:col-start-3 {
      grid-column-start: 3;
    }
    .md\:col-start-1 {
      grid-column-start: 1;
    }
    .md\:row-start-1 {
      grid-row-start: 1;
    }
    .md\:row-start-5 {
      grid-row-start: 5;
    }
    .md\:row-start-9 {
      grid-row-start: 9;
    }
  }

  .range2Controls {
    display: flex;
    gap: 3.5em 2em;
    align-items: center;
  }

  .radio-toolbar {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
  }

  .radio-toolbar input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .radio-toolbar label {
    display: inline-grid;
    gap: 0.25em;
    grid-auto-flow: column;
    padding: 0.35rem 0.6rem;
    margin: 0.5rem;
    place-items: center;
    font-size: 1rem;
    background-color: var(--gray-bg);
    color: var(--gray-text);
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  .radio-toolbar label::before {
    content: var(--circle);
    color: currentColor;
  }

  .radio-toolbar label:hover {
    color: var(--secondary-text-color);
  }

  .radio-toolbar input[type="radio"]:checked + label {
    background-color: var(--accent-text);
    color: var(--accent-text-color);
  }

  .radio-toolbar input[type="radio"]:checked + label::before {
    content: var(--radio);
  }

  .disable-select {
    -webkit-user-select: none;
    user-select: none;
  }

  .transition {
    transform: scaleX(1) scaleY(1);
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 500ms;
  }

  .transition:hover {
    transform: scaleX(1.15) scaleY(1.15);
  }

  a {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .title {
    font-size: 0.9em;
  }
  h3 {
    color: rgba(var(--blockquote-color), 0.8);
  }
</style>
