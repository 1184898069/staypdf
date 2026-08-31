import './styles.css';
import { createLimiter } from './lib/limit.js';
import { createApp } from './app.js';

const limiter = createLimiter(localStorage);
createApp(document.getElementById('app'), limiter);
