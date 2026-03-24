import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js',
                'resources/css/features/analyse.css',
                'resources/js/features/dashboard/analyse-ia.js'
            ],
            refresh: true,
        }),
    ],
});
