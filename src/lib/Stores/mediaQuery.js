import { readable } from 'svelte/store'

const breakpoints = {
	s: '550px',
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px'
}

function createMediaQueryStore() {
	if (typeof window === 'undefined') {
		return readable({})
	}

	const mediaQueries = Object.entries(breakpoints).reduce((acc, [key, value]) => {
		acc[key] = window.matchMedia(`(min-width: ${value})`)
		return acc
	}, {})

	return readable(
		Object.entries(mediaQueries).reduce((acc, [key, mql]) => {
			acc[key] = mql.matches
			return acc
		}, {}),

		(set) => {
			const handlers = Object.entries(mediaQueries).reduce((acc, [key, mql]) => {
				const handler = (e) => {
					set(
						Object.entries(mediaQueries).reduce((acc, [k, mql]) => {
							acc[k] = mql.matches
							return acc
						}, {})
					)
				}
				mql.addListener(handler)
				acc.push(() => mql.removeListener(handler))
				return acc
			}, [])

			return () => {
				handlers.forEach((unsubscribe) => unsubscribe())
			}
		}
	)
}

export const mediaQuery = createMediaQueryStore()
