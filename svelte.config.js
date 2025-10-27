import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$Modals: 'src/lib/Components/Modals',
			$Layouts: 'src/lib/Components/Layouts',
			$Stores: 'src/lib/Stores',
			$UI: 'src/lib/Components/UI',
			$Components: 'src/lib/Components',
			$Common: 'src/lib/Components/Common',
			$Icons: 'src/lib/Icons',
			$utils: 'src/lib/utils'
		}
	},
	preprocess: vitePreprocess()
}

export default config
