<script>
  import Logo from "../components/Logo.svelte";
  import Footer from "../components/Footer.svelte";
  import lang from "./_lang.js";
  let strings = lang.strings;

  $: stroke = 3;
  $: angle = "30";
  $: scale = 4;

  import Constants from "./_constants.js";
  let page = "features";
  let { title, url, keywords, desc, image, versions } = Constants.pageDetails(page);

  let imagePrefix = "https://giguom.com/pattern.monster/images/";

  const palettes = [
    ["#44337a", "#ffc800", "#FFFFFF", "#FF0054", "#00A878"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#f1faee", "#e63946", "#a8dadc", "#457b9d", "#1d3557"],
    ["#000000", "#6ec1eb", "#fca311", "#e5e5e5", "#ffffff"],
    ["#f4f1de", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
    // ["#247ba0", "#70c1b3", "#b2dbbf", "#f3ffbd", "#ff1654"],
    ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
  ];
  let size = 220;
  $: colorPalette = palettes[1];

  function svgIcon1(strokeClass, patternId, angle = 30, className, colorSet = colorPalette) {
    return (
      '<svg class="' +
      className +
      '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern class="' +
      strokeClass +
      '" height="80" id="' +
      patternId +
      '" patternTransform="scale(2) rotate(' +
      angle +
      ')" patternUnits="userSpaceOnUse" width="20"><rect fill="' +
      colorSet[0] +
      '" height="100%" width="100%" x="0" y="0"></rect><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,0)" stroke="' +
      colorSet[1] +
      '" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,20)" stroke="' +
      colorSet[2] +
      '" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,40)" stroke="' +
      colorSet[3] +
      '" d="M -2.3354725e-8,9.8330078 H 20 Z"></path><path fill="none" stroke-linecap="square" stroke-width="3" transform="translate(0,60)" stroke="' +
      colorSet[4] +
      '" class="' +
      strokeClass +
      '" d="M -2.3354725e-8,9.8330078 H 20 Z"></path></pattern></defs><g><rect fill="url(#' +
      patternId +
      ')" height="100%" width="220" x="-20"></rect></g></svg>'
    );
  }

  function svgIcon(strokeClass, patternId, angle = 30, className, colorSet = colorPalette) {
    return (
      '<svg class="' +
      className +
      '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern class="' +
      strokeClass +
      '" height="80" id="' +
      patternId +
      '" patternTransform="scale(2) rotate(' +
      angle +
      ')" patternUnits="userSpaceOnUse" width="20"><rect fill="' +
      colorSet[0] +
      '" height="100%" width="100%" x="0" y="0"></rect><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="8" transform="translate(0,0)" stroke="' +
      colorSet[1] +
      '" d="M -10,-2 10,8 30,-2"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="8" transform="translate(0,20)" stroke="' +
      colorSet[2] +
      '" d="M -10,-2 10,8 30,-2"></path><path class="' +
      strokeClass +
      '" fill="none" stroke-linecap="square" stroke-width="8" transform="translate(0,40)" stroke="' +
      colorSet[3] +
      '" d="M -10,-2 10,8 30,-2"></path><path fill="none" stroke-linecap="square" stroke-width="8" transform="translate(0,60)" stroke="' +
      colorSet[4] +
      '" class="' +
      strokeClass +
      '" d="M -10,-2 10,8 30,-2"></path></pattern></defs><g><rect fill="url(#' +
      patternId +
      ')" height="100%" width="220" x="-20"></rect></g></svg>'
    );
  }
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

<section class="landing grid light-text accent-bg">
  <div class="leftOuter grid items-center">
    <div class="left">
      <p class="comingSoon">OPEN SOURCE</p>
      <h1>Create amazing SVG patterns in seconds</h1>
      <p class="subtitle">
        {strings.description} {strings.description2} {strings.description3}
      </p>
      <!-- <button class="secondary-bg dark-text" onclick="location.href='patterns'" type="button">Explore patterns</button> -->
      <a class="secondary-bg dark-text cta" href="/">Explore patterns</a>
      <!-- <div class="subscribe grid"><script async data-uid="ba0253339a" src="https://crafty-artist-9316.ck.page/ba0253339a/index.js">
        </script></div> -->
    </div>
  </div>
  <div class="bottomSide grid">
    <div class="svgContainer">
      <div class="accent-text">
        <svg width="100%" height="100%" viewbox="0 0 1000 3600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="20"
              height={(colorPalette.length - 1) * 20}
              patternTransform="scale({scale}) rotate({angle})"
            >
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              {#each colorPalette as colorList, i}
                <path
                  transform="translate(0,{20 * i})"
                  stroke-linecap="square"
                  stroke-width={stroke}
                  stroke={colorPalette[i + 1]}
                  fill="none"
                  d="M -2.3354725e-8,9.8330078 H 20 Z"
                />
              {/each}
            </pattern>
            <pattern id="b" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M-6 5h20v10H-6zM-16 15H4v10h-20zM4 15h20v10H4zM-16-5H4V5h-20zM4-5h20V5H4zM14 5h20v10H14z" />
              </g>
            </pattern>
            <pattern
              id="c"
              patternUnits="userSpaceOnUse"
              width="20"
              height={(colorPalette.length - 1) * 30}
              patternTransform="scale({scale}) rotate({angle})"
            >
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              {#each colorPalette as colorList, i}
                <path
                  transform="translate(0,{30 * i})"
                  stroke-linecap="square"
                  stroke-width={stroke}
                  stroke={colorPalette[i + 1]}
                  fill="none"
                  d="M-20 17.735a7.693 7.693 0 013.902-4.696A7.693 7.693 0 01-10 12.735c1.775.676 3.222 1.982 4.762 3.094.77.556 1.577 1.071
                  2.456 1.431.88.36 1.836.562 2.782.475.944-.087 1.844-.458 2.659-.944.814-.486 1.553-1.087 2.296-1.677.742-.59 1.496-1.174
                  2.332-1.622.836-.448 1.765-.757 2.713-.757.948 0 1.877.309 2.713.757.836.448 1.59 1.032 2.332 1.622.743.59 1.482 1.19
                  2.296 1.677.815.486 1.715.857 2.659.944.946.087 1.903-.115 2.782-.475s1.686-.875 2.456-1.43c1.54-1.113 2.987-2.419
                  4.762-3.095a7.693 7.693 0 016.098.304A7.693 7.693 0 0140 17.735"
                />
              {/each}
            </pattern>
            <pattern
              id="e"
              patternUnits="userSpaceOnUse"
              width="30"
              height={(colorPalette.length - 1) * 30}
              patternTransform="scale({scale}) rotate({angle})"
            >
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              {#each colorPalette as colorList, i}
                <path
                  transform="translate(0,{30 * i})"
                  stroke-linecap="square"
                  stroke-width={stroke}
                  stroke={colorPalette[i + 1]}
                  fill="none"
                  d="M3.25 10h13.5M10 3.25v13.5"
                />
              {/each}
            </pattern>
            <pattern
              id="f"
              patternUnits="userSpaceOnUse"
              width="20"
              height={(colorPalette.length - 1) * 20}
              patternTransform="scale({scale}) rotate({angle})"
            >
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
            <rect x="780" width={size} height="100%" fill="url(#c)" style="filter:url(#dropshadow)" />
            <rect x="580" width={size} height="100%" fill="url(#e)" style="filter:url(#dropshadow)" />
            <!-- <rect x="580" width={size} height="100%" fill="url(#d)" style="filter:url(#dropshadow)" /> -->
            <rect x="380" width={size} height="100%" fill="url(#b)" style="filter:url(#dropshadow)" />
            <rect x="180" width={size} height="100%" fill="url(#f)" style="filter:url(#dropshadow)" />
            <rect x="-20" width={size} height="100%" fill="url(#a)" style="filter:url(#dropshadow)" />
          </g>
        </svg>
      </div>
    </div>
    <div class="toolbox grid items-center">
      <label for="scale">{strings.zoom}</label>
      <input id="scale" type="range" bind:value={scale} min="0.5" max="9.5" step="0.5" />
      <label for="stroke">{strings.stroke}</label>
      <input id="stroke" type="range" bind:value={stroke} min="0.5" max="9.5" step="0.5" />
      <label for="angle">{strings.angle}</label>
      <input id="angle" type="range" bind:value={angle} min="0" max="180" step="5" />
      <label for="angle">{strings.colors}</label>
      <div class="radio-toolbar grid">
        {#each palettes as palette, i}
          <input
            type="radio"
            id="palette{i}"
            name="palette"
            checked={i === 1 ? true : false}
            value={i}
            on:change={() => {
              colorPalette = palette;
            }}
          />
          <label
            style="background:linear-gradient(90deg, {palette[0]} 0%, {palette[0]} 20%, {palette[1]} 20%, {palette[1]} 40%, {palette[2]}
            40%, {palette[2]} 60%, {palette[3]} 60%, {palette[3]} 80%, {palette[4]} 80%, {palette[4]} 100%);"
            class="disable-select"
            for="palette{i}"
          />
        {/each}
      </div>
    </div>
  </div>
</section>
<div class="overlapCard accent-bg text-center">
  <div class="container mx-auto">Handy tool for developers and designers. Unleash your creativity to produce visually stunning patterns.</div>
</div>
<div class="triangleOuter">
  <svg class="triangle" viewbox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0 0 100 0 50 10" />
  </svg>
</div>
<section class="features secondary-bg dark-text">
  <div class="container p-5 mx-auto">
    <div class="featureRight grid items-center mx-auto">
      <div class="animatedIcon">
        <div class="cf">
          {@html svgIcon("", "color1", 45, "bottom", palettes[4])}
          {@html svgIcon("", "color2", 45, "top")}
        </div>
      </div>
      <div class="featureHeading">
        <h2>Tweak Colors</h2>
        <p class="featureDescription">Customize foreground and background colors easily</p>
      </div>
    </div>
    <div class="featureLeft grid items-center lg:w-3/5 mx-auto">
      <div class="featureHeading">
        <h2>Modify Stroke</h2>
        <p class="featureDescription">Adjust the stroke width on supported patterns</p>
      </div>
      <div class="animatedIcon">
        {@html svgIcon1("thickMorph", "a2")}
      </div>
    </div>
    <div class="featureRight grid items-center mx-auto">
      <div class="animatedIcon">
        <div class="cf">
          {@html svgIcon("", "angle1", 0, "bottom")}
          {@html svgIcon("", "angle2", -45, "top")}
        </div>
      </div>
      <div class="featureHeading">
        <h2>Alter Angle</h2>
        <p class="featureDescription">Change the angle to generate unique images</p>
      </div>
    </div>
    <div class="featureLeft grid items-center lg:w-3/5 mx-auto">
      <div class="featureHeading">
        <h2>Copy Code</h2>
        <p class="featureDescription">Copy CSS and SVG code directly to your clipboard for web projects</p>
      </div>
      <div class="animatedIcon">
        <div class="cf">
          <svg class="bottom" width="100%" height="100%" viewBox="0 0 10 10">
            <path overflow="visible" fill="#44337a" fill-rule="evenodd" paint-order="markers stroke fill" d="M0 0h10v10H0z" />
            <path
              style="line-height:125%"
              aria-label="CSS"
              stroke-width=".202"
              fill="#ffc800"
              d="M2.48 6.292q.521 0 .884-.2.115-.067.115-.174 0-.075-.06-.133-.058-.058-.142-.058-.044 0-.087.019-.332.149-.617.149-.43
              0-.66-.232-.228-.232-.228-.66 0-.45.227-.673.228-.223.648-.223.081 0
              .156.009.074.008.14.025.067.016.108.03.043.012.101.034l.077.027q.043.014.079.014.093 0 .161-.062.068-.061.068-.14
              0-.113-.142-.178-.381-.158-.777-.158-.314 0-.586.093-.269.09-.465.257-.197.166-.309.412-.112.247-.112.545 0
              .381.185.674.186.291.507.447.323.156.729.156zM5.022 6.292q.542 0 .863-.2.323-.203.323-.548
              0-.15-.054-.262-.054-.115-.168-.199-.111-.084-.254-.142-.141-.058-.348-.113l-.302-.074-.302-.073q-.156-.043-.232-.11-.075-.068-.075-.176
              0-.084.05-.144.05-.06.139-.092.089-.033.192-.047.106-.015.234-.015.387 0 .72.157.054.024.1.024.087 0
              .149-.061.062-.064.062-.14 0-.076-.064-.124-.15-.106-.429-.174-.28-.07-.575-.07-.507 0-.828.191-.32.192-.32.519 0
              .253.156.402.157.147.511.248l.684.189q.192.051.283.125.091.073.091.203 0 .158-.17.238-.167.08-.438.08-.425
              0-.812-.191-.035-.017-.072-.017-.09 0-.164.082-.072.08-.072.164 0 .064.047.093.4.257 1.075.257zM7.754 6.292q.543 0
              .864-.2.323-.203.323-.548
              0-.15-.054-.262-.054-.115-.168-.199-.112-.084-.255-.142-.14-.058-.347-.113l-.303-.074-.302-.073q-.155-.043-.232-.11-.074-.068-.074-.176
              0-.084.05-.144.05-.06.138-.092.09-.033.193-.047.105-.015.234-.015.387 0 .72.157.054.024.1.024.086 0 .148-.061.063-.064.063-.14
              0-.076-.065-.124-.149-.106-.428-.174-.28-.07-.576-.07-.507 0-.828.191-.319.192-.319.519 0
              .253.156.402.157.147.511.248l.683.189q.193.051.284.125.09.073.09.203 0 .158-.169.238-.168.08-.439.08-.424
              0-.811-.191-.035-.017-.073-.017-.089 0-.163.082-.073.08-.073.164 0 .064.048.093.4.257 1.074.257z"
            />
          </svg>
          <svg class="top" width="100%" height="100%" viewBox="0 0 10 10">
            <path overflow="visible" fill="#44337a" fill-rule="evenodd" paint-order="markers stroke fill" d="M0 0h10v10H0z" />
            <path
              style="line-height:125%"
              aria-label="CSS"
              stroke-width=".202"
              fill="#ffc800"
              d="M2 6.292q.542 0 .863-.2.322-.203.322-.548
              0-.15-.053-.262-.054-.115-.168-.199-.112-.084-.255-.142-.14-.058-.347-.113l-.303-.074-.302-.073q-.155-.043-.232-.11-.074-.068-.074-.176
              0-.084.05-.144.05-.06.138-.092.09-.033.193-.047.105-.015.234-.015.387 0 .72.157.054.024.1.024.086 0 .148-.061.062-.064.062-.14
              0-.076-.064-.124-.149-.106-.428-.174-.28-.07-.576-.07-.507 0-.828.191-.319.192-.319.519 0
              .253.156.402.157.147.511.248l.683.189q.193.051.284.125.09.073.09.203 0 .158-.169.238-.168.08-.439.08-.424
              0-.811-.191-.035-.017-.073-.017-.089 0-.163.082-.073.08-.073.164 0 .064.048.093.4.257 1.074.257zM4.804 6.266q.201 0
              .313-.089.114-.09.207-.332l.756-1.77q.018-.047.018-.088 0-.099-.087-.16-.085-.064-.198-.064-.096
              0-.174.048-.077.048-.112.142L4.804 5.74l-.722-1.787q-.035-.094-.114-.142-.077-.048-.172-.048-.114 0-.2.063-.085.062-.085.161 0
              .041.018.088l.756 1.77q.093.241.205.332.114.089.314.089zM7.97 6.292q.312 0
              .867-.101.155-.031.22-.103.066-.072.066-.228v-.719q0-.23-.226-.23h-.801q-.091 0-.143.054-.05.053-.05.121 0
              .074.054.125.054.05.147.05h.433v.584q-.273.053-.538.053-.913 0-.913-.899
              0-.207.051-.368.052-.16.162-.28.11-.122.292-.186.182-.065.428-.065.292 0 .723.11.03.014.07.014.091 0 .15-.06.057-.062.057-.139
              0-.048-.033-.092-.033-.047-.097-.074-.381-.15-.892-.15-.38 0-.677.1-.298.101-.485.28-.186.177-.281.409-.096.23-.096.503 0
              .416.189.709.188.292.526.438.337.144.797.144z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="featureRight grid items-center mx-auto">
      <div class="animatedIcon">
        <div class="cf">
          <svg class="bottom" width="100%" height="100%" viewBox="0 0 10 10">
            <path overflow="visible" fill="#44337a" fill-rule="evenodd" paint-order="markers stroke fill" d="M0 0h10v10H0z" />
            <path
              style="line-height:125%"
              aria-label="CSS"
              stroke-width=".202"
              fill="#ffc800"
              d="M1.039 6.249q.122 0 .209-.07.089-.07.089-.185v-.728h.577q1.133 0 1.133-.746
              0-.204-.077-.35-.076-.147-.225-.23-.147-.086-.342-.124-.193-.04-.45-.04h-.89q-.153 0-.238.086-.084.086-.084.216v1.916q0
              .115.089.185.089.07.209.07zm.298-1.339v-.758h.553q.144 0 .24.013.097.014.176.052.08.037.118.113.037.075.037.19 0
              .118-.037.195-.038.077-.118.12-.079.04-.18.058-.1.017-.25.017zM3.73 6.247q.108 0 .188-.06Q4 6.127 4 6.031V4.515l1.352
              1.547q.068.08.172.134.103.051.192.051.141 0 .228-.092.087-.094.087-.242V3.994q0-.097-.08-.157t-.185-.06q-.108
              0-.188.061-.08.06-.08.156v1.517l-1.361-1.56q-.064-.08-.166-.126-.1-.047-.192-.047-.133 0-.224.081-.089.079-.089.216V6.03q0
              .098.079.158.08.058.186.058zM8.106 6.292q.313 0 .868-.101.155-.031.22-.103t.065-.228v-.719q0-.23-.225-.23h-.801q-.092
              0-.143.054-.05.053-.05.121 0 .074.054.125.054.05.147.05h.433v.584q-.274.053-.539.053-.913 0-.913-.899
              0-.207.052-.368.052-.16.162-.28.11-.122.291-.186.183-.065.429-.065.292 0 .722.11.032.014.07.014.092 0
              .15-.06.058-.062.058-.139 0-.048-.033-.092-.033-.047-.098-.074-.38-.15-.892-.15-.379
              0-.677.1-.298.101-.484.28-.186.177-.282.409-.095.23-.095.503 0 .416.188.709.189.292.526.438.338.144.797.144z"
            />
          </svg>
          <svg class="top" width="100%" height="100%" viewBox="0 0 10 10">
            <path overflow="visible" fill="#44337a" fill-rule="evenodd" paint-order="markers stroke fill" d="M0 0h10v10H0z" />
            <path
              style="line-height:125%"
              aria-label="CSS"
              stroke-width=".202"
              fill="#ffc800"
              d="M2 6.292q.542 0 .863-.2.322-.203.322-.548
              0-.15-.053-.262-.054-.115-.168-.199-.112-.084-.255-.142-.14-.058-.347-.113l-.303-.074-.302-.073q-.155-.043-.232-.11-.074-.068-.074-.176
              0-.084.05-.144.05-.06.138-.092.09-.033.193-.047.105-.015.234-.015.387 0 .72.157.054.024.1.024.086 0 .148-.061.062-.064.062-.14
              0-.076-.064-.124-.149-.106-.428-.174-.28-.07-.576-.07-.507 0-.828.191-.319.192-.319.519 0
              .253.156.402.157.147.511.248l.683.189q.193.051.284.125.09.073.09.203 0 .158-.169.238-.168.08-.439.08-.424
              0-.811-.191-.035-.017-.073-.017-.089 0-.163.082-.073.08-.073.164 0 .064.048.093.4.257 1.074.257zM4.804 6.266q.201 0
              .313-.089.114-.09.207-.332l.756-1.77q.018-.047.018-.088 0-.099-.087-.16-.085-.064-.198-.064-.096
              0-.174.048-.077.048-.112.142L4.804 5.74l-.722-1.787q-.035-.094-.114-.142-.077-.048-.172-.048-.114 0-.2.063-.085.062-.085.161 0
              .041.018.088l.756 1.77q.093.241.205.332.114.089.314.089zM7.97 6.292q.312 0
              .867-.101.155-.031.22-.103.066-.072.066-.228v-.719q0-.23-.226-.23h-.801q-.091 0-.143.054-.05.053-.05.121 0
              .074.054.125.054.05.147.05h.433v.584q-.273.053-.538.053-.913 0-.913-.899
              0-.207.051-.368.052-.16.162-.28.11-.122.292-.186.182-.065.428-.065.292 0 .723.11.03.014.07.014.091 0 .15-.06.057-.062.057-.139
              0-.048-.033-.092-.033-.047-.097-.074-.381-.15-.892-.15-.38 0-.677.1-.298.101-.485.28-.186.177-.281.409-.096.23-.096.503 0
              .416.189.709.188.292.526.438.337.144.797.144z"
            />
          </svg>
        </div>
      </div>
      <div class="featureHeading">
        <h2>Download Options</h2>
        <p class="featureDescription">Download a tileable SVG or a high resolution seamless PNG image for print</p>
      </div>
    </div>
  </div>
</section>
<!-- For designers and developers -->
<div class="overlapCard accent-bg text-center">
  <div class="container mx-auto">
    Copy the pattern to set the website background with great results. Choose from a variety of patterns and shapes which cover a host of styles, from
    the cool, quirky and edgy, to the more luxurious designs.
  </div>
</div>
<div class="triangleOuter">
  <svg class="triangle" viewbox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0 0 100 0 50 10" />
  </svg>
</div>
<div class="webMockup dark-text">
  <header>
    <div class="container navbar mx-auto grid p-5 items-center">
      <Logo className="accent-text" color="var(--accent-color)" />
    </div>
  </header>
  <section class="container grid mx-auto px-5 py-24 items-center text-center">
    <h2 class="accent-text">Make vector patterns like a pro</h2>
    <p class="subtitle ">
      A pattern maker app to create abstract and cool patterns. Save time by making royalty free SVG backgrounds for your projects. Easy to use tool
      to generate your desired image. Ideal for branding and logo design projects, business cards, creating custom tees and apparel, posters, flyers,
      web design projects, or your social media posts, Instagram stories and blogs.
    </p>
    <div class="flex justify-center"><button class="accent-bg cta2" onclick="location.href='#subscribe'" type="button">Know more</button></div>
  </section>
</div>

<div class="overlapCard accent-bg text-center">
  <div class="container mx-auto">
    Create beautiful print assets from a wealth of versatile and useful patterns without any design skills. Ideal for branding projects, fabrics,
    packaging, fashion apparel, posters, wrapping paper, posters or calendars.
  </div>
</div>
<div class="triangleOuter">
  <svg class="triangle" viewbox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0 0 100 0 50 10" />
  </svg>
</div>
<section class="digitalMockup secondary-bg items-center">
  <img loading="lazy" alt="Mockup of Book" src={imagePrefix + "book-cover-mock-up.png"} />
  <img loading="lazy" alt="Mockup of Pillows" src={imagePrefix + "flying-pillows-mockup-set.png"} />
  <img loading="lazy" alt="Mockup of Phone Case" src={imagePrefix + "phone-case-photoshop-mockup.png"} />
  <img loading="lazy" alt="Mockup of Tote Bag" src={imagePrefix + "tote-bag-mockup-3d-rendering-design.png"} />
  <img loading="lazy" alt="Mockup of Business Card" src={imagePrefix + "bussiness-card-mockup.png"} />
  <img loading="lazy" alt="Mockup of Coffee Cup" src={imagePrefix + "coffee-cup-mockup.png"} />
</section>
<Footer />

<style>
  button {
    height: 48px;
    padding: 10px 15px;
    color: var(--accent-text-color);
    margin: 0 auto;
  }

  button:hover,
  button:focus {
    /* background-color: var(--secondary-color-hover); */
    background-color: var(--accent-color-hover);
  }

  .cta {
    padding: 0.5em 1em;
    color: var(--accent-color);
  }

  .cta2 {
    color: var(--gray-300);
  }

  .cta:hover,
  .cta:focus {
    color: var(--accent-color-hover);
  }

  .left {
    padding: 3rem;
  }
  .landing {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 2em;
    min-height: 95vh;
    background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='ay' patternUnits='userSpaceOnUse' width='10.583' height='10.583' patternTransform='scale(4) rotate(0)'><g stroke-linecap='square' stroke-width='0.5' stroke = 'hsla(0, 0%, 0%, 0.5)' fill='none'><path d='M13.182 5.245l-7.937 7.937-7.938-7.937M13.182-.047L5.245 7.891-2.693-.047m13.23-2.646L5.245 2.6-.047-2.693m5.292 0l7.937 7.938-7.937 7.937M-.047-2.693l7.938 7.938-7.938 7.937M-2.693-.047L2.6 5.245l-5.292 5.292'/></g></pattern></defs><rect width='100%' height='100%' fill='url(%23ay)'/></svg>");
  }
  .comingSoon {
    font-size: 0.875em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  .subtitle {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    /* line-height: 1.75rem; */
    font-size: 1.125em;
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
    height: 260px;
    color: var(--secondary-text-color);
    padding: 1rem 1.5rem;
    gap: 1em;
    background: var(--pattern-bg);
    grid-template-columns: auto 1fr;
    border-radius: var(--border-radius);
  }
  .toolbox label{
    text-transform: capitalize;
  }
  .features {
    padding-top: 70px;
  }
  .featureRight:last-child {
    border-bottom-width: 0;
  }
  .featureLeft,
  .featureRight {
    border-bottom-width: 1px;
    padding: 4rem 0;
    width: 60%;
    gap: 2em;
  }
  .featureLeft {
    grid-template-columns: 1fr auto;
  }
  .featureRight {
    grid-template-columns: auto 1fr;
  }
  .featureHeading {
    text-align: left;
  }
  .featureDescription {
    line-height: 1.625;
    font-size: 1em;
    color: var(--main-bg-color);
  }
  .overlapCard {
    /* background: var(--main-bg-color); */
    color: var(--gray-300);
    font-size: 1.3em;
    padding: 2em 2em 1.5em;
    margin-top: -2px;
  }
  .triangleOuter {
    position: relative;
    width: 100%;
  }
  .triangle {
    position: absolute;
    top: 100%;
    width: 100%;
    height: 50px;
    fill: var(--accent-color);
    z-index: 1;
  }
  .radio-toolbar {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  .radio-toolbar input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  .radio-toolbar label {
    display: inline-block;
    height: 2em;
    width: 4em;
    font-size: 1rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 2px solid rgb(100, 100, 100);
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

  .digitalMockup {
    padding-top: 70px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .cf {
    position: relative;
    width: 100%;
    height: 100%;
  }

  :global(.cf *) {
    position: absolute;
  }

  :global(.top) {
    animation: fade 4s step-start infinite;
  }

  @keyframes thick-morph {
    0% {
      stroke-width: 3;
    }
    50% {
      stroke-width: 15;
    }
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

  .webMockup {
    padding-top: 70px;
    position: relative;
    background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='132' height='142' patternTransform='scale(1) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(47, 100%, 50%, 1)'/><g transform='translate(0,0)' stroke = 'none' fill='hsla(0, 0%, 100%, 0.5)'><path d='M86.508 128.228a1 1 0 01-.312-1.95l3.154-1.038-1.038-3.154a1 1 0 111.9-.625l1.35 4.104a.997.997 0 01-.637 1.262l-4.104 1.35c-.104.035-.21.05-.313.05zM29.072 114.084a1 1 0 01-.971-.766l-.641-2.662-2.662.64a1 1 0 01-.468-1.944l3.634-.875a1 1 0 011.207.738l.874 3.634a1 1 0 01-.973 1.235zM124.639 29.974a1 1 0 01-.979-1.206l2.76-13.078-13.078-2.76a1 1 0 11.414-1.956l14.056 2.965a1.002 1.002 0 01.773 1.185l-2.966 14.057c-.102.47-.517.793-.98.793zM110.072 121.575a.985.985 0 01-.538-.16l-2.103-1.35a.998.998 0 111.08-1.681l1.26.809.81-1.261a1.001 1.001 0 011.685 1.08l-1.351 2.103a.998.998 0 01-.843.46zM18.157 42.43a1 1 0 01-.923-1.385l1.865-4.48-4.48-1.863a1 1 0 01.77-1.847l5.4 2.249a1 1 0 01.54 1.308l-2.25 5.402a1 1 0 01-.922.616zM91.263 23.787a1 1 0 01-.525-1.852l9.339-5.75-5.75-9.338a1 1 0 011.703-1.05l6.273 10.192a.998.998 0 01-.326 1.375l-10.19 6.273a.983.983 0 01-.524.15zM126.992 135.09a.998.998 0 01-.924-.618l-1.343-3.24a1 1 0 01.54-1.306l3.239-1.342a1 1 0 11.766 1.848l-2.314.959.96 2.315a1.001 1.001 0 01-.924 1.384zM77.367 89.574a.999.999 0 01-.294-1.956l2.356-.726-.725-2.357a1 1 0 111.91-.588l1.02 3.313a.998.998 0 01-.661 1.25l-3.312 1.02a.998.998 0 01-.294.044zM92.694 108.34a1 1 0 01-.968-.753l-1.935-7.61a1 1 0 011.939-.492l1.688 6.64 6.642-1.687a1 1 0 01.492 1.938l-7.61 1.934a1.009 1.009 0 01-.248.03zM113.732 139.894a1 1 0 01-.217-.023l-4.083-.901a1 1 0 01-.761-1.192l.902-4.083a1.001 1.001 0 011.953.431l-.687 3.106 3.106.686a1 1 0 01-.213 1.976zM3.115 112.412a1 1 0 01-.455-1.891l1.684-.858-.857-1.683a1 1 0 011.783-.907l1.312 2.574a1 1 0 01-.437 1.345l-2.575 1.312a1.01 1.01 0 01-.455.108zM72.24 140.034a.995.995 0 01-.544-.162l-7.98-5.19a1 1 0 01-.292-1.384l5.19-7.98a1 1 0 011.677 1.092l-4.646 7.14 7.14 4.645a1 1 0 01-.545 1.839zM16.64 71.874a.98.98 0 01-.368-.072l-9.245-3.685a1 1 0 01-.56-1.3l3.687-9.244a1 1 0 011.858.74l-3.314 8.316 8.314 3.314a1 1 0 01-.371 1.93zM81.343 10.84a1 1 0 01-.895-1.443l1.162-2.345-2.347-1.162a.998.998 0 01-.452-1.34.996.996 0 011.339-.452l3.243 1.605a1 1 0 01.452 1.339l-1.604 3.243c-.176.352-.53.556-.898.556zM44.215 12.96a.999.999 0 01-.942-1.337l1.072-3.008-3.01-1.073a.999.999 0 01-.605-1.278.998.998 0 011.278-.606l3.95 1.408a1 1 0 01.606 1.278l-1.408 3.95a1 1 0 01-.941.666zM47.947 66.478c-.053 0-.104-.004-.156-.012l-10.932-1.728a1 1 0 01.313-1.976l9.943 1.572 1.572-9.943a1.001 1.001 0 011.976.312l-1.73 10.93a1 1 0 01-.986.845zM14.05 137.119a.995.995 0 01-.92-.61l-4.685-11.076a1 1 0 111.842-.78l4.295 10.155 10.153-4.294a1 1 0 11.78 1.842L14.44 137.04a1.018 1.018 0 01-.39.079zM37.44 97.505a1 1 0 01-.979-1.21l2.043-9.506-9.506-2.042a1 1 0 11.42-1.956L39.9 85.043a1 1 0 01.768 1.188l-2.252 10.483a.999.999 0 01-.976.79zM112.988 38.353c-.407 0-.79-.251-.94-.656l-1.222-3.333-3.334 1.224a1 1 0 11-.69-1.877l4.273-1.57a1.005 1.005 0 011.285.594l1.568 4.273a1.001 1.001 0 01-.94 1.345zM127.585 106.66a.97.97 0 01-.2-.02l-10.417-2.125a.998.998 0 01-.635-.43c-.146-.22-.198-.49-.146-.75l2.125-10.417a1 1 0 111.96.4l-1.926 9.438 9.438 1.925a1 1 0 01-.2 1.979zM13.347 94.422a1 1 0 01-.953-.7l-1.711-5.438-5.438 1.71a1 1 0 01-.602-1.908l6.393-2.01a1.004 1.004 0 011.255.654l2.01 6.392a1 1 0 01-.954 1.3zM106.006 87.314a.999.999 0 01-.854-.48l-5.713-9.353a1.001 1.001 0 01.333-1.375l9.354-5.712a1 1 0 011.042 1.708l-8.501 5.19 5.19 8.5a1.001 1.001 0 01-.851 1.522zM37.607 45.665a1 1 0 01-.995-.908l-1.325-14.364a.999.999 0 01.903-1.087l14.364-1.327a.999.999 0 11.184 1.99L37.37 31.205l1.233 13.368a.999.999 0 01-.996 1.093zM124.868 81.772a.996.996 0 01-.642-.233l-2.027-1.697a1 1 0 111.283-1.534l1.26 1.055 1.057-1.261a1 1 0 111.533 1.284l-1.696 2.028a1 1 0 01-.768.358zM47.875 133.12a1 1 0 01-.933-.64l-3.85-9.95a1 1 0 01.57-1.293l9.952-3.85a1 1 0 01.723 1.865l-9.02 3.489 3.488 9.019a1 1 0 01-.93 1.36zM7.33 18.77a1 1 0 01-.801-.402L2.647 13.17a.998.998 0 01.203-1.4L8.047 7.89A1 1 0 119.243 9.49l-4.396 3.283L8.13 17.17a.998.998 0 01-.8 1.599zM128.44 66.675a1 1 0 01-.952-.696l-3.848-12.057-12.058 3.848a1 1 0 01-.609-1.905l13.01-4.152a1.001 1.001 0 011.257.648l4.152 13.009a1 1 0 01-.952 1.305zM65.049 51.48c-.402 0-.782-.245-.934-.644l-4.048-10.637a1 1 0 011.868-.711l3.693 9.703 9.702-3.692a1 1 0 01.71 1.869l-10.636 4.048a1.021 1.021 0 01-.355.065zM84.243 68.23c-.103 0-.208-.016-.312-.05l-4.617-1.514a1 1 0 11.623-1.901l3.667 1.202 1.202-3.667a1 1 0 111.9.623l-1.513 4.618a1.001 1.001 0 01-.95.689zM80.497 34.39a.99.99 0 01-.604-.204l-1.99-1.515a1 1 0 01-.19-1.402l1.515-1.99a1 1 0 011.59 1.212l-.908 1.194 1.195.909a1.001 1.001 0 01-.608 1.796zM94.324 140.09a1 1 0 01-.888-1.459l1.795-3.479a1 1 0 011.348-.43l3.479 1.795a1 1 0 11-.917 1.777l-2.59-1.336-1.337 2.59a1.003 1.003 0 01-.89.541zM22.74 14.308a.998.998 0 01-.723-1.69l2.297-2.412L21.9 7.91a1 1 0 111.379-1.45l3.137 2.986a1 1 0 01.035 1.414l-2.985 3.137a1 1 0 01-.726.31zM128.487 46.59a.989.989 0 01-.385-.077l-5.516-2.302a1 1 0 01-.537-1.308l2.302-5.515a1 1 0 011.846.77l-1.917 4.592 4.593 1.917a1 1 0 01.537 1.308.998.998 0 01-.923.616zM56.868 23.378a1 1 0 01-.471-1.883L68.3 15.164 61.97 3.26a1 1 0 011.766-.94l6.8 12.787a.998.998 0 01-.414 1.352l-12.786 6.8a.991.991 0 01-.468.118zM56.318 98.985a1 1 0 01-.877-.518l-1.197-2.177a1 1 0 111.754-.963l.715 1.3 1.3-.714a1.001 1.001 0 01.963 1.753l-2.177 1.197a1.014 1.014 0 01-.481.122zM97.127 54.125a1 1 0 01-1-.998l-.016-6.2-6.2.016h-.001a1 1 0 01-.003-2l7.199-.018h.003a1 1 0 011 .998l.018 7.199a1 1 0 01-.998 1.002h-.002zM70.339 113.205a1 1 0 01-.974-1.228l.756-3.222a.999.999 0 011.202-.745l3.222.756a1 1 0 01-.457 1.947l-2.248-.528-.528 2.248c-.11.46-.52.772-.973.772zM62.43 80.366a1 1 0 01-.922-.611l-2.702-6.4a1 1 0 01.532-1.311l6.4-2.702a1 1 0 01.779 1.843l-5.48 2.313 2.314 5.479a1 1 0 01-.921 1.389zM3.482 46.67a1 1 0 01-.713-1.7l2.203-2.241-2.24-2.204a1 1 0 111.402-1.426l2.953 2.904a1 1 0 01.012 1.414l-2.904 2.955a.996.996 0 01-.713.299zM40.881 134.488a1 1 0 011.127 1.282l-1.166 3.737a1 1 0 01-1.254.657l-3.737-1.167a1 1 0 11.596-1.908l2.782.867.87-2.782c.115-.368.426-.624.782-.686z'/></g></pattern></defs><rect width='100%' height='100%' fill='url(%23a)'/></svg>");
    /* background-position: right top;
    background-repeat: no-repeat; */
  }

  .animatedIcon {
    width: 7rem;
    height: 7rem;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .navbar {
    grid-template-columns: 1fr auto;
  }

  @media (max-width: 1280px) {
    .container {
      max-width: 1024px;
    }
    .digitalMockup {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 1024px) {
    .container {
      max-width: 768px;
    }
    .leftOuter {
      min-height: 70vh;
    }
    .landing {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
    .featureLeft,
    .featureRight {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .container {
      max-width: 640px;
    }
    .navbar {
      grid-template-columns: 1fr;
    }
    .comingSoon {
      padding-top: 0;
    }
  }
  @media (max-width: 640px) {
    .container {
      width: 100%;
    }
    .left {
      padding: 1.5rem;
    }
    .featureHeading {
      text-align: center;
    }
    .featureLeft {
      display: flex;
      flex-direction: column-reverse;
    }
    .featureRight {
      display: flex;
      flex-direction: column;
    }
    .animatedIcon {
      width: 5rem;
      height: 5rem;
      margin-bottom: 1rem;
    }
    .digitalMockup {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 480px) {
    .toolbox {
      width: 100%;
      max-width: 320px;
      height: 400px;
      grid-template-columns: 1fr;
    }
  }
</style>
