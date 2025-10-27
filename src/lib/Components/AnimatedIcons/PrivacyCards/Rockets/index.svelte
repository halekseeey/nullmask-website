<script>
	import Star from '../Star.svelte'
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	import Base from './Base.svelte'
	import SmallRocket from './SmallRocket.svelte'

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

	const positionLeftRocket = {
		from: { x: 118, y: 90 },
		to: { x: 78, y: 80 }
	}

	const positionRightRocket = {
		from: { x: 118, y: 90 },
		to: { x: 158, y: 80 }
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
	class="bg-light border-dark relative aspect-[263/349] w-[263px] rounded-[10px] border duration-300"
	bind:this={cardRef}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	role="region"
>
	<svg
		viewBox="0 -30 250.2 210.1"
		fill="none"
		class="aspect-[263/187] w-full"
		preserveAspectRatio="xMidYMid meet"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Star
			x={50}
			y={35.47}
			width={21}
			height={21}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={200}
			y={40}
			width={21}
			height={21}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<Star
			x={190}
			y={66}
			width={10}
			height={10}
			bind:isAnimating={isHovered}
			duration={ANIMATION_DURATION}
		/>

		<SmallRocket
			animationDuration={ANIMATION_DURATION}
			bind:isAnimating={isHovered}
			positionData={positionLeftRocket}
		/>

		<SmallRocket
			animationDuration={ANIMATION_DURATION}
			bind:isAnimating={isHovered}
			positionData={positionRightRocket}
		/>

		<Base animationDuration={ANIMATION_DURATION} bind:isAnimating={isHovered} />
	</svg>

	<div class="relative mb-4 mt-4 w-fit px-3 text-lg leading-[1] lg:px-4 lg:text-2xl xl:mt-8">
		<div bind:this={text1Ref} class="text-dark w-full font-medium">Low fees, high speed.</div>
		<div bind:this={text2Ref} class="text-dark absolute top-0 font-medium opacity-0">
			And future-ready for multi-network use.
		</div>
	</div>
</div>
