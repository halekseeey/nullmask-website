import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function capitalizeWords(phrase) {
	return phrase
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
