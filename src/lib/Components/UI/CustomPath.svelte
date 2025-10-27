<script>
	import { onMount } from 'svelte'
	export let d
	export let setRef
	export let config = {}
	let el
	onMount(() => {
		setRef && setRef(el)
	})
</script>

<path bind:this={el} {d} {...config} />
