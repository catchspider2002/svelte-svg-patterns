<script>
  $: color = "#000646";

  function changeColor1() {
    color = "#FF00FF";
  }
  function changeColor2() {
    color = "#FFFF00";
  }
  function reset() {
    color = "#000646";
  }
</script>

<style>
  .newmountains-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* top: 250px; */
    /* background-color: red; */
  }

  .mountains {
    position: absolute;
    top: 0;
    left: 0;
    animation: slide 4s linear infinite;
  }

  @keyframes slide {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(-600px, 0);
    }
  }

  .landing {
    background-color: var(--main-bg-color);
    height: 100vh;
    display: grid;
    color: black;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .header__bg {
    position: absolute;
    /* top: 0;
    bottom: 0;
    right: 0;
    left: 0; */
    width: 100%;
    height: 100px;
    background: var(--accent-color);
    /* transform: skewY(3deg); */
    z-index: 1;
    /* transform-origin: top left; */
    clip-path: polygon(0 46%, 0 0, 100% 0);
  }
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    /* height: 30%; */
    padding: 1em;
    transform: translate(-50%, -50%);
    background: white;
    color: var(--accent-color);
    z-index: 2;
  }

  .topSide {
    background-color: var(--accent-color);
    /* margin-bottom: -50px; */
  }

  .h5 {
    color: var(--text-gray-300);
    color: var(--accent-color);
  }

  .bottomSide {
    position: relative;
    /* z-index: 0; */
    /* position: absolute */
    /* background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><polygon fill='white' points='0,100 100,0 100,100' /></svg>"); */
  }
</style>

