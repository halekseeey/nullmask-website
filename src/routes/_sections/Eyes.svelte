<script>
	import Eye from '$Components/AnimatedIcons/Eye/index.svelte'
	import { mediaQuery } from '$lib/Stores/mediaQuery'
	import { HEADER } from '$lib/const'
	import { cn } from '$utils'

	export let className = ''

	// Auto-select viewMode based on screen size
	$: viewMode = $mediaQuery.md ? 0 : $mediaQuery.s ? 1 : 2
</script>

<section
	data-section="eyes"
	data-theme="dark"
	id="landing-page"
	class={cn('bg-dark h-screen min-h-[600px] w-full overflow-hidden', className)}
>
	<div class="relative mx-auto flex h-full max-w-[1440px] flex-col items-center gap-4 md:flex-row">
		<div
			class="md:order-0 relative order-1 -mt-32 w-full flex-grow overflow-y-hidden md:h-full md:w-[50%] md:flex-shrink-0"
		>
			<Eye className="h-full w-full object-contain md:-translate-x-[50px]" {viewMode} />
		</div>
		<div
			class="order-0 relative z-[1] flex max-w-[500px] flex-col px-4 text-white md:order-1 md:mr-10 md:mr-10 md:px-0 xl:mr-16"
			style="margin-top: {$mediaQuery.md ? HEADER.height.desktop : HEADER.height.mobile}px; "
		>
			<h2
				class="heading-top xs:text-[28px] mb-4 mt-5 text-[20px] font-[500] leading-[1.1] md:mb-8 md:mt-0 md:text-[38px]"
			>
				Freedom isn’t freedom if someone’s always watching.
			</h2>

			<p class="xs:text-base text-sm font-[300] md:mt-5 md:text-2xl">
				We believe everyone deserves the right to act, speak, and transact without being watched.
				Because privacy isn’t about hiding, it’s about having control. <br /> And in a truly free society,
				control should belong to the individual.
			</p>

			<div
				class="xs:grid-cols-2 xs:w-full s:text-lg s:gap-3 xs:mt-10 mt-4 grid gap-2 text-base md:grid-cols-1 lg:grid-cols-2 lg:text-xl xl:text-2xl"
			>
				<button
					class="border-light bg-dark text-light xs:w-full hover:bg-green hover:border-green hover:text-dark mx-auto w-[250px] rounded-[10px] border py-1.5 transition-all duration-300"
				>
					Join Our Community
				</button>

				<button
					class="border-dark bg-light text-dark hover:bg-dark xs:w-full hover:text-green hover:border-green mx-auto w-[250px] rounded-[10px] border py-1.5 transition-all transition-all duration-300 duration-300"
				>
					Business Inquiries
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	@media (max-height: 700px) {
		.heading-top {
			margin-top: 20px !important;
		}
	}
</style>
