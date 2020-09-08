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

  import { GoogleAuth } from '@beyonk/svelte-social-auth'
  export let posts;

  let svgPattern = (width, height, path, mode) => {
    let strokeFill = "stroke-width='1' stroke='white' fill='none'";
    if (mode[0] === "fill") strokeFill = "stroke='none' fill='white'";

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
      "' fill='black'/><g " +
      strokeFill +
      ">" +
      path +
      "</g></pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return 'background-image: url("data:image/svg+xml,' + patternNew.replace("#", "%23") + '")';
  };
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
    background: white;
    color: black;
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
  
    <GoogleAuth clientId="205385094273-1miipi41vudre12k31hv3j4qk9tlfq2i.apps.googleusercontent.com" on:auth-success={e => console.dir(e.detail.user)} />

  <div class="samples">
    {#each posts as post}
      <a rel="prefetch" href="patterns/{post.slug}" class="pattern" style={svgPattern(post.width, post.height, post.path, post.mode)}>
        <span>{post.title}</span>
      </a>
    {/each}
  </div>

</div>
