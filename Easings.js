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

	static get LINEAR() {
		return (x) => x;
	}
}