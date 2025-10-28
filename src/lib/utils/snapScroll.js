/**
 * Snap scroll logic from Hyperframe example
 * Controls scroll-snap-type based on scroll position
 */

export function initSnapScrollHyperframe(mainElement) {
	if (!mainElement) return

	let isSnapping = false
	let snapLockTimeout = null

	// Check if browser is Chrome
	const isChrome =
		window.chrome &&
		window.navigator.vendor === 'Google Inc.' &&
		!window.opr &&
		window.navigator.userAgent.indexOf('Edge') === -1

	// Check if browser supports scrollBehavior
	const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style

	// Enable or disable scroll snap
	const toggleSnap = (enable) => {
		if (enable) {
			mainElement.style.scrollSnapType = 'y mandatory'

			// Chrome/Edge specific workaround
			if (!supportsScrollBehavior) {
				let attempts = 5
				const currentScroll = mainElement.scrollTop
				mainElement.scrollTop = currentScroll

				const fixScroll = () => {
					attempts -= 1
					mainElement.scrollTop = currentScroll
					if (attempts > 0) {
						requestAnimationFrame(fixScroll)
					}
				}
				requestAnimationFrame(fixScroll)
			}
		} else {
			mainElement.style.scrollSnapType = 'none'
		}
	}

	// Debounce function
	const debounce = (func, wait, immediate) => {
		let timeout
		return function executedFunction(...args) {
			const later = () => {
				timeout = null
				if (!immediate) func(...args)
			}
			const callNow = immediate && !timeout
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
			if (callNow) func(...args)
		}
	}

	// Function to toggle snap with debounce
	const toggleSnapDebounced = debounce(
		(enable) => {
			isSnapping = enable
			toggleSnap(enable)
		},
		100,
		true
	)

	// Handle wheel events (Chrome/Edge specific behavior)
	if (isChrome || !supportsScrollBehavior) {
		let isScrollingLock = false
		let scrollLockCount = 0

		const handleWheel = (e) => {
			// Don't interfere with zoom
			if (e.ctrlKey || e.metaKey) return

			// Don't interfere with horizontal scroll
			if (Math.abs(e.wheelDeltaY) < 10 && Math.abs(e.wheelDeltaX) > 10) return

			if (scrollLockCount > 0) {
				e.preventDefault()
				e.stopPropagation()
				return
			}

			// Check if we should snap based on scroll position
			const currentScroll = mainElement.scrollTop
			const viewportHeight = window.innerHeight
			const scrollOffset = currentScroll - e.wheelDelta
			const targetOffset =
				(Math.round(currentScroll / viewportHeight) - Math.sign(e.wheelDelta)) * viewportHeight

			// Check if there's scrollable content in the target range
			const hasScrollableContent = Array.from(mainElement.querySelectorAll('section')).some(
				(section) => {
					const sectionTop = section.offsetTop
					const sectionBottom = sectionTop + section.offsetHeight
					return scrollOffset >= sectionTop && scrollOffset <= sectionBottom
				}
			)

			if (hasScrollableContent) {
				e.preventDefault()
				e.stopPropagation()

				const scrollToTarget = () => {
					isScrollingLock = true
					if (!supportsScrollBehavior) {
						mainElement.style.scrollSnapType = 'none'
					}
					toggleSnapDebounced(true)

					scrollLockCount += 1

					mainElement.scrollTo({
						left: 0,
						top: targetOffset,
						behavior: 'smooth'
					})

					// Reset snap after scroll
					setTimeout(() => {
						if (isSnapping) {
							const resetScroll = mainElement.scrollTop
							if (mainElement.style.scrollSnapType === 'y mandatory') {
								if (!supportsScrollBehavior) {
									let attempts = 5
									mainElement.scrollTop = resetScroll
									const fix = () => {
										attempts -= 1
										mainElement.scrollTop = resetScroll
										if (attempts > 0) {
											requestAnimationFrame(fix)
										}
									}
									requestAnimationFrame(fix)
								}
							}
						}
					}, 500)

					setTimeout(() => {
						isScrollingLock = false
						scrollLockCount -= 1
					}, 1500)
				}

				scrollToTarget()
			}
		}

		mainElement.addEventListener('wheel', handleWheel, { passive: false })
	}

	return () => {
		if (snapLockTimeout) clearTimeout(snapLockTimeout)
	}
}
