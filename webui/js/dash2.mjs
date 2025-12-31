import JustGage from './justgage.esm.js';


const gauge = new JustGage({
	id    : 'engine-throttle-pedal-container',
	title : 'Throttle',
	label : '%',
	value : 50,
	min   : 0,
	max   : 100,
});
