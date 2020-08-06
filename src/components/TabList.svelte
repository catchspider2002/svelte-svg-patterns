<div class="tab-list">
	<slot></slot>
</div>

<style>
	.tab-list {
		position: fixed;
		bottom: 0;
		left:0;
		background-color: black;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
