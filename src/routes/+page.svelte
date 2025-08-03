<script lang="ts">
	import { onMount } from 'svelte'
	import { Canvas, Layer, type Render } from 'svelte-canvas'
	import { rainbow } from '$lib/rainbow'

	const CANVAS_SIZE = 700
	let activeRaf, idleRaf
	let activeSpinning = false
	let activeSlowing = false
	let activeStopped = false
	let baseActiveSpeed = 360
	let rotationSpeed = baseActiveSpeed

	const render: Render = ({ context }) => {
		const pieSlice = {
			x: 0,
			y: 0,
			outerRadius: CANVAS_SIZE / 2 - 10,
			innerRadius: CANVAS_SIZE / 10,
			draw(index: number, numSlices: number) {
				const slice = new Path2D()
				slice.arc(
					this.x,
					this.y,
					this.outerRadius,
					Math.PI * ((index * 2) / numSlices),
					Math.PI * (((index + 1) * 2) / numSlices)
				)
				slice.arc(
					this.x,
					this.y,
					this.innerRadius,
					Math.PI * (((index + 1) * 2) / numSlices),
					Math.PI * ((index * 2) / numSlices),
					true
				)

				context.fillStyle = rainbow(numSlices, index)
				context.fill(slice)
			}
		}

		const numSlices = 7

		context.rotate(Math.PI / 2 / baseActiveSpeed)

		for (let i = 0; i < numSlices; i++) {
			pieSlice.draw(i, numSlices)
		}
	}
</script>

<Canvas autoclear style={'border: 1px solid black'} width={CANVAS_SIZE} height={CANVAS_SIZE}>
	<Layer {render} />
</Canvas>
