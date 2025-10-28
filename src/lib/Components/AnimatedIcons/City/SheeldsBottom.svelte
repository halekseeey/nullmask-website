<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'
	import Sheeld from './Sheeld.svelte'

	export let x
	export let y

	let isHovered = false
	let animations = []

	let colorAnimation

	// Animation duration constant
	const ANIMATION_DURATION = 0.5

	export function handleMouseEnter() {
		isHovered = true

		const colorAnim = gsap.to(colorAnimation, {
			duration: ANIMATION_DURATION,
			ease: 'power2.inOut',
			attr: { fill: '#CDEF33' }
		})
		animations.push(colorAnim)
	}

	export function handleMouseLeave() {
		isHovered = false
		animations.forEach((anim) => anim.kill())
		animations = []

		const colorAnim = gsap.to(colorAnimation, {
			duration: ANIMATION_DURATION,
			ease: 'power2.inOut',
			attr: { fill: '#D9D9D9' }
		})
		animations.push(colorAnim)
	}

	onMount(() => {
		// Cleanup on destroy
		return () => {
			animations.forEach((anim) => anim.kill())
		}
	})
</script>

<svg
	{x}
	{y}
	width="206.83"
	height="294.85"
	viewBox="0 0 217 310"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M78.96 281.75L0.25 237.18C0.72 225.19 0.98 218.47 1.45 206.48L83.7 159.84C104.86 159.57 116.72 159.41 137.88 159.14L216.59 203.71C216.12 215.7 215.86 222.42 215.39 234.41L133.13 281.05C111.97 281.32 100.11 281.48 78.95 281.75H78.96Z"
		fill="#D9D9D9"
	/>
	<path
		d="M78.9194 281.89L78.8894 281.87L0.109375 237.26L1.30937 206.39L1.37937 206.35L83.6594 159.7H83.6994L137.919 159L137.949 159.02L216.729 203.63L215.529 234.5L215.459 234.54L133.169 281.2H133.129L78.9094 281.9L78.9194 281.89ZM0.399375 237.1L78.9994 281.61L133.109 280.91L215.269 234.33L216.459 203.79L137.849 159.28L83.7394 159.98L1.57938 206.56L0.389375 237.1H0.399375Z"
		fill="#202221"
	/>
	<path
		d="M132.149 281.07L130.539 281.09L124.699 281.16L121.229 281.2L116.259 281.27L113.969 281.3L111.489 281.33L110.039 281.35L108.369 281.37L107.039 281.39L104.339 281.42L102.939 281.44L101.379 281.46L100.059 281.48H99.0192L96.4392 281.52L95.0092 281.54L78.9492 281.75V308.8L133.129 308.1V281.05H132.149V281.07ZM121.129 304.69L89.6092 305.09V288.17L91.2592 288.15V303.6L119.489 303.24V287.8L121.139 287.78V304.7L121.129 304.69Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M91.2496 288.15V303.6L89.5996 305.09V288.17L91.2496 288.15Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M121.13 304.69L89.5996 305.09L91.2496 303.6L119.48 303.23L121.13 304.69Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M121.129 287.77V304.69L119.479 303.23V287.79L121.129 287.77Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M119.48 287.79V303.23L91.25 303.6V288.15L119.48 287.79Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		bind:this={colorAnimation}
		d="M119.48 287.79V303.23L91.25 303.6V288.15L119.48 287.79Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M216.589 220.76V203.71L215.389 234.41V261.47L216.589 220.76Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M215.399 234.41V261.47L133.139 308.11V281.06L215.399 234.41Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		d="M84.3897 270.46L20.1797 234.1C20.5597 224.32 20.7697 218.83 21.1497 209.05L88.2597 171C105.52 170.78 115.2 170.65 132.46 170.43L196.67 206.79C196.29 216.57 196.08 222.06 195.7 231.84L128.6 269.89C111.34 270.11 101.66 270.24 84.3997 270.46H84.3897Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M84.3897 264.87L20.1797 228.52C20.5597 218.74 20.7697 213.25 21.1497 203.47L88.2597 165.42C105.52 165.2 115.2 165.07 132.46 164.85L196.67 201.21C196.29 210.99 196.08 216.48 195.7 226.26L128.6 264.31C111.34 264.53 101.66 264.66 84.3997 264.88L84.3897 264.87Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M20.1797 234.1V228.52L84.3897 264.87V270.46L20.1797 234.1Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M128.579 269.89V264.31L84.3887 264.87V270.46L128.579 269.89Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M195.69 231.84V226.26L128.58 264.31V269.89L195.69 231.84Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		d="M196.659 206.79V201.21L195.689 226.26V231.84L196.659 206.79Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>
	<path
		d="M78.96 281.75V308.81L0.25 264.24V237.19L0.9 237.55L78.96 281.75Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-miterlimit="10"
		stroke-linejoin="round"
	/>

	<Sheeld animationDuration={ANIMATION_DURATION} bind:isAnimating={isHovered} />

	<rect
		width="206.83"
		height="294.85"
		fill="transparent"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="region"
	/>
</svg>
