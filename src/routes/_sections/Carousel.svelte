<script>
	import Keyhole from '$Components/AnimatedIcons/Keyhole/index.svelte'
	import Wallet from '$Components/AnimatedIcons/PrivacyCards/Wallet/index.svelte'
	import Tokens from '$Components/AnimatedIcons/PrivacyCards/Tokens/index.svelte'
	import Phone from '$Components/AnimatedIcons/PrivacyCards/Phone/index.svelte'
	import Funds from '$Components/AnimatedIcons/PrivacyCards/Funds/index.svelte'
	import Rockets from '$Components/AnimatedIcons/PrivacyCards/Rockets/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'
	import { onMount } from 'svelte'

	export let className = ''

	const CARDS = [
		{ component: Wallet, name: 'Wallet' },
		{ component: Tokens, name: 'Tokens' },
		{ component: Phone, name: 'Phone' },
		{ component: Funds, name: 'Funds' },
		{ component: Rockets, name: 'Rockets' }
	]

	let carouselList

	onMount(() => {
		if (!carouselList) return

		// Handle wheel events - only block to prevent parent snap scroll interference
		function handleWheel(e) {
			// Check if this is a horizontal gesture
			const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaX) >= 1

			// Only prevent propagation to parent to avoid interfering with vertical snap
			if (isHorizontalGesture) {
				e.stopPropagation()
			}
		}

		// Handle touch events - prevent parent snap scroll when touching carousel
		function handleTouch(e) {
			e.stopPropagation()
		}

		carouselList.addEventListener('wheel', handleWheel, { passive: true })
		carouselList.addEventListener('touchstart', handleTouch, { passive: true })
		carouselList.addEventListener('touchmove', handleTouch, { passive: true })

		return () => {
			carouselList.removeEventListener('wheel', handleWheel)
			carouselList.removeEventListener('touchstart', handleTouch)
			carouselList.removeEventListener('touchmove', handleTouch)
		}
	})
</script>

<section
	data-section="carousel"
	data-theme="dark"
	id="landing-page"
	class={cn('bg-dark h-screen min-h-[600px] w-full', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<h2
			class="text-light mb-14 px-4 text-4xl text-[38px] leading-[1.1] md:ml-10 md:text-[60px] lg:ml-16 lg:text-[70px] xl:ml-24 xl:text-[80px]"
		>
			<span>
				Privacy
				{#if !$mediaQuery.md}
					<br />
				{/if}
				Didn't Exist.
			</span>
			<br />
			<span class="text-green"> &gt;&gt;&gt; Until Now! </span>
		</h2>

		<ul
			bind:this={carouselList}
			class="carousel-list flex gap-4 overflow-x-auto px-4 md:px-8 lg:px-8"
		>
			{#each CARDS as { component: Card, name }}
				<li class="carousel-item h-full w-[263px] flex-shrink-0 lg:w-[280px] xl:w-[320px]">
					<Card className="w-auto h-full" />
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.carousel-list {
		/* Hide scrollbar across browsers */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */

		/* Enable horizontal scroll snap on all screens */
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
	}

	.carousel-list::-webkit-scrollbar {
		display: none; /* WebKit */
	}

	.carousel-item {
		/* Snap alignment for each item */
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}

	/* Adjust snap behavior for desktop */
	@media (min-width: 1024px) {
		.carousel-item {
			/* More gentle snap on desktop */
			scroll-snap-stop: normal;
		}
	}
</style>
