export class Easings {
	constructor() {

	}

	static get EASE_OUT_BACK() {
		return (x) => {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
		}
	}

	static get EASE_OUT_QART() {
		return (x) => Math.pow(1 - x, 4);
	}

	static get EASE_OUT_CUBIC() {
		return (x) => 1 - Math.pow(1 - x, 3);
	}

	static get EASE_IN_OUT_CUBIC() {
		return (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	}

	static get LINEAR() {
		return (x) => x;
	}
}