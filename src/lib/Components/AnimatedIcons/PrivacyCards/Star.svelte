<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let x
	export let y
	export let width = 29
	export let height = 29
	export let isAnimating = false
	export let duration = 0.5

	let svgRef

	function startAnimation() {
		if (svgRef) {
			gsap.to(svgRef, {
				duration: duration,
				ease: 'power2.inOut',
				opacity: 1,
				attr: {
					width: width,
					height: height,
					x: x,
					y: y
				}
			})
		}
	}

	function stopAnimation() {
		if (svgRef) {
			gsap.to(svgRef, {
				duration: duration,
				ease: 'power2.inOut',
				opacity: 0,
				attr: {
					width: 0,
					height: 0,
					x: x + width / 2,
					y: y + height / 2
				}
			})
		}
	}

	// Watch for animation state changes
	$: if (isAnimating) {
		startAnimation()
	} else {
		stopAnimation()
	}

	onMount(() => {
		// Set initial state
		if (svgRef) {
			gsap.set(svgRef, {
				opacity: 0,
				attr: {
					width: 0,
					height: 0,
					x: x + width / 2,
					y: y + height / 2
				}
			})
		}
	})
</script>

<svg
	{x}
	{y}
	{width}
	{height}
	viewBox="0 0 29 29"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	bind:this={svgRef}
>
	<g clip-path="url(#clip0_3114_5629)">
		<path
			d="M19.8842 12.1346L28.7243 14.3621L19.8842 16.5896C18.2632 16.9978 16.9978 18.2632 16.5896 19.8842L14.3621 28.7243L12.1346 19.8842C11.7265 18.2632 10.4611 16.9978 8.84003 16.5896L0 14.3621L8.84003 12.1346C10.4611 11.7265 11.7265 10.4611 12.1346 8.84003L14.3621 0L16.5896 8.84003C16.9978 10.4611 18.2632 11.7265 19.8842 12.1346Z"
			fill="#202221"
		/>
	</g>
	<defs>
		<clipPath id="clip0_3114_5629">
			<rect width="28.7243" height="28.7243" fill="white" />
		</clipPath>
	</defs>
</svg>
