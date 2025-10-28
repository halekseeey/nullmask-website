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
		class="relative mx-auto flex h-full max-w-[1440px] flex-col md:flex-row md:items-center md:justify-end"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div
			class="xs:ml-6 s:ml-10 relative z-[1] ml-4 flex flex-col md:ml-0 md:mr-10 md:text-right lg:mr-16 xl:mr-32"
		>
			<h2
				class="phone-top s:text-[35px] mb-4 mt-14 text-[28px] font-[500] leading-[1.1] md:mb-2 md:text-[45px]"
			>
				Your wallet, <br /> your transactions
			</h2>

			<p class="s:text-2xl text-xl md:mb-80 md:text-3xl">Private in just 2 clicks.</p>
		</div>

		<div
			class="-mb-10 flex-grow md:absolute md:-left-20 md:h-full md:w-[1094px] lg:left-10 xl:left-24"
			style="top: {$mediaQuery.md
				? HEADER.height.desktop
				: HEADER.height.mobile}px; rotate: -11.81deg; {$mediaQuery.md ? '' : 'transform-origin'}"
		>
			<Phone
				bind:this={phoneRef}
				className="h-full w-full object-contain aspect-[444/495]"
				viewBox={$mediaQuery.md ? '0 0 1094 916' : '0 200 604 446'}
			/>
		</div>
	</div>
</section>

<style>
	@media (max-height: 700px) {
		.phone-top {
			margin-top: 20px !important;
		}
	}
</style>
