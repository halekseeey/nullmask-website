<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let x
	export let y
	export let animationDuration = 3 // animation duration in seconds
	export let isAnimating = false // animation trigger from parent

	let pathRefs = []
	let svgRef
	let animations = []

	// Define path data for animation from Cake.svelte to CakeEnd.svelte
	const pathData = [
		{
			from: 'M46.309 39.53L46.269 53.06L0.749023 26.78L0.789024 13.25L46.309 39.53Z',
			to: 'M83.8813 63.5898L91.2963 81.8828L15.3186 71.5229L7.90363 53.2299L83.8813 63.5898Z'
		},
		{
			from: 'M64.9486 13.25L64.9086 26.78C64.4386 36.26 58.2286 45.65 46.2686 53.06L46.3086 39.53C58.2686 32.12 64.4886 22.73 64.9486 13.25Z',
			to: 'M94.5448 17.812L101.96 36.105C106.558 49.1663 103.356 65.2747 91.2958 81.8835L83.8808 63.5905C95.941 46.9817 99.1569 30.8678 94.5448 17.812Z'
		},
		{
			from: 'M64.9491 13.25C64.4791 22.73 58.2691 32.12 46.3091 39.53L0.789062 13.25L64.9591 13.25L64.9491 13.25Z',
			to: 'M94.5441 17.812C99.1427 30.8732 95.9403 46.9816 83.88 63.5904L7.90234 53.2305L94.5576 17.8065L94.5441 17.812Z'
		},
		{
			from: 'M46.309 26.54L46.269 40.07L0.749023 13.78L0.789024 0.25L46.309 26.54Z',
			to: 'M76.7091 46.0467L84.1241 64.3397L8.14089 53.9662L0.725892 35.6732L76.7091 46.0467Z'
		},
		{
			from: 'M46.3091 26.54L46.4591 27.67L0.789062 1.23L0.789062 0.25L46.3091 26.54Z',
			to: 'M76.7078 46.0473L77.5342 47.4904L1.2656 36.9972L0.724609 35.6738L76.7078 46.0473Z'
		},
		{
			from: 'M64.9486 0.25L64.9086 13.78C64.4386 23.26 58.2286 32.65 46.2686 40.06L46.3086 26.53C58.2686 19.12 64.4886 9.73 64.9486 0.25Z',
			to: 'M87.3671 0.255395L94.7821 18.5484C99.3807 31.6097 96.1783 47.7181 84.1181 64.3268L76.7031 46.0338C88.7633 29.425 91.9792 13.3111 87.3671 0.255395Z'
		},
		{
			from: 'M64.9491 0.25C64.4791 9.73 58.2691 19.12 46.3091 26.53L0.789062 0.25L64.9591 0.25L64.9491 0.25Z',
			to: 'M87.3693 0.255349C91.9678 13.3166 88.7655 29.425 76.7052 46.0338L0.727539 35.6738L87.3828 0.249832L87.3693 0.255349Z'
		},
		{
			from: 'M50.5294 12.6899C49.8894 12.7799 49.2994 12.3299 49.2094 11.6899L48.5994 7.26994C48.5094 6.62994 48.9594 6.03994 49.5994 5.94994C50.2394 5.85994 50.8294 6.30994 50.9194 6.94994L51.5294 11.3699C51.6194 12.0099 51.1694 12.5999 50.5294 12.6899Z',
			to: 'M74.7658 25.0132C73.9512 25.488 72.9061 25.2061 72.4312 24.3915L69.1675 18.7595C68.6926 17.9449 68.9746 16.8997 69.7892 16.4249C70.6038 15.9501 71.6489 16.232 72.1238 17.0466L75.3875 22.6786C75.8623 23.4932 75.5803 24.5384 74.7658 25.0132Z'
		},
		{
			from: 'M33.269 9.40066C32.969 8.83066 33.189 8.12065 33.759 7.82065L37.699 5.74065C38.269 5.44065 38.979 5.66066 39.279 6.23066C39.579 6.80066 39.359 7.51066 38.789 7.81066L34.849 9.89065C34.279 10.1907 33.569 9.97066 33.269 9.40066Z',
			to: 'M49.641 30.0994C48.9212 29.4953 48.8264 28.4151 49.4305 27.6953L53.6028 22.7114C54.2069 21.9917 55.2872 21.8968 56.007 22.5009C56.7267 23.105 56.8216 24.1853 56.2175 24.9051L52.0451 29.8889C51.441 30.6087 50.3608 30.7035 49.641 30.0994Z'
		},
		{
			from: 'M19.5891 5.55042C19.6491 4.91042 20.2091 4.43042 20.8591 4.49042L25.2991 4.89042C25.9391 4.95042 26.4191 5.52042 26.3591 6.16042C26.2991 6.80042 25.7391 7.28042 25.0891 7.22042L20.649 6.82042C20.009 6.76042 19.5291 6.19042 19.5891 5.55042Z',
			to: 'M29.0421 32.4521C28.7698 31.5547 29.261 30.5974 30.1719 30.3196L36.3885 28.4087C37.2859 28.1364 38.2487 28.6412 38.521 29.5386C38.7933 30.4359 38.302 31.3933 37.3912 31.6711L31.1746 33.5819C30.2772 33.8542 29.3143 33.3495 29.0421 32.4521Z'
		},
		{
			from: 'M38.8791 13.0202C38.9391 12.3802 39.4991 11.9001 40.1491 11.9601L44.5891 12.3601C45.2291 12.4201 45.7091 12.9902 45.6491 13.6302C45.5891 14.2702 45.0291 14.7501 44.3791 14.6901L39.9391 14.2901C39.2991 14.2301 38.8191 13.6602 38.8791 13.0202Z',
			to: 'M59.2139 31.8896C58.9417 30.9922 59.4329 30.0349 60.3438 29.7571L66.5604 27.8462C67.4578 27.5739 68.4206 28.0787 68.6929 28.9761C68.9652 29.8734 68.4739 30.8308 67.563 31.1086L61.3464 33.0194C60.4491 33.2917 59.4862 32.787 59.2139 31.8896Z'
		},
		{
			from: 'M45.3389 40.0301C45.2589 40.0301 45.1689 40.0101 45.0889 39.9601L0.498889 14.2101C0.258889 14.0701 0.178889 13.7701 0.318889 13.5301C0.458889 13.2901 0.758889 13.2101 0.998889 13.3501L45.5889 39.1001C45.8289 39.2401 45.9089 39.5401 45.7689 39.7801C45.6789 39.9401 45.5089 40.0301 45.3389 40.0301Z',
			to: 'M82.8477 64.7995C82.7397 64.8437 82.6071 64.8663 82.4715 64.843L8.04224 54.6853C7.64086 54.6288 7.36721 54.2678 7.42378 53.8664C7.48035 53.465 7.84131 53.1914 8.24269 53.248L82.6719 63.4056C83.0733 63.4622 83.3469 63.8231 83.2904 64.2245C83.2572 64.4903 83.0773 64.7057 82.8477 64.7995Z'
		}
	]

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

		// Animate fill color for path 6 (index 5)
		if (pathRefs[6]) {
			const anim = gsap.to(pathRefs[6], {
				duration: animationDuration,
				ease: 'power2.inOut',
				attr: { fill: '#CDEF33' }
			})
			animations.push(anim)
		}

		// Animate fill color for paths 8, 9, 10, 11 (indices 7, 8, 9, 10)
		const darkPaths = [pathRefs[7], pathRefs[8], pathRefs[9], pathRefs[10]]
		darkPaths.forEach((path) => {
			if (path) {
				const anim = gsap.to(path, {
					duration: animationDuration,
					ease: 'power2.inOut',
					attr: { fill: '#202221' }
				})
				animations.push(anim)
			}
		})

		// Animate SVG position
		if (svgRef) {
			const anim = gsap.to(svgRef, {
				duration: animationDuration,
				ease: 'power2.inOut',
				x: 0.32,
				y: -110
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

		// Animate fill color back for path 6 (index 5)
		if (pathRefs[6]) {
			const anim = gsap.to(pathRefs[6], {
				duration: animationDuration,
				ease: 'power2.inOut',
				attr: { fill: '#D9D9D9' }
			})
			animations.push(anim)
		}

		// Animate fill color back for paths 8, 9, 10, 11 (indices 7, 8, 9, 10)
		const darkPaths = [pathRefs[7], pathRefs[8], pathRefs[9], pathRefs[10]]
		darkPaths.forEach((path) => {
			if (path) {
				const anim = gsap.to(path, {
					duration: animationDuration,
					ease: 'power2.inOut',
					attr: { fill: '#D9D9D9' }
				})
				animations.push(anim)
			}
		})

		// Animate SVG position back
		if (svgRef) {
			const anim = gsap.to(svgRef, {
				duration: animationDuration,
				ease: 'power2.inOut',
				x: 0,
				y: 0
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
	})
</script>

<svg
	{x}
	{y}
	width="131.2"
	height="168"
	viewBox="0 0 117 108"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	bind:this={svgRef}
>
	<path
		d="M46.309 39.53L46.269 53.06L0.749023 26.78L0.789024 13.25L46.309 39.53Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[0]}
	/>
	<path
		d="M64.9486 13.25L64.9086 26.78C64.4386 36.26 58.2286 45.65 46.2686 53.06L46.3086 39.53C58.2686 32.12 64.4886 22.73 64.9486 13.25Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[1]}
	/>
	<path
		d="M64.9491 13.25C64.4791 22.73 58.2691 32.12 46.3091 39.53L0.789062 13.25H64.9591H64.9491Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[2]}
	/>
	<path
		d="M46.309 26.54L46.269 40.07L0.749023 13.78L0.789024 0.25L46.309 26.54Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[3]}
	/>
	<path
		d="M46.3091 26.54L46.4591 27.67L0.789062 1.23V0.25L46.3091 26.54Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[4]}
	/>
	<path
		d="M64.9486 0.25L64.9086 13.78C64.4386 23.26 58.2286 32.65 46.2686 40.06L46.3086 26.53C58.2686 19.12 64.4886 9.73 64.9486 0.25Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[5]}
	/>
	<path
		d="M64.9491 0.25C64.4791 9.73 58.2691 19.12 46.3091 26.53L0.789062 0.25H64.9591H64.9491Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[6]}
	/>
	<path
		d="M50.5294 12.6899C49.8894 12.7799 49.2994 12.3299 49.2094 11.6899L48.5994 7.26994C48.5094 6.62994 48.9594 6.03994 49.5994 5.94994C50.2394 5.85994 50.8294 6.30994 50.9194 6.94994L51.5294 11.3699C51.6194 12.0099 51.1694 12.5999 50.5294 12.6899Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[7]}
	/>
	<path
		d="M33.269 9.40066C32.969 8.83066 33.189 8.12065 33.759 7.82065L37.699 5.74065C38.269 5.44065 38.979 5.66066 39.279 6.23066C39.579 6.80066 39.359 7.51066 38.789 7.81066L34.849 9.89065C34.279 10.1907 33.569 9.97066 33.269 9.40066Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[8]}
	/>
	<path
		d="M19.5891 5.55042C19.6491 4.91042 20.2091 4.43042 20.8591 4.49042L25.2991 4.89042C25.9391 4.95042 26.4191 5.52042 26.3591 6.16042C26.2991 6.80042 25.7391 7.28042 25.0891 7.22042L20.649 6.82042C20.009 6.76042 19.5291 6.19042 19.5891 5.55042Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[9]}
	/>
	<path
		d="M38.8791 13.0202C38.9391 12.3802 39.4991 11.9001 40.1491 11.9601L44.5891 12.3601C45.2291 12.4201 45.7091 12.9902 45.6491 13.6302C45.5891 14.2702 45.0291 14.7501 44.3791 14.6901L39.9391 14.2901C39.2991 14.2301 38.8191 13.6602 38.8791 13.0202Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[10]}
	/>
	<path
		d="M45.3389 40.0301C45.2589 40.0301 45.1689 40.0101 45.0889 39.9601L0.498889 14.2101C0.258889 14.0701 0.178889 13.7701 0.318889 13.5301C0.458889 13.2901 0.758889 13.2101 0.998889 13.3501L45.5889 39.1001C45.8289 39.2401 45.9089 39.5401 45.7689 39.7801C45.6789 39.9401 45.5089 40.0301 45.3389 40.0301Z"
		fill="#D9D9D9"
		stroke="#202221"
		stroke-width="0.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		bind:this={pathRefs[11]}
	/>
</svg>
