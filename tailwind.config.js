import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'indeterminate': {
                    '0%': { transform: 'translateX(-100%)', width: '40%' },
                    '50%': { transform: 'translateX(50%)', width: '60%' },
                    '100%': { transform: 'translateX(200%)', width: '40%' },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                'indeterminate': 'indeterminate 1.5s ease-in-out infinite',
            },
        },
    },

    plugins: [forms],
};
