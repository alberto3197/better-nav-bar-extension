import { createRoot } from 'react-dom/client';
import './style.css';
import { BetterNavBar } from '@src/components/BetterNavBar';
const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';

document.head.appendChild(font);

const style = document.createElement('style');

style.textContent = `
#route-bar-extension {
  font-family: 'Inter', system-ui, sans-serif;
}
`;

document.head.appendChild(style);

document.body.style.marginTop = '40px';

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(<BetterNavBar />);

try {
	console.log('content script loaded');
} catch (e) {
	console.error(e);
}
