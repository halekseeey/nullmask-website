<script>
	import { fade, fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	// import Wordmark from '$Components/Icons/Wordmark.svelte'
	// import ThemeToggle from '$Components/AnimatedIcons/ThemeToggle'
	import { mediaQuery } from '$Stores/mediaQuery'
	import MenuToggle from '$Components/AnimatedIcons/MenuToggle/MenuToggle.svelte'
	import { isMenuOpen, toggleMenu } from '$Stores/menuStore'
	// import Logo from '$Components/Icons/Logo.svelte'
	import { HEADER } from '$lib/const'

	let headerWidth = '100%'
	let headerLeft = '0px'
	let updateWidthRetryTimer = null

	const updateHeaderWidth = () => {
		const contentWrapper = document.querySelector('.content-div')
		if (contentWrapper) {
			const rect = contentWrapper.getBoundingClientRect()
			headerWidth = `${rect.width}px`
			headerLeft = `${rect.left}px`
			if (updateWidthRetryTimer) {
				clearTimeout(updateWidthRetryTimer)
				updateWidthRetryTimer = null
			}
		} else {
			if (!updateWidthRetryTimer) {
				updateWidthRetryTimer = setTimeout(() => {
					updateHeaderWidth()
				}, 100)
			}
		}
	}

	onMount(() => {
		setTimeout(() => {
			updateHeaderWidth()
		}, 250)

		window.addEventListener('resize', updateHeaderWidth)

		return () => {
			window.removeEventListener('resize', updateHeaderWidth)
			if (updateWidthRetryTimer) {
				clearTimeout(updateWidthRetryTimer)
				updateWidthRetryTimer = null
			}
		}
	})
</script>

<header
	class="fixed top-0 z-[10001] px-4 pt-4"
	style=" background-color: var(--border-color); height: {$mediaQuery.md
		? HEADER.height.desktop
		: HEADER.height.mobile}px; width: {headerWidth}; left: {headerLeft}"
>
	<div
		class="border-border grid h-full grid-cols-[76px_minmax(0,auto)_65px] border md:grid-cols-[76px_minmax(0,auto)_88px] lg:grid-cols-[90px_1fr_auto_90px]"
	>
		<div
			class="border-border relative flex h-full w-[76px] items-center justify-center border-r lg:w-[90px]"
		>
			<!-- <a href="/">
				<Logo className="h-9 w-9 lg:h-10 lg:w-10"></Logo>
			</a> -->
		</div>

		<div class="flex h-full items-center px-4">
			<!-- <a href="/" class="block">
				<Wordmark className="w-full h-4 lg:h-auto object-contain"></Wordmark>
			</a> -->
		</div>

		{#if $mediaQuery.lg}
			<div class="flex">
				<div class="grid h-full grid-rows-2 border-x" style="border-color: var(--line-color);">
					<!-- <a
						href={TESTNET_LINK}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative flex items-center justify-center overflow-hidden border-b px-6 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
						style="border-color: var(--line-color);"
					>
						<span
							class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
							>Testnet</span
						>
					</a>
					<a
						href={GITHUB_LINK}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
					>
						<span
							class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
							>Github</span
						>
					</a> -->
				</div>
				<div class="grid h-full grid-rows-2 border-r" style="border-color: var(--line-color);">
					<!-- <a
						href={MANIFESTO_LINK}
						class="group relative flex items-center justify-center overflow-hidden border-b px-6 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
						style="border-color: var(--line-color);"
					>
						<span
							class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
							>Manifesto</span
						>
					</a>
					<a
						href={TEAM_LINK}
						class="group relative flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
					>
						<span
							class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
							>Team</span
						>
					</a> -->
				</div>
				<!-- <a
					href={SPIN_LINK}
					class="group relative flex h-full items-center justify-center overflow-hidden border-r px-6 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
					style="border-color: var(--line-color);"
				>
					<span
						class="relative z-10 text-center transition-colors duration-300 group-hover:text-[var(--border-color)]"
						>Spin Consensus <br /> Protocol</span
					>
				</a>
				<a
					href={LITEPAPER_LINK}
					class="group relative flex h-full items-center justify-center overflow-hidden border-r px-6 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
					style="border-color: var(--line-color);"
				>
					<span
						class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
						>Litepaper</span
					>
				</a> -->
			</div>
		{:else}
			<MenuToggle
				className="border-border border-l flex items-center justify-center"
				on:click={toggleMenu}
			/>
		{/if}
	</div>
</header>

{#if $isMenuOpen && !mediaQuery.lg}
	<div
		class=" fixed bottom-0 z-[10000] flex flex-col px-4"
		style="top: {$mediaQuery.md
			? HEADER.height.desktop
			: HEADER.height.mobile}px; width: {headerWidth}; left: {headerLeft}"
	>
		<div
			class="absolute inset-0"
			style=" background-color: var(--border-color)"
			in:fade={{ duration: 400 }}
			out:fade={{ duration: 400 }}
		></div>
		<div
			class="border-border relative z-[1] mb-4 flex flex-grow flex-col overflow-y-scroll border-x border-b"
			in:fly={{ y: '-100%', duration: 500, opacity: 1 }}
			out:fly={{ y: '-100%', duration: 500, opacity: 1 }}
		>
			<!-- <a
				href={TESTNET_LINK}
				target="_blank"
				rel="noopener noreferrer"
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden border-b px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
				style="border-color: var(--line-color);"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Testnet</span
				>
			</a>
			<a
				href={GITHUB_LINK}
				target="_blank"
				rel="noopener noreferrer"
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden border-b px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Github</span
				>
			</a>

			<a
				href={TEAM_LINK}
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden border-b px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Team</span
				>
			</a>

			<a
				href={MANIFESTO_LINK}
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden border-b px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Manifesto</span
				>
			</a>
			<a
				href={LITEPAPER_LINK}
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden border-b px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Litepaper</span
				>
			</a>

			<a
				href={SPIN_LINK}
				class="border-border group relative flex h-14 flex-shrink-0 items-center overflow-hidden px-4 before:absolute before:inset-0 before:-translate-x-full before:transform before:bg-[var(--line-color)] before:transition-transform before:duration-300 hover:before:translate-x-0"
			>
				<span
					class="relative z-10 transition-colors duration-300 group-hover:text-[var(--border-color)]"
					>Spin Consensus Protocol</span
				>
			</a> -->
		</div>
	</div>
{/if}
