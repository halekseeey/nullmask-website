<script>
	import Cake from './Cake.svelte'
	import FirstPart from './FirstPart.svelte'
	import SecondPart from './SecondPart.svelte'
	import Star from '../Star.svelte'
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'
	import { cn } from '$utils'

	export let className = ''

	let cardRef
	let starRef1
	let starRef2
	let starRef3
	let isHovered = false
	let text1Ref
	let text2Ref
	let textContainerRef
	let minHeight = 'auto'
	let cardMinHeight = 'auto'

	// Animation duration constant
	const ANIMATION_DURATION = 0.5

	onMount(() => {
		// Set initial opacity for text2
		if (text2Ref) {
			gsap.set(text2Ref, { opacity: 0 })
		}

		// Delay initial height calculation to allow DOM to render
		setTimeout(() => {
			updateMinHeight()
		}, 100)

		// Listen for resize events to recalculate heights
		window.addEventListener('resize', updateMinHeight)

		return () => {
			window.removeEventListener('resize', updateMinHeight)
		}
	})

	$: if (text1Ref && text2Ref) {
		updateMinHeight()
	}

	function updateMinHeight() {
		if (text1Ref && text2Ref && cardRef) {
			const height1 = text1Ref.offsetHeight
			const height2 = text2Ref.offsetHeight
			const maxHeight = Math.max(height1, height2)
			minHeight = `${maxHeight}px`

			const svgHeight = cardRef.querySelector('svg')?.offsetHeight || 0
			cardMinHeight = `${svgHeight + maxHeight + 32}px`
		}
	}

	function handleMouseEnter() {
		isHovered = true
		// Animate background color to CDEF33
		gsap.to(cardRef, {
			duration: ANIMATION_DURATION,
			ease: 'power2.inOut',
			backgroundColor: '#CDEF33'
		})

		// Animate stars appearance
		if (starRef1) {
			gsap.to(starRef1, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 1,
				scale: 1,
				transformOrigin: 'center'
			})
		}

		// Animate text transitions
		if (text1Ref) {
			gsap.to(text1Ref, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 0
			})
		}
		if (text2Ref) {
			gsap.set(text2Ref, { opacity: 0 })
			gsap.to(text2Ref, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 1
			})
		}
	}

	function handleMouseLeave() {
		isHovered = false
		// Animate background color back to D9D9D9
		gsap.to(cardRef, {
			duration: ANIMATION_DURATION,
			ease: 'power2.inOut',
			backgroundColor: '#D9D9D9'
		})

		// Animate stars disappearance
		if (starRef1) {
			gsap.to(starRef1, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 0,
				scale: 0,
				transformOrigin: 'center'
			})
		}

		// Animate text transitions back
		if (text1Ref) {
			gsap.to(text1Ref, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 1
			})
		}
		if (text2Ref) {
			gsap.to(text2Ref, {
				duration: ANIMATION_DURATION,
				ease: 'power2.inOut',
				opacity: 0
			})
		}
	}
</script>

<div
	class={cn(
		'bg-light border-dark relative w-[263px] rounded-[10px] border duration-300',
		className
	)}
	bind:this={cardRef}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	role="region"
	style="min-height: {cardMinHeight};"
>
	<svg
		viewBox="0 -40 164 250"
		fill="none"
		class="aspect-[263/187] w-full"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid meet"
	>
		<Star
			x={-31}
			y={43}
			width={21}
			height={21}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={165}
			y={73}
			width={28}
			height={28}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={171}
			y={20}
			width={16}
			height={16}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>
		<SecondPart />
		<Cake x={40.39} y={70.43} animationDuration={ANIMATION_DURATION} bind:isAnimating={isHovered} />
		<FirstPart />
	</svg>

	<div
		bind:this={textContainerRef}
		class="relative my-8 w-fit px-4 text-2xl leading-[1] lg:px-3 lg:text-xl xl:mt-8 xl:px-4 xl:text-2xl"
		style="min-height: {minHeight};"
	>
		<div bind:this={text1Ref} class="text-dark w-full font-medium">
			Works with your existing wallet.
		</div>
		<div
			bind:this={text2Ref}
			class="text-dark absolute left-0 top-0 px-3 font-medium opacity-0 lg:px-4"
		>
			No new seed phrases, no new accounts.
		</div>
	</div>
</div>
