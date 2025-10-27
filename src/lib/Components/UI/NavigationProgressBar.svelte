<script>
	import { tick } from 'svelte'
	import { fade } from 'svelte/transition'

	let progress = 0
	let visible = false
	let timeoutId

	export const start = async () => {
		visible = true
		progress = 0
		await tick()
		progress = 20
		timeoutId = setInterval(() => {
			if (progress < 90) {
				progress += Math.random() * 15
				if (progress > 90) progress = 90
			}
		}, 400)
	}

	export const complete = () => {
		if (timeoutId) {
			clearInterval(timeoutId)
		}

		progress = 100
		setTimeout(() => {
			visible = false
			progress = 0
		}, 300)
	}
</script>

{#if visible}
	<div class="fixed left-0 top-0 z-[999999] h-1 w-full bg-transparent" transition:fade>
		<div
			class="bg-primary h-full transition-all duration-300 ease-out"
			style="width: {progress}%"
		/>
	</div>
{/if}

<style>
	.bg-primary {
		background: var(--line-color);
		transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
