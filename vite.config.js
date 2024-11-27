import { resolve } from 'path'
import { defineConfig } from "vite"
import { articles } from './data'

export default defineConfig({
	plugins: [

	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				article: resolve(__dirname, 'article.html'),
				about: resolve(__dirname, 'about.html'),
			},
		},
	}
})

