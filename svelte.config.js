import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consultez https://svelte.dev
	// pour en savoir plus sur les préprocesseurs
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto ne supporte que certains environnements, voir 
		// https://svelte.dev pour une liste.
		// Si votre environnement n'est pas supporté, ou si vous avez choisi 
		// un environnement spécifique, changez d'adaptateur.
		// Voir https://svelte.dev/docs/kit/adapters pour plus d'infos.
		adapter: adapter()
	}
};

export default config;
