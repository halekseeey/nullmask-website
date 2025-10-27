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
	import { currentSection } from '$lib/Stores/currentSection'

	let scrollContainer
	let cleanup
	let sectionObserver

	onMount(() => {
		if (browser && scrollContainer) {
			// Initialize snap scroll
			const snapScrollController = initSnapScroll(scrollContainer)
			cleanup = snapScrollController.init()

			// Track current section
			const sections = scrollContainer.querySelectorAll('[data-section]')
			const sectionsArray = Array.from(sections)

			// Create IntersectionObserver to track current section
			sectionObserver = new IntersectionObserver(
				(entries) => {
					// Find the section with the highest intersection ratio
					let maxRatio = 0
					let currentEntry = null

					entries.forEach((entry) => {
						if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
							maxRatio = entry.intersectionRatio
							currentEntry = entry
						}
					})

					// Update store with current section info
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

			// Observe all sections
			sectionsArray.forEach((section) => {
				sectionObserver.observe(section)
			})
		}

		return () => {
			if (cleanup) cleanup()
			if (sectionObserver) sectionObserver.disconnect()
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
