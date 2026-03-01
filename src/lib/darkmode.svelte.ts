const KEY = 'darkmode';

let dark = $state(false);

export function initDarkMode() {
	const saved = localStorage.getItem(KEY);
	dark =
		saved !== null
			? saved === 'true'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.documentElement.classList.toggle('dark', dark);
}

export function toggleDarkMode() {
	dark = !dark;
	localStorage.setItem(KEY, String(dark));
	document.documentElement.classList.toggle('dark', dark);
}

export function isDark() {
	return { get value() { return dark; } };
}
