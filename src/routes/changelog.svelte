<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import lang from "../locales/en.js";
import Changelog from "./ja/changelog.svelte";
  let strings = lang.strings;

  let website = "https://pattern.monster";
  let title = "Changelog - Pattern Monster";
  let url = website + "/changelog/";
  let keywords = "changelog, svg patterns, patterns, svg backgrounds, vector wallpaper, pattern generator, pattern maker";
  let desc =
    "Changelog for Pattern Monster. Pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging design and more.";
  let image = website + "/TwitterBG2.png";
</script>

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
</style>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
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

<Nav strings={{ tweet: strings.tweet, changeTheme: strings.changeTheme }} />
<main>
  <div class="outer">
    <div class="container mx-auto">
      <h1 class="upper">{strings.changelog}</h1>
      <div>
        <ul id="logs">
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
          <li>6 new patterns</li>
          <li>Added a filter to restrict stroke and fill patterns</li>
          <li>Added sort buttons to order alphabetically and by posted date</li>
          <li>Added tweet button for quick sharing</li>
          <li>Added posted date below the patterns</li>
        </ul>
      </div>
    </div>
  </div>

  <Footer strings={{ lang: 'en', signUp: strings.signUp, changelog: strings.changelog, features: strings.features, privacy: strings.privacy }} />
</main>