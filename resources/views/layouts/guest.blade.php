<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'ChatViz') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased bg-slate-950 text-white overflow-hidden">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative">
            
            <!-- Background Decorative Elements -->
            <div class="absolute -top-24 -left-24 size-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-96 bg-pink-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div class="z-10">
                <a href="/">
                    <x-application-logo class="w-auto h-12" />
                </a>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-8 py-8 glass overflow-hidden sm:rounded-3xl z-10">
                {{ $slot }}
            </div>

            <div class="mt-8 text-slate-500 text-sm z-10">
                &copy; {{ date('Y') }} ChatViz — Sécurisé & RGPD Ready
            </div>
        </div>
    </body>
</html>
