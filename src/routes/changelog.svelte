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

<div class="outer">
  <div class="container mx-auto">
    <h1>{strings.changelog}</h1>
    <div>
      <ul id="logs">
        {#each Values.changeLog as log}
          <li class="versionHeader">{log.date}</li>
          {#each log.updates as logData}
            <li>{@html logData}</li>
          {/each}
        {/each}
      </ul>
    </div>
  </div>
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
    text-transform: uppercase;
  }
  .outer {
    background-color: var(--pattern-bg);
    color: var(--secondary-text-color);
    padding: 2em;
  }
  li {
    margin-bottom: 0.5rem;
  }

  #logs > li:not(.versionHeader) {
    text-indent: 0rem;
    padding: 0 1rem;
    line-height: 1.8;
    list-style: circle;
  }

  .versionHeader {
    margin: 3rem -2rem 1rem -2rem;
    list-style-type: none;
    background-image: none;
    color: var(--gray-text);
    font-weight: 600;
  }

  :global(#logs > li > a) {
    color: var(--accent-text);
    border-bottom: 2px solid var(--accent-text);
    padding-bottom: 0.125em;
  }

  :global(#logs > li > a:hover) {
    color: var(--accent-hover);
    border-bottom: 2px solid var(--accent-hover);
  }
</style>
