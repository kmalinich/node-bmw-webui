const { cubicBezier, Gauge } = require('gauge-chart-js');
const gradstop = require('gradstop');


function updatePercentNode(value) {
	const element = document.querySelector('.label');
	element.innerHTML = parseInt(value.toString()) + '%';
}


document.addEventListener('DOMContentLoaded', () => {
	// const step      = 70;
	const fromAngle = 220;
	const toAngle   = 500;

	const maxValue = toAngle - fromAngle;

	const value = maxValue * 0.2;

	updatePercentNode((value / maxValue) * 100);
	const container = document.querySelector('#engine-throttle-pedal-container');
	const sharedConfig = {
		lineWidth : 4,
		container,
		fromAngle,
		toAngle,
		easing    : cubicBezier(0.165, 0.84, 0.44, 1),
	};

	const gaugeBackground = new Gauge({
		...sharedConfig,
		color : '#f5f5f5',
	});
	gaugeBackground.setValue(maxValue);

	const gaugeMain = new Gauge({
		...sharedConfig,
		colors : gradstop({
			stops      : maxValue,
			colorArray : [ '#D16BA5', '#86A8E7', '#5FFBF1' ],
		}),
	});

	gaugeMain.setValue(value);
});
