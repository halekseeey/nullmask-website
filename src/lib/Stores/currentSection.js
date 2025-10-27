import { writable } from 'svelte/store'

export const currentSection = writable({
	index: 0,
	id: 'hero',
	theme: 'light' // light or dark
})
