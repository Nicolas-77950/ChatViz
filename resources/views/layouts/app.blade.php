<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'ChatViz') }}</title>

        <!-- Polices -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased bg-slate-950 text-white min-h-screen">
        <div class="relative min-h-screen">
            <!-- Éléments décoratifs en arrière-plan -->
            <div class="absolute -top-24 -left-24 size-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            @include('layouts.navigation')

            <!-- En-tête de la page -->
            @isset($header)
                <header class="bg-slate-900/50 border-b border-white/5 backdrop-blur-xl">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {{ $header }}
                    </div>
                </header>
            @endisset

            <!-- Contenu de la page -->
            <main class="relative z-10">
                {{ $slot }}
            </main>
        </div>
    </body>
</html>
