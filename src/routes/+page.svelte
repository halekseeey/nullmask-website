<script>
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	import Hero from './_sections/Hero.svelte'
	import Keyhole from './_sections/Keyhole.svelte'
	import Phone from './_sections/Phone.svelte'
	import City from './_sections/City.svelte'
	import Eyes from './_sections/Eyes.svelte'
	import Carousel from './_sections/Carousel.svelte'
	import { currentSection } from '$lib/Stores/currentSection'
	import { initSnapScrollHyperframe } from '$lib/utils/snapScroll'

	let scrollContainer
	let sectionObserver
	let cleanupSnap

	onMount(() => {
		if (!browser || !scrollContainer) return

		// Initialize Hyperframe-style snap scroll
		cleanupSnap = initSnapScrollHyperframe(scrollContainer)

		// Track current section with IntersectionObserver
		const sections = scrollContainer.querySelectorAll('section')
		const sectionsArray = Array.from(sections)

		sectionObserver = new IntersectionObserver(
			(entries) => {
				let maxRatio = 0
				let currentEntry = null

				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio
						currentEntry = entry
					}
				})

				if (currentEntry) {
					const sectionId = currentEntry.target.getAttribute('data-section')
					const sectionTheme = currentEntry.target.getAttribute('data-theme')
					const sectionIndex = sectionsArray.indexOf(currentEntry.target)

					currentSection.set({
						index: sectionIndex,
						id: sectionId,
						theme: sectionTheme
					})
				}
			},
			{
				threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
				rootMargin: '-50px 0px -50px 0px'
			}
		)

		sectionsArray.forEach((section) => {
			sectionObserver.observe(section)
		})

		return () => {
			if (cleanupSnap) cleanupSnap()
			if (sectionObserver) sectionObserver.disconnect()
		}
	})
</script>

<div bind:this={scrollContainer} id="main" class="snap-scroll">
	<Hero />
	<Keyhole />
	<Carousel />
	<Phone />
	<City />
	<Eyes />
</div>

<style>
	:global(#main) {
		position: relative;
		height: 100%;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		-webkit-overflow-scrolling: touch;
	}

	:global(#main > section) {
		height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	@supports (height: 100svh) {
		:global(#main > section) {
			height: 100svh;
		}
	}
</style>
