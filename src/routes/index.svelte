<script>
  import { onMount } from "svelte";
  import { fade, draw, fly } from "svelte/transition";
  $: stroke = 3;
  $: angle = "30";
  $: scale = 4;

  const palettes = [
    ["#44337a", "#ffc800", "#FFFFFF", "#FF0054", "#00A878"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
    ["#000000", "#14213d", "#fca311", "#e5e5e5", "#ffffff"],
    ["#f4f1de", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
    ["#247ba0", "#70c1b3", "#b2dbbf", "#f3ffbd", "#ff1654"],
    ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
    ["#9381ff", "#b8b8ff", "#f8f7ff", "#ffeedd", "#ffd8be"],
    ["#20bf55", "#0b4f6c", "#01baef", "#fbfbff", "#757575"]
  ];
  let size = 220;
  $: colorPalette = palettes[0];

  function svgIcon(strokeClass, rectClass, patternId) {
    return (
      '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern class="' +
      strokeClass +
      '" height="80" id="' +
      patternId +
      '" patternTransform="scale(2) rotate(30)" patternUnits="userSpaceOnUse" width="20"><rect class="' +
      rectClass +
      '" fill="#44337a" height="100%" width="100%" x="0" y="0"></rect><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,0)" stroke="#ffc800" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,20)" stroke="#FFFFFF" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,40)" stroke="#FF0054" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,60)" stroke="#00A878" class="' +
      strokeClass +
      '" d="M -2.3354725e-8,9.8330078 H 20 Z"></path></pattern></defs><g><rect fill="url(#' +
      patternId +
      ')" height="100%" width="220" x="-20"></rect></g></svg>'
    );
  }
</script>

<style>
  :root {
    --main-bg-color: #1a202c;
    /* --accent-color: rgb(255, 218, 6); */
    --accent-color: #44337a;
    --secondary-color: #ffc800;
    --accent-text-color: #ffffff;
    --secondary-text-color: #000000;
    --accent-color-hover: rgba(255, 218, 6, 0.8);
    --border-radius: 4px;
    --text-gray-300: #e2e8f0;
    --text-gray-400: #1a202c;
    --text-gray-500: #a0aec0;
    --text-gray-700: #1a202c;
    --text-gray-900: #1a202c;
  }
  .accent-text {
    color: var(--accent-color);
  }
  /*  .secondary-text {
    color: var(--secondary-color);
  }
  .primary-font {
    font-family: "Josefin Sans", sans-serif;
  }*/
  .secondary-font {
    font-family: "Montserrat", sans-serif;
  }
  button {
    font-size: 1em;
  }
  .p-6 {
    padding: 1.5rem;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .border-b {
    border-bottom-width: 1px;
  }
  .pb-10 {
    padding-bottom: 2.5rem;
  }
  .mb-10 {
    margin-bottom: 2.5rem;
  }
  .border-gray-800 {
    border-color: #2d3748;
  }

  .container {
    max-width: 1280px;
  }

  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .items-center {
    align-items: center;
  }
  .big-icon .iconify {
    font-size: 4em;
    line-height: 1em;
  }
  .normal-icon .iconify {
    font-size: 2em;
    line-height: 1em;
  }
  .landing {
    color: black;
    background-color: var(--accent-color);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    column-gap: 32px;
    min-height: 90vh;
  }
  .topSide {
  }
  #logo {
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    align-items: flex-end;
  }
  #logoText {
    color: var(--accent-text-color);
    font-weight: 600;
    padding-left: 8px;
  }
  .comingSoon {
    font-size: 0.875em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-bottom: 1rem;
  }
  h1 {
    color: var(--secondary-color);
    font-size: 4em;
    margin-top: 0.5rem;
    line-height: 0.75em;
  }
  h2 {
    color: black;
    font-weight: 600;
    font-size: 2em;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    /* line-height: 1.75rem; */
    font-size: 1.125em;
  }
  .subscribe {
  }
  .bottomSide {
    position: relative;
  }
  .svgContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .toolbox {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 360px;
    height: 240px;
    color: var(--secondary-color);
    padding: 1rem 1.5rem;
    column-gap: 1em;
    row-gap: 1em;
    background: var(--main-bg-color);
    grid-template-columns: auto 1fr;
    border-radius: var(--border-radius);
  }
  .features {
    background-color: var(--secondary-color);
  }
  .featureContainer {
    padding: 6rem 1.25rem;
  }
  .featureHeading {
    text-align: left;
    margin-top: 1.5rem;
  }
  .featureDescription {
    line-height: 1.625;
    font-size: 1em;
    color: var(--main-bg-color);
    font-family: "Montserrat", sans-serif;
  }
  .radio-toolbar {
    margin: 0 1rem;
    grid-template-columns: repeat(6, 1fr);
  }
  .radio-toolbar input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  .radio-toolbar label {
    display: inline-block;
    height: 2em;
    width: 2em;
    /*   margin-right: 0.5rem; */
    margin-bottom: 0.5rem;
    font-size: 1rem;
    /*   background:linear-gradient(-45deg, #e9c46a 0%, #e9c46a 50%, #264653 50%, #264653 100%); */
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 2px solid transparent;
  }
  .radio-toolbar label:hover {
    border: 2px solid var(--secondary-color);
  }
  .radio-toolbar input[type="radio"]:focus + label {
    border: 2px solid var(--secondary-color);
  }
  .radio-toolbar input[type="radio"]:checked + label {
    border: 2px solid var(--secondary-color);
  }
  :global(.thickMorph) {
    animation: thick-morph 4s linear infinite;
  }
  :global(.colorMorph) {
    animation: stroke-morph 1s linear infinite;
  }
  :global(.bgMorph) {
    animation: fill-morph 5s linear infinite;
  }

  @keyframes rotate-morph {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stroke-morph {
    0% {
      stroke: #e07a5f;
    }
    50% {
      stroke: #f4f1de;
    }
    100% {
      stroke: #e07a5f;
    }
  }

  @keyframes fill-morph {
    0% {
      fill: #f4f1de;
    }
    50% {
      fill: #e07a5f;
    }
    100% {
      fill: #f4f1de;
    }
  }

  @keyframes thick-morph {
    0% {
      stroke-width: 3;
    }
    50% {
      stroke-width: 15;
    }
  }

  .mockups {
    background-color: var(--accent-color);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(640px, 1fr));
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    /* padding: 2em 0; */
  }

  #cf {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #cf * {
    position: absolute;
  }

  .top {
    animation-name: fade;
    animation-timing-function: step-start;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-direction: alternate;
  }

  @keyframes fade {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .test {
    color: black;
    background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='132' height='142' patternTransform='scale(1) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 95.83593726158142%, 1)'/>undefinedundefined<g transform='translate(0,0)' undefinedstroke-width='0.5' stroke = 'none' fill='hsla(254.36619718309854, 41.04046242774567%, 33.92156862745098%, 0.21)'><path d='M86.508 128.228a1 1 0 01-.312-1.95l3.154-1.038-1.038-3.154a1 1 0 111.9-.625l1.35 4.104a.997.997 0 01-.637 1.262l-4.104 1.35c-.104.035-.21.05-.313.05zM29.072 114.084a1 1 0 01-.971-.766l-.641-2.662-2.662.64a1 1 0 01-.468-1.944l3.634-.875a1 1 0 011.207.738l.874 3.634a1 1 0 01-.973 1.235zM124.639 29.974a1 1 0 01-.979-1.206l2.76-13.078-13.078-2.76a1 1 0 11.414-1.956l14.056 2.965a1.002 1.002 0 01.773 1.185l-2.966 14.057c-.102.47-.517.793-.98.793zM110.072 121.575a.985.985 0 01-.538-.16l-2.103-1.35a.998.998 0 111.08-1.681l1.26.809.81-1.261a1.001 1.001 0 011.685 1.08l-1.351 2.103a.998.998 0 01-.843.46zM18.157 42.43a1 1 0 01-.923-1.385l1.865-4.48-4.48-1.863a1 1 0 01.77-1.847l5.4 2.249a1 1 0 01.54 1.308l-2.25 5.402a1 1 0 01-.922.616zM91.263 23.787a1 1 0 01-.525-1.852l9.339-5.75-5.75-9.338a1 1 0 011.703-1.05l6.273 10.192a.998.998 0 01-.326 1.375l-10.19 6.273a.983.983 0 01-.524.15zM126.992 135.09a.998.998 0 01-.924-.618l-1.343-3.24a1 1 0 01.54-1.306l3.239-1.342a1 1 0 11.766 1.848l-2.314.959.96 2.315a1.001 1.001 0 01-.924 1.384zM77.367 89.574a.999.999 0 01-.294-1.956l2.356-.726-.725-2.357a1 1 0 111.91-.588l1.02 3.313a.998.998 0 01-.661 1.25l-3.312 1.02a.998.998 0 01-.294.044zM92.694 108.34a1 1 0 01-.968-.753l-1.935-7.61a1 1 0 011.939-.492l1.688 6.64 6.642-1.687a1 1 0 01.492 1.938l-7.61 1.934a1.009 1.009 0 01-.248.03zM113.732 139.894a1 1 0 01-.217-.023l-4.083-.901a1 1 0 01-.761-1.192l.902-4.083a1.001 1.001 0 011.953.431l-.687 3.106 3.106.686a1 1 0 01-.213 1.976zM3.115 112.412a1 1 0 01-.455-1.891l1.684-.858-.857-1.683a1 1 0 011.783-.907l1.312 2.574a1 1 0 01-.437 1.345l-2.575 1.312a1.01 1.01 0 01-.455.108zM72.24 140.034a.995.995 0 01-.544-.162l-7.98-5.19a1 1 0 01-.292-1.384l5.19-7.98a1 1 0 011.677 1.092l-4.646 7.14 7.14 4.645a1 1 0 01-.545 1.839zM16.64 71.874a.98.98 0 01-.368-.072l-9.245-3.685a1 1 0 01-.56-1.3l3.687-9.244a1 1 0 011.858.74l-3.314 8.316 8.314 3.314a1 1 0 01-.371 1.93zM81.343 10.84a1 1 0 01-.895-1.443l1.162-2.345-2.347-1.162a.998.998 0 01-.452-1.34.996.996 0 011.339-.452l3.243 1.605a1 1 0 01.452 1.339l-1.604 3.243c-.176.352-.53.556-.898.556zM44.215 12.96a.999.999 0 01-.942-1.337l1.072-3.008-3.01-1.073a.999.999 0 01-.605-1.278.998.998 0 011.278-.606l3.95 1.408a1 1 0 01.606 1.278l-1.408 3.95a1 1 0 01-.941.666zM47.947 66.478c-.053 0-.104-.004-.156-.012l-10.932-1.728a1 1 0 01.313-1.976l9.943 1.572 1.572-9.943a1.001 1.001 0 011.976.312l-1.73 10.93a1 1 0 01-.986.845zM14.05 137.119a.995.995 0 01-.92-.61l-4.685-11.076a1 1 0 111.842-.78l4.295 10.155 10.153-4.294a1 1 0 11.78 1.842L14.44 137.04a1.018 1.018 0 01-.39.079zM37.44 97.505a1 1 0 01-.979-1.21l2.043-9.506-9.506-2.042a1 1 0 11.42-1.956L39.9 85.043a1 1 0 01.768 1.188l-2.252 10.483a.999.999 0 01-.976.79zM112.988 38.353c-.407 0-.79-.251-.94-.656l-1.222-3.333-3.334 1.224a1 1 0 11-.69-1.877l4.273-1.57a1.005 1.005 0 011.285.594l1.568 4.273a1.001 1.001 0 01-.94 1.345zM127.585 106.66a.97.97 0 01-.2-.02l-10.417-2.125a.998.998 0 01-.635-.43c-.146-.22-.198-.49-.146-.75l2.125-10.417a1 1 0 111.96.4l-1.926 9.438 9.438 1.925a1 1 0 01-.2 1.979zM13.347 94.422a1 1 0 01-.953-.7l-1.711-5.438-5.438 1.71a1 1 0 01-.602-1.908l6.393-2.01a1.004 1.004 0 011.255.654l2.01 6.392a1 1 0 01-.954 1.3zM106.006 87.314a.999.999 0 01-.854-.48l-5.713-9.353a1.001 1.001 0 01.333-1.375l9.354-5.712a1 1 0 011.042 1.708l-8.501 5.19 5.19 8.5a1.001 1.001 0 01-.851 1.522zM37.607 45.665a1 1 0 01-.995-.908l-1.325-14.364a.999.999 0 01.903-1.087l14.364-1.327a.999.999 0 11.184 1.99L37.37 31.205l1.233 13.368a.999.999 0 01-.996 1.093zM124.868 81.772a.996.996 0 01-.642-.233l-2.027-1.697a1 1 0 111.283-1.534l1.26 1.055 1.057-1.261a1 1 0 111.533 1.284l-1.696 2.028a1 1 0 01-.768.358zM47.875 133.12a1 1 0 01-.933-.64l-3.85-9.95a1 1 0 01.57-1.293l9.952-3.85a1 1 0 01.723 1.865l-9.02 3.489 3.488 9.019a1 1 0 01-.93 1.36zM7.33 18.77a1 1 0 01-.801-.402L2.647 13.17a.998.998 0 01.203-1.4L8.047 7.89A1 1 0 119.243 9.49l-4.396 3.283L8.13 17.17a.998.998 0 01-.8 1.599zM128.44 66.675a1 1 0 01-.952-.696l-3.848-12.057-12.058 3.848a1 1 0 01-.609-1.905l13.01-4.152a1.001 1.001 0 011.257.648l4.152 13.009a1 1 0 01-.952 1.305zM65.049 51.48c-.402 0-.782-.245-.934-.644l-4.048-10.637a1 1 0 011.868-.711l3.693 9.703 9.702-3.692a1 1 0 01.71 1.869l-10.636 4.048a1.021 1.021 0 01-.355.065zM84.243 68.23c-.103 0-.208-.016-.312-.05l-4.617-1.514a1 1 0 11.623-1.901l3.667 1.202 1.202-3.667a1 1 0 111.9.623l-1.513 4.618a1.001 1.001 0 01-.95.689zM80.497 34.39a.99.99 0 01-.604-.204l-1.99-1.515a1 1 0 01-.19-1.402l1.515-1.99a1 1 0 011.59 1.212l-.908 1.194 1.195.909a1.001 1.001 0 01-.608 1.796zM94.324 140.09a1 1 0 01-.888-1.459l1.795-3.479a1 1 0 011.348-.43l3.479 1.795a1 1 0 11-.917 1.777l-2.59-1.336-1.337 2.59a1.003 1.003 0 01-.89.541zM22.74 14.308a.998.998 0 01-.723-1.69l2.297-2.412L21.9 7.91a1 1 0 111.379-1.45l3.137 2.986a1 1 0 01.035 1.414l-2.985 3.137a1 1 0 01-.726.31zM128.487 46.59a.989.989 0 01-.385-.077l-5.516-2.302a1 1 0 01-.537-1.308l2.302-5.515a1 1 0 011.846.77l-1.917 4.592 4.593 1.917a1 1 0 01.537 1.308.998.998 0 01-.923.616zM56.868 23.378a1 1 0 01-.471-1.883L68.3 15.164 61.97 3.26a1 1 0 011.766-.94l6.8 12.787a.998.998 0 01-.414 1.352l-12.786 6.8a.991.991 0 01-.468.118zM56.318 98.985a1 1 0 01-.877-.518l-1.197-2.177a1 1 0 111.754-.963l.715 1.3 1.3-.714a1.001 1.001 0 01.963 1.753l-2.177 1.197a1.014 1.014 0 01-.481.122zM97.127 54.125a1 1 0 01-1-.998l-.016-6.2-6.2.016h-.001a1 1 0 01-.003-2l7.199-.018h.003a1 1 0 011 .998l.018 7.199a1 1 0 01-.998 1.002h-.002zM70.339 113.205a1 1 0 01-.974-1.228l.756-3.222a.999.999 0 011.202-.745l3.222.756a1 1 0 01-.457 1.947l-2.248-.528-.528 2.248c-.11.46-.52.772-.973.772zM62.43 80.366a1 1 0 01-.922-.611l-2.702-6.4a1 1 0 01.532-1.311l6.4-2.702a1 1 0 01.779 1.843l-5.48 2.313 2.314 5.479a1 1 0 01-.921 1.389zM3.482 46.67a1 1 0 01-.713-1.7l2.203-2.241-2.24-2.204a1 1 0 111.402-1.426l2.953 2.904a1 1 0 01.012 1.414l-2.904 2.955a.996.996 0 01-.713.299zM40.881 134.488a1 1 0 011.127 1.282l-1.166 3.737a1 1 0 01-1.254.657l-3.737-1.167a1 1 0 11.596-1.908l2.782.867.87-2.782c.115-.368.426-.624.782-.686z'/></g></pattern></defs><rect width='100%' height='100%' fill='url(%23a)'/></svg>");
    background-position: right top; /*Positioning*/
    background-repeat: no-repeat; /*Prevent showing multiple background images*/
  }

  @media (max-width: 1280px) {
    .container {
      max-width: 1024px;
    }
    #logo {
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
  }
  @media (max-width: 1024px) {
    .container {
      max-width: 768px;
    }
    .landing {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
    #logo {
      padding-bottom: 1rem;
    }
  }
  @media (max-width: 768px) {
    .container {
      max-width: 640px;
    }
  }
  @media (max-width: 640px) {
    .container {
      width: 100%;
    }
    .featureHeading {
      text-align: center;
      margin-top: 0;
    }
    .mockups {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (max-width: 400px) {
    .toolbox {
      width: 320px;
      height: 400px;
      padding: 1rem 0.5em;
      grid-template-columns: 1fr;
    }
    .mockups {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
  }
</style>

<div class="landing grid accent-text">
  <div class="topSide grid items-center">
    <div class="p-6">
      <div id="logo" class="grid">
        <div class="normal-icon">
          <span class="iconify" data-icon="noto-v1:alien-monster" data-inline="false" />
        </div>
        <span id="logoText">PATTERN MONSTER</span>
      </div>

      <p class="comingSoon text-gray-400 secondary-font">COMING SOON</p>
      <h1>Create amazing SVG patterns in seconds</h1>
      <p class="subtitle text-gray-400 secondary-font">
        A simple online pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging
        design and more.
      </p>
      <div class="subscribe grid">
        <script async data-uid="ba0253339a" src="https://crafty-artist-9316.ck.page/ba0253339a/index.js">

        </script>
      </div>
    </div>
  </div>
  <div class="bottomSide grid">
    <div class="svgContainer">
      <div class="accent-text">
        <svg width="100%" height="100%" viewbox="0 0 1200 3600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="20"
              height={(colorPalette.length - 1) * 20}
              patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />

              {#each colorPalette as colorList, i}
                <path
                  transform="translate(0,{20 * i})"
                  stroke-linecap="square"
                  stroke-width={stroke}
                  stroke={colorPalette[i + 1]}
                  fill="none"
                  d="M -2.3354725e-8,9.8330078 H 20 Z" />
              {/each}
            </pattern>
            <pattern id="b" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M-6 5h20v10H-6zM-16 15H4v10h-20zM4 15h20v10H4zM-16-5H4V5h-20zM4-5h20V5H4zM14 5h20v10H14z" />
              </g>
            </pattern>
            <pattern id="c" patternUnits="userSpaceOnUse" width="20" height="15" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path
                  d="M-20-13.307c3.334-1.667 6.667-3.334 10-3.333 3.335 0 6.668 1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668
                  1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668 1.667 10 3.333M-20-.407c3.334 3.335 6.668 6.668 10 6.667 3.333 0
                  6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0 6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0
                  6.667-3.333 10-6.667" />
              </g>
            </pattern>
            <pattern id="d" patternUnits="userSpaceOnUse" width="20" height="28" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M5 12H-5L0 2zM-5 16H5L0 26zM5 26h10l-5-10zM5 2h10l-5 10zM25 12H15l5-10zM15 16h10l-5 10z" />
              </g>
            </pattern>
            <pattern id="e" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M3.25 10h13.5M10 3.25v13.5" />
              </g>
            </pattern>
            <pattern
              id="f"
              patternUnits="userSpaceOnUse"
              width="20"
              height={(colorPalette.length - 1) * 20}
              patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              {#each colorPalette as colorList, i}
                <g transform="translate(0,{20 * i})" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[i + 1]} fill="none">
                  <path d="M 12.5,10 A 2.5,2.5 0 0 1 10,12.5 2.5,2.5 0 0 1 7.5,10 2.5,2.5 0 0 1 10,7.5 2.5,2.5 0 0 1 12.5,10 Z" />
                </g>
              {/each}
            </pattern>
          </defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
            <!-- stdDeviation is how much to blur -->
            <feOffset dx="3" dy="3" result="offsetblur" />
            <!-- how much to offset -->
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
              <!-- slope is the opacity of the shadow -->
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <!-- this contains the offset blurred image -->
              <feMergeNode in="SourceGraphic" />
              <!-- this contains the element that the filter is applied to -->
            </feMerge>
          </filter>
          <g>
            <rect x="980" width={size} height="100%" fill="url(#f)" style="filter:url(#dropshadow)" />
            <rect x="780" width={size} height="100%" fill="url(#e)" style="filter:url(#dropshadow)" />
            <rect x="580" width={size} height="100%" fill="url(#d)" style="filter:url(#dropshadow)" />
            <rect x="380" width={size} height="100%" fill="url(#c)" style="filter:url(#dropshadow)" />
            <rect x="180" width={size} height="100%" fill="url(#b)" style="filter:url(#dropshadow)" />
            <rect x="-20" width={size} height="100%" fill="url(#a)" style="filter:url(#dropshadow)" />
          </g>
        </svg>
      </div>
    </div>
    <div class="toolbox grid items-center">
      <label for="scale">Scale</label>
      <input id="scale" type="range" bind:value={scale} min="0.5" max="10" step="0.5" />
      <label for="stroke">Stroke</label>
      <input id="stroke" type="range" bind:value={stroke} min="0.5" max="10" step="0.5" />
      <label for="angle">Angle</label>
      <input id="angle" type="range" bind:value={angle} min="0" max="180" step="5" />
      <label for="angle">Colors</label>
      <div class="radio-toolbar grid">
        {#each palettes as palette, i}
          <input
            type="radio"
            id="palette{i}"
            name="palette"
            value={i}
            on:change={() => {
              colorPalette = palette;
            }} />
          <label
            style="background:linear-gradient(-45deg, {palette[0]} 0%, {palette[0]} 50%, {palette[1]} 50%, {palette[1]} 100%);"
            class="disable-select"
            for="palette{i}" />
        {/each}
      </div>
    </div>
  </div>
</div>

<section class="features text-gray-500 body-font">
  <div class="container featureContainer mx-auto">
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-md overflow-hidden flex-shrink-0">
        {@html svgIcon('colorMorph', 'bgMorph', 'a1')}
      </div>
      <div class="featureHeading">
        <h2>Shooting Stars</h2>
        <p class="featureDescription">Customize foreground and background colors easily</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="featureHeading">
        <h2>The Catalyzer</h2>
        <p class="featureDescription">Adjust the stroke width on supported patterns</p>
      </div>
      <div
        class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-md
        overflow-hidden flex-shrink-0">
        {@html svgIcon('thickMorph', '', 'a2')}
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-gray-800 flex-shrink-0">

        <div class="big-icon">
          <span class="iconify" data-icon="whh:pattern" data-inline="false" />
        </div>
      </div>
      <div class="featureHeading">
        <h2>Simple export</h2>
        <p class="featureDescription">Download a tileable SVG or a high resolution PNG image for print</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="featureHeading">
        <h2>The Catalyzer</h2>
        <p class="featureDescription">Copy CSS and SVG directly to your clipboard for web projects</p>
      </div>
      <div
        class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-gray-800
        flex-shrink-0">
        <div id="cf">
          <!-- <img class="bottom" src="http://lorempixel.com/200/100/sports/1" /> -->
          <!-- <img class="top" src="http://lorempixel.com/200/100/sports/2" /> -->
          <svg class="bottom" viewBox="0 0 340 333">
            <path
              class="path"
              fill="red"
              stroke="green"
              stroke-width="4"
              d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
              s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
              C46.039,146.545,53.039,128.545,66.039,133.545z" />
          </svg>
          <svg class="top" viewBox="0 0 340 333">
            <path
              class="path"
              fill="white"
              stroke="black"
              stroke-width="4"
              d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
              s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
              C46.039,146.545,53.039,128.545,66.039,133.545z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-gray-800 flex-shrink-0">
        <div class="big-icon">
          <span class="iconify" data-icon="mdi:angle-acute" data-inline="false" />
        </div>
      </div>
      <div class="featureHeading">
        <h2>The 400 Blows</h2>
        <p class="featureDescription">Change the angle to generate unique images</p>
      </div>
    </div>
  </div>
  <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
    <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-gray-800 flex-shrink-0">
      <div class="big-icon">
        <span class="iconify" data-icon="mdi:angle-acute" data-inline="false" />
      </div>
    </div>
    <div class="featureHeading">
      <h2>The 400 Blows</h2>
      <p class="featureDescription">Speed up your website loading time without compromising on graphics</p>
    </div>
  </div>
  <!-- </div> -->
</section>
For designers and developers
<section class="mockups">
  <img src="coffee-cup-mockup.png" />
  <img src="book-cover-mock-up.png" />
  <img src="flying-pillows-mockup-set.png" />
  <img src="phone-case-photoshop-mockup.png" />
  <img src="tote-bag-mockup-3d-rendering-design.png" />
  <img src="bussiness-card-mockup.png" />
</section>

<div class="test">
  <header class="body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="#subscribe" class="flex title-font font-medium items-center mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span class="ml-3 text-xl">Pattern Monster</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#subscribe" class="mr-5">Link 1</a>
        <a href="#subscribe" class="mr-5">Link 2</a>
        <a href="#subscribe" class="mr-5">Link 3</a>
        <a href="#subscribe" class="mr-5">Link 4</a>
      </nav>
    </div>
  </header>
  <section>
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Make vector patterns like a pro</h1>
        <p class="subtitle text-gray-700 secondary-font">
          A pattern maker app to create abstract and cool patterns. Save time by making royalty free SVG backgrounds for your projects. Easy
          to use tool to generate your desired image. Ideal for branding and logo design projects, business cards, creating custom tees and
          apparel, posters, flyers, web design projects, or your social media posts, Instagram stories and blogs.
        </p>
        <div class="flex justify-center">
          <button>Know more</button>
        </div>
      </div>
    </div>
  </section>
</div>
<a name="subscribe" />

<div class="subscribe grid">
  <script async data-uid="ba0253339a" src="https://crafty-artist-9316.ck.page/ba0253339a/index.js">

  </script>
</div>
