const draw = () => {
	const canvas = document.getElementById("canvas")

	if (canvas) {
		const ctx = canvas.getContext("2d")

		if (ctx === null) {
			throw new Error("Couldn't find context for some reason!")
		}

		ctx.beginPath()
		ctx.moveTo(25, 60)
		ctx.lineTo(100, 75)
		ctx.lineTo(100, 25)
		ctx.fill()
	} else {
		console.warn("Canvas not supported")
	}
}

window.addEventListener("load", draw)