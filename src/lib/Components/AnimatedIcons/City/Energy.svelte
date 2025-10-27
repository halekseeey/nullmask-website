<script>
	import { gsap } from 'gsap'
	import { onMount } from 'svelte'

	export let x
	export let y

	let circleRef
	let filterRef
	let blurRef

	const TRANSITION_DURATION = 0.5

	function toFirstState() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 16.0182,
					cy: 43.2047,
					r: 42.9664
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: -44.1603,
					y: -26.9738,
					width: 140.357,
					height: 140.358
				}
			})
		}
		if (blurRef) {
			gsap.to(blurRef, {
				duration: TRANSITION_DURATION,
				attr: {
					stdDeviation: 13.606
				}
			})
		}
	}

	function toSecond() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 168.295,
					cy: 5.16547,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 96.8291,
					y: -66.3008,
					width: 142.933,
					height: 142.932
				}
			})
		}
		if (blurRef) {
			gsap.to(blurRef, {
				duration: TRANSITION_DURATION,
				attr: {
					stdDeviation: 14.25
				}
			})
		}
	}

	function toThird() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 56.9847,
					cy: 161.802,
					rx: 42.9661,
					ry: 4.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: -44.4814,
					y: 50.3359,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toFourth() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 136.786,
					cy: 195.464,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 65.3203,
					y: 123.998,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toFifth() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 253.273,
					cy: 192.747,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 181.807,
					y: 121.281,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toSixth() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 412.725,
					cy: 190.033,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 341.259,
					y: 118.566,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toSeventh() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 446.143,
					cy: 88.0034,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 374.677,
					y: 16.5371,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toEighth() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 508.205,
					cy: 35.6537,
					rx: 42.9661,
					ry: 42.9662
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 436.739,
					y: -35.8125,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function toDisappear() {
		if (circleRef) {
			gsap.to(circleRef, {
				duration: TRANSITION_DURATION,
				attr: {
					cx: 508.205,
					cy: -40,
					rx: 42.9661,
					ry: 42.9662
				},
				onComplete: () => {
					// Reset to initial state and start sequence again
					gsap.set(circleRef, {
						attr: {
							cx: -73.9818,
							cy: 43.2047,
							r: 42.9664
						}
					})
					gsap.set(filterRef, {
						attr: {
							x: -144.1603,
							y: -26.9738,
							width: 140.357,
							height: 140.358
						}
					})
					gsap.set(blurRef, {
						attr: {
							stdDeviation: 13.606
						}
					})
					startSequence()
				}
			})
		}
		if (filterRef) {
			gsap.to(filterRef, {
				duration: TRANSITION_DURATION,
				attr: {
					x: 436.739,
					y: -100.56,
					width: 142.933,
					height: 142.932
				}
			})
		}
	}

	function startSequence() {
		// First transition to standard initial state
		gsap.delayedCall(TRANSITION_DURATION, () => {
			toFirstState()
		})
		// Start with second state after delay
		gsap.delayedCall(TRANSITION_DURATION * 2, () => {
			toSecond()
		})
		// Then transition to third state
		gsap.delayedCall(TRANSITION_DURATION * 3, () => {
			toThird()
		})
		// Then transition to fourth state
		gsap.delayedCall(TRANSITION_DURATION * 4, () => {
			toFourth()
		})
		// Then transition to fifth state
		gsap.delayedCall(TRANSITION_DURATION * 5, () => {
			toFifth()
		})
		// Then transition to sixth state
		gsap.delayedCall(TRANSITION_DURATION * 6, () => {
			toSixth()
		})
		// Then transition to seventh state
		gsap.delayedCall(TRANSITION_DURATION * 7, () => {
			toSeventh()
		})
		// Then transition to eighth state
		gsap.delayedCall(TRANSITION_DURATION * 8, () => {
			toEighth()
		})
		// Then transition to disappear state
		gsap.delayedCall(TRANSITION_DURATION * 9, () => {
			toDisappear()
		})
	}

	onMount(() => {
		// Set initial state (circle on left)
		gsap.set(circleRef, {
			attr: {
				cx: -73.9818,
				cy: 43.2047,
				r: 42.9664
			}
		})
		gsap.set(filterRef, {
			attr: {
				x: -144.1603,
				y: -26.9738,
				width: 140.357,
				height: 140.358
			}
		})
		gsap.set(blurRef, {
			attr: {
				stdDeviation: 13.606
			}
		})
		startSequence()
	})
</script>

<svg
	{x}
	{y}
	width="554"
	height="252"
	viewBox="0 0 554 252"
	fill="none"
	class=""
	xmlns="http://www.w3.org/2000/svg"
	style="pointer-events: none;"
