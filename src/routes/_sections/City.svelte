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
	class={cn('bg-light h-screen min-h-[600px] w-full overflow-hidden', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] flex-col md:flex-row md:items-center md:gap-12"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div
			class=" relative z-[1] flex h-full flex-col md:ml-10 md:h-auto md:max-w-[420px] lg:ml-16 xl:ml-32"
		>
			<h2
				class=" city-top xs:mb-4 s:text-[28px] mb-2 mt-4 px-4 text-[20px] font-[500] leading-[1.1] md:mb-8 md:mt-0 md:px-0 md:text-[45px]"
			>
				ONE SOLUTION. ANY USE CASE.
			</h2>

			{#if $mediaQuery.md}
				<ul class="flex flex-col gap-6 text-xl leading-[1.5]">
					{#each LIST_ITEMS as item, index}
						<li>
							<span class="font-[600]">{item.bold}</span>
							<span>{item.basic}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<ul class="s:text-xl mb-4 flex flex-col gap-2 px-4 leading-[1.25]">
					{#each LIST_ITEMS.slice(0, 2) as item}
						<li>
							<span class="font-[600]">{item.bold}</span>
							<span>{item.basic}</span>
						</li>
					{/each}
				</ul>

				<div
					class="border-dark xs:mx-auto relative mx-4 max-w-[370px] flex-grow overflow-hidden rounded-[20px] border"
				>
					<City className="h-full w-full object-cover" {viewMode} />

					<!-- View mode button - only show on non-large screens -->
				</div>

				<div class="mx-auto mt-2">
					<Button activePosition={viewMode} on:position-change={handlePositionChange} />
				</div>

				<ul class="s:text-xl mb-8 mt-4 flex flex-col gap-2 px-4 leading-[1.25]">
					{#each LIST_ITEMS.slice(2, 4) as item}
						<li>
							<span class="font-[600]">{item.bold}</span>
							<span>{item.basic}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if $mediaQuery.md}
			<div class="flex h-full flex-col justify-center">
				<div
					style="height: calc(100% - 16px);"
					class={cn(
						'relative ',
						!$mediaQuery.lg &&
							'border-dark mx-4 max-h-[500px] overflow-hidden rounded-[20px] border'
					)}
				>
					<City className="h-full w-full object-contain" {viewMode} />

					<!-- View mode button - only show on non-large screens -->
				</div>
				{#if !$mediaQuery.lg}
					<div class="mx-auto mt-4 w-fit">
						<Button activePosition={viewMode} on:position-change={handlePositionChange} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	@media (max-height: 700px) {
		.city-top {
			margin-top: 10px !important;
		}
	}
</style>
