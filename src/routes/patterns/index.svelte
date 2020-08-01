<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`patterns.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;

  let svgPattern = (width, height, viewBoxWidth, viewBoxHeight, path) => {
    let svgFile =
      "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      width +
      "' height='" +
      height +
      "' viewBox='0 0 " +
      viewBoxWidth +
      " " +
      viewBoxHeight +
      "'><rect x='0' y='0' width='" +
      width +
      "' height='" +
      height +
      "' fill='white'/><g fill='none' stroke='black' stroke-width='0.5'>" +
      path +
      "</g></svg>";
    return 'background-image: url("data:image/svg+xml,' + svgFile + '")';
  };
</script>

<style>
  .patternsList {
    font-family: "Dosis", sans-serif;
    font-family: "Harmattan", sans-serif;
    font-family: "Josefin Sans", sans-serif;
    background-color: #1a202c;
    color: #edf2f7;
  }

  ul {
    margin: 0 0 1em 0;
	line-height: 1.5;
	list-style: none
  }

  li {
    height: 240px;
	width: 240px;
	margin: 20px;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect x='0' y='0' width='40' height='40' fill='white'/><g fill='none' stroke='black' stroke-width='0.5'><path d='M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 6.495zM47.5 26.495h-15l7.5-12.99z'/></g></svg>");
  }

  a {
    display: flex;
    height: 100%;
    align-content: center;
    justify-content: center;
    text-decoration: none;
  }

  a span {
    background: black;
    color: white;
    align-self: center;
    padding: 4px 8px;
  }
</style>

<svelte:head>
  <title>Patterns</title>
</svelte:head>
<div class="patternsList">
  <!-- <h1>List of Patterns</h1> -->
  <br>

  <ul>
    {#each posts as post}
      <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
      <li
        style={svgPattern(post.width, post.height, post.viewBoxWidth, post.viewBoxHeight, post.path)}>
        <a rel="prefetch" href="patterns/{post.slug}">
          <span>{post.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
