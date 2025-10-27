<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let className = ''

	import FoxFace from './FoxFace.svelte'

	const INITIAL_DELAY = 1
	const FOXFACE_MOVEMENT = 0.8
	const FOX_EYE_DURATION = 0.1
	const FOX_SHOW_TIME = 0.1

	let foxFaceRef
	let path1Ref
	let path2Ref
	let isAnimating = false

	const path1Data = {
		from: 'M30.32 0L0 118.954L30.32 214.929H95.5215L179.872 156.917L30.32 0ZM174.199 266.985H144.661L128.58 282.739L185.718 296.893L174.199 266.962V266.985ZM432.618 0L462.938 118.954L432.618 214.929H367.413L283.066 156.917L432.618 0ZM288.782 266.985H318.361L334.443 282.759L305.841 289.85L277.239 296.942L288.782 266.962V266.985ZM257.679 405.293L264.419 380.637L250.855 365.541H212.054L198.493 380.637L205.23 405.293',
		to: 'M30.32 0L0 118.954L30.32 214.929H95.5215L179.872 156.917L30.32 0ZM174.199 266.985H144.661L128.58 282.739L185.718 296.893L174.199 266.962V266.985ZM432.618 0L462.938 118.954L432.618 214.929H367.413L283.066 156.917L432.618 0ZM288.732 282.781H318.312L334.443 282.759L305.841 289.85L277.239 296.942L288.732 282.759V282.781ZM257.679 405.293L264.419 380.637L250.855 365.541H212.054L198.493 380.637L205.23 405.293'
	}

	const path2Data = {
		from: 'M257.679 405.293L264.419 380.637L250.855 365.541H212.054L198.493 380.637L205.23 405.293M30.32 0L0 118.954L30.32 214.929H95.5215L179.872 156.917L30.32 0ZM174.199 266.985H144.661L128.58 282.739L185.718 296.893L174.199 266.962V266.985ZM432.618 0L462.938 118.954L432.618 214.929H367.413L283.066 156.917L432.618 0ZM288.782 266.985H318.361L334.443 282.759L305.841 289.85L277.239 296.942L288.782 266.962V266.985Z',
		to: 'M257.679 405.293L264.419 380.637L250.855 365.541H212.054L198.493 380.637L205.23 405.293M30.32 0L0 118.954L30.32 214.929H95.5215L179.872 156.917L30.32 0ZM174.199 266.985H144.661L128.58 282.739L185.718 296.893L174.199 266.962V266.985ZM432.618 0L462.938 118.954L432.618 214.929H367.413L283.066 156.917L432.618 0ZM288.732 282.781H318.312L334.443 282.759L305.841 289.85L277.239 296.942L288.732 282.759V282.781Z'
	}

	function resetAnimation() {
		// Reset FoxFace position
		gsap.set(foxFaceRef, {
			attr: {
				x: -160,
				y: 150
			}
		})

		// Reset paths to initial state
		if (path1Ref) {
			gsap.set(path1Ref, { attr: { d: path1Data.from } })
		}
		if (path2Ref) {
			gsap.set(path2Ref, { attr: { d: path2Data.from } })
		}
	}

	function startAnimation() {
		// After delay, move FoxFace to new coordinates
		gsap.delayedCall(INITIAL_DELAY, () => {
			gsap.to(foxFaceRef, {
				duration: FOXFACE_MOVEMENT,
				ease: 'back.inOut',
				attr: {
					x: -160,
					y: 0
				},
				onComplete: () => {
					foxEye()
				}
			})
		})
	}

	function foxEye() {
		if (path1Ref) {
			gsap.to(path1Ref, {
				yoyo: true,
				repeat: 1,
				duration: FOX_EYE_DURATION,
				ease: 'power2.inOut',
				attr: { d: path1Data.to }
			})
		}
		if (path2Ref) {
			gsap.to(path2Ref, {
				yoyo: true,
				repeat: 1,
				duration: FOX_EYE_DURATION,
				ease: 'power2.inOut',
				attr: { d: path2Data.to },

				onComplete: () => {
					endAnimation()
				}
			})
		}
	}

	function endAnimation() {
		gsap.delayedCall(FOX_SHOW_TIME, () => {
			gsap.to(foxFaceRef, {
				duration: FOXFACE_MOVEMENT,
				ease: 'back.inOut',
				attr: {
					x: -160,
					y: 300
				},
				onComplete: () => {
					startAnimation()
				}
			})
		})
	}

	function handleClick() {
		if (!isAnimating) {
			resetAnimation()
			startAnimation()
		}
	}

	onMount(() => {
		// Set initial position
		gsap.set(foxFaceRef, {
			attr: {
				x: -160,
				y: 300
			}
		})

		// Set initial path states
		if (path1Ref) {
			gsap.set(path1Ref, { attr: { d: path1Data.from } })
		}
		if (path2Ref) {
			gsap.set(path2Ref, { attr: { d: path2Data.from } })
		}

		// Start animation sequence
		startAnimation()
	})
