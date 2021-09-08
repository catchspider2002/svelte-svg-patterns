<script>
  // the list of items  the user can select from
  export let items = [];

  // field of each item that's used for the labels in the list
  export let labelFieldName = undefined;
  export let keywordsFieldName = labelFieldName;
  export let valueFieldName = undefined;
  export let ariaLabel;

  export let labelFunction = function (item) {
    if (item === undefined || item === null) {
      return "";
    }
    return labelFieldName ? item[labelFieldName] : item;
  };

  export let keywordsFunction = function (item) {
    if (item === undefined || item === null) {
      return "";
    }
    return keywordsFieldName ? item[keywordsFieldName] : labelFunction(item);
  };

  export let valueFunction = function (item) {
    if (item === undefined || item === null) {
      return item;
    }
    return valueFieldName ? item[valueFieldName] : item;
  };

  export let keywordsCleanFunction = function (keywords) {
    return keywords;
  };

  export let textCleanFunction = function (userEnteredText) {
    return userEnteredText;
  };

  export let searchFunction = false;

  export let beforeChange = function (oldSelectedItem, newSelectedItem) {
    return true;
  };
  export let onChange = function (newSelectedItem) {};

  export let selectFirstIfEmpty = false;

  export let minCharactersToSearch = 1;
  export let maxItemsToShowInList = 0;
  export let noResultsText = "No results found";

  const uniqueId = "sautocomplete-" + Math.floor(Math.random() * 1000);

  function safeStringFunction(theFunction, argument) {
    if (typeof theFunction !== "function") {
      console.error("Not a function: " + theFunction + ", argument: " + argument);
    }
    let originalResult;
    try {
      originalResult = theFunction(argument);
    } catch (error) {
      console.warn("Error executing Autocomplete function on value: " + argument + " function: " + theFunction);
    }
    let result = originalResult;
    if (result === undefined || result === null) {
      result = "";
    }
    if (typeof result !== "string") {
      result = result.toString();
    }
    return result;
  }

  function safeLabelFunction(item) {
    // console.log("labelFunction: " + labelFunction);
    // console.log("safeLabelFunction, item: " + item);
    return safeStringFunction(labelFunction, item);
  }

  function safeKeywordsFunction(item) {
    // console.log("safeKeywordsFunction");
    const keywords = safeStringFunction(keywordsFunction, item);
    let result = safeStringFunction(keywordsCleanFunction, keywords);
    result = result.toLowerCase().trim();
    if (debug) {
      console.log("Extracted keywords: '" + result + "' from item: " + JSON.stringify(item));
    }
    return result;
  }

  // the text displayed when no option is selected
  export let placeholder = undefined;
  // apply a className to the control
  export let className = undefined;

  // apply a className to the input control
  export let inputClassName = undefined;

  // apply a id to the input control
  export let inputId = undefined;

  // generate an HTML input with this name, containing the current value
  export let name = undefined;

  // apply a className to the dropdown div
  export let dropdownClassName = undefined;

  // option to hide the dropdown arrow
  export let hideArrow = false;

  // option to show clear selection button
  export let showClear = false;

  // adds the disabled tag to the HTML input
  export let disabled = false;
  // add the title to the HTML input
  export let title = undefined;
  export let debug = false;

  // selected item state
  export let selectedItem = undefined;
  export let value = undefined;
  let text;
  let filteredTextLength = 0;

  function onSelectedItemChanged() {
    value = valueFunction(selectedItem);
    text = safeLabelFunction(selectedItem);
    onChange(selectedItem);
  }

  $: selectedItem, onSelectedItemChanged();

  // HTML elements
  let input;
  let list;

  // UI state
  let opened = false;
  let highlightIndex = -1;

  $: showList = opened && ((items && items.length > 0) || filteredTextLength > 0);

  // view model
  let filteredListItems;

  let listItems = [];

  function prepareListItems() {
    let tStart;
    if (debug) {
      tStart = performance.now();
      console.log("prepare items to search");
      console.log("items: " + JSON.stringify(items));
    }

    if (!Array.isArray(items)) {
      console.warn("Autocomplete items / search function did not return array but", items);
      items = [];
    }

    const length = items ? items.length : 0;
    listItems = new Array(length);

    if (length > 0) {
      items.forEach((item, i) => {
        const listItem = getListItem(item);
        if (listItem == undefined) {
          console.log("Undefined item for: ", item);
        }
        listItems[i] = listItem;
      });
    }

    if (debug) {
      const tEnd = performance.now();
      console.log(listItems.length + " items to search prepared in " + (tEnd - tStart) + " milliseconds");
    }
  }

  function getListItem(item) {
    return {
      // keywords representation of the item
      keywords: safeKeywordsFunction(item),
      // item label
      label: safeLabelFunction(item),
      // store reference to the origial item
      item: item,
    };
  }

  $: items, prepareListItems();

  function prepareUserEnteredText(userEnteredText) {
    if (userEnteredText === undefined || userEnteredText === null) {
      return "";
    }

    const textFiltered = userEnteredText.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, " ").trim();

    filteredTextLength = textFiltered.length;

    if (minCharactersToSearch > 1) {
      if (filteredTextLength < minCharactersToSearch) {
        return "";
      }
    }

    const cleanUserEnteredText = textCleanFunction(textFiltered);
    const textFilteredLowerCase = cleanUserEnteredText.toLowerCase().trim();

    if (debug) {
      console.log("Change user entered text '" + userEnteredText + "' into '" + textFilteredLowerCase + "'");
    }
    return textFilteredLowerCase;
  }

  async function search() {
    let tStart;
    if (debug) {
      tStart = performance.now();
      console.log("Searching user entered text: '" + text + "'");
    }

    const textFiltered = prepareUserEnteredText(text);

    if (textFiltered === "") {
      filteredListItems = listItems;
      closeIfMinCharsToSearchReached();
      if (debug) {
        console.log("User entered text is empty set the list of items to all items");
      }
      return;
    }

    if (searchFunction) {
      items = await searchFunction(textFiltered);
      prepareListItems();
    }

    const searchWords = textFiltered.split(" ");

    let tempfilteredListItems = listItems.filter((listItem) => {
      if (!listItem) {
        return false;
      }
      const itemKeywords = listItem.keywords;

      let matches = 0;
      searchWords.forEach((searchWord) => {
        if (itemKeywords.includes(searchWord)) {
          matches++;
        }
      });

      return matches >= searchWords.length;
    });

    const hlfilter = highlightFilter(textFiltered, ["label"]);
    const filteredListItemsHighlighted = tempfilteredListItems.map(hlfilter);

    filteredListItems = filteredListItemsHighlighted;
    closeIfMinCharsToSearchReached();
    if (debug) {
      const tEnd = performance.now();
      console.log("Search took " + (tEnd - tStart) + " milliseconds, found " + filteredListItems.length + " items");
    }
  }

  // $: text, search();

  function selectListItem(listItem) {
    if (debug) {
      console.log("selectListItem");
    }
    if ("undefined" === typeof listItem) {
      if (debug) {
        console.log(`listItem ${i} is undefined. Can not select.`);
      }
      return false;
    }
    const newSelectedItem = listItem.item;
    if (beforeChange(selectedItem, newSelectedItem)) {
      selectedItem = newSelectedItem;
    }
    return true;
  }

  function selectItem() {
    if (debug) {
      console.log("selectItem");
    }
    const listItem = filteredListItems[highlightIndex];
    if (selectListItem(listItem)) {
      close();
    }
  }

  function up() {
    if (debug) {
      console.log("up");
    }

    open();
    if (highlightIndex > 0) highlightIndex--;
    highlight();
  }

  function down() {
    if (debug) {
      console.log("down");
    }

    open();
    if (highlightIndex < filteredListItems.length - 1) highlightIndex++;
    highlight();
  }

  function highlight() {
    if (debug) {
      console.log("highlight");
    }

    const query = ".selected";
    if (debug) {
      console.log("Seaching DOM element: " + query + " in " + list);
    }
    const el = list.querySelector(query);
    if (el) {
      if (typeof el.scrollIntoViewIfNeeded === "function") {
        if (debug) {
          console.log("Scrolling selected item into view");
        }
        el.scrollIntoViewIfNeeded();
      } else {
        if (debug) {
          console.warn("Could not scroll selected item into view, scrollIntoViewIfNeeded not supported");
        }
      }
    } else {
      if (debug) {
        console.warn("Selected item not found to scroll into view");
      }
    }
  }

  function onListItemClick(listItem) {
    if (debug) {
      console.log("onListItemClick");
    }

    if (selectListItem(listItem)) {
      close();
    }
  }

  function onDocumentClick(e) {
    if (debug) {
      console.log("onDocumentClick: " + JSON.stringify(e.target));
    }
    if (e.target.closest("." + uniqueId)) {
      if (debug) {
        console.log("onDocumentClick inside");
      }
      // resetListToAllItemsAndOpen();
      highlight();
    } else {
      if (debug) {
        console.log("onDocumentClick outside");
      }
      close();
    }
  }

  function onKeyDown(e) {
    if (debug) {
      console.log("onKeyDown");
    }

    let key = e.key;
    if (key === "Tab" && e.shiftKey) key = "ShiftTab";
    const fnmap = {
      Tab: opened ? down.bind(this) : null,
      ShiftTab: opened ? up.bind(this) : null,
      ArrowDown: down.bind(this),
      ArrowUp: up.bind(this),
      Escape: onEsc.bind(this),
    };
    const fn = fnmap[key];
    if (typeof fn === "function") {
      e.preventDefault();
      fn(e);
    }
  }

  function onKeyPress(e) {
    if (debug) {
      console.log("onKeyPress");
    }

    if (e.key === "Enter") {
      e.preventDefault();
      selectItem();
    }
  }

  function onInput(e) {
    if (debug) {
      console.log("onInput");
    }

    text = e.target.value;
    search();
    highlightIndex = 0;
    open();
  }

  function onInputClick() {
    if (debug) {
      console.log("onInputClick");
    }
    resetListToAllItemsAndOpen();
  }

  function onEsc(e) {
    if (debug) {
      console.log("onEsc");
    }

    //if (text) return clear();
    e.stopPropagation();
    if (opened) {
      input.focus();
      close();
    }
  }

  function onFocus() {
    if (debug) {
      console.log("onFocus");
    }

    resetListToAllItemsAndOpen();
  }

  function resetListToAllItemsAndOpen() {
    if (debug) {
      console.log("resetListToAllItemsAndOpen");
    }

    filteredListItems = listItems;

    open();

    // find selected item
    if (selectedItem) {
      if (debug) {
        console.log("Searching currently selected item: " + JSON.stringify(selectedItem));
      }
      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        if ("undefined" === typeof listItem) {
          if (debug) {
            console.log(`listItem ${i} is undefined. Skipping.`);
          }
          continue;
        }
        if (debug) {
          console.log("Item " + i + ": " + JSON.stringify(listItem));
        }
        if (selectedItem == listItem.item) {
          highlightIndex = i;
          if (debug) {
            console.log("Found selected item: " + i + ": " + JSON.stringify(listItem));
          }
          highlight();
          break;
        }
      }
    }
  }

  function open() {
    if (debug) {
      console.log("open");
    }

    // check if the search text has more than the min chars required
    if (isMinCharsToSearchReached()) {
      return;
    }

    opened = true;
  }

  function close() {
    if (debug) {
      console.log("close");
    }
    opened = false;

    if (!text && selectFirstIfEmpty) {
      highlightFilter = 0;
      selectItem();
    }
  }

  function isMinCharsToSearchReached() {
    return minCharactersToSearch > 1 && filteredTextLength < minCharactersToSearch;
  }

  function closeIfMinCharsToSearchReached() {
    if (isMinCharsToSearchReached()) {
      close();
    }
  }

  function clear() {
    if (debug) {
      console.log("clear");
    }

    text = "";
    selectedItem = undefined;

    setTimeout(() => {
      input.focus();
      close();
    });
  }

  function onBlur() {
    if (debug) {
      console.log("onBlur");
    }
    close();
  }
  // 'item number one'.replace(/(it)(.*)(nu)(.*)(one)/ig, '<b>$1</b>$2 <b>$3</b>$4 <b>$5</b>')
  function highlightFilter(q, fields) {
    const qs = "(" + q.trim().replace(/\s/g, ")(.*)(") + ")";
    const reg = new RegExp(qs, "ig");
    let n = 1;
    const len = qs.split(")(").length + 1;
    let repl = "";
    for (; n < len; n++) repl += n % 2 ? `<b>$${n}</b>` : `$${n}`;

    return (i) => {
      const newI = Object.assign({ highlighted: {} }, i);
      if (fields) {
        fields.forEach((f) => {
          if (!newI[f]) return;
          newI.highlighted[f] = newI[f].replace(reg, repl);
        });
      }
      return newI;
    };
  }
