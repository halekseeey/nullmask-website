<script>
	import Star from '../Star.svelte'
	import { gsap } from 'gsap'
	import Phone from './Phone.svelte'
	import { onMount } from 'svelte'

	let cardRef
	let starRef1
	let starRef2
	let starRef3
	let isHovered = false
	let text1Ref
	let text2Ref

	// Animation duration constant
	const ANIMATION_DURATION = 0.5

	onMount(() => {
		// Set initial opacity for text2
		if (text2Ref) {
			gsap.set(text2Ref, { opacity: 0 })
		}
	})

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
	class="bg-light border-dark relative aspect-[263/349] w-[263px] rounded-[10px] border duration-300"
	bind:this={cardRef}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	role="region"
>
	<svg
		viewBox="0 -30 278 259"
		fill="none"
		class="aspect-[263/187] w-full"
		preserveAspectRatio="xMidYMid meet"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Star
			x={40}
			y={70.47}
			width={21}
			height={21}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={240}
			y={50}
			width={21}
			height={21}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={230}
			y={76}
			width={10}
			height={10}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Phone animationDuration={ANIMATION_DURATION} bind:isAnimating={isHovered} />
	</svg>
	<div class="relative mb-4 mt-4 w-fit px-3 text-lg leading-[1] lg:px-4 lg:text-2xl xl:mt-8">
		<div bind:this={text1Ref} class="text-dark w-full font-medium">
			Runs invisibly in the background.
		</div>
		<div bind:this={text2Ref} class="text-dark absolute top-0 font-medium opacity-0">
			Automatic and seamless.
		</div>
	</div>
</div>
