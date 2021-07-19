<script>
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  import Constants from "./_constants.js";
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
        <li class="versionHeader">July 19, 2021</li>
        <li>Added Spanish translation by malonso for the site which can be accessed <a href="https://es.pattern.monster">here</a></li>
        <li>Search toolbar on the main page remains at the top of the screen when scrolled on large screen devices</li>
        <li class="versionHeader">June 8, 2021</li>
        <li>Added 6 new patterns</li>
        <li class="versionHeader">May 1, 2021</li>
        <li>Added a form for API users to signup for beta access</li>
        <li class="versionHeader">April 30, 2021</li>
        <li>Added 8 new patterns</li>
        <li class="versionHeader">April 26, 2021</li>
        <li>Added Turkish translation by Serkan Iskender for the site which can be accessed <a href="https://tr.pattern.monster">here</a></li>
        <li class="versionHeader">March 31, 2021</li>
        <li>Added Polish translation by gnu-ewm for the site which can be accessed <a href="https://pl.pattern.monster">here</a></li>
        <li class="versionHeader">March 12, 2021</li>
        <li>Added 6 new patterns</li>
        <li class="versionHeader">January 30, 2021</li>
        <li>Added German translation for the site which can be accessed <a href="https://de.pattern.monster">here</a></li>
        <li>Added a dropdown button to choose the language in the navbar</li>
        <li class="versionHeader">January 17, 2021</li>
        <li>Improved the performance of the home page when navigating back from the pattern page</li>
        <li>Added 2 new patterns</li>
        <li>Added new pattern set to <a title="Downloads" href="downloads">Downloads</a></li>
        <li class="versionHeader">January 2, 2021</li>
        <li>Added GitHub stars to the navbar icon</li>
        <li>Added 14 new patterns</li>
        <li>Added 6 pattern set to <a title="Downloads" href="downloads">Downloads</a></li>
        <li class="versionHeader">December 26, 2020</li>
        <li>Added 10 new patterns</li>
        <li>Added 6 pattern set to <a title="Downloads" href="downloads">Downloads</a></li>
        <li class="versionHeader">December 19, 2020</li>
        <li>
          Added
          <a title="Downloads" href="downloads">Downloads</a>
          page to show the free patterns available for download
        </li>
        <li class="versionHeader">December 12, 2020</li>
        <li>Added 12 new patterns for Christmas</li>
        <li>Added 2 controls to adjust the position of the pattern horizontally and vertically</li>
        <li>Replaced rgb with hsl across the app</li>
        <li>Downloaded file will now have the name of the pattern, parameters used and colors in hex</li>
        <li class="versionHeader">December 5, 2020</li>
        <li>Added 8 new patterns</li>
        <li>Added Translate link to translate into multiple languages</li>
        <li>Added Cloudflare analytics which is privacy friendly</li>
        <li>Random patterns are generated from preloaded color palettes</li>
        <li class="versionHeader">November 28, 2020</li>
        <li>Added 12 new patterns</li>
        <li>Updated old patterns with multiple colors</li>
        <li>Fixed the downloaded SVG to be usable on Figma</li>
        <li>Remember the last entered values of height and width</li>
        <li class="versionHeader">November 21, 2020</li>
        <li>Added 12 new patterns</li>
        <li>Fixed accessibility issues</li>
        <li class="versionHeader">November 14, 2020</li>
        <li>Added 6 new patterns</li>
        <li>Added multiple colors for patterns up to 5 colors which can be chosen in the pattern page</li>
        <li>Number of colors a pattern supports is shown under the pattern in the home page</li>
        <li>Added a filter to display the patterns by the number of supported colors</li>
        <li>Reduced the size of generated css and svg by removing the g tag</li>
        <li>Added a search bar to search patterns in the home page</li>
        <li class="versionHeader">November 7, 2020</li>
        <li>Added 6 new patterns</li>
        <li>Added a filter to restrict stroke and fill patterns</li>
        <li>Added sort buttons to order alphabetically and by posted date</li>
        <li>Added tweet button for quick sharing</li>
        <li>Added posted date below the patterns</li>
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
    list-style-type: none;
    margin-bottom: 0.5rem;
    background-image: var(--list-background);
    background-repeat: no-repeat;
  }

  #logs > li:not(.versionHeader) {
    text-indent: 0rem;
    padding-left: 2.25rem;
    line-height: 1.8;
  }

  .versionHeader {
    margin: 3rem -1rem 1rem -2rem;
    background-image: none;
    color: var(--gray-text);
    font-weight: 600;
  }

  a {
    color: var(--accent-text);
    border-bottom: 2px solid var(--accent-text);
    padding-bottom: 0.125em;
  }

  a:hover {
    color: var(--accent-hover);
    border-bottom: 2px solid var(--accent-hover);
  }
</style>
