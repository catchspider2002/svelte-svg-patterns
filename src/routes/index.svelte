<script>
  let a = 2;

  $: svgFile =
    "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 10.583 10.583'><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill-rule='evenodd' color='%23000' stroke='black' stroke-width='" +
    Math.round(a * 20)/ 100 +
    "'/><path d='M2.458 0l5.29 5.292-5.29 5.29v.001h.375l5.292-5.291L2.833 0h-.375zM7.75 0l2.833 2.835v-.376L8.125 0H7.75zM0 2.46v.373l2.458 2.459L0 7.75v.374l2.832-2.832L0 2.459zm10.583 5.29L7.75 10.582h.375l2.458-2.458v-.376z' color='%23000' fill-rule='evenodd' stroke='black' stroke-width='" +
    Math.round(a * 20)/ 100 +
    "'/></svg>";
  $: dataURI = '"data:image/svg+xml,' + svgFile + '"';
</script>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

Stroke Size
<label>
  <input type="range" bind:value={a} min="0" max="10" />
  <input type="number" bind:value={a} min="0" max="10" />
</label>

<div id="background" style="background-image: url({dataURI})">
  <h1>Great success!</h1>
  {@html svgFile}
</div>
<code>
{svgFile}
</code>