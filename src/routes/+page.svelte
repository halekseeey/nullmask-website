<script>
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	import Hero from './_sections/Hero.svelte'
	import Keyhole from './_sections/Keyhole.svelte'
	import Phone from './_sections/Phone.svelte'
	import City from './_sections/City.svelte'
	import Eyes from './_sections/Eyes.svelte'
	import Carousel from './_sections/Carousel.svelte'
	import { initSnapScroll } from '$lib/utils/snapScroll'

	let scrollContainer
	let cleanup

	onMount(() => {
		if (browser && scrollContainer) {
			// Initialize snap scroll
			const snapScrollController = initSnapScroll(scrollContainer)
			cleanup = snapScrollController.init()
		}

		return () => {
			if (cleanup) cleanup()
		}
	})
</script>

<div bind:this={scrollContainer} class="snap-scroll-wrapper">
	<main class="snap-scroll-container">
		<Hero className="snap-scroll-section" />
		<Keyhole className="snap-scroll-section" />
		<Carousel className="snap-scroll-section" />
		<Phone className="snap-scroll-section" />
		<City className="snap-scroll-section" />
		<Eyes className="snap-scroll-section" />
	</main>
</div>

<style>
	:global(.snap-scroll-wrapper) {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		z-index: 0;
	}

	:global(.snap-scroll-container) {
		scroll-snap-type: y mandatory;
	}
</style>