>
	<path
		d="M155.704 10.4973C161.76 7.00086 169.221 7.00093 175.278 10.4973L183.784 15.4084C194.287 21.4723 194.287 36.6312 183.784 42.6951L13.8449 140.81C12.8902 141.361 12.8903 142.739 13.8449 143.29L132.241 211.647C137.116 214.461 143.121 214.461 147.996 211.647L150.434 210.239C153.934 208.217 153.934 203.165 150.434 201.144L125.164 186.554C115.473 180.959 115.473 166.97 125.164 161.375C131.751 157.572 139.867 157.572 146.454 161.375L253.502 223.179C258.672 226.164 265.041 226.164 270.211 223.179L280.237 217.391C281.191 216.839 281.191 215.461 280.237 214.909L259.231 202.782C255.538 200.65 253.263 196.71 253.263 192.446V170.363C253.263 167.463 255.614 165.112 258.515 165.112C261.415 165.112 263.766 167.463 263.766 170.363V192.446C263.766 192.958 264.039 193.431 264.482 193.686L285.488 205.814C292.665 209.958 293.367 219.705 287.597 224.948L309.9 237.825C316.547 241.662 324.736 241.662 331.383 237.825L490.187 146.139C494.325 143.75 494.325 137.779 490.187 135.39L441.122 107.062C430.619 100.998 430.619 85.8379 441.122 79.7741L447.806 75.9157C450.67 74.262 450.67 70.1278 447.806 68.474L431.096 58.8261C423.14 54.2322 423.14 42.7479 431.096 38.1541L432.529 37.3271C436.812 34.8541 442.09 34.8541 446.373 37.3271L525.953 83.2726C530.327 85.7983 535.717 85.7983 540.092 83.2726C543.978 81.029 543.978 75.4198 540.092 73.1762L501.346 50.8063C497.653 48.6744 495.378 44.7341 495.378 40.4703V29.0518C495.378 26.1515 497.729 23.8003 500.63 23.8003C503.53 23.8005 505.881 26.1516 505.881 29.0518V40.4703C505.881 40.9818 506.154 41.4547 506.597 41.7104L545.343 64.0804C556.231 70.3665 556.231 86.0823 545.343 92.3684C537.719 96.7703 528.325 96.7703 520.701 92.3684L441.122 46.4229C440.088 45.8261 438.814 45.8261 437.78 46.4229L436.348 47.25C435.393 47.8013 435.393 49.1799 436.348 49.7312L453.057 59.3781C462.923 65.0745 462.923 79.3152 453.057 85.0116L446.373 88.87C442.872 90.8912 442.872 95.9445 446.373 97.9658L495.439 126.294C506.578 132.725 506.578 148.803 495.439 155.235L336.635 246.921C326.738 252.634 314.545 252.634 304.649 246.921L277.371 231.171L275.463 232.274C267.043 237.135 256.67 237.135 248.25 232.274L141.203 170.471C137.865 168.544 133.753 168.544 130.416 170.471C127.726 172.023 127.726 175.905 130.416 177.458L155.685 192.048C166.188 198.112 166.188 213.271 155.685 219.335L153.247 220.743C145.123 225.433 135.114 225.433 126.99 220.743L8.59347 152.386C0.636812 147.792 0.63681 136.308 8.59347 131.714L178.533 33.5992C182.034 31.5779 182.034 26.5256 178.533 24.5043L170.026 19.5932C167.22 17.9729 163.762 17.9729 160.955 19.5932L51.5422 82.7625C47.8668 84.8845 43.3408 84.8951 39.6555 82.7905L16.7578 69.715C13.0377 67.5905 10.7418 63.6342 10.7418 59.3501V29.0518C10.7418 26.1515 13.0929 23.8003 15.9932 23.8003C18.8935 23.8003 21.2447 26.1515 21.2447 29.0518V59.3501C21.2447 59.8641 21.5201 60.339 21.9664 60.594L44.8641 73.6704C45.3063 73.9229 45.8497 73.9222 46.2907 73.6676L155.704 10.4973Z"
		fill="#202221"
		style="pointer-events: none;"
	/>
	<mask
		id="mask0_3148_12386"
		style="mask-type:alpha"
		maskUnits="userSpaceOnUse"
		x="0"
		y="0"
		width="552"
		height="244"
	>
		<path
			d="M153.316 2.8606C159.372 -0.635856 166.834 -0.635793 172.89 2.8606L181.396 7.77171C191.899 13.8356 191.899 28.9945 181.396 35.0584L11.4572 133.173C10.5025 133.725 10.5026 135.102 11.4572 135.654L129.854 204.01C134.728 206.824 140.733 206.824 145.608 204.01L148.046 202.602C151.546 200.581 151.546 195.529 148.046 193.507L122.776 178.917C113.085 173.322 113.085 159.333 122.776 153.738C129.364 149.935 137.479 149.935 144.067 153.738L251.114 215.542C256.284 218.527 262.654 218.527 267.823 215.542L277.849 209.754C278.804 209.203 278.804 207.824 277.849 207.273L256.843 195.145C253.15 193.013 250.876 189.073 250.876 184.809V162.727C250.876 159.826 253.227 157.475 256.127 157.475C259.027 157.475 261.378 159.826 261.378 162.727V184.809C261.379 185.321 261.651 185.794 262.095 186.05L283.1 198.178C290.277 202.321 290.979 212.069 285.209 217.311L307.512 230.188C314.159 234.026 322.349 234.025 328.996 230.188L487.8 138.502C491.937 136.113 491.937 130.142 487.8 127.753L438.734 99.425C428.231 93.3611 428.231 78.2012 438.734 72.1374L445.418 68.279C448.282 66.6252 448.282 62.4911 445.418 60.8373L428.709 51.1894C420.752 46.5955 420.752 35.1112 428.709 30.5174L430.141 29.6904C434.424 27.2174 439.702 27.2173 443.986 29.6904L523.565 75.6359C527.94 78.1616 533.329 78.1616 537.704 75.6359C541.59 73.3923 541.59 67.7831 537.704 65.5395L498.958 43.1696C495.265 41.0376 492.991 37.0974 492.99 32.8336V21.415C492.99 18.5147 495.342 16.1636 498.242 16.1636C501.142 16.1637 503.493 18.5148 503.493 21.415V32.8336C503.493 33.3451 503.766 33.8179 504.209 34.0737L542.956 56.4436C553.844 62.7298 553.844 78.4456 542.956 84.7317C535.331 89.1336 525.938 89.1336 518.313 84.7317L438.734 38.7862C437.7 38.1893 436.426 38.1893 435.392 38.7862L433.96 39.6133C433.005 40.1645 433.005 41.5432 433.96 42.0945L450.669 51.7414C460.536 57.4378 460.536 71.6785 450.669 77.3748L443.986 81.2332C440.485 83.2545 440.485 88.3078 443.986 90.3291L493.051 118.657C504.19 125.089 504.19 141.167 493.051 147.598L334.247 239.284C324.351 244.997 312.157 244.998 302.261 239.284L274.984 223.534L273.075 224.637C264.655 229.498 254.282 229.498 245.863 224.637L138.815 162.834C135.477 160.907 131.365 160.907 128.028 162.834C125.338 164.387 125.338 168.269 128.028 169.822L153.298 184.411C163.8 190.475 163.8 205.634 153.298 211.698L150.859 213.106C142.735 217.796 132.726 217.796 124.602 213.106L6.20578 144.749C-1.75088 140.156 -1.75088 128.671 6.20578 124.077L176.145 25.9625C179.646 23.9412 179.646 18.8889 176.145 16.8676L167.638 11.9565C164.832 10.3362 161.374 10.3362 158.568 11.9565L49.1545 75.1258C45.4791 77.2478 40.9531 77.2584 37.2678 75.1538L14.3701 62.0783C10.65 59.9538 8.3541 55.9975 8.3541 51.7134V21.415C8.3541 18.5147 10.7053 16.1636 13.6055 16.1636C16.5058 16.1636 18.857 18.5147 18.857 21.415V51.7134C18.857 52.2274 19.1324 52.7023 19.5787 52.9573L42.4764 66.0337C42.9186 66.2862 43.462 66.2855 43.903 66.0309L153.316 2.8606Z"
			fill="#D9D9D9"
			stroke="#202221"
			stroke-width="0.477404"
			stroke-linecap="round"
			style="pointer-events: none;"
		/>
	</mask>
	<g mask="url(#mask0_3148_12386)" style="pointer-events: none;">
		<rect
			x="-14.084"
			y="-18.8574"
			width="607.258"
			height="347.55"
			fill="#D9D9D9"
			style="pointer-events: none;"
		/>
		<g filter="url(#filter0_f_3148_12386)" style="pointer-events: none;">
			<circle
				bind:this={circleRef}
				cx="26.0182"
				cy="43.2047"
				r="42.9664"
				fill="#CDEF33"
				style="pointer-events: none;"
			/>
		</g>
	</g>
	<defs>
		<filter
			bind:this={filterRef}
			id="filter0_f_3148_12386"
			x="-44.1603"
			y="-26.9738"
			width="140.357"
			height="140.358"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
			<feGaussianBlur
				bind:this={blurRef}
				stdDeviation="13.606"
				result="effect1_foregroundBlur_3148_12386"
			/>
		</filter>
	</defs>
</svg>
