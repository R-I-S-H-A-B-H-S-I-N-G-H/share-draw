export function loadScript(src, currentFrame = document) {
	return new Promise((resolve, reject) => {
		const scriptTag = currentFrame.createElement("script");
		scriptTag.src = src;
		scriptTag.onload = resolve;
		scriptTag.onerror = reject;
		currentFrame.body.appendChild(scriptTag);
	});
}
