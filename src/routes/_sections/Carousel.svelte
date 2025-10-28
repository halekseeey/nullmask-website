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
	import { gsap } from 'gsap'

	export let className = ''

	const CARDS = [
		{ component: Wallet, name: 'Wallet' },
		{ component: Tokens, name: 'Tokens' },
		{ component: Phone, name: 'Phone' },
		{ component: Funds, name: 'Funds' },
		{ component: Rockets, name: 'Rockets' }
	]

	let carouselList
	let visibleCards = new Set()
	let buttonElements = []
	let sliderButtonsContainer
	let activeBar
	let quickLeft
	let quickWidth
	let scrollScheduled = false
	let activeSingleIndex = -1
	let recalcTimeout
	let resizeObserver
	let mutationObserver
	let isTouchDevice = false
	let cardRefs = []
	let previousVisibleCards = new Set()

	// Function to detect touch device
	function detectTouchDevice() {
		isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
	}

	// Function to trigger hover effect on card
	function triggerCardHover(cardIndex, isEnter) {
		if (!isTouchDevice || !cardRefs[cardIndex]) return

		const cardElement = cardRefs[cardIndex]
		const cardComponent = cardElement.querySelector('[role="region"]')

		if (cardComponent) {
			if (isEnter) {
				// Trigger mouseenter effect
				const event = new MouseEvent('mouseenter', { bubbles: true })
				cardComponent.dispatchEvent(event)
			} else {
				// Trigger mouseleave effect
				const event = new MouseEvent('mouseleave', { bubbles: true })
				cardComponent.dispatchEvent(event)
			}
		}
	}

	// Function to scroll to specific card
	function scrollToCard(index) {
		if (!carouselList) return

		const cards = carouselList.querySelectorAll('.carousel-item')
		if (cards[index]) {
			cards[index].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			})
		}
	}

	// Function to find consecutive groups of visible cards
	function findConsecutiveGroups(visibleIndices) {
		if (visibleIndices.length === 0) return []

		const sorted = [...visibleIndices].sort((a, b) => a - b)
		const groups = []
		let currentGroup = [sorted[0]]

		for (let i = 1; i < sorted.length; i++) {
			if (sorted[i] === sorted[i - 1] + 1) {
				currentGroup.push(sorted[i])
			} else {
				groups.push(currentGroup)
				currentGroup = [sorted[i]]
			}
		}
		groups.push(currentGroup)
		return groups
	}

	// Function to update visible cards (partial visibility) and drive active bar
	function updateVisibleCards() {
		if (!carouselList) return

		const cards = carouselList.querySelectorAll('.carousel-item')
		const containerRect = carouselList.getBoundingClientRect()
		const fullyVisibleSet = new Set()
		let firstPartialIndex = -1
		let lastPartialIndex = -1
		let firstFullIndex = -1
		let lastFullIndex = -1
		const epsilon = 0.5

		cards.forEach((card, index) => {
			const cardRect = card.getBoundingClientRect()

			// Partial visibility check (smooth) – consider as visible if overlapping
			const overlapLeft = Math.max(cardRect.left, containerRect.left)
			const overlapRight = Math.min(cardRect.right, containerRect.right)
			const overlapWidth = overlapRight - overlapLeft
			if (overlapWidth > 0) {
				if (firstPartialIndex === -1) firstPartialIndex = index
				lastPartialIndex = index
			}

			// Full visibility with small tolerance
			const isFullyVisible =
				cardRect.left >= containerRect.left + epsilon &&
				cardRect.right <= containerRect.right - epsilon
			if (isFullyVisible) {
				fullyVisibleSet.add(index)
				if (firstFullIndex === -1) firstFullIndex = index
				lastFullIndex = index
			}
		})

		// Expose fully visible for dot state; bar uses full if present else partial
		visibleCards = fullyVisibleSet
		const useFirst = firstFullIndex !== -1 ? firstFullIndex : firstPartialIndex
		const useLast = lastFullIndex !== -1 ? lastFullIndex : lastPartialIndex

		// Pick a single representative active button (middle of the visible range)
		const previousActiveIndex = activeSingleIndex
		if (useFirst !== -1 && useLast !== -1) {
			activeSingleIndex = Math.round((useFirst + useLast) / 2)
		} else {
			activeSingleIndex = -1
		}

		// Manage touch device hover effects
		if (isTouchDevice) {
			// Remove hover from cards that are no longer visible
			previousVisibleCards.forEach((cardIndex) => {
				if (!visibleCards.has(cardIndex)) {
					triggerCardHover(cardIndex, false)
				}
			})

			// Add hover to newly visible cards
			visibleCards.forEach((cardIndex) => {
				if (!previousVisibleCards.has(cardIndex)) {
					triggerCardHover(cardIndex, true)
				}
			})

			// Update previous state
			previousVisibleCards = new Set(visibleCards)
		}

		// Defer bar measurement to next frame to allow DOM/class updates to apply
		requestAnimationFrame(() => {
			updateActiveBarFromIndices(useFirst, useLast)
		})

		// Re-measure after button width transition settles to catch final layout
		if (recalcTimeout) clearTimeout(recalcTimeout)
		recalcTimeout = setTimeout(() => {
			updateActiveBarFromIndices(useFirst, useLast)
		}, 220)
	}

	// Function to animate a single active bar spanning first..last visible buttons
	function updateActiveBarFromIndices(firstIndex, lastIndex) {
		if (!buttonElements.length || !sliderButtonsContainer || !activeBar) return

		if (firstIndex === -1 || lastIndex === -1) {
			gsap.to(activeBar, { duration: 0.2, opacity: 0, ease: 'power2.out' })
			activeSingleIndex = -1
			return
		}
		const firstBtn = buttonElements[firstIndex]
		const lastBtn = buttonElements[lastIndex]
		if (!firstBtn || !lastBtn) return

		const containerRect = sliderButtonsContainer.getBoundingClientRect()
		const firstRect = firstBtn.getBoundingClientRect()
		const lastRect = lastBtn.getBoundingClientRect()

		const left = firstRect.left - containerRect.left
		const right = lastRect.right - containerRect.left
		const width = Math.max(0, right - left)

		if (!quickLeft) {
			quickLeft = gsap.quickTo(activeBar, 'left', { duration: 0.2, ease: 'power2.out' })
		}
		if (!quickWidth) {
			quickWidth = gsap.quickTo(activeBar, 'width', { duration: 0.2, ease: 'power2.out' })
		}
		quickLeft(left)
		quickWidth(width)
		gsap.to(activeBar, { duration: 0.2, opacity: 1, ease: 'power2.out' })

		// Pick a single representative active button (middle of the visible range)
		activeSingleIndex = Math.round((firstIndex + lastIndex) / 2)
	}

	onMount(() => {
		if (!carouselList) return

		// Detect touch device
		detectTouchDevice()

		// Handle wheel events - block all wheel scrolling on carousel
		function handleWheel(e) {
			// Prevent all wheel scrolling on carousel
			e.preventDefault()
			// e.stopPropagation()
		}

		// Handle touch events - prevent parent snap scroll when touching carousel
		function handleTouch(e) {
			e.stopPropagation()
		}

		// Add scroll listener with rAF throttle for smooth updates
		function handleScroll() {
			if (scrollScheduled) return
			scrollScheduled = true
			requestAnimationFrame(() => {
				updateVisibleCards()
				scrollScheduled = false
			})
		}

		carouselList.addEventListener('wheel', handleWheel, { passive: false })
		carouselList.addEventListener('touchstart', handleTouch, { passive: true })
		carouselList.addEventListener('touchmove', handleTouch, { passive: true })
		carouselList.addEventListener('scroll', handleScroll, { passive: true })

		// Initialize visible cards after layout with extra passes to ensure layout is settled
		requestAnimationFrame(() => {
			updateVisibleCards()
			requestAnimationFrame(() => {
				updateVisibleCards()
				setTimeout(() => updateVisibleCards(), 240)
			})
		})

		// Also run once after window load (fonts/images/layout shifts)
		function handleWindowLoad() {
			updateVisibleCards()
		}
		window.addEventListener('load', handleWindowLoad)

		// Update on resize
		function handleResize() {
			detectTouchDevice()
			updateVisibleCards()
		}
		window.addEventListener('resize', handleResize)

		// Observe size changes of the carousel and its items
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				// throttle via rAF
				if (scrollScheduled) return
				scrollScheduled = true
				requestAnimationFrame(() => {
					updateVisibleCards()
					scrollScheduled = false
				})
			})
			resizeObserver.observe(carouselList)
			carouselList.querySelectorAll('.carousel-item').forEach((el) => resizeObserver.observe(el))
		}

		// Observe DOM changes in the carousel (e.g. items mount asynchronously)
		if (typeof MutationObserver !== 'undefined') {
			mutationObserver = new MutationObserver(() => {
				updateVisibleCards()
				// ensure new nodes also observed by ResizeObserver
				if (resizeObserver) {
					carouselList
						.querySelectorAll('.carousel-item')
						.forEach((el) => resizeObserver.observe(el))
				}
			})
			mutationObserver.observe(carouselList, { childList: true, subtree: true })
		}

		return () => {
			carouselList.removeEventListener('wheel', handleWheel)
			carouselList.removeEventListener('touchstart', handleTouch)
			carouselList.removeEventListener('touchmove', handleTouch)
			carouselList.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('load', handleWindowLoad)
			if (resizeObserver) resizeObserver.disconnect()
			if (mutationObserver) mutationObserver.disconnect()
		}
	})
