import { createRoot } from 'react-dom/client';
import '@fontsource-variable/instrument-sans/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/geist-pixel/latin-400.css';
import './index.css';
import App from './App';
import { greet } from './lib/greeting';

createRoot(document.getElementById('root')!).render(<App />);
greet();
