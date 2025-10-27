/**
 * Snap scroll utility for smooth section transitions
 * Based on the concept from the provided code
 */

export function initSnapScroll(container) {
	if (!container) return

	let isScrolling = false
	let currentSection = 0
	let sections = []
	let touchStartY = 0
	let touchEndY = 0

	// Get all sections with h-screen class
	function updateSections() {
		sections = Array.from(container.querySelectorAll('section'))
	}

	// Get section by index
	function getSectionByIndex(index) {
		return sections[index]
	}

	// Scroll to section with smooth animation
	function scrollToSection(index, smooth = true) {
		if (isScrolling || index < 0 || index >= sections.length) return

		const section = sections[index]
		if (!section) return

		isScrolling = true
		currentSection = index

		const startPosition = container.scrollTop
		const targetPosition = section.offsetTop
		const distance = targetPosition - startPosition
		const duration = smooth ? 600 : 0
		const startTime = performance.now()

		function animateScroll(currentTime) {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)

			// Easing function for smooth animation
			const easeInOutCubic =
				progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

			container.scrollTop = startPosition + distance * easeInOutCubic

			if (progress < 1) {
				requestAnimationFrame(animateScroll)
			} else {
				isScrolling = false
			}
		}

		if (smooth && duration > 0) {
			requestAnimationFrame(animateScroll)
		} else {
			container.scrollTop = targetPosition
			isScrolling = false
		}
	}

	// Get current section index based on scroll position
	function getCurrentSectionIndex() {
		const scrollPosition = container.scrollTop
		const viewportCenter = scrollPosition + window.innerHeight / 2

		let currentIndex = 0
		let minDistance = Infinity

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i]
			const sectionTop = section.offsetTop
			const sectionCenter = sectionTop + section.offsetHeight / 2
			const distance = Math.abs(viewportCenter - sectionCenter)

			if (distance < minDistance) {
				minDistance = distance
				currentIndex = i
			}
		}

		return currentIndex
	}

	// Handle wheel events for snap scrolling
	function handleWheel(e) {
		// Don't interfere with zoom
		if (e.ctrlKey || e.metaKey) return

		// Horizontal scroll
		if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

		const deltaY = e.deltaY
		const currentIndex = getCurrentSectionIndex()

		// Prevent default scroll if we're snapping
		if (isScrolling) {
			e.preventDefault()
			return
		}

		// Very sensitive threshold for better UX - responds to small movements
		const threshold = 20

		// Determine scroll direction
		if (deltaY > threshold && currentIndex < sections.length - 1) {
			e.preventDefault()
			scrollToSection(currentIndex + 1)
		} else if (deltaY < -threshold && currentIndex > 0) {
			e.preventDefault()
			scrollToSection(currentIndex - 1)
		}
	}

	// Handle touch events for mobile
	function handleTouchStart(e) {
		touchStartY = e.touches[0].clientY
	}

	function handleTouchEnd(e) {
		touchEndY = e.changedTouches[0].clientY

		if (isScrolling) {
			e.preventDefault()
			return
		}

		const deltaY = touchStartY - touchEndY
		const currentIndex = getCurrentSectionIndex()

		// More sensitive touch threshold for better responsiveness
		const threshold = 50

		if (Math.abs(deltaY) > threshold) {
			if (deltaY > 0 && currentIndex < sections.length - 1) {
				scrollToSection(currentIndex + 1)
				e.preventDefault()
			} else if (deltaY < 0 && currentIndex > 0) {
				scrollToSection(currentIndex - 1)
				e.preventDefault()
			}
		}
	}

	// Handle keyboard navigation
	function handleKeyDown(e) {
		if (isScrolling) return

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				const nextSection = getCurrentSectionIndex() + 1
				if (nextSection < sections.length) {
					scrollToSection(nextSection)
				}
				break
			case 'ArrowUp':
				e.preventDefault()
				const prevSection = getCurrentSectionIndex() - 1
				if (prevSection >= 0) {
					scrollToSection(prevSection)
				}
				break
			case 'Home':
				e.preventDefault()
				scrollToSection(0)
				break
			case 'End':
				e.preventDefault()
				scrollToSection(sections.length - 1)
				break
		}
	}

	// Initialize
	function init() {
		updateSections()

		// Enable smooth scroll behavior
		container.style.scrollBehavior = 'smooth'

		// Add event listeners
		container.addEventListener('wheel', handleWheel, { passive: false })
		container.addEventListener('touchstart', handleTouchStart, { passive: true })
		container.addEventListener('touchend', handleTouchEnd, { passive: false })

		// Also listen on window for keyboard
		window.addEventListener('keydown', handleKeyDown)

		// Update sections on resize
		const resizeObserver = new ResizeObserver(() => {
			updateSections()
		})

		if (container) {
			resizeObserver.observe(container)
		}

		return () => {
			container.removeEventListener('wheel', handleWheel)
			container.removeEventListener('touchstart', handleTouchStart)
			container.removeEventListener('touchend', handleTouchEnd)
			window.removeEventListener('keydown', handleKeyDown)
			resizeObserver.disconnect()
		}
	}

	return {
		init,
		scrollToSection,
		getCurrentSectionIndex,
		updateSections
	}
}
