const draw = () => {
	const canvas = document.getElementById("canvas")

	if (canvas) {
		const context = canvas.getContext("2d")

		if (context === null) {
			throw new Error("Couldn't find context for some reason!")
		}

		context.fillRect(25, 25, 100, 100)
		context.clearRect(45, 45, 60, 60)
		context.strokeRect(50, 50, 50, 50)
	} else {
		console.warn("Canvas not supported")
	}
}

window.addEventListener("load", draw)