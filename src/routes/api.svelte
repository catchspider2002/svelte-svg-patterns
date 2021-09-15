<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  import Constants from "./_constants.js";
  import Values from "./_values.js";
  import Index from "./_index.js";
  let page = "changelog";
  let { title, url, keywords, desc, image, versions } = Constants.pageDetails(page);

  let array = Index;
  // [
  //   { id: 1, val: "hello" },
  //   { id: 2, val: "world" },
  //   { id: 3, val: "sorted" },
  //   { id: 4, val: "table" },
  // ];

  // Holds table sort state.  Initialized to reflect table sorted by id column ascending.
  let sortBy = { col: "id", ascending: true };

  $: sort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
    }

    // Modifier to sorting function for ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1;

    let sort = (a, b) => (a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0);

    array = array.sort(sort);
  };

  let checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon mx-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>`;
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

<div class="secondary-text-color pattern-bg p-8">
  <div class="container mx-auto">
    <h1 class="text-center mt-6 p-2 mb-2 font-semibold text-4xl uppercase">{strings.changelog}</h1>
    <div>
      <table class="mx-auto">
        <thead>
          <tr>
            <th on:click={sort("title")}>Title</th>
            <th on:click={sort("slug")}>Name</th>
            <th on:click={sort("mode")}>Mode</th>
            <th on:click={sort("mode")}>Stroke Join</th>
            <th on:click={sort("colors")}>Max Colors</th>
            <th on:click={sort("maxStroke")}>Max Stroke</th>
            <th on:click={sort("maxScale")}>Max Scale</th>
            <th on:click={sort("maxSpacing")}>Max Spacing</th>
          </tr>
        </thead>
        <tbody>
          {#each array as item}
            <tr>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.mode == "stroke-join" ? "stroke" : item.mode}</td>
              <td>{@html item.mode == "stroke-join" ? checkIcon : ""}</td>
              <td class="text-end">{item.colors}</td>
              <td class="text-end">{item.maxStroke}</td>
              <td class="text-end">{item.maxScale}</td>
              <td class="text-center">{item.maxSpacing.toString().replace(",", "|")}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<Footer />

<style>
  table,
  th,
  td {
    border: 1px solid rgba(var(--blockquote-color), 0.5);
    border-collapse: collapse;
  }
  td {
    padding: 0.75rem 1rem;
  }
  th {
    position: sticky;
    top: 2.8em;
    background-color: var(--card-bg);
    padding: 1rem 0.5rem;
  }
  th {
    cursor: pointer;
  }
</style>
