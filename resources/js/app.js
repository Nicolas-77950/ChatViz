import './bootstrap';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

import './features/dashboard/index.js';
import.meta.glob([ '../images/**', '../fonts/**', './feature/dashboard/parser.js' ]);