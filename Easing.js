export class Easing {
	constructor() {

	}

	static get IN_BACK() {
		return (x) => {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			return c3 * x * x * x - c1 * x * x;
		}
	}

	static get OUT_BACK() {
		return (x) => {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
		}
	}

	static get OUT_QART() {
		return (x) => Math.pow(1 - x, 4);
	}

	static get OUT_CUBIC() {
		return (x) => 1 - Math.pow(1 - x, 3);
	}

	static get IN_OUT_CUBIC() {
		return (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	}


	static get IN_OUT_SINE() {
		return (x) => -(Math.cos(Math.PI * x) - 1) / 2;
	}


	static get OUT_SINE() {
		return (x) => Math.sin((x * Math.PI) / 2);
	}


	static get OUT_QUINT() {
		return (x) => 1 - Math.pow(1 - x, 5);
	}


	static get IN_CIRC() {
		return (x) => 1 - Math.sqrt(1 - Math.pow(x, 2));
	}


	static get OUT_CIRC() {
		return (x) => Math.sqrt(1 - Math.pow(x - 1, 2));
	}


	static get IN_OUT_CIRC() {
		return (x) => x < 0.5
			? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
			: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
	}


	static get OUT_EXPO() {
		return (x) => x === 1 ? 1 : -Math.pow( 2, -10 * x) + 1;
	}


	static get LINEAR() {
		return (x) => x;
	}
}