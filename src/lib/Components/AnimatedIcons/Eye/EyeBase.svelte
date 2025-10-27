<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let x
	export let y

	export let width = 143
	export let height = 82
	export let duration = 0.5
	export let delay = 0.5

	let circleRef
	let animation

	onMount(() => {
		// Infinite animation: center -> left -> bottom -> right -> center -> ...
		const timeline = gsap.timeline({ repeat: -1, ease: 'power1.inOut' })

		// Move to left
		timeline.to(circleRef, {
			duration: duration,
			attr: { cx: 38.9904, cy: 40.9982 },
			ease: 'power1.inOut'
		})

		// Add delay
		timeline.add(() => {}, `+=${delay}`)

		// Move to bottom
		timeline.to(circleRef, {
			duration: duration,
			attr: { cx: 71.1857, cy: 53.1857 },
			ease: 'power1.inOut'
		})

		// Add delay
		timeline.add(() => {}, `+=${delay}`)

		// Move to right
		timeline.to(circleRef, {
			duration: duration,
			attr: { cx: 88.1857, cy: 51.1857 },
			ease: 'power1.inOut'
		})

		// Add delay
		timeline.add(() => {}, `+=${delay}`)

		// Return to center
		timeline.to(circleRef, {
			duration: duration,
			attr: { cx: 71.1857, cy: 41.1857 },
			ease: 'power1.inOut'
		})

		timeline.add(() => {}, `+=${delay}`)

		animation = timeline

		return () => {
			if (animation) {
				animation.kill()
			}
		}
	})
</script>

<svg {x} {y} {width} {height} viewBox="0 0 143 82" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="path-1-inside-1_10_7852" fill="white">
		<path
			d="M71.1963 0C101.595 0 128.143 16.4839 142.393 41C128.143 65.516 101.595 82 71.1963 82C40.7972 82 14.2497 65.5161 0 41C14.2497 16.4839 40.7972 8.9643e-06 71.1963 0Z"
		/>
	</mask>
	<path
		d="M71.1963 0C101.595 0 128.143 16.4839 142.393 41C128.143 65.516 101.595 82 71.1963 82C40.7972 82 14.2497 65.5161 0 41C14.2497 16.4839 40.7972 8.9643e-06 71.1963 0Z"
		fill="#D9D9D9"
	/>
	<path
		d="M71.1963 0V-0.585714V0ZM142.393 41L142.899 41.2943L143.07 41L142.899 40.7057L142.393 41ZM71.1963 82V82.5857V82ZM0 41L-0.506389 40.7057L-0.677466 41L-0.506389 41.2943L0 41ZM71.1963 0V0.585714C101.378 0.585714 127.737 16.9512 141.886 41.2943L142.393 41L142.899 40.7057C128.549 16.0167 101.812 -0.585714 71.1963 -0.585714V0ZM142.393 41L141.886 40.7057C127.737 65.0488 101.378 81.4143 71.1963 81.4143V82V82.5857C101.812 82.5857 128.549 65.9833 142.899 41.2943L142.393 41ZM71.1963 82V81.4143C41.0143 81.4143 14.6556 65.0488 0.506389 40.7057L0 41L-0.506389 41.2943C13.8438 65.9833 40.5801 82.5857 71.1963 82.5857V82ZM0 41L0.506389 41.2943C14.6556 16.9512 41.0143 0.585723 71.1963 0.585714V0V-0.585714C40.5801 -0.585705 13.8438 16.0167 -0.506389 40.7057L0 41Z"
		fill="#202221"
		mask="url(#path-1-inside-1_10_7852)"
	/>
	<circle bind:this={circleRef} cx="71.1857" cy="41.1857" r="25.1857" fill="#202221" />
</svg>
