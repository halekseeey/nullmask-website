<script>
	import Eye from '$Components/AnimatedIcons/Eye/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''

	// Auto-select viewMode based on screen size
	$: viewMode = $mediaQuery.lg ? 0 : 0
</script>

<section
	data-section="eyes"
	data-theme="dark"
	id="landing-page"
	class={cn('bg-dark h-screen min-h-[600px] w-full', className)}
>
	<div class="relative mx-auto flex h-full max-w-[1440px] items-center gap-4">
		<div class="relative h-full w-[50%] flex-shrink-0">
			<Eye className="h-full w-full object-contain -translate-x-[50px]" {viewMode} />
		</div>
		<div
			class="relative z-[1] flex flex-col text-white md:mr-10 lg:mr-4 xl:mr-16"
			style="margin-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px; "
		>
			<h2 class="mb-8 text-[38px] font-[500] leading-[1.1]">
				Freedom isn’t freedom if someone’s always watching.
			</h2>

			<p class="mt-5 text-2xl font-[300]">
				We believe everyone deserves the right to act, speak, and transact without being watched.
				Because privacy isn’t about hiding, it’s about having control. <br /> And in a truly free society,
				control should belong to the individual.
			</p>

			<div class="mt-10 grid grid-cols-2 gap-3 text-xl xl:text-2xl">
				<button
					class="border-light bg-dark text-light hover:bg-green hover:border-green hover:text-dark rounded-[10px] border py-1.5 transition-all duration-300"
				>
					Join Our Community
				</button>

				<button
					class="border-light bg-light text-dark hover:bg-dark hover:text-green hover:border-green rounded-[10px] border py-1.5 transition-all transition-all duration-300 duration-300"
				>
					Business Inquiries
				</button>
			</div>
		</div>
	</div>
</section>
