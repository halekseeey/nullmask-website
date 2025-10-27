export function initScrollBridge() {
	const bodyContent = document.querySelector('.body-content')
	const contentWrapper = document.querySelector('.content-wrapper')
	let wheelVelocity = 0
	let wheelAnimation = null
	const wheelScale = 0.04 // slow down wheel accumulation

	if (!(bodyContent && contentWrapper)) return

	// Wheel scroll handling
	bodyContent.addEventListener(
		'wheel',
		function (e) {
			e.preventDefault()
			e.stopPropagation()
			wheelVelocity += e.deltaY * wheelScale
			if (!wheelAnimation) animateWheelScroll()
		},
		{ passive: false }
	)

	function animateWheelScroll() {
		const friction = 0.85
		const minVelocity = 0.08
		function animate() {
			if (Math.abs(wheelVelocity) > minVelocity) {
				const maxScroll = contentWrapper.scrollHeight - contentWrapper.clientHeight
				let next = contentWrapper.scrollTop + wheelVelocity
				if (next < 0) {
					next = 0
					wheelVelocity = 0
				} else if (next > maxScroll) {
					next = maxScroll
					wheelVelocity = 0
				}
				contentWrapper.scrollTop = next
				wheelVelocity *= friction
				wheelAnimation = requestAnimationFrame(animate)
			} else {
				wheelVelocity = 0
				wheelAnimation = null
			}
		}
		wheelAnimation = requestAnimationFrame(animate)
	}

	// Touch handling
	let touchStartY = 0
	let touchStartScrollTop = 0
	let isScrolling = false
	let lastTouchY = 0
	let lastTouchTime = 0
	let touchVelocities = []
	let momentumAnimation = null

	bodyContent.addEventListener(
		'touchstart',
		function (e) {
			touchStartY = e.touches[0].clientY
			lastTouchY = touchStartY
			lastTouchTime = Date.now()
			touchStartScrollTop = contentWrapper.scrollTop
			isScrolling = false
			touchVelocities = []
			if (momentumAnimation) {
				cancelAnimationFrame(momentumAnimation)
				momentumAnimation = null
			}
		},
		{ passive: true }
	)

	bodyContent.addEventListener(
		'touchmove',
		function (e) {
			if (e.touches.length === 1) {
				const touchY = e.touches[0].clientY
				const currentTime = Date.now()
				const deltaY = touchStartY - touchY
				const timeDelta = currentTime - lastTouchTime

				if (timeDelta > 0) {
					const velocity = (touchY - lastTouchY) / timeDelta
					touchVelocities.push(velocity)
					if (touchVelocities.length > 5) {
						touchVelocities.shift()
					}
				}

				if (Math.abs(deltaY) > 5) {
					e.preventDefault()
					e.stopPropagation()
					isScrolling = true
					let newScrollTop = touchStartScrollTop + deltaY
					const maxScroll = contentWrapper.scrollHeight - contentWrapper.clientHeight

					if (newScrollTop < 0) {
						newScrollTop = newScrollTop * 0.3
					} else if (newScrollTop > maxScroll) {
						const overscroll = newScrollTop - maxScroll
						newScrollTop = maxScroll + overscroll * 0.3
					}
					contentWrapper.scrollTop = newScrollTop
				}
				lastTouchY = touchY
				lastTouchTime = currentTime
			}
		},
		{ passive: false }
	)

	bodyContent.addEventListener(
		'touchend',
		function () {
			isScrolling = false
			if (touchVelocities.length > 0) {
				const avgVelocity = touchVelocities.reduce((a, b) => a + b, 0) / touchVelocities.length
				const velocity = avgVelocity * 1300
				if (Math.abs(velocity) > 50) {
					applyMomentum(velocity)
				}
			}
		},
		{ passive: true }
	)

	function applyMomentum(initialVelocity) {
		const friction = 0.95
		let currentVelocity = initialVelocity
		let currentScrollTop = contentWrapper.scrollTop
		const maxScroll = contentWrapper.scrollHeight - contentWrapper.clientHeight

		function animateMomentum() {
			currentScrollTop -= currentVelocity * 0.016
			currentVelocity *= friction

			if (currentScrollTop < 0) {
				currentScrollTop = 0
				currentVelocity = 0
			} else if (currentScrollTop > maxScroll) {
				currentScrollTop = maxScroll
				currentVelocity = 0
			}

			contentWrapper.scrollTop = currentScrollTop

			if (Math.abs(currentVelocity) > 1) {
				momentumAnimation = requestAnimationFrame(animateMomentum)
			} else {
				momentumAnimation = null
			}
		}
		momentumAnimation = requestAnimationFrame(animateMomentum)
	}

	bodyContent.addEventListener(
		'touchcancel',
		function () {
			isScrolling = false
		},
		{ passive: true }
	)

	// Keyboard handling
	let keyboardAnimation = null
	bodyContent.addEventListener('keydown', function (e) {
		if (
			e.key === 'ArrowUp' ||
			e.key === 'ArrowDown' ||
			e.key === 'PageUp' ||
			e.key === 'PageDown' ||
			e.key === 'Home' ||
			e.key === 'End'
		) {
			e.preventDefault()
			e.stopPropagation()
			if (keyboardAnimation) {
				cancelAnimationFrame(keyboardAnimation)
			}

			const targetScroll =
				e.key === 'ArrowUp'
					? contentWrapper.scrollTop - 100
					: e.key === 'ArrowDown'
						? contentWrapper.scrollTop + 100
						: e.key === 'PageUp'
							? contentWrapper.scrollTop - contentWrapper.clientHeight
							: e.key === 'PageDown'
								? contentWrapper.scrollTop + contentWrapper.clientHeight
								: e.key === 'Home'
									? 0
									: contentWrapper.scrollHeight - contentWrapper.clientHeight

			smoothScrollTo(targetScroll, 300)
		}
	})

	function smoothScrollTo(targetScroll, duration) {
		const startScroll = contentWrapper.scrollTop
		const distance = targetScroll - startScroll
		const startTime = performance.now()

		function animate(currentTime) {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const easeOut = 1 - Math.pow(1 - progress, 3)
			const currentScroll = startScroll + distance * easeOut
			contentWrapper.scrollTop = currentScroll

			if (progress < 1) {
				keyboardAnimation = requestAnimationFrame(animate)
			} else {
				keyboardAnimation = null
			}
		}
		keyboardAnimation = requestAnimationFrame(animate)
	}

	// Additional event listeners
	contentWrapper.addEventListener('scroll', function () {
		const maxScroll = contentWrapper.scrollHeight - contentWrapper.clientHeight
		if (contentWrapper.scrollTop > maxScroll) {
			contentWrapper.scrollTop = maxScroll
		}
	})

	contentWrapper.addEventListener(
		'wheel',
		function (e) {
			const currentScrollTop = contentWrapper.scrollTop
			const maxScroll = contentWrapper.scrollHeight - contentWrapper.clientHeight

			if (e.deltaY < 0 && currentScrollTop <= 0) {
				e.preventDefault()
				e.stopPropagation()
				return
			}
			if (e.deltaY > 0 && currentScrollTop >= maxScroll) {
				e.preventDefault()
				e.stopPropagation()
				return
			}
		},
		{ passive: false }
	)

	contentWrapper.addEventListener('touchmove', function () {}, { passive: true })

	document.addEventListener(
		'touchmove',
		function (e) {
			const t = e.target
			if (t && t.closest && t.closest('.body-content')) {
				e.preventDefault()
			}
		},
		{ passive: false }
	)
}
