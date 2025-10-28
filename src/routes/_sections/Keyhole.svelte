<script>
	import Keyhole from '$Components/AnimatedIcons/Keyhole/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''
</script>

<section
	data-section="keyhole"
	data-theme="light"
	id="landing-page"
	class={cn('bg-light h-screen min-h-[600px] w-full overflow-hidden', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] lg:items-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		{#if $mediaQuery.lg}
			<div
				class="absolute left-1/2 flex h-full w-[605px] -translate-x-1/2 items-center md:right-4 lg:right-10 xl:right-24"
				style="top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
			>
				<Keyhole className="w-full h-full object-contain max-h-[40%]" />
			</div>
		{/if}
		<div
			class="relative z-[1] mx-4 flex w-full flex-col justify-between md:mx-10 lg:mx-16 lg:flex-row xl:mx-20"
		>
			<div class="keyhole-top relative mt-10 max-w-[400px] lg:mt-0 lg:min-w-[300px] lg:max-w-[45%]">
				<h2
					class="xs:text-[28px] heading-bottom mb-4 text-2xl font-[500] leading-[1.1] lg:mb-8 lg:text-[45px]"
				>
					Nullmask has solved the everlasting privacy challenge
				</h2>

				<p class="mb-8 text-xl uppercase lg:max-w-[80%] lg:text-2xl">
					in web3 and is the first private VPN for crypto transactions.
				</p>
			</div>

			{#if !$mediaQuery.lg}
				<div class="flex flex-grow items-center overflow-hidden px-4 pb-4">
					<Keyhole className="w-full h-full object-contain max-h-[216px]" />
				</div>
			{/if}

			<div
				class="relative flex max-w-[400px] flex-col justify-between lg:min-w-[350px] lg:max-w-[30%] lg:text-right"
			>
				<div>
					<h2 class="xs:text-xl mb-2 text-lg font-[500] leading-[1.1] lg:mb-8 lg:text-[38px]">
						Install the app or extension
					</h2>

					<p class="last-bottom xs:text-xl mb-8 ml-auto text-lg lg:max-w-[85%] lg:text-3xl">
						click once and every transaction is shielded.
					</p>
				</div>

				<div>
					<h2 class="xs:text-xl mb-2 text-lg font-[500] leading-[1.1] lg:mb-8 lg:text-[38px]">
						No new wallets, no extra steps,
					</h2>

					<p class="xs:text-xl mb-8 ml-auto text-lg lg:max-w-[70%] lg:text-3xl">
						just your normal way of working. Now private.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@media (max-height: 700px) {
		.keyhole-top {
			margin-top: 20px !important;
		}

		.heading-bottom {
			margin-bottom: 4px !important;
		}

		.last-bottom {
			margin-bottom: 10px !important;
		}
	}
</style>