</script>

<style>
  .autocomplete {
    min-width: 90px;
    display: inline-block;
    max-width: 130px;
    position: relative;
    /* vertical-align: top; */
    height: 2.25em;
  }

  .autocomplete:not(.hide-arrow)::after {
    border: 3px solid transparent;
    border-radius: 2px;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: 0.625em;
    margin-top: -0.4375em;
    pointer-events: none;
    position: absolute;
    top: 50%;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    width: 0.625em;
    border-color: #3273dc;
    right: 0.75em;
    z-index: 4;
  }

  .autocomplete.show-clear:not(.hide-arrow)::after {
    right: 2.3em;
  }

  .autocomplete * {
    box-sizing: border-box;
  }
  .autocomplete-input {
    font: inherit;
    font-size: 0.85em;
    width: 100%;
    height: 100%;
    /* padding: 5px 11px; */
    padding: 0.6rem 0.75rem;
    cursor: default;
    /* -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; */
    /* pointer-events: none; */
  }

  .autocomplete:not(.hide-arrow) .autocomplete-input {
    padding-right: 2em;
  }
  .autocomplete.show-clear:not(.hide-arrow) .autocomplete-input {
    padding-right: 3.2em;
  }
  .autocomplete.hide-arrow.show-clear .autocomplete-input {
    padding-right: 2em;
  }

  .autocomplete-list {
    background: #fff;
    position: relative;
    width: 100%;
    overflow-y: auto;
    z-index: 99;
    padding: 10px 0;
    top: 0;
    border: 1px solid #999;
    max-height: calc(15 * (1rem + 10px) + 15px);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .autocomplete-list:empty {
    padding: 0;
  }
  .autocomplete-list-item {
    padding: 0.75em 1em;
    color: #333;
    cursor: pointer;
    /* line-height: 1; */
    line-height: normal;
    font-size: 0.85em;
  }

  .autocomplete-list-item:hover,
  .autocomplete-list-item.selected {
    background-color: #2e69e2;
    color: #fff;
  }
  .autocomplete-list-item-no-results {
    padding: 5px 15px;
    color: #999;
    /* line-height: 1; */
    line-height: normal;
  }

  .autocomplete-list.hidden {
    display: none;
  }

  .autocomplete.show-clear .autocomplete-clear-button {
    cursor: pointer;
    display: block;
    text-align: center;
    position: absolute;
    right: 0.1em;
    padding: 0.3em 0.6em;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 4;
  }

  .autocomplete:not(.show-clear) .autocomplete-clear-button {
    display: none;
  }

  /* Autocomplete */
  .autocomplete {
    background-color: var(--card-bg);
    /* color: var(--secondary-text-color); */
    color: var(--gray-text);
    border: 0.0625em solid var(--gray-text);
    border-radius: var(--border-radius);
  }
  .autocomplete-input {
    background-color: var(--card-bg);
    /* color: var(--secondary-text-color); */
    color: var(--gray-text);
  }
  .autocomplete-list {
    background: var(--card-bg);
    /* color: var(--secondary-text-color); */
    color: var(--gray-text);
  }
  .autocomplete-list-item {
    background-color: var(--card-bg);
    color: var(--secondary-text-color);
  }
  .autocomplete-list-item:hover,
  .autocomplete-list-item.selected {
    background-color: var(--accent-text);
    color: var(--accent-text-color);
  }
  .autocomplete:not(.hide-arrow)::after {
    border-color: var(--accent-text);
  }
</style>

<div
  class="{className ? className : ''}
  {hideArrow ? 'hide-arrow is-multiple' : ''}
  {showClear ? 'show-clear' : ''} autocomplete select is-fullwidth {uniqueId}">
  <input
    type="text"
    readonly
    class="{inputClassName ? inputClassName : ''} input autocomplete-input"
    id={inputId ? inputId : ''}
    {placeholder}
    {name}
    {disabled}
    {title}
    bind:this={input}
    aria-label={ariaLabel}
    bind:value={text}
    on:input={onInput}
    on:focus={onFocus}
    on:keydown={onKeyDown}
    on:click={onInputClick}
    on:keypress={onKeyPress} />
  {#if showClear}<span on:click={clear} class="autocomplete-clear-button">&#10006;</span>{/if}
  <div class="{dropdownClassName ? dropdownClassName : ''} autocomplete-list {showList ? '' : 'hidden'}
    is-fullwidth" bind:this={list}>
    {#if filteredListItems && filteredListItems.length > 0}
      {#each filteredListItems as listItem, i}
        {#if listItem && (maxItemsToShowInList <= 0 || i < maxItemsToShowInList)}
          {#if listItem}
            <div class="autocomplete-list-item {i === highlightIndex ? 'selected' : ''}" on:click={() => onListItemClick(listItem)}>
              {#if listItem.highlighted}
                {@html listItem.highlighted.label}
              {:else}
                {@html listItem.label}
              {/if}
            </div>
          {/if}
        {/if}
      {/each}

      {#if maxItemsToShowInList > 0 && filteredListItems.length > maxItemsToShowInList}
        <div class="autocomplete-list-item-no-results">...{filteredListItems.length - maxItemsToShowInList} results not shown</div>
      {/if}
    {:else if noResultsText}
      <div class="autocomplete-list-item-no-results">{noResultsText}</div>
    {/if}
  </div>
</div>

<svelte:window on:click={onDocumentClick} />
