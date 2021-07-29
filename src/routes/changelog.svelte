<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  import Constants from "./_constants.js";
  import Values from "./_values.js";
  let page = "changelog";
  let { title, url, keywords, desc, image, versions } = Constants.pageDetails(page);
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
      <ul id="logs">
        {#each Values.changeLog as log}
          <li class="versionHeader font-semibold gray-text list-none bg-none -mx-8 mb-4 mt-12">{log.date}</li>
          {#each log.updates as logData}
            <li class="px-4 mb-2 list-circle indent-0 leading-loose">{@html logData}</li>
          {/each}
        {/each}
      </ul>
    </div>
  </div>
</div>

<Footer />
