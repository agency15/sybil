/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Add custom colors if needed
				"sibyl-blue": "#3b82f6",
				"sibyl-purple": "#9333ea",
			},
		},
	},
	plugins: [],
}