</script>

<section
	data-section="carousel"
	data-theme="dark"
	id="landing-page"
	class={cn('bg-dark h-screen min-h-[650px] w-full overflow-hidden', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<h2
			class="text-light heading-bottom mb-14 px-4 text-4xl text-[38px] leading-[1.1] md:ml-10 md:text-[60px] lg:ml-16 lg:text-[70px] xl:ml-24 xl:text-[80px]"
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
			class="carousel-list flex gap-4 overflow-x-auto px-4 md:px-8 lg:grid lg:grid-cols-5 lg:px-8"
		>
			{#each CARDS as { component: Card, name }, index}
				<li
					class="carousel-item h-full w-[263px] flex-shrink-0 lg:w-auto"
					bind:this={cardRefs[index]}
				>
					<Card className="w-auto h-full" />
				</li>
			{/each}
		</ul>

		<!-- {#if !$mediaQuery.lg} -->
		<div
			class="border-light scrollbar-top mx-auto mt-8 flex w-fit justify-center rounded-[20px] border px-3 py-2 lg:z-[-1]"
		>
			<div
				class="slider-buttons relative flex w-[91px] items-center justify-between"
				bind:this={sliderButtonsContainer}
			>
				<!-- Active merged bar -->
				<span bind:this={activeBar} class="active-bar"></span>
				{#each CARDS as _, index}
					<button
						bind:this={buttonElements[index]}
						class="slider-button"
						class:active={visibleCards.has(index)}
						class:activeSingle={index === activeSingleIndex}
						on:click={() => scrollToCard(index)}
						aria-label="Go to card {index + 1}"
					>
						<span class="slider-button-inner"></span>
					</button>
				{/each}
			</div>
		</div>
		<!-- {/if} -->
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

	/* Slider button styles */
	.slider-button {
		width: 8px;
		height: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		position: relative;
		z-index: 1;
		transition: width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.slider-button-inner {
		width: 100%;
		transition:
			width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		height: 8px;
		border-radius: 4px;
		background: #d9d9d9;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.slider-button:hover .slider-button-inner {
		background: #cdef33;
	}

	/* Active buttons (visible cards) */
	.slider-button.active .slider-button-inner {
		background: #cdef33;
	}

	/* Single active button variant */
	.slider-button.activeSingle {
		width: 27px;
	}

	/* Active merged bar */
	.slider-buttons {
		gap: 8px;
		position: relative;
	}

	.active-bar {
		position: absolute;
		height: 8px;
		left: 0;
		top: 50%; /* center over buttons */
		width: 0;
		background: #cdef33;
		border-radius: 4px;
		opacity: 0;
		pointer-events: none;
		z-index: 2;
		transform: translateY(-50%);
	}

	@media (max-height: 700px) {
		.heading-bottom {
			margin-bottom: 10px !important;
		}

		.scrollbar-top {
			margin-top: 15px !important;
		}
	}
</style>
