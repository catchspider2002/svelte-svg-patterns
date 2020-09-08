<script>
  	import { quintOut } from 'svelte/easing';
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  let iconCSK = false,
    iconMI = false,
    iconBat = false,
    iconBowl = false,
    iconKeep = false,
    iconAR = false;
  $: allTeams = ["CSK", "MI"];
  $: selectedTeams = [];
  // 	$: unselectedTeams = 	allTeams.filter(e => !selectedTeams.includes(e));
  $: selectedRoles = [];

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });

  let todos = [
    { id: 1, done: true, team: "CSK", role: "WK", cost: 105, name: "MS Dhoni" },
    { id: 2, done: false, team: "CSK", role: "BAT", cost: 95, name: "Faf Du Plessis" },
    { id: 3, done: true, team: "CSK", role: "BAT", cost: 95, name: "S Raina" },
    { id: 4, done: false, team: "CSK", role: "BWL", cost: 90, name: "Imran Tahir" },
    { id: 5, done: false, team: "CSK", role: "AR", cost: 100, name: "Shane Watson" },
    { id: 6, done: false, team: "CSK", role: "BWL", cost: 85, name: "Harbhajan Singh" },
    { id: 7, done: false, team: "CSK", role: "BWL", cost: 80, name: "Deepak Chahar" },
    { id: 8, done: false, team: "CSK", role: "BWL", cost: 85, name: "Piyush Chawla" },
    { id: 9, done: false, team: "CSK", role: "BWL", cost: 90, name: "Lungi Ngidi" },
    { id: 10, done: false, team: "MI", role: "BAT", cost: 105, name: "Rohit Sharma" },
    { id: 11, done: false, team: "MI", role: "BWL", cost: 95, name: "Lasith Malinga" },
    { id: 12, done: false, team: "MI", role: "AR", cost: 80, name: "Krunal Pandya" },
    { id: 13, done: false, team: "MI", role: "WK", cost: 95, name: "Quinton De Kock" },
    { id: 14, done: false, team: "MI", role: "BWL", cost: 100, name: "Jasprit Bumrah" },
    { id: 15, done: false, team: "MI", role: "BWL", cost: 95, name: "Trent Boult" },
    { id: 16, done: false, team: "MI", role: "BAT", cost: 90, name: "Chris Lynn" },
    { id: 17, done: false, team: "MI", role: "AR", cost: 95, name: "Hardik Pandya" },
    { id: 18, done: false, team: "MI", role: "AR", cost: 95, name: "Kieron Pollard" }
  ];

  $: selectedList = todos.filter(v => v.done);

  $: sum = selectedList.map(v => v.cost).reduce((sum, current) => sum + current, 0);

  $: bat = selectedList.filter(v => v.role == "BAT" || v.role == "AR" || v.role == "WK");
  $: bowl = selectedList.filter(v => v.role == "BWL" || v.role == "AR");
  $: keep = selectedList.filter(v => v.role == "WK");

  let uid = todos.length + 1;

  $: leftPlayers = todos.filter(t => !t.done);
  $: filteredTeams = todos.filter(t => !t.done);

  let addTeam = val => {
    selectedTeams.push(val);
    console.log("allTeams:" + allTeams);
    console.log("selectedTeams:" + selectedTeams);
    filteredTeams = [];
    for (var i = 0; i < selectedTeams.length; i++) {
      let newFilter = leftPlayers.filter(v => v.team === selectedTeams[i]);
      filteredTeams = filteredTeams.concat(newFilter);
    }
    console.log(filteredTeams);
  };

  let removeTeam = val => {
    for (var i = 0; i < selectedTeams.length; i++) {
      if (selectedTeams[i] === val) {
        selectedTeams.splice(i, 1);
      }
    }
    console.log("allTeams:" + allTeams);
    console.log("selectedTeams:" + selectedTeams);
  };

  let addRole = val => {
    selectedRoles.push(val);
    console.log(selectedRoles);
  };

  let removeRole = val => {
    for (var i = 0; i < selectedRoles.length; i++) {
      if (selectedRoles[i] === val) {
        selectedRoles.splice(i, 1);
      }
    }
    console.log(selectedRoles);
  };
</script>

<style>
  .board {
    max-width: 36em;
    margin: 0 auto;
  }

  .leftList,
  .rightList {
    opacity: 0;
  }

  .left,
  .right {
    float: left;
    width: 50%;
    padding: 0 1em 0 0;
    box-sizing: border-box;
  }

  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
  }

  label {
    top: 0;
    left: 0;
    display: block;
    font-size: 1em;
    line-height: 1;
    /* 		padding: 0.75em; */
    margin: 0 auto 0.5em auto;
    border-radius: 2px;
    background-color: #eee;
    user-select: none;
    cursor: pointer;
  }

  .playerDetails {
    display: grid;
    margin-top: -15px;
    /* 		background-color: red; */
    padding: 0.75em 0.25em;
    grid-template-columns: 10% 10% 1fr 12%;
    grid-gap: 10px;
  }

  input {
    margin: 0;
  }

  .right label {
    background-color: rgb(180, 240, 100);
  }

  .green {
    background-color: #9ae6b4;
    color: #22543d;
    font-weight: 600;
    padding: 0.25em 0.5em;
  }
  .red {
    background-color: #feb2b2;
    color: #742a2a;
    font-weight: 600;
    padding: 0.25em 0.5em;
  }
</style>

<div class="board">

  <div class="left">
    <h2>Available</h2>
    <label>
      <input
        type="checkbox"
        bind:checked={iconCSK}
        on:change={() => {
          if (iconCSK == true) addTeam('CSK');
          else removeTeam('CSK');
        }} />
      CSK
    </label>
    <label>
      <input
        type="checkbox"
        bind:checked={iconMI}
        on:change={() => {
          if (iconMI == true) addTeam('MI');
          else removeTeam('MI');
        }} />
      MI
    </label>
    {#each filteredTeams as todo (todo.id)}
      <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
        <input class="leftList" type="checkbox" bind:checked={todo.done} />
        <div class="playerDetails">
          <span>{todo.role}</span>
          <span>{todo.team}</span>
          <span>{todo.name}</span>
          <span>{todo.cost}K</span>
        </div>
      </label>
    {/each}
  </div>

  <div class="right">
    <h3>Team ({selectedList.length} Players) (Cost: {sum}K)</h3>
    {#if bat.length > 5}
      <span class="green">Bat {bat.length}</span>
    {:else}
      <span class="red">Bat {bat.length}</span>
    {/if}

    {#if bowl.length > 5}
      <span class="green">Bowl {bowl.length}</span>
    {:else}
      <span class="red">Bowl {bowl.length}</span>
    {/if}

    {#if keep.length > 0}
      <span class="green">Keep {keep.length}</span>
    {:else}
      <span class="red">Keep {keep.length}</span>
    {/if}

    {#each todos.filter(t => t.done) as todo (todo.id)}
      <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
        <input class="rightList" type="checkbox" bind:checked={todo.done} />
        <div class="playerDetails">
          <span>{todo.role}</span>
          <span>{todo.team}</span>
          <span>{todo.name}</span>
          <span>{todo.cost}K</span>
        </div>
      </label>
    {/each}
    {selectedTeams}
  </div>
</div>
