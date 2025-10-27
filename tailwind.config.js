/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				xs: '400px',
				s: '550px'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			fontSize: {
				'2xs': '0.625rem', // 10px
				'3xs': '0.5rem', // 8px
				xs: '0.75rem', // 12px
				sm: '0.875rem', // 14px
				base: '1rem', // 16px
				lg: '1.125rem', // 18px
				xl: '1.25rem', // 20px
				'2xl': '1.5rem', // 24px
				'3xl': '1.875rem', // 30px
				'4xl': '2.25rem', // 36px
				'5xl': '3rem', // 48px
				'6xl': '3.75rem', // 60px
				'7xl': '4.5rem', // 72px
				'8xl': '6rem', // 96px
				'9xl': '8rem' // 128px
			},
			colors: {
				dark: 'var(--primary-dark)',
				light: 'var(--primary-light)',
				green: 'var(--primaty-green)'
			}
		}
	},
	plugins: []
}