</script>

<svg
	width="198"
	height="320"
	viewBox="0 0 198 320"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	preserveAspectRatio="xMidYMid meet"
>
	<mask
		id="mask0_3142_10378"
		style="mask-type:alpha"
		maskUnits="userSpaceOnUse"
		x="0"
		y="0"
		width="198"
		height="320"
	>
		<g clip-path="url(#clip0_3142_10378)">
			<path
				d="M152.035 182.425L166.745 319.506H31.2564L45.9662 182.425C18.6395 164.889 0.494141 134.191 0.494141 99.2383C0.494141 44.6911 44.6038 0.495117 99.0005 0.495117C103.167 0.495117 107.274 0.752416 111.301 1.26701C159.893 7.32342 197.507 48.8672 197.507 99.2383C197.507 134.191 179.381 164.889 152.035 182.425Z"
				fill="#CDEF33"
				stroke="#202221"
				stroke-width="0.5"
				stroke-miterlimit="10"
			/>
			<path
				d="M70.5879 182.425L55.8978 319.506H31.2564L45.9662 182.425C18.6395 164.889 0.494141 134.191 0.494141 99.2383C0.494141 44.6911 44.6038 0.495117 99.0005 0.495117C103.167 0.495117 107.274 0.752416 111.301 1.26701C62.7295 7.32342 25.1158 48.8672 25.1158 99.2383C25.1158 134.191 43.2612 164.889 70.5879 182.425Z"
				fill="#202221"
				stroke="#202221"
				stroke-width="0.5"
				stroke-miterlimit="10"
			/>
		</g>
	</mask>
	<g mask="url(#mask0_3142_10378)">
		<rect width="1210.34" height="735.151" transform="translate(-577 -149.576)" fill="#202221" />

		<FoxFace bind:foxFaceRef bind:path1Ref bind:path2Ref />
	</g>
	<g clip-path="url(#clip2_3142_10378)">
		<path
			d="M152.035 182.425L166.745 319.506H31.2564L45.9662 182.425C18.6395 164.889 0.494141 134.191 0.494141 99.2383C0.494141 44.6911 44.6038 0.495117 99.0005 0.495117C103.167 0.495117 107.274 0.752416 111.301 1.26701C159.893 7.32342 197.507 48.8672 197.507 99.2383C197.507 134.191 179.381 164.889 152.035 182.425Z"
			stroke="#202221"
			stroke-width="0.5"
			stroke-miterlimit="10"
		/>
		<path
			d="M152.035 182.425L166.745 319.506H31.2564L45.9662 182.425C18.6395 164.889 0.494141 134.191 0.494141 99.2383C0.494141 44.6911 44.6038 0.495117 99.0005 0.495117C103.167 0.495117 107.274 0.752416 111.301 1.26701C159.893 7.32342 197.507 48.8672 197.507 99.2383C197.507 134.191 179.381 164.889 152.035 182.425Z"
			stroke="#202221"
			stroke-width="0.5"
			stroke-miterlimit="10"
		/>
		<path
			d="M70.5879 182.425L55.8978 319.506H31.2564L45.9662 182.425C18.6395 164.889 0.494141 134.191 0.494141 99.2383C0.494141 44.6911 44.6038 0.495117 99.0005 0.495117C103.167 0.495117 107.274 0.752416 111.301 1.26701C62.7295 7.32342 25.1158 48.8672 25.1158 99.2383C25.1158 134.191 43.2612 164.889 70.5879 182.425Z"
			fill="#D9D9D9"
			stroke="#202221"
			stroke-width="0.5"
			stroke-miterlimit="10"
		/>
	</g>
	<defs>
		<clipPath id="clip0_3142_10378">
			<rect width="198" height="320" fill="white" />
		</clipPath>
		<clipPath id="clip1_3142_10378">
			<rect width="373.632" height="359.656" fill="white" transform="translate(-158.645 218.466)" />
		</clipPath>
		<clipPath id="clip2_3142_10378">
			<rect width="198" height="320" fill="white" />
		</clipPath>
	</defs>
</svg>
