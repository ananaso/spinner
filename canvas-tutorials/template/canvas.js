const draw = () => {
	const canvas = document.getElementById("canvas")

	if (canvas) {
		const context = canvas.getContext("2d")
	} else {
		console.warn("Canvas not supported")
	}
}

window.addEventListener("load", draw)