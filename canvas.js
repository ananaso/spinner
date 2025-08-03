const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let raf, idleRaf
let activeSpinning = false

const pieSlice = {
	x: 0,
	y: 0,
	outerRadius: 50,
	innerRadius: 10,
	draw(index, numSlices) {
		const slice = new Path2D()
		slice.arc(
			this.x,
			this.y,
			this.outerRadius,
			Math.PI * ((index * 2) / numSlices),
			Math.PI * (((index + 1) * 2) / numSlices),
		)
		slice.arc(
			this.x,
			this.y,
			this.innerRadius,
			Math.PI * (((index + 1) * 2) / numSlices),
			Math.PI * ((index * 2) / numSlices),
			true,
		)

		ctx.fillStyle = rainbow(numSlices, index)
		ctx.fill(slice)
	}
}

const idleDraw = () => {
	ctx.clearRect(-250, -250, 500, 500)

	const numSlices = 7

	ctx.rotate(
		Math.PI / 2 / 360
	)

	for (let i = 0; i < numSlices; i++) {
		pieSlice.draw(i, numSlices)
	}

	idleRaf = window.requestAnimationFrame(idleDraw)
}

const activeDraw = () => {
	ctx.clearRect(-250, -250, 500, 500)

	const numSlices = 7

	ctx.rotate(
		Math.PI / 2 / 60
	)

	for (let i = 0; i < numSlices; i++) {
		pieSlice.draw(i, numSlices)
	}

	raf = window.requestAnimationFrame(activeDraw)
}

/**
 * @param numOfSteps: Total number steps to get color, means total colors
 * @param step: The step number, means the order of the color
 */
function rainbow(numOfSteps, step) {
	// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
	// Adam Cole, 2011-Sept-14
	// HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	var r, g, b
	// The "golden angle" is approx. 0.61803398875
	const GOLDEN_RATIO_CONJUGATE = 0.61803398875
	var h = (step * GOLDEN_RATIO_CONJUGATE) % 1
	// var h = step / numOfSteps;
	var i = ~~(h * 6)
	var f = h * 6 - i
	var q = 1 - f
	switch (i % 6) {
		case 0: r = 1; g = f; b = 0; break
		case 1: r = q; g = 1; b = 0; break
		case 2: r = 0; g = 1; b = f; break
		case 3: r = 0; g = q; b = 1; break
		case 4: r = f; g = 0; b = 1; break
		case 5: r = 1; g = 0; b = q; break
	}
	var c = `rgb(${~~(r * 255)} ${~~(g * 255)} ${~~(b * 255)})`
	return (c)
}

canvas.addEventListener("click", (e) => {
	if (!activeSpinning) {
		window.cancelAnimationFrame(idleRaf)
		raf = window.requestAnimationFrame(activeDraw)
		activeSpinning = true
		console.log("Active Spinning!")
	} else {
		window.cancelAnimationFrame(raf)
		idleRaf = window.requestAnimationFrame(idleDraw)
		activeSpinning = false
		console.log("Cancelling spinning!")
	}
})

ctx.translate(250, 250)
window.addEventListener("load", idleDraw)