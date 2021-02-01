<script context="module">
  export function preload({ params, query }) {
    return (
      this.fetch(`index.json`)
        .then((r) => r.json())
        // .then((r, postMode) => r.filter(pattern => pattern.mode === postMode))
        .then((ptrns) => {
          return { ptrns };
        })
    );
  }
</script>

<script>
  // import AutoComplete from "simple-svelte-autocomplete";
  import AutoComplete from "../components/SimpleAutocomplete.svelte";

  import Footer from "../components/Footer.svelte";
  import Constants from "./_constants.js";
  import lang from "./_lang.js";
  let strings = lang.strings;

  export let ptrns;
  let patternsCount = ptrns.length
  let count = 0;
  // console.log(ptrns.length)
  import { onMount, afterUpdate, tick } from "svelte";
  export let posts =  [
    {title: 'Waves - 1', slug: 'waves-1', mode: 'stroke', colors: 5, maxStroke: 6.5, maxScale: 16, maxSpacing: [0, 10], width: 120, height: 80, vHeight: 20, tags: ['waves','curves'], path: "<path d='M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685'/>~<path d='M-50.129 32.685C-33.346 32.358-16.786 24.918 0 25c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685'/>~<path d='M-50.129 52.685C-33.346 52.358-16.786 44.918 0 45c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685'/>~<path d='M-50.129 72.685C-33.346 72.358-16.786 64.918 0 65c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685'/>", creationDate: '13 Nov 2020'},
    {title: 'Waves - 2', slug: 'waves-2', mode: 'stroke', colors: 5, maxStroke: 5.5, maxScale: 16, maxSpacing: [0, 10], width: 80, height: 80, vHeight: 20, tags: ['waves','curves'], path: "<path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'/>~<path d='M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'/>~<path d='M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'/>~<path d='M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'/>", creationDate: '13 Nov 2020'},
    {title: 'Waves - 3', slug: 'waves-3', mode: 'stroke', colors: 5, maxStroke: 5.5, maxScale: 16, maxSpacing: [0, 10], width: 40, height: 80, vHeight: 20, tags: ['waves','curves'], path: "<path d='M-4.798 13.573C-3.149 12.533-1.446 11.306 0 10c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'/>~<path d='M-4.798 33.573C-3.149 32.533-1.446 31.306 0 30c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'/>~<path d='M-4.798 53.573C-3.149 52.533-1.446 51.306 0 50c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'/>~<path d='M-4.798 73.573C-3.149 72.533-1.446 71.306 0 70c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'/>", creationDate: '13 Nov 2020'},
    {title: 'Waves - 4', slug: 'waves-4', mode: 'stroke', colors: 2, maxStroke: 4, maxScale: 10, maxSpacing: [0, 0], width: 70, height: 8, vHeight: 0, tags: ['waves','curves'], path: "<path d='M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002'/>", creationDate: '01 Nov 2020'},
    {title: 'Waves - 5', slug: 'waves-5', mode: 'fill', colors: 3, maxStroke: 4, maxScale: 10, maxSpacing: [0, 0], width: 15.825, height: 26.667, vHeight: 0, tags: ['waves','curves'], path: "<path d='M-3.176 15.632a1.467 1.467 0 00-.294.038 1.463 1.463 0 00-1.08 1.754l.013.05c.503 2.134 1.828 3.999 3.533 5.201a9.21 9.21 0 005.803 1.68c2.012-.098 3.962-.883 5.422-2.17a8.142 8.142 0 001.93-2.494 9.028 9.028 0 002.67 2.984 9.213 9.213 0 005.803 1.68c2.012-.098 3.962-.883 5.422-2.17 1.472-1.277 2.454-3.068 2.7-4.944a.217.217 0 00-.16-.234c-.11-.036-.221.037-.246.148a7.302 7.302 0 01-2.932 4.207 7.598 7.598 0 01-4.772 1.325c-1.656-.098-3.227-.76-4.392-1.815-1.178-1.043-1.938-2.478-2.098-3.95a.392.392 0 00-.036-.172 1.463 1.463 0 00-1.755-1.08 1.463 1.463 0 00-1.079 1.754l.012.05c.121.512.29 1.008.5 1.484a7.35 7.35 0 01-2.205 2.404 7.601 7.601 0 01-4.772 1.325c-1.656-.098-3.227-.76-4.392-1.815-1.178-1.043-1.938-2.478-2.098-3.95a.392.392 0 00-.036-.172 1.464 1.464 0 00-1.461-1.118z'/>~<path d='M-11.51 2.298a1.463 1.463 0 00-1.373 1.792l.013.05c.503 2.135 1.828 4 3.533 5.202a9.21 9.21 0 005.802 1.68c2.012-.098 3.962-.883 5.422-2.171a8.142 8.142 0 001.931-2.493 9.028 9.028 0 002.67 2.983 9.213 9.213 0 005.802 1.68c2.012-.097 3.962-.882 5.422-2.17 1.473-1.276 2.454-3.067 2.7-4.944a.217.217 0 00-.16-.233c-.11-.037-.22.037-.245.147a7.302 7.302 0 01-2.933 4.208 7.598 7.598 0 01-4.771 1.325c-1.656-.098-3.227-.76-4.392-1.816-1.178-1.043-1.939-2.478-2.098-3.95a.392.392 0 00-.037-.172 1.463 1.463 0 00-1.754-1.08 1.463 1.463 0 00-1.08 1.755l.013.05c.12.512.29 1.007.5 1.483A7.35 7.35 0 011.25 8.03a7.601 7.601 0 01-4.773 1.325c-1.656-.098-3.226-.76-4.392-1.816-1.177-1.043-1.938-2.478-2.097-3.95a.392.392 0 00-.037-.172 1.464 1.464 0 00-1.46-1.118z'/>", creationDate: '28 Nov 2020'},
    {title: 'Waves - 6', slug: 'waves-6', mode: 'fill', colors: 3, maxStroke: 4, maxScale: 10, maxSpacing: [0, 0], width: 16.591, height: 26.667, vHeight: 0, tags: ['waves','curves'], path: "<path d='M-4.887 15.766c-.06 0-.123.04-.123.102-.102 1.023.082 2.086.471 3.089a7.997 7.997 0 001.8 2.72A8.89 8.89 0 00.064 23.52a8.884 8.884 0 003.334.655 8.807 8.807 0 003.335-.655c1.064-.43 2.025-1.044 2.803-1.841a7.997 7.997 0 001.8-2.721 7.655 7.655 0 00.353-1.178 7.62 7.62 0 00.363 1.239 7.994 7.994 0 001.8 2.72 8.449 8.449 0 002.803 1.842 8.807 8.807 0 003.334.655 8.807 8.807 0 003.335-.655 8.89 8.89 0 002.803-1.841 7.711 7.711 0 001.8-2.721c.164-.389.266-.798.368-1.207v-1.984c-.06-.02-.102 0-.143.04-.9 1.78-2.086 3.15-3.518 4.092a8.773 8.773 0 01-4.665 1.412 8.624 8.624 0 01-4.665-1.391c-1.419-.913-2.615-2.269-3.493-4.045-.002-.023-.002-.045-.005-.067 0-.02-.02-.062-.06-.082-.062-.02-.144 0-.165.06-.88 1.8-2.086 3.172-3.518 4.093a8.476 8.476 0 01-4.665 1.41c-1.636 0-3.232-.47-4.664-1.39-1.432-.92-2.619-2.311-3.519-4.091-.02-.041-.06-.062-.102-.102z'/>~<path d='M-11.553 2.432c-.062 0-.123.04-.123.102-.103 1.023.082 2.087.47 3.09a7.997 7.997 0 001.8 2.72 8.89 8.89 0 002.803 1.841 8.884 8.884 0 003.335.655 8.807 8.807 0 003.335-.655c1.063-.43 2.025-1.043 2.802-1.84a7.997 7.997 0 001.8-2.722 7.655 7.655 0 00.353-1.178 7.62 7.62 0 00.364 1.24 7.994 7.994 0 001.8 2.72 8.449 8.449 0 002.802 1.841 8.807 8.807 0 003.335.655 8.807 8.807 0 003.335-.655 8.89 8.89 0 002.802-1.84 7.711 7.711 0 001.801-2.722c.164-.388.266-.797.368-1.206V2.493c-.061-.02-.102 0-.143.04-.9 1.78-2.086 3.15-3.518 4.092a8.773 8.773 0 01-4.665 1.412 8.624 8.624 0 01-4.665-1.391C7.22 5.733 6.022 4.377 5.145 2.6l-.005-.067c0-.02-.02-.062-.06-.082-.062-.02-.145 0-.165.061-.88 1.8-2.086 3.171-3.518 4.092a8.476 8.476 0 01-4.665 1.411c-1.637 0-3.232-.47-4.664-1.39-1.432-.922-2.619-2.312-3.519-4.092-.02-.041-.061-.062-.102-.102z'/>", creationDate: '28 Nov 2020'},
    {title: 'Waves - 7', slug: 'waves-7', mode: 'fill', colors: 3, maxStroke: 4, maxScale: 10, maxSpacing: [0, 0], width: 35.584, height: 30.585, vHeight: 0, tags: ['waves','curves'], path: "<path d='M36.908 9.243c-5.014 0-7.266 3.575-7.266 7.117 0 3.376 2.45 5.726 5.959 5.726 1.307 0 2.45-.463 3.244-1.307.744-.811 1.125-1.903 1.042-3.095-.066-.811-.546-1.655-1.274-2.185-.596-.447-1.639-.894-3.162-.546-.48.1-.778.58-.662 1.06.1.48.58.777 1.06.661.695-.149 1.274-.066 1.705.249.364.265.546.645.562.893.05.679-.165 1.308-.579 1.755-.446.48-1.125.744-1.936.744-2.55 0-4.188-1.538-4.188-3.938 0-2.466 1.44-5.347 5.495-5.347 2.897 0 6.008 1.888 6.388 6.058.166 1.804.067 5.147-2.598 7.034a.868.868 0 00-.142.122c-1.311.783-2.87 1.301-4.972 1.301-4.088 0-6.123-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.517-4.518-4.094 0-6.439 1.676-8.479 3.545.227-1.102.289-2.307.17-3.596-.496-5.263-4.567-7.662-8.159-7.662-5.015 0-7.265 3.574-7.265 7.116 0 3.377 2.45 5.727 5.958 5.727 1.307 0 2.449-.463 3.243-1.308.745-.81 1.126-1.903 1.043-3.095-.066-.81-.546-1.654-1.274-2.184-.596-.447-1.639-.894-3.161-.546-.48.1-.778.58-.662 1.06.099.48.579.777 1.059.66.695-.148 1.275-.065 1.705.25.364.264.546.645.563.893.05.679-.166 1.307-.58 1.754-.447.48-1.125.745-1.936.745-2.549 0-4.188-1.539-4.188-3.939 0-2.466 1.44-5.345 5.495-5.345 2.897 0 6.008 1.87 6.389 6.057.163 1.781.064 5.06-2.504 6.96-1.36.864-2.978 1.447-5.209 1.447-4.088 0-6.124-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.516-4.518v1.787c4.088 0 6.123 1.953 8.275 4.022 2.317 2.218 4.7 4.518 9.516 4.518 4.8 0 7.2-2.3 9.517-4.518 2.151-2.069 4.187-4.022 8.275-4.022s6.124 1.953 8.275 4.022c2.318 2.218 4.701 4.518 9.517 4.518 4.8 0 7.2-2.3 9.516-4.518 2.152-2.069 4.188-4.022 8.276-4.022s6.123 1.953 8.275 4.022c2.317 2.218 4.7 4.518 9.517 4.518v-1.788c-4.088 0-6.124-1.952-8.275-4.021-2.318-2.218-4.701-4.518-9.517-4.518-4.103 0-6.45 1.683-8.492 3.556.237-1.118.304-2.343.184-3.656-.497-5.263-4.568-7.663-8.16-7.663z'/>~<path d='M23.42 41.086a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.38-4.187-3.492-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.265 1.936-.745.414-.447.63-1.076.58-1.755-.017-.248-.2-.629-.547-.893-.43-.315-1.026-.398-1.704-.249a.868.868 0 01-1.06-.662.868.868 0 01.662-1.059c1.523-.348 2.566.1 3.161.546.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm0-30.585a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.381-4.187-3.493-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.266 1.936-.746.414-.446.629-1.075.58-1.754-.017-.248-.2-.629-.547-.894-.43-.314-1.026-.397-1.705-.248A.868.868 0 0117.014.77a.868.868 0 01.662-1.06c1.523-.347 2.566.1 3.161.547.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm29.956 1.572c-4.8 0-7.2-2.3-9.517-4.518-2.151-2.069-4.187-4.022-8.275-4.022S29.46 5.486 27.31 7.555c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518C6.124 5.486 4.088 3.533 0 3.533s-6.124 1.953-8.275 4.022c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518-2.152-2.069-4.188-4.022-8.276-4.022V1.746c4.8 0 7.2 2.3 9.517 4.518 2.152 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.276-4.022C-7.2 4.046-4.816 1.746 0 1.746c4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.318-2.218 4.7-4.518 9.517-4.518 4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.317-2.218 4.7-4.518 9.517-4.518v1.787c-4.088 0-6.124 1.953-8.275 4.022-2.317 2.234-4.717 4.518-9.517 4.518z'/>", creationDate: '28 Nov 2020'},
    {title: 'Chevron - 1', slug: 'chevron-1', mode: 'stroke-join', colors: 5, maxStroke: 10, maxScale: 16, maxSpacing: [0, 10], width: 40, height: 80, vHeight: 20, tags: ['chevron','lines'], path: "<path d='M-10 7.5l20 5 20-5 20 5'/>~<path d='M-10 27.5l20 5 20-5 20 5'/>~<path d='M-10 47.5l20 5 20-5 20 5'/>~<path d='M-10 67.5l20 5 20-5 20 5'/>", creationDate: '13 Nov 2020'},
    {title: 'Chevron - 2', slug: 'chevron-2', mode: 'stroke-join', colors: 5, maxStroke: 4.5, maxScale: 16, maxSpacing: [0, 10], width: 40, height: 80, vHeight: 20, tags: ['chevron','lines'], path: "<path d='M-10 5l20 10L30 5l20 10'/>~<path d='M-10 25l20 10 20-10 20 10'/>~<path d='M-10 45l20 10 20-10 20 10'/>~<path d='M-10 65l20 10 20-10 20 10'/>", creationDate: '13 Nov 2020'},
    {title: 'Chevron - 3', slug: 'chevron-3', mode: 'stroke-join', colors: 5, maxStroke: 7, maxScale: 16, maxSpacing: [0, 10], width: 20, height: 80, vHeight: 20, tags: ['chevron','lines'], path: "<path d='M-5 5L5.1 15 15 5l10 10'/>~<path d='M-5 25L5.1 35 15 25l10 10'/>~<path d='M-5 45L5.1 55 15 45l10 10'/>~<path d='M-5 65L5.1 75 15 65l10 10'/>", creationDate: '13 Nov 2020'},
    {title: 'Straight Lines', slug: 'straight-lines', mode: 'stroke', colors: 5, maxStroke: 19.5, maxScale: 12, maxSpacing: [10, 10], width: 20, height: 80, vHeight: 20, tags: ['straight-lines'], path: "<path d='M0 10h20z' />~<path d='M0 30h20z' />~<path d='M0 50h20z' />~<path d='M0 70h20z' />", creationDate: '13 Nov 2020'},
    {title: 'Cross Section', slug: 'cross-section', mode: 'stroke', colors: 2, maxStroke: 19.5, maxScale: 12, maxSpacing: [10, 10], width: 20, height: 20, vHeight: 0, tags: ['cross-section','lines'], path: "<path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'/>", creationDate: '01 Nov 2020'},
    {title: 'Brick Wall - 1', slug: 'brick-wall-1', mode: 'stroke', colors: 2, maxStroke: 9.5, maxScale: 16, maxSpacing: [10, 0], width: 30, height: 30, vHeight: 0, tags: ['brick-wall','lines'], path: "<path d='M0 22.5h30v15H0zm15-15h30v15H15m-30-15h30v15h-30zm15-15h30v15H0z'/>", creationDate: '01 Nov 2020'},
    {title: 'Brick Wall - 2', slug: 'brick-wall-2', mode: 'fill', colors: 3, maxStroke: 9.5, maxScale: 16, maxSpacing: [0, 0], width: 60, height: 30, vHeight: 0, tags: ['brick-wall','lines'], path: "<path d='M1-6.5v13h28v-13H1zm15 15v13h28v-13H16zm-15 15v13h28v-13H1z'/>~<path d='M31-6.5v13h28v-13H31zm-45 15v13h28v-13h-28zm60 0v13h28v-13H46zm-15 15v13h28v-13H31z'/>", creationDate: '14 Nov 2020'},
    {title: 'Herringbone - 1', slug: 'herringbone-1', mode: 'stroke', colors: 2, maxStroke: 8.5, maxScale: 16, maxSpacing: [0, 0], width: 40, height: 20, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M40 0L20-10V0l20 10zm0 10L20 0v10l20 10zm0 10L20 10v10l20 10zM0 20l20-10v10L0 30zm0-10L20 0v10L0 20zM0 0l20-10V0L0 10z'/>", creationDate: '01 Nov 2020'},
    {title: 'Herringbone - 2', slug: 'herringbone-2', mode: 'stroke', colors: 2, maxStroke: 7, maxScale: 16, maxSpacing: [0, 0], width: 20, height: 20, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M10-10L20 0v10L10 0zM20 0L10-10V0l10 10zm0 10L10 0v10l10 10zm0 10L10 10v10l10 10zM0 20l10-10v10L0 30zm0-10L10 0v10L0 20zM0 0l10-10V0L0 10z'/>", creationDate: '01 Nov 2020'},
    {title: 'Herringbone - 3', slug: 'herringbone-3', mode: 'fill', colors: 3, maxStroke: 8.5, maxScale: 16, maxSpacing: [0, 0], width: 40, height: 40, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M20 0L0 10v10l20-10zm0 10v10l20 10V20z'/>~<path d='M20-10V0l20 10V0zm0 30L0 30v10l20-10zm0 10v10l20 10V40z'/>", creationDate: '13 Nov 2020'},
    {title: 'Herringbone - 4', slug: 'herringbone-4', mode: 'fill', colors: 3, maxStroke: 8.5, maxScale: 16, maxSpacing: [0, 0], width: 20, height: 40, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M10-10V0l10 10V0L10-10zm0 10L0 10v10l10-10V0zm0 30v10l10 10V40L10 30z'/>~<path d='M10 10l10 10v10L10 20zm0 10L0 30v10l10-10z'/>", creationDate: '13 Nov 2020'},
    {title: 'Herringbone - 5', slug: 'herringbone-5', mode: 'fill', colors: 3, maxStroke: 2, maxScale: 16, maxSpacing: [0, 0], width: 80, height: 40, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M20 0L0 10v10l20-10 20 10V10zm20 20v10l20-10 20 10V20L60 10z'/>~<path d='M40 0v10L60 0l20 10V0L60-10zM20 20L0 30v10l20-10 20 10V30zm20 20v10l20-10 20 10V40L60 30z'/>", creationDate: '13 Nov 2020'},
    {title: 'Herringbone - 6', slug: 'herringbone-6', mode: 'fill', colors: 3, maxStroke: 2, maxScale: 16, maxSpacing: [0, 0], width: 40, height: 40, vHeight: 0, tags: ['herringbone','lines'], path: "<path d='M10 0L0 10v10l10-10 10 10V10zm10 20v10l10-10 10 10V20L30 10z'/>~<path d='M10-20L0-10V0l10-10L20 0v-10L10-20zM20 0v10L30 0l10 10V0L30-10 20 0zM10 20L0 30v10l10-10 10 10V30L10 20zm10 20v10l10-10 10 10V40L30 30 20 40z'/>", creationDate: '13 Nov 2020'},
  ];

  let newPosts;// = posts;
  import { themeStore, langStore, webStore } from "./stores.js";
  import dayjs from "dayjs";
  // import de from "dayjs/locale/de";
  import relativeTime from "dayjs/plugin/relativeTime";

  // let count_value;
  // themeStore.subscribe(value => {
  //   count_value = value;
  //   // console.log("store Theme: " + value);
  // });

  import "dayjs/locale/de";

  if($langStore === 'de'){
    dayjs.locale("de");
    dayjs.extend(relativeTime);
  }
  else
  dayjs.extend(relativeTime);


  // dayjs().locale("de").format();
  
  let searchBar;
  let w;
  $: placeholderSearch =
    w > 640
      ? strings.searchPattern + " (" + strings.pressFocus + ")"
      : strings.searchPattern;

  onMount(async () => {
    // console.log("onMount")
    searchBar = document.getElementById("search");
    // await tick();
    // newPosts = posts;
  });

  afterUpdate(() => {
    // console.log("afterUpdate")
    if (count===0){
      getPosts();
      // updateCount()
    }
    count++
  });

  // function updateCount() {
  //   const counter = document.getElementById('patternsCount');
  //   const speed = 0.5; // The lower the slower

  //       const target = counter.getAttribute('data-target');
  //       const count = counter.innerText;

  //       // Lower inc to slow and higher to slow
  //       const inc = target / speed;

  //       console.log(target);
  //       console.log(inc);
  //       console.log(count);

  //       // Check if target is reached
  //       if (count < target) {
  //           // Add inc to count and output in counter
  //           counter.innerText = parseInt(count) + parseInt( inc);
  //           // Call function every ms
  //           setTimeout(updateCount, 1);
  //       } else {
  //           counter.innerText = target;
  //       }
  //   };

  function getPosts() {
    return fetch(`index.json`)
      .then((r) => r.json())
      .then((testposts) => {
        posts = testposts;
        newPosts = posts;
      });
  }

  let mode = { text: strings.allModes, value: "all" };
  let colorsCount = { text: strings.allColors, value: 0 };

  let filterOptions = [
    { text: strings.allModes, value: "all" },
    { text: strings.stroke, value: "stroke" },
    { text: strings.fill, value: "fill" },
  ];

  let colorOptions = [
    { text: strings.allColors, value: 0 },
    { text: "2 " + strings.colors, value: 2 },
    { text: "3 " + strings.colors, value: 3 },
    { text: "4 " + strings.colors, value: 4 },
    { text: "5 " + strings.colors, value: 5 },
  ];

  let searchText;

  // let sortOptions = [
  //   { text: "Alphabetical A-Z", value: "az" },
  //   { text: "Alphabetical Z-A", value: "za" },
  //   { text: "Oldest first", value: "old" },
  //   { text: "Newest first", value: "new" },
  // ];

  function filterChanged() {
    // console.log("filterChanged: " + mode.value)
    // console.log(posts.length)
    if (mode.value === "fill")
      newPosts = posts.filter((pattern) => pattern.mode === "fill");
    else if (mode.value === "stroke")
      newPosts = posts.filter(
        (pattern) => pattern.mode === "stroke" || pattern.mode === "stroke-join"
      );
    else newPosts = posts;
  }

  function colorsChanged() {
    // console.log("colorsChanged")
    if (colorsCount.value > 1)
      newPosts = posts.filter(
        (pattern) => pattern.colors === colorsCount.value
      );
    else newPosts = posts;
  }

  function searchChanged() {
    // console.log("searchChanged")
    if (searchText.length > 0) {
      newPosts = posts.filter((pattern) =>
        pattern.tags.find(function (tag) {
          return tag.includes(searchText.toLowerCase());
        })
      );
    } else newPosts = posts;
  }

  function sortAlphabetical() {
    newPosts = newPosts.sort(function (x, y) {
      let a = x.title.toUpperCase(),
        b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    });
  }

  function sortAlphabeticalReverse() {
    newPosts = newPosts.sort(function (x, y) {
      let a = x.title.toUpperCase(),
        b = y.title.toUpperCase();
      return a == b ? 0 : a > b ? -1 : 1;
    });
  }

  function sortLatest() {
    sortAlphabetical();
    newPosts = newPosts.sort(function (x, y) {
      let a = new Date(x.creationDate),
        b = new Date(y.creationDate);
      return a == b ? 0 : a > b ? -1 : 1;
    });
  }

  function sortOldest() {
    sortAlphabetical();
    newPosts = newPosts.sort(function (x, y) {
      let a = new Date(x.creationDate),
        b = new Date(y.creationDate);
      return a == b ? 0 : a > b ? 1 : -1;
    });
  }

  let keyCode;

  function handleKeydown(event) {
    keyCode = event.keyCode;
    if (keyCode === 191) {
      event.preventDefault();
      searchBar.focus();
    }
  }

  let website = $webStore || "https://pattern.monster";
  let title = "Pattern Monster - " + strings.title;
  let url = website;
  let keywords = strings.keywords;
  let desc = strings.description;
  let image = website + "/TwitterBG2.png";

  let lightColors = [
    "hsla(0,0%,100%,1)",
    "hsla(258.5,59.4%,59.4%,1)",
    "hsla(339.6,82.2%,51.6%,1)",
    "hsla(198.7,97.6%,48.4%,1)",
    "hsla(47,80.9%,61%,1)",
  ];
  let darkColors = [
    "hsla(240,6.7%,17.6%,1)",
    "hsla(47,80.9%,61%,1)",
    "hsla(4.1,89.6%,58.4%,1)",
    "hsla(186.8,100%,41.6%,1)",
    "hsla(258.5,59.4%,59.4%,1)",
  ];

  $: colors = $themeStore === "light" ? lightColors : darkColors;

  // let Pickr;

  $: svgPattern = (width, height, path, mode) => {
    let strokeGroup = "";

    for (let i = 0; i < path.split("~").length; i++) {
      let strokeFill =
        "stroke-width='1' stroke='" + colors[i + 1] + "' fill='none'";
      if (mode === "fill")
        strokeFill = "stroke='none' fill='" + colors[i + 1] + "'";

      strokeGroup += path.split("~")[i].replace("/>", " " + strokeFill + "/>");
    }

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
      "' fill='" +
      colors[0] +
      "'/>" +
      strokeGroup +
      "</pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return (
      'background-image: url("data:image/svg+xml,' +
      patternNew.replace("#", "%23") +
      '")'
    );
  };

  // let defaultColors
  // onMount(async () => {
  //   defaultColors = localStorage.getItem("defaultColors");

  //   if (!defaultColors) {
  //     defaultColors = ["white", "black"];

  //     localStorage.setItem("defaultColors", defaultColors);
  //   }
  //   // document.documentElement.setAttribute("dat/a-theme", defaultColors);
  // });

  // const api = "https://hn.algolia.com/api/v1/search_by_date?tags=story";

  // let page = 1;
  // // let list = [];
  // let newsType = "story";
  // let infiniteId = 1;

  // function infiniteHandler({ detail: { loaded, complete } }) {
  // 	fetch(`${api}&page=${page}&tags=${newsType}`)
  // 			.then(response => response.json())
  // 			.then(data => {
  // 				if (data.hits.length) {
  // 					page += 1;
  // 					list = [...list, ...data.hits];
  // 					loaded();
  // 				} else {
  // 					complete();
  // 				}
  // 			});
  // }

  // function infiniteHandler({ detail: { loaded, complete } }) {
  //   fetch(`index.json`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       if (data.length) {
  //         page += 1;
  //         newPosts = [...newPosts, ...data];
  //         loaded();
  //       } else {
  //         complete();
  //       }
  //     });
  // }

  // function changeType() {
  //   page = 1;
  //   list = [];
  //   infiniteId += 50;
  // }
</script>

<style>
  .patternsList {
    color: #1a202c;
    background-color: var(--pattern-bg);
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
    color: var(--accent-text-color);
    background-color: var(--secondary-text-color);
    align-self: center;
    border-radius: var(--border-radius);
    padding: 0.25em 0.625em;
  }

  .samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2em;
    align-items: center;
    color: var(--secondary-text-color);
    /* padding: 2em 0; */
  }
  .outerPattern {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: var(--border-radius);
    overflow: hidden;
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
  h1 {
    font-size: 2em;
    text-align: center;
    font-weight: 600;
    padding: 0.5em;
    color: var(--secondary-text-color);
    margin-bottom: 0.5em;
    margin-top: 0;
  }
  p {
    color: var(--secondary-text-color);
    padding-bottom: 1.5em;
    padding-top: 0.5em;
    text-align: center;
  }
  .stats {
    color: var(--secondary-text-color);
    margin: 0 auto;
    display: grid;
    /* grid-auto-flow: column; */
    grid-template-columns: auto auto auto auto;
    column-gap: 2em;
    row-gap: 0.5em;
    place-content: center;
  }
  .stats-grid {
    display: grid;
    grid-auto-flow: column;
    /* opacity: 0.75; */
    color: var(--gray-text);
    gap: 0.75em;
    place-content: start;
  }
  
  .outerGrid {
    display: grid;
    /* width: 100%; */
    grid-auto-flow: column;
    grid-template-columns: auto 1fr auto;
    /* justify-items: center; */
    /* place-content: start; */
    place-items: center;
    gap: 1em;
    color: var(--secondary-text-color);
    padding-bottom: 2em;
  }
  .filterGrid {
    display: grid;
    grid-auto-flow: column;
    /* justify-items: center; */
    place-content: start;
    place-items: center;
    justify-self: start;
    gap: 1em;
    order: -1;
  }
  .sortGrid {
    display: grid;
    place-items: start;
    align-items: center;
    grid-auto-flow: column;
    justify-self: end;
    order: 1;
    /* gap: 1em; */
  }
  .sortInner {
    display: flex;
    /* gap: 0; */
    place-items: start;
    align-items: center;
    flex-wrap: nowrap;
    /* grid-template-columns: auto auto auto auto; */
    /* justify-items: center; */
    /* place-content: end;
    place-items: center; */
    justify-self: end;
    /* gap: 1em; */
  }
  .sortInner button {
    margin-left: 1em;
  }

  button {
    border: 0.125em solid var(--accent-text);
    color: var(--accent-text);
    background-color: transparent;
  }

  .details {
    background-color: var(--svg-bg);
    color: var(--gray-text);
    font-size: 0.9em;
    display: grid;
    grid-auto-flow: column;
    gap: 1em;
    padding: 0.5em;
    line-height: 1;
  }

  .postDate {
    justify-self: end;
  }

  .searchBox {
    /* padding: 0.625rem 0.75rem; */
    padding: 0.6rem 0.75rem;
    border: 0.0625em solid var(--gray-text);
    background-color: var(--card-bg);
    color: var(--gray-text);
    border-radius: var(--border-radius);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    width: 100%;
  }
  .searchBox:focus-within {
    outline: 1px solid transparent;
    outline-offset: 1px;
    box-shadow: 0 0 0 3px var(--accent-hover);
  }

  .searchBox .icon {
    width: 1em;
    height: 1em;
  }

  .search {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 0.85em;
    /* border: 0; */
    outline: 0;
    background-color: transparent;
    width: 100%;
    padding: 0;
    color: var(--gray-text);
    /* line-height: 1.25; */
    line-height: normal;
  }

  .search:focus {
    outline: 1px solid transparent;
    outline-offset: 1px;
    /* box-shadow: 0 0 0 3px var(--accent-hover); */
  }

  @media (max-width: 1024px) {
    .outerGrid {
      grid-auto-flow: row;
      grid-template-columns: auto;
    }
    .sortGrid {
      justify-self: start;
    }
    .filterGrid {
      order: 0;
    }
  }

  @media (max-width: 768px) {
    h1 {
      text-align: left;
      padding: 0.5em 0;
    }
    p {
      text-align: left;
    }
    .stats {
      place-content: start;
    }
    .samples {
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    }
  }

  @media (max-width: 640px) {
    .patternsList {
      padding: 1.5em;
    }
    .stats {
      grid-template-columns: auto auto;
    }
  }
  @media (max-width: 440px) {
    .outerGrid {
      padding-bottom: 1em;
    }
    .sortGrid {
      align-items: flex-start;
    }
    .sortGrid span {
      margin-top: 0.5em;
      margin-right: 1em;
    }
    .sortInner {
      place-items: start;
      flex-wrap: wrap;
      align-items: center;
    }
    .sortInner button {
      margin-left: 0;
      margin-right: 1em;
      margin-bottom: 1em;
    }
    .sortInner button:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 408px) {
    .patternsList {
      padding: 1em;
    }
    .stats {
      grid-template-columns: auto;
    }
  }
</style>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  <link rel="alternate" href="https://pattern.monster" hreflang="en" />
  <link rel="alternate" href="https://de.pattern.monster"  hreflang="de" />
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

<svelte:window on:keydown={handleKeydown} />

<div bind:clientWidth={w} class="patternsList">
  <h1>{@html strings.heading}</h1>
  <div class="stats">
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.trending} />
      </svg>
      <!-- {patternsCount} -->
      {patternsCount}
      {strings.patterns}
      <!-- <span id="patternsCount" data-target="{patternsCount}">0</span>{strings.patterns} -->
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.download} />
      </svg>
      CSS, SVG, PNG
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.license} />
      </svg>
      {strings.license}
    </div>
    <div class="stats-grid">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.release} />
      </svg>
      {strings.free}
    </div>
  </div>
  <p class="container mx-auto">{strings.description} {strings.description2} {strings.description3}</p>

  <div class="outerGrid">
    <div class="searchBox">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={Constants.icons.search} />
      </svg>
      <input
        id="search"
        class="search"
        type="text"
        aria-label={strings.searchPattern}
        bind:value={searchText}
        placeholder={placeholderSearch}
        on:input={searchChanged} />
    </div>
    <div class="filterGrid">
      {strings.filter}
      <AutoComplete
        inputId="filterMode"
        placeholder={strings.filterMode}
        items={filterOptions}
        bind:selectedItem={mode}
        labelFieldName="text"
        ariaLabel={strings.filterMode}
        onChange={filterChanged} />
      <AutoComplete
        inputId="filterColor"
        placeholder={strings.filterColors}
        items={colorOptions}
        bind:selectedItem={colorsCount}
        labelFieldName="text"
        ariaLabel={strings.filterColors}
        onChange={colorsChanged} />
    </div>
    <div class="sortGrid">
      <span>{strings.sort}</span>
      <div class="sortInner">
        <button on:click={sortLatest}>{strings.latest}</button>
        <button on:click={sortOldest}>{strings.oldest}</button>
        <button on:click={sortAlphabetical}>A-Z</button>
        <button on:click={sortAlphabeticalReverse}>Z-A</button>
      </div>
    </div>
  </div>
  <div class="samples">
    {#each newPosts as post}
      <div class="outerPattern">
        <a
          rel="prefetch"
          href="{post.slug}/"
          class="pattern"
          style={svgPattern(post.width, post.height, post.path, post.mode)}>
          <span>{post.title}</span>
        </a>
        <div class="details">
          {#if post.colors > 2}
            <div class="numColors">2 - {post.colors} {strings.colors}</div>
          {:else}
            <div class="numColors">{post.colors} {strings.colors}</div>
          {/if}
          <div class="postDate" title="Date Updated">
            {dayjs().to(dayjs(post.creationDate), false)}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<Footer />
