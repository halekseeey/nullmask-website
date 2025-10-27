<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let animationDuration = 3 // animation duration in seconds
	export let isAnimating = false // animation trigger from parent

	let pathRefs = []
	let svgRef
	let animations = []

	// Define path data for animation from Cristal.svelte to CristalFinal.svelte
	const pathData = [
		{
			from: 'M9.54518 71.7567L44.1043 58.5114L78.6811 71.7162L44.1379 84.9639L9.54518 71.7567Z',
			to: 'M2.19531 96.7159L45.2023 72.4766L93.4085 83.1333L50.423 107.373L2.19531 96.7159Z'
		},
		{
			from: 'M13.4771 70.2527C22.5311 73.7159 44.1234 81.9682 44.1234 81.9682L74.7459 70.227C68.5605 67.8691 44.0996 58.5115 44.0996 58.5115L13.4771 70.2527Z',
			to: 'M7.09766 93.9609C19.7216 96.7586 49.8264 103.422 49.8264 103.422L87.9336 81.9374C79.3108 80.0367 45.2048 72.4766 45.2048 72.4766L7.09766 93.9609Z'
		},
		{
			from: 'M78.6735 71.7235L44.1739 132.677L9.53757 71.764L44.1326 84.9553L78.6735 71.7235Z',
			to: 'M93.4085 83.1562L59.8161 170.332L2.19531 96.7388L50.423 107.374L93.4085 83.1562Z'
		},
		{
			from: 'M79.2454 65.6933L44.1204 79.1461L8.95944 65.7251L44.0472 3.75821L79.2454 65.6933Z',
			to: 'M92.9824 75.0822L49.2694 99.7059L0.25 88.8783L34.4202 0.25L92.9824 75.0822Z'
		},
		{
			from: 'M44.1257 84.9635L78.6666 71.7317L44.1669 132.685L44.1257 84.9635Z',
			to: 'M50.4219 107.374L93.4074 83.1562L59.8149 170.332L50.4219 107.374Z'
		},
		{
			from: 'M79.2453 65.6969L44.1203 79.1496L44.0471 3.76172L79.2453 65.6969Z',
			to: 'M92.9841 75.0822L49.271 99.7059L34.4219 0.25L92.9841 75.0822Z'
		}
	]

	// Define position animation data
	const positionData = {
		from: { x: 95.02, y: 32.57 },
		to: { x: 94.16, y: 10 }
	}

	function startAnimations() {
		// Clear existing animations
		animations.forEach((anim) => anim.kill())
		animations = []

		// Animate paths to final state (no yoyo, no repeat)
		pathRefs.forEach((path, index) => {
			if (path && pathData[index]) {
				const anim = gsap.to(path, {
					duration: animationDuration,
					ease: 'power2.inOut',
					attr: { d: pathData[index].to }
				})
				animations.push(anim)
			}
		})

		// Animate SVG position
		if (svgRef) {
			const anim = gsap.to(svgRef, {
				duration: animationDuration,
				ease: 'power2.inOut',
				attr: {
					x: positionData.to.x,
					y: positionData.to.y
				}
			})
			animations.push(anim)
		}
	}

	function stopAnimations() {
		// Stop all animations and animate back to initial state
		animations.forEach((anim) => anim.kill())
		animations = []

		// Animate paths back to initial state
		pathRefs.forEach((path, index) => {
			if (path && pathData[index]) {
				const anim = gsap.to(path, {
					duration: animationDuration,
					ease: 'power2.inOut',
					attr: { d: pathData[index].from }
				})
				animations.push(anim)
			}
		})

		// Animate SVG position back
		if (svgRef) {
			const anim = gsap.to(svgRef, {
				duration: animationDuration,
				ease: 'power2.inOut',
				attr: {
					x: positionData.from.x,
					y: positionData.from.y
				}
			})
			animations.push(anim)
		}
	}

	// Watch for animation state changes
	$: if (isAnimating) {
		startAnimations()
	} else {
		stopAnimations()
	}

	onMount(() => {
		// Set initial path data
		pathRefs.forEach((path, index) => {
			if (path && pathData[index]) {
				path.setAttribute('d', pathData[index].from)
			}
		})

		// Set initial SVG position
		if (svgRef) {
			gsap.set(svgRef, {
				attr: {
					x: positionData.from.x,
					y: positionData.from.y
				}
			})
		}
	})
</script>

<svg
	width="94"
	height="171"
	viewBox="0 0 94 171"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	bind:this={svgRef}
>
	<path
		d="M9.54518 71.7567L44.1043 58.5114L78.6811 71.7162L44.1379 84.9639L9.54518 71.7567Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
		bind:this={pathRefs[0]}
	/>
	<g style="mix-blend-mode:multiply">
		<path
			d="M13.4771 70.2527C22.5311 73.7159 44.1234 81.9682 44.1234 81.9682L74.7459 70.227C68.5605 67.8691 44.0996 58.5115 44.0996 58.5115L13.4771 70.2527Z"
			fill="#202221"
			bind:this={pathRefs[1]}
		/>
		<path
			d="M13.4771 70.2527C22.5311 73.7159 44.1234 81.9682 44.1234 81.9682L74.7459 70.227C68.5605 67.8691 44.0996 58.5115 44.0996 58.5115L13.4771 70.2527Z"
			stroke="#202221"
			stroke-width="0.5"
			stroke-linejoin="round"
		/>
	</g>
	<path
		d="M78.6735 71.7235L44.1739 132.677L9.53757 71.764L44.1326 84.9553L78.6735 71.7235Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
		bind:this={pathRefs[2]}
	/>
	<path
		d="M79.2454 65.6933L44.1204 79.1461L8.95944 65.7251L44.0472 3.75821L79.2454 65.6933Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
		bind:this={pathRefs[3]}
	/>
	<path
		d="M44.1257 84.9635L78.6666 71.7317L44.1669 132.685L44.1257 84.9635Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
		bind:this={pathRefs[4]}
	/>
	<path
		d="M79.2453 65.6969L44.1203 79.1496L44.0471 3.76172L79.2453 65.6969Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
		bind:this={pathRefs[5]}
	/>
</svg>
