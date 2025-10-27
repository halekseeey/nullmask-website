<script>
	import { onMount } from 'svelte'
	import { onDestroy } from 'svelte'
	import Phone from '$Components/AnimatedIcons/Phone/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''

	let phoneRef
	let sectionElement
	let observer
	let lastIntersectionState = false

	onMount(() => {
		if (sectionElement) {
			// Create IntersectionObserver to detect when section enters viewport
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						// Only trigger when section becomes visible, not when it stays visible
						if (entry.isIntersecting && !lastIntersectionState && phoneRef) {
							phoneRef.hardReset()
						}
						lastIntersectionState = entry.isIntersecting
					})
				},
				{
					threshold: 0.05, // Trigger when 30% of section is visible
					rootMargin: '-5% 0px -5% 0px' // Trigger when section is in center of viewport
				}
			)

			observer.observe(sectionElement)
		}

		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	})

	function handleSectionClick() {
		if (phoneRef) {
			phoneRef.hardReset()
		}
	}

	onDestroy(() => {
		if (observer) {
			observer.disconnect()
		}
	})
</script>

<section
	bind:this={sectionElement}
	data-section="phone"
	data-theme="light"
	id="landing-page"
	class={cn('bg-light h-screen min-h-[600px] w-full overflow-hidden', className)}
	on:click={handleSectionClick}
	role="region"
	aria-label="Interactive phone demonstration"
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] items-center justify-end"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div
			class="absolute h-full w-[1094px] md:-left-20 lg:left-10 xl:left-24"
			style="top: {$mediaQuery.md
				? HEADER.height.desktop
				: HEADER.height.mobile}px; rotate: -11.81deg"
		>
			<Phone bind:this={phoneRef} className="h-full w-full object-contain" />
		</div>
		<div class="relative z-[1] flex flex-col text-right md:mr-10 lg:mr-16 xl:mr-32">
			<h1 class="mb-2 text-[45px] leading-[1.1]">
				Your wallet, <br /> your transactions
			</h1>

			<p class="mb-80 text-3xl">Private in just 2 clicks.</p>
		</div>
	</div>
</section>
