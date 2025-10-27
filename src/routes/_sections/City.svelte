<script>
	import City from '$Components/AnimatedIcons/City/index.svelte'
	import Button from '$Components/AnimatedIcons/City/Button.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''

	const LIST_ITEMS = [
		{
			bold: 'Multi-network privacy:',
			basic: ' Extend Nullmask to all Web3 networks (e.g., Solana, BTC) via proxying.'
		},
		{
			bold: 'Programmable privacy:',
			basic: ' Enable Turing-complete spending scripts and zero-knowledge account abstraction.'
		},
		{
			bold: 'Automated privacy workflows:',
			basic: ' Handle swaps, bridging, and routing to maximize privacy without user intervention.'
		},
		{
			bold: 'Mass adoption:',
			basic: ' Make privacy the default for all Web3 users, not just experts.'
		}
	]

	let viewMode = 1
	let previousViewMode = 1

	// Auto-switch based on screen size
	$: if ($mediaQuery.lg) {
		viewMode = 0 // Full view on large screens
	} else {
		if (viewMode === 0) {
			viewMode = previousViewMode || 1
		}
		previousViewMode = viewMode
	}

	function setViewMode(mode) {
		previousViewMode = viewMode
		viewMode = mode
	}

	function handlePositionChange(event) {
		const targetPosition = event.detail
		setViewMode(targetPosition)
	}
</script>

<section
	data-section="city"
	data-theme="light"
	id="landing-page"
	class={cn('bg-light h-screen min-h-[600px] w-full', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] items-center gap-12"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div class="relative z-[1] flex max-w-[420px] flex-col md:ml-10 lg:ml-16 xl:ml-32">
			<h2 class="mb-8 text-[45px] font-[500] leading-[1.1]">ONE SOLUTION. ANY USE CASE.</h2>

			<ul class="flex flex-col gap-6 text-xl">
				{#each LIST_ITEMS as item}
					<li>
						<span class="font-[600]">{item.bold}</span>
						<span>{item.basic}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative h-full">
			<City className="h-full w-full object-contain" {viewMode} />

			<!-- View mode button - only show on non-large screens -->
			{#if !$mediaQuery.lg}
				<div class="absolute bottom-4 left-1/2 -translate-x-1/2">
					<Button activePosition={viewMode} on:position-change={handlePositionChange} />
				</div>
			{/if}
		</div>
	</div>
</section>
