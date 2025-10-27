<script>
	import OneClick from '$Components/AnimatedIcons/OneClick/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''
</script>

<section
	data-section="hero"
	data-theme="light"
	id="landing-page"
	class={cn('bg-light h-screen min-h-[600px] w-full', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] items-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<div class="absolute h-full w-[605px] md:right-4 lg:right-10 xl:right-24">
			<OneClick className="h-full w-full object-contain" />
		</div>
		<div class="relative z-[1] flex flex-col md:ml-10 lg:ml-16 xl:ml-32">
			<h1 class="mb-8 text-[80px] leading-[1.1]">
				One Click. <br />
				Total Privacy.
			</h1>

			<p class="mb-8 text-3xl uppercase">Web3's First Wallet VPN</p>

			<button
				class="bg-green hover:bg-dark hover:text-light mb-20 w-fit rounded-[10px] px-4 py-2 text-2xl font-[300] transition-all duration-300"
			>
				Be the first to know
			</button>
		</div>
	</div>
</section>
