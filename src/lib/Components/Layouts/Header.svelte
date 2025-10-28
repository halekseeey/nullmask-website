<script>
	import { fade, fly } from 'svelte/transition'

	import { mediaQuery } from '$Stores/mediaQuery'
	import MenuToggle from '$Components/AnimatedIcons/MenuToggle/MenuToggle.svelte'
	import { isMenuOpen, toggleMenu } from '$Stores/menuStore'
	import { currentSection } from '$lib/Stores/currentSection'

	import { HEADER } from '$lib/const'
	import Logo from '$Components/AnimatedIcons/Logo/index.svelte'
	import Wordmark from '$Components/AnimatedIcons/Wordmark/Wordmark.svelte'
	import { cn } from '$utils'
</script>

<header
	class="fixed top-0 z-[10001] px-4 pt-4"
	style="height: {$mediaQuery.md
		? HEADER.height.desktop
		: HEADER.height
				.mobile}px; max-width: 1440px; left: 50%; transform: translateX(-50%); width: 100%;"
	data-theme={$currentSection.theme}
>
	<div
		class={cn(
			'flex h-full justify-between rounded-t-[15px]  border transition-all duration-500',
			(!$isMenuOpen || mediaQuery.md) && 'rounded-b-[15px]'
		)}
		class:bg-dark={$currentSection.theme === 'dark'}
		class:bg-light={$currentSection.theme === 'light'}
		class:border-light={$currentSection.theme === 'dark'}
		class:border-dark={$currentSection.theme === 'light'}
	>
		<div class="items-cetner flex h-full flex-shrink-0 gap-2 md:gap-4">
			<a href="/" class="block flex items-center">
				<Logo
					className="h-12 w-12 transition-colors ml-2 md:ml-4 duration-500 md:h-16 md:w-16"
					theme={$currentSection.theme}
				/>
			</a>

			<Wordmark
				className="md:w-[240px] w-[160px] flex-shrink-0  transition-colors duration-500 h-auto object-contain"
				theme={$currentSection.theme}
			/>
		</div>

		{#if !$mediaQuery.md}
			<MenuToggle
				className="border-l flex items-center justify-center transition-colors duration-500 {$currentSection.theme ===
				'light'
					? 'border-light'
					: 'border-dark'}"
				theme={$currentSection.theme}
				on:click={toggleMenu}
			/>
		{/if}
	</div>
</header>

{#if $isMenuOpen && !mediaQuery.md}
	<div
		class=" fixed bottom-0 z-[10000] flex flex-col overflow-hidden px-4"
		style="top: {$mediaQuery.md
			? HEADER.height.desktop
			: HEADER.height
					.mobile}px; max-width: 1440px; left: 50%; transform: translateX(-50%); width: 100%;"
	>
		<div
			class="absolute inset-0 transition-colors duration-500"
			class:bg-dark={$currentSection.theme === 'dark'}
			class:bg-light={$currentSection.theme === 'light'}
			in:fade={{ duration: 400 }}
			out:fade={{ duration: 400 }}
		></div>
		<div
			class="relative z-[1] mb-4 flex flex-grow flex-col overflow-y-scroll rounded-b-[15px] border-x border-b transition-colors duration-500"
			class:border-light={$currentSection.theme === 'dark'}
			class:border-dark={$currentSection.theme === 'light'}
			in:fly={{ y: '-100%', duration: 500, opacity: 0 }}
			out:fly={{ y: '-100%', duration: 500, opacity: 0 }}
		></div>
	</div>
{/if}