<div class="landing">
  <div class="topSide">

    <div class="px-6 pt-8 pb-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none lg:pt-0 lg:pb-16">
      <div class="flex items-center justify-between">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            role="img"
            class="iconify iconify--noto-v1"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 128 128"
            style="transform: rotate(360deg);">
            <path
              d="M102.26 21.7s-1.19-1.83-3.65-2.22c-3.06-.48-6.08.07-7.05 4.51c-.96 4.42-1.45 10.11 3.49 14.08l-7.6 2.13l-6.51-7.89s2.52.96
              2.86-.91c.42-2.29.42-4.36.97-7.87c.58-3.67 1.73-7.51 5.25-9.54c1.92-1.11 4.98-1.74 5.99-2.55c.78-.63.99-2.65 1.33-4.84l5.42
              4.16l1.7 7.4l-2.2 3.54z"
              fill="#d7598b" />
            <circle cx="107.39" cy="12.02" r="11.93" fill="#fcc21b" />
            <path
              d="M25.74 21.7s1.19-1.83 3.65-2.22c3.06-.48 6.08.07 7.05 4.51c.96 4.42 1.46 10.11-3.49 14.08l7.6
              2.13l6.51-7.89s-2.52.96-2.86-.91c-.42-2.29-.42-4.36-.97-7.87c-.59-3.67-1.73-7.51-5.25-9.54c-1.92-1.11-4.98-1.74-5.99-2.55c-.78-.63-.99-2.65-1.33-4.84l-5.42
              4.16l-1.7 7.4l2.2 3.54z"
              fill="#d7598b" />
            <circle cx="20.61" cy="12.02" r="11.93" fill="#fcc21b" />
            <path
              d="M107.29 114.08c-.43-2.59.02-5.5.48-7.83c.82-4.19 2.31-8.22 3.78-12.21c.47-1.29.95-2.58 1.4-3.87c1.5-4.32 2.32-8.9
              2.32-13.67c0-25.47-16.78-46.11-51.26-46.11S12.75 51.04 12.75 76.5c0 4.45.71 8.74 2.03 12.81c2.48 7.64 6.49 15.25 6.23
              23.48c-.15 4.94-2.97 7.47-6.43 10.44c-1.07.92-1.27 2.42.08 3.19c3.1 1.78 8.32-.19 11.33-1.4c2.69-1.08 5.21-2.93
              7.31-5.08c1.08-1.1 2.08-2.27 3.07-3.44c.82-.96 2.18-3.42 3.74-2.72c3.4 1.53-.58 7.86-2.3 9.38c-.7.62-1.65 1.18-1.97 2.12c-.36
              1.03.37 1.93 1.3 2.3c2.6 1.04 8.28-.72 10.88-2.46c1.86-1.25 3.41-2.85 4.71-4.68c.81-1.14 2.21-4.74 4.02-4.31c3.32.8 1.92 6.03
              2.14 8.3c.11 1.16.78 2.32 1.94 2.77c2.52.99 4.74-.79 6.22-2.63c1.65-2.05 2.44-4.32 3.73-6.54c1.03-1.79 2.83-2.16 4.12-.31c1.88
              2.69 3.04 5.25 6.03 6.96c2.46 1.4 5.3 2.27 8.14 2.29c1.25 0 6.79-.66
              4.92-3.11c-.82-1.06-2.39-1.32-3.46-2.11c-1.76-1.31-2.57-3.48-2.63-5.62c-.08-3.05 2.87-2.27 4.32-.8c2.35 2.38 3.75 5.76 6.78
              7.39c3.63 1.95 9.29 2.9 13.29 1.67c1.36-.42 2.92-1.01
              3.01-2.65c.09-1.55-1.23-1.92-2.47-2.27c-1.59-.44-2.69-.84-3.91-2.06c-.92-.88-1.42-2.08-1.63-3.33z"
              fill="#d7598b" />
            <g>
              <path
                d="M72.04 80.73l18.22-8.71s2.54 3.93 1.92 8.56c-.38 2.77-2.22 6-6.35 7.38c-3.72
                1.24-6.78.81-8.78-.08c-4.77-2.11-5.01-7.15-5.01-7.15z"
                fill="#bdcf46" />
              <path
                d="M55.4 80.73l-18.22-8.71s-2.54 3.93-1.92 8.56c.38 2.77 2.23 6 6.35 7.38c3.72 1.24 6.78.81 8.78-.08c4.78-2.11 5.01-7.15
                5.01-7.15z"
                fill="#bdcf46" />
              <path
                d="M74.85 94.95c-.37-1.25-1.66-2.33-2.97-2.38c-1.57-.06-2.57 1.41-3.73 2.22c-1.34.94-3.01 1.61-4.67
                1.46c-2.01-.19-3.07-1.54-4.61-2.64c-1.4-.99-3.15-1-4.39.3c-.59.62-.91 1.47-.86 2.33c.06 1.13.81 2.28 1.61 3.03c3.14 2.97
                8.02 3.62 12.08 2.58c2.83-.73 8.73-2.93 7.54-6.9z"
                fill="#2f2f2f" />
            </g>
          </svg>
          PATTERN MONSTER
        </div>
      </div>
    </div>
    <div class="px-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none">
      <p class="text-sm font-semibold text-gray-300 uppercase tracking-wider">COMING SOON</p>
      <h1
        class="mt-3 text-3xl leading-9 font-semibold font-display text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
        Beautiful patterns for your next project
      </h1>
      <p class="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:text-xl sm:max-w-xl xl:mt-4 xl:text-2xl xl:max-w-2xl">
        Create your own pattern and export in PNG or SVG.
      </p>
    </div>
    <div class="mt-8 sm:mt-12 relative h-64 overflow-hidden bg-gray-300 lg:hidden">
      <div
        class="absolute scroll-bg"
        style="height: 800%; width: 400%; top: -100%; left: -100%; background-size: 400px auto; background-image:
        url('/img/hero-pattern-lg.png');" />
    </div>
    <button on:click={changeColor1}>Color1</button>
    <button on:click={changeColor2}>Color2</button>
    <button on:click={reset}>Reset</button>
  </div>
  <div class="bottomSide">

    <div class="header__bg" />
    <div class="newmountains-container">
      <div class="mountains">

        <svg id="patternId" width="3200px" height="1200px" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(1) rotate(-5)">
              <rect x="0" y="0" width="100%" height="100%" fill="pink" />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width="19" stroke={color} fill="none">
                <path d="M -2.3354725e-8,9.8330078 H 20 Z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#a)" />
        </svg>

      </div>
    </div>
  </div>
  <div class="child">
    <p class="h5 mt-2 text-lg leading-7 text-gray-300">Sign up for project updates, early previews and to find out when it is ready</p>
    <div class="mt-6 sm:flex sm:mt-8 xl:mt-12">
      <input type="email" placeholder="Enter your email" />
      <a
        href="/pricing"
        class="mt-4 sm:ml-4 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base
        leading-6 font-semibold rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700
        transition ease-in-out duration-150 xl:text-lg xl:py-4">
        Join waiting list →
      </a>
    </div>
  </div>
</div>
