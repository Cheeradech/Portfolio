/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                "primary": "#0d7ff2",
                "primary-dark": "#001233",
                "background-light": "#f5f7f8",
                "background-dark": "#000000",
                "glass": "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(13, 127, 242, 0.2)",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            },
            backgroundImage: {
                'hero-glow': 'radial-gradient(circle at center, #001233 0%, #000000 70%)',
                'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                'text-silver': 'linear-gradient(90deg, #E0E0E0 0%, #FFFFFF 50%, #E0E0E0 100%)',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(13, 127, 242, 0.5), 0 0 20px rgba(13, 127, 242, 0.3)',
                'glass-glow': 'inset 0 0 20px rgba(13, 127, 242, 0.05)',
                'skill-ring': '0 0 15px rgba(13, 127, 242, 0.3), inset 0 0 10px rgba(13, 127, 242, 0.1)',
            }
        },
    },
    plugins: [],
}
