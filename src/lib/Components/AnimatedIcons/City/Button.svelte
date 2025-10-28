<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let activePosition = 1 // 1, 2, or 3

	let block1
	let block2
	let block3

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	function handleBlockClick(targetPosition) {
		activePosition = targetPosition
		updatePosition()
		// Trigger custom event to parent
		dispatch('position-change', targetPosition)
	}

	function updatePosition() {
		if (!block1 || !block2 || !block3 || activePosition === 0) return

		// Position 1: green block on left, two gray on right
		// Create GSAP timeline for smooth transition
		const timeline = gsap.timeline({ ease: 'power2.inOut' })

		if (activePosition === 1) {
			// Position 1: green block on left
			timeline.to(block1, { duration: 0.4, attr: { x: 11, width: 27, fill: '#CDEF33' } }, 0)
			timeline.to(block2, { duration: 0.4, attr: { x: 42, width: 7, fill: '#D9D9D9' } }, 0)
			timeline.to(block3, { duration: 0.4, attr: { x: 53, width: 7, fill: '#D9D9D9' } }, 0)
		} else if (activePosition === 2) {
			// Position 2: green block in middle
			timeline.to(block1, { duration: 0.4, attr: { x: 11, width: 7, fill: '#D9D9D9' } }, 0)
			timeline.to(block2, { duration: 0.4, attr: { x: 22, width: 27, fill: '#CDEF33' } }, 0)
			timeline.to(block3, { duration: 0.4, attr: { x: 53, width: 7, fill: '#D9D9D9' } }, 0)
		} else if (activePosition === 3) {
			// Position 3: green block on right
			timeline.to(block1, { duration: 0.4, attr: { x: 11, width: 7, fill: '#D9D9D9' } }, 0)
			timeline.to(block2, { duration: 0.4, attr: { x: 22, width: 7, fill: '#D9D9D9' } }, 0)
			timeline.to(block3, { duration: 0.4, attr: { x: 33, width: 27, fill: '#CDEF33' } }, 0)
		}
	}

	function hoverEnter(targetPosition) {
		if (!block1 || !block2 || !block3) return
		if (activePosition === targetPosition) return
		const target = targetPosition === 1 ? block1 : targetPosition === 2 ? block2 : block3
		gsap.to(target, { duration: 0.2, attr: { fill: '#CDEF33' }, ease: 'power2.out' })
	}

	function hoverLeave(targetPosition) {
		if (!block1 || !block2 || !block3) return
		if (activePosition === targetPosition) return
		const target = targetPosition === 1 ? block1 : targetPosition === 2 ? block2 : block3
		gsap.to(target, { duration: 0.2, attr: { fill: '#D9D9D9' }, ease: 'power2.out' })
	}

	onMount(() => {
		updatePosition()
	})

	$: {
		if (block1 && block2 && block3) {
			updatePosition()
		}
	}
</script>

<svg width="71" height="26" viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="0.5" y="0.5" width="70" height="25" rx="12.5" fill="#202221" />
	<rect x="0.5" y="0.5" width="70" height="25" rx="12.5" stroke="#D9D9D9" />
	<!-- Dynamic clickable areas - only around inactive blocks, all same size -->

	<!-- Three blocks - visual only -->
	<rect bind:this={block1} x="11" y="9" width="27" height="7" rx="3.5" fill="#CDEF33" />
	<rect bind:this={block2} x="42" y="9" width="7" height="7" rx="3.5" fill="#D9D9D9" />
	<rect bind:this={block3} x="53" y="9" width="7" height="7" rx="3.5" fill="#D9D9D9" />

	{#if activePosition === 1}
		<!-- Active is block1, add larger areas for block2 and block3 -->
		<rect
			x="35"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(2)}
			on:mouseenter={() => hoverEnter(2)}
			on:mouseleave={() => hoverLeave(2)}
		/>
		<rect
			x="52"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(3)}
			on:mouseenter={() => hoverEnter(3)}
			on:mouseleave={() => hoverLeave(3)}
		/>
	{:else if activePosition === 2}
		<!-- Active is block2, add larger areas for block1 and block3 -->
		<rect
			x="3"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(1)}
			on:mouseenter={() => hoverEnter(1)}
			on:mouseleave={() => hoverLeave(1)}
		/>
		<rect
			x="52"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(3)}
			on:mouseenter={() => hoverEnter(3)}
			on:mouseleave={() => hoverLeave(3)}
		/>
	{:else if activePosition === 3}
		<!-- Active is block3, add larger areas for block1 and block2 -->
		<rect
			x="3"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(1)}
			on:mouseenter={() => hoverEnter(1)}
			on:mouseleave={() => hoverLeave(1)}
		/>
		<rect
			x="20"
			y="0"
			width="15"
			height="26"
			fill="transparent"
			style="cursor: pointer;"
			on:click={() => handleBlockClick(2)}
			on:mouseenter={() => hoverEnter(2)}
			on:mouseleave={() => hoverLeave(2)}
		/>
	{/if}
</svg>
