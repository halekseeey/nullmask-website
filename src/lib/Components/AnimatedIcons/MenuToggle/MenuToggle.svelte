<script>
	import { gsap } from 'gsap'
	import { createEventDispatcher, onMount, onDestroy } from 'svelte'
	import { isMenuOpen, toggleMenu as toggleMenuStore } from '$lib/Stores/menuStore.js'

	export let className = ''
	export let theme = 'light' // 'light' or 'dark'

	const dispatch = createEventDispatcher()

	let isOpen = false
	let pathRefs = [null, null, null]

	// SVG paths for Open state (3 horizontal lines)
	const openPaths = [
		'M18 22 L48 22', // Top line
		'M18 32 L48 32', // Middle line
		'M18 42 L48 42' // Bottom line
	]

	// SVG paths for Close state (X shape)
	const closePaths = [
		'M23 42 L43 22', // Diagonal line 1 (top-left to bottom-right)
		'M23 22 L43 42' // Diagonal line 2 (bottom-left to top-right)
	]

	// Subscribe to menu store
	let unsubscribe
	onMount(() => {
		unsubscribe = isMenuOpen.subscribe((value) => {
			if (value !== isOpen) {
				isOpen = value
				animateMenu()
			}
		})
	})

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe()
		}
	})

	// Function to toggle menu state
	function toggleMenu() {
		isOpen = !isOpen

		animateMenu()
		dispatch('click', { isOpen })
	}

	// GSAP animation function
	function animateMenu() {
		if (isOpen) {
			// Animate to close state (X)
			// First line (top) -> first diagonal of X
			gsap.to(pathRefs[0], {
				attr: { d: closePaths[0] },
				duration: 0.3,
				ease: 'power2.out'
			})

			// Third line (bottom) -> second diagonal of X
			gsap.to(pathRefs[2], {
				attr: { d: closePaths[1] },
				duration: 0.3,
				ease: 'power2.out'
			})

			// Hide the middle line
			gsap.to(pathRefs[1], {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.out'
			})
		} else {
			// Animate to open state (3 lines)
			// First diagonal -> top line
			gsap.to(pathRefs[0], {
				attr: { d: openPaths[0] },
				duration: 0.3,
				ease: 'power2.out'
			})

			// Second diagonal -> bottom line
			gsap.to(pathRefs[2], {
				attr: { d: openPaths[2] },
				duration: 0.3,
				ease: 'power2.out'
			})

			// Show the middle line
			gsap.to(pathRefs[1], {
				opacity: 1,
				duration: 0.2,
				ease: 'power2.out'
			})
		}
	}
</script>

<button on:click={toggleMenu} class={className} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
	<svg width="65" height="63" viewBox="0 0 65 63" fill="none" xmlns="http://www.w3.org/2000/svg">
		<!-- Top line -->
		<path
			d={openPaths[0]}
			class="stroke-line transition-colors duration-500"
			class:stroke-light={theme === 'dark'}
			class:stroke-dark={theme === 'light'}
			stroke-width="4"
			stroke-linecap="round"
			bind:this={pathRefs[0]}
		/>

		<!-- Middle line -->
		<path
			d={openPaths[1]}
			class="stroke-line transition-colors duration-500"
			class:stroke-light={theme === 'dark'}
			class:stroke-dark={theme === 'light'}
			stroke-width="4"
			stroke-linecap="round"
			bind:this={pathRefs[1]}
		/>

		<!-- Bottom line -->
		<path
			d={openPaths[2]}
			class="stroke-line transition-colors duration-500"
			class:stroke-light={theme === 'dark'}
			class:stroke-dark={theme === 'light'}
			stroke-width="4"
			stroke-linecap="round"
			bind:this={pathRefs[2]}
		/>
	</svg>
</button>

<style>
	:global(.stroke-light) {
		stroke: #d9d9d9;
	}

	:global(.stroke-dark) {
		stroke: #202221;
	}
</style>
