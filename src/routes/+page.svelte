<script>
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
	import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
	import { initScrollBridge } from '$lib/initScrollBridge'
	import Hero from './_sections/Hero.svelte'

	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

	let sections = []
	let contentWrapper
	let scrolling = {
		enabled: true,
		events: 'scroll,wheel,touchmove,pointermove'.split(','),
		prevent: (e) => e.preventDefault(),
		disable() {
			if (scrolling.enabled) {
				scrolling.enabled = false
				contentWrapper.addEventListener('scroll', gsap.ticker.tick, { passive: true })
				scrolling.events.forEach((e, i) =>
					(i ? document : window).addEventListener(e, scrolling.prevent, { passive: false })
				)
			}
		},
		enable() {
			if (!scrolling.enabled) {
				scrolling.enabled = true
				contentWrapper.removeEventListener('scroll', gsap.ticker.tick)
				scrolling.events.forEach((e, i) =>
					(i ? document : window).removeEventListener(e, scrolling.prevent)
				)
			}
		}
	}

	function goToSection(section) {
		console.log(
			'goToSection called:',
			section.id,
			'enabled:',
			scrolling.enabled,
			'wrapper:',
			contentWrapper
		)
		if (scrolling.enabled && contentWrapper) {
			// skip if a scroll tween is in progress
			scrolling.disable()
			gsap.to(contentWrapper, {
				scrollTo: { y: section, autoKill: false },
				onComplete: scrolling.enable,
				duration: 1
			})
		}
	}

	onMount(() => {
		if (browser) {
			// Wait for DOM to be ready and find content wrapper
			setTimeout(() => {
				// Try to find the actual scrollable container
				contentWrapper =
					document.querySelector('.content-wrapper') ||
					document.querySelector('.content-div') ||
					document.querySelector('body')

				console.log('Content wrapper found:', contentWrapper)

				sections = document.querySelectorAll('section')
				console.log('Sections found:', sections.length)

				// Initialize scroll bridge script
				initScrollBridge()

				sections.forEach((section, i) => {
					ScrollTrigger.create({
						trigger: section,
						start: 'top bottom-=1',
						end: 'bottom top+=1',
						scroller: contentWrapper,
						onEnter: () => {
							console.log('Entering section:', section.id)
							goToSection(section)
						},
						onEnterBack: () => {
							console.log('Entering back section:', section.id)
							goToSection(section)
						}
					})
				})
			}, 500) // Increased timeout to ensure layout is ready
		}
	})
</script>

<main>
	<Hero />

	<section
		id="rooms"
		class="flex h-screen min-h-[2000px] w-full items-center justify-center bg-red-500"
	>
		<h2 class="text-4xl font-bold text-white">Des chambres pour vous</h2>
	</section>

	<section
		id="you"
		class="flex h-screen min-h-[1000px] w-full items-center justify-center bg-green-500"
	>
		<h2 class="text-4xl font-bold text-white">Proche de vous</h2>
	</section>

	<section
		id="near"
		class="flex h-screen min-h-[1000px] w-full items-center justify-center bg-blue-500"
	>
		<h2 class="text-4xl font-bold text-white">Proche de tout</h2>
	</section>
</main>
