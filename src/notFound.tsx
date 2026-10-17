import { createRoot } from 'react-dom/client';
import '@fontsource-variable/instrument-sans/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/geist-pixel/latin-400.css';
import './index.css';
import { NotFound } from './components/NotFound';

createRoot(document.getElementById('root')!).render(<NotFound />);
