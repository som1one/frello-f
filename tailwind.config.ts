import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				mainpurple: '#633CFF',
				mainpeach: '#C99BA7',
				text: 'var(--text)',
				bg: 'var(--bg)',
				bgSecondary: 'var(--bg-secondary)',
				tabBg: 'var(--tab-bg)',
				tabBgHover: 'var(--tab-bg-hover)',
				bgTertiary: 'var(--bg-tertiary)'
			}
		}
	},
	plugins: []
}
export default config
