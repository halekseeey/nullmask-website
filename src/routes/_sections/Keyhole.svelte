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
	class={cn('bg-light h-screen min-h-[600px] w-full', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] items-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div
			class="absolute left-1/2 flex h-full w-[605px] -translate-x-1/2 items-center md:right-4 lg:right-10 xl:right-24"
			style="top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
		>
			<Keyhole className="w-full h-full object-contain max-h-[40%]" />
		</div>
		<div class="relative z-[1] flex w-full justify-between md:mx-10 lg:mx-16 xl:mx-20">
			<div class="relative min-w-[300px] max-w-[45%]">
				<h2 class="mb-8 mb-9 text-[45px] font-[500] leading-[1.1]">
					Nullmask has solved the everlasting privacy challenge
				</h2>

				<p class="mb-8 max-w-[80%] text-2xl uppercase">
					in web3 and is the first private VPN for crypto transactions.
				</p>
			</div>

			<div class="relative flex min-w-[350px] max-w-[30%] flex-col justify-between text-right">
				<div>
					<h2 class="mb-8 text-[38px] font-[500] leading-[1.1]">Install the app or extension</h2>

					<p class="mb-8 ml-auto max-w-[85%] text-3xl">
						click once and every transaction is shielded.
					</p>
				</div>

				<div>
					<h2 class="mb-8 text-[38px] font-[500] leading-[1.1]">No new wallets, no extra steps,</h2>

					<p class="mb-8 ml-auto max-w-[70%] text-3xl">
						just your normal way of working. Now private.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
