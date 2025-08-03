const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_SIZE = 700
let activeRaf, idleRaf
let activeSpinning = false
let activeSlowing = false
let activeStopped = false
let baseActiveSpeed = 360
let rotationSpeed = baseActiveSpeed

const pieSlice = {
	x: 0,
	y: 0,
	outerRadius: (CANVAS_SIZE / 2) - 10,
	innerRadius: CANVAS_SIZE / 10,
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
	ctx.clearRect(-(CANVAS_SIZE / 2), -(CANVAS_SIZE / 2), CANVAS_SIZE, CANVAS_SIZE)

	const numSlices = 7

	ctx.rotate(
		Math.PI / 2 / baseActiveSpeed
	)

	for (let i = 0; i < numSlices; i++) {
		pieSlice.draw(i, numSlices)
	}

	idleRaf = window.requestAnimationFrame(idleDraw)
}

const activeDraw = () => {
	ctx.clearRect(-(CANVAS_SIZE / 2), -(CANVAS_SIZE / 2), CANVAS_SIZE, CANVAS_SIZE)

	const numSlices = 7

	if (!activeStopped) {
		ctx.rotate(
			Math.PI / 2 / rotationSpeed
		)
	}

	for (let i = 0; i < numSlices; i++) {
		pieSlice.draw(i, numSlices)
	}

	if (!activeSlowing && rotationSpeed > 1) {
		// speed up until we hit top speed
		rotationSpeed = rotationSpeed * 0.9
	} else if (activeSlowing && rotationSpeed < 720) {
		// slow down until we come to a full stop
		rotationSpeed = Math.min(rotationSpeed * 1.05, 720)
	} else if (activeSlowing && rotationSpeed === 720) {
		activeStopped = true
	} else {
		// start braking once we've hit top speed
		activeSlowing = true
		rotationSpeed = rotationSpeed * 1.05
	}

	activeRaf = window.requestAnimationFrame(activeDraw)
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

canvas.addEventListener("click", () => {
	if (!activeSpinning) {
		window.cancelAnimationFrame(idleRaf)
		activeRaf = window.requestAnimationFrame(activeDraw)
		activeSpinning = true
	} else {
		window.cancelAnimationFrame(activeRaf)
		idleRaf = window.requestAnimationFrame(idleDraw)
		activeSpinning = false
		activeSlowing = false
		activeStopped = false
		rotationSpeed = baseActiveSpeed
	}
})

ctx.translate(350, 350)
window.addEventListener("load", idleDraw)