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

  

  let svgPattern = (width, height, path) => {
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
      "' fill='black'/><g stroke-width='1' stroke='white' fill='none'>" +
      path +
      "</g></pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return 'background-image: url("data:image/svg+xml,' + patternNew.replace("#", "%23") + '")';
  };

  // let svgPattern = (width, height, path) => {
  //   let svgFile = 
  //     "<svg xmlns='http://www.w3.org/2000/svg' width='" +
  //     width +
  //     "' height='" +
  //     height +
  //     "' viewBox='0 0 " +
  //     width +
  //     " " +
  //     height +
  //     "'><rect x='0' y='0' width='" +
  //     width +
  //     "' height='" +
  //     height +
  //     "' fill='white'/><g fill='none' stroke='black' stroke-width='0.5'>" +
  //     path +
  //     "</g></svg>";
  //   return 'background-image: url("data:image/svg+xml,' + svgFile + '")';
  // };
</script>

<style>
  .patternsList {
    background-color: #1a202c;
    color: #edf2f7;
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
    background: black;
    color: white;
    align-self: center;
    padding: 4px 8px;
  }

  .samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 32px;
    row-gap: 32px;
    align-items: center;
    padding: 2em 0;
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
</style>

<svelte:head>
  <title>Patterns</title>
</svelte:head>
<div class="patternsList">
  <!-- <h1>List of Patterns</h1> -->

  <div class="samples">
    {#each posts as post}
      <a
        rel="prefetch"
        href="patterns/{post.slug}"
        class="pattern"
        style={svgPattern(post.width, post.height, post.path)}>
        <span>{post.title}</span>
      </a>
    {/each}
  </div>

</div>
