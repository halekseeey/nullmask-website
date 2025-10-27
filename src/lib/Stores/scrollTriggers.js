import { tick } from 'svelte'
import { writable } from 'svelte/store'

const createScrollTriggersStore = () => {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		addTrigger: (trigger) => {
			let triggerIndex
			update((triggers) => {
				triggerIndex = triggers.length
				return [...triggers, trigger]
			})
			return triggerIndex
		},
		refreshAll: () => {
			update((triggers) => {
				triggers.forEach((trigger) => {
					if (trigger?.scrollTrigger) {
						trigger.scrollTrigger.refresh()
					}
				})
				return triggers
			})
		},
		removeTrigger: (index) => {
			update((triggers) => {
				if (triggers[index]?.scrollTrigger) {
					triggers[index].scrollTrigger.kill()
				}
				return triggers.filter((_, i) => i !== index)
			})
		},
		clear: () => set([])
	}
}

export const scrollTriggers = createScrollTriggersStore()
