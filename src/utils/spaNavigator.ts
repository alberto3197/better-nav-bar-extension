type Callback = (url: string) => void;

export function createUniversalRouterObserver(callback: Callback) {
	let lastUrl = location.href;

	const notify = () => {
		if (location.href !== lastUrl) {
			lastUrl = location.href;
			callback(location.href);
		}
	};

	/* --------------------------------
	Interceptar History API (PRIORIDAD ALTA)
	-------------------------------- */
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;

	history.pushState = function (...args) {
		originalPushState.apply(this, args as any);
		notify();
	};

	history.replaceState = function (...args) {
		originalReplaceState.apply(this, args as any);
		notify();
	};

	/* --------------------------------
	Eventos nativos del navegador
	-------------------------------- */
	window.addEventListener('popstate', notify);
	window.addEventListener('hashchange', notify);

	/* --------------------------------
	MutationObserver (para routers que no disparan eventos)
	-------------------------------- */
	const observer = new MutationObserver(() => notify());
	observer.observe(document.documentElement, {
		subtree: true,
		childList: true,
	});

	/* --------------------------------
	Polling de seguridad (última línea de defensa)
	-------------------------------- */
	setInterval(notify, 400);

	/* --------------------------------
	Interceptar replaceState también
	-------------------------------- */
	history.replaceState = function (...args) {
		originalReplaceState.apply(this, args as any);
		notify();
	};
}
