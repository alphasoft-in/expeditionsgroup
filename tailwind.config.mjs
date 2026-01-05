/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#01269a',
                secondary: '#daa521',
                tertiary: '#D12E2E', // Added generic red as requested
                accent: '#47291f',
                light: '#eef0f2',
            },
        },
    },
    plugins: [],
}
