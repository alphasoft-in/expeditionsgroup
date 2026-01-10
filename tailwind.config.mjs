/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#0e2a98',
                secondary: '#d7a51e',
                tertiary: '#ff0001', // Added generic red as requested
                accent: '#47291f',
                light: '#eef0f2',
            },
        },
    },
    plugins: [],
}
