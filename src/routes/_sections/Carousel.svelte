<script>
	import Keyhole from '$Components/AnimatedIcons/Keyhole/index.svelte'
	import Wallet from '$Components/AnimatedIcons/PrivacyCards/Wallet/index.svelte'
	import Tokens from '$Components/AnimatedIcons/PrivacyCards/Tokens/index.svelte'
	import Phone from '$Components/AnimatedIcons/PrivacyCards/Phone/index.svelte'
	import Funds from '$Components/AnimatedIcons/PrivacyCards/Funds/index.svelte'
	import Rockets from '$Components/AnimatedIcons/PrivacyCards/Rockets/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''

	const CARDS = [
		{ component: Wallet, name: 'Wallet' },
		{ component: Tokens, name: 'Tokens' },
		{ component: Phone, name: 'Phone' },
		{ component: Funds, name: 'Funds' },
		{ component: Rockets, name: 'Rockets' }
	]
</script>

<section
	data-section="carousel"
	data-theme="dark"
	id="landing-page"
	class={cn('bg-dark h-screen min-h-[600px] w-full', className)}
>
	<div
		class="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center"
		style="padding-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px;"
	>
		<h2
			class="text-light mb-14 text-4xl text-[70px] leading-[1.1] md:ml-10 lg:ml-16 xl:ml-24 xl:text-[80px]"
		>
			<span>Privacy Didn't Exist.</span>
			<br />
			<span class="text-green"> &gt;&gt;&gt; Until Now! </span>
		</h2>

		<ul class="mx-8 grid grid-cols-5 gap-4">
			{#each CARDS as { component: Card, name }}
				<li class="h-full">
					<Card className="w-auto h-full" />
				</li>
			{/each}
		</ul>
	</div>
</section>
