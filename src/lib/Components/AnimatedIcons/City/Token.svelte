<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let animationDuration = 0.5
	export let isAnimating = false

	let pathRefs = []
	let svgRef

	// Define position animation data
	const positionData = {
		from: { x: 39, y: -4 },
		to: { x: 39, y: -4 }
	}

	// Define path data for animation from Token to TokenAfter
	const pathData = [
		{
			from: 'M25.0449 130.066L68.4949 113.326L111.995 129.916L68.5549 146.646L25.0449 130.066Z',
			to: 'M25.0449 139.066L68.4949 122.326L111.995 138.916L68.5549 155.646L25.0449 139.066Z'
		},
		{
			from: 'M30 128.064C41.3826 132.473 68.525 142.998 68.525 142.998L107 127.932C99.235 124.925 68.475 112.998 68.475 112.998L30 128.064Z',
			to: 'M40 137.046C48.4261 140.28 68.5185 147.998 68.5185 147.998L97 136.95C91.2519 134.744 68.4815 125.998 68.4815 125.998L40 137.046Z'
		},
		{
			from: 'M30 128.064C41.3826 132.473 68.525 142.998 68.525 142.998L107 127.932C99.235 124.925 68.475 112.998 68.475 112.998L30 128.064Z',
			to: 'M40 137.046C48.4261 140.28 68.5185 147.998 68.5185 147.998L97 136.95C91.2519 134.744 68.4815 125.998 68.4815 125.998L40 137.046Z'
		},
		{
			from: 'M111.96 129.674L68.62 206.524L25 129.814L68.52 146.384L111.96 129.674Z',
			to: 'M111.96 138.674L68.62 215.524L25 138.814L68.52 155.384L111.96 138.674Z'
		},
		{
			from: 'M68.5195 146.384L111.96 129.674L68.6195 206.524L68.5195 146.384Z',
			to: 'M68.5195 155.384L111.96 138.674L68.6195 215.524L68.5195 155.384Z'
		},
		{
			from: 'M112.695 119.445L68.5347 136.455L24.3047 119.595L68.3747 41.4746L112.695 119.445Z',
			to: 'M112.695 110.445L68.5347 127.455L24.3047 110.595L68.3747 32.4746L112.695 110.445Z'
		},
		{
			from: 'M112.695 119.445L68.535 136.455L68.375 41.4746L112.695 119.445Z',
			to: 'M112.695 110.445L68.535 127.455L68.375 32.4746L112.695 110.445Z'
		}
	]

	let animations = []

	function startAnimations() {
		animations.forEach((anim) => anim.kill())
		animations = []

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

		// Animate fills to #CDEF33
		pathRefs.forEach((path, index) => {
			if (index === 0 || index === 3 || index === 5) {
				if (path) {
					const anim = gsap.to(path, {
						duration: animationDuration,
						ease: 'power2.inOut',
						fill: '#CDEF33'
					})
					animations.push(anim)
				}
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
		animations.forEach((anim) => anim.kill())
		animations = []

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

		// Animate fills back to #D9D9D9
		pathRefs.forEach((path, index) => {
			if (index === 0 || index === 3 || index === 5) {
				if (path) {
					const anim = gsap.to(path, {
						duration: animationDuration,
						ease: 'power2.inOut',
						fill: '#D9D9D9'
					})
					animations.push(anim)
				}
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

	$: if (isAnimating) {
		startAnimations()
	} else {
		stopAnimations()
	}

	onMount(() => {
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
	width="137"
	height="248"
	viewBox="0 0 137 248"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	bind:this={svgRef}
>
	<path
		bind:this={pathRefs[0]}
		d="M25.0449 130.066L68.4949 113.326L111.995 129.916L68.5549 146.646L25.0449 130.066Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		bind:this={pathRefs[1]}
		d="M30 128.064C41.3826 132.473 68.525 142.998 68.525 142.998L107 127.932C99.235 124.925 68.475 112.998 68.475 112.998L30 128.064Z"
		fill="#202221"
	/>
	<path
		bind:this={pathRefs[2]}
		d="M30 128.064C41.3826 132.473 68.525 142.998 68.525 142.998L107 127.932C99.235 124.925 68.475 112.998 68.475 112.998L30 128.064Z"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		bind:this={pathRefs[3]}
		d="M111.96 129.674L68.62 206.524L25 129.814L68.52 146.384L111.96 129.674Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		bind:this={pathRefs[4]}
		d="M68.5195 146.384L111.96 129.674L68.6195 206.524L68.5195 146.384Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		bind:this={pathRefs[5]}
		d="M112.695 119.445L68.5347 136.455L24.3047 119.595L68.3747 41.4746L112.695 119.445Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<path
		bind:this={pathRefs[6]}
		d="M112.695 119.445L68.535 136.455L68.375 41.4746L112.695 119.445Z"
		fill="#202221"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
</svg>
