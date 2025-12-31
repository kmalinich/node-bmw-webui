/* eslint no-console     : 0 */
/* eslint no-unused-vars : 0 */


const gauges = {};

const gaugeSizes = {
	small  : 254,
	medium : 254,
	large  : 372,
	xl     : 385,

	landscape2 : 490,
	landscape4 : 254,
};


function gauge_redraw(gauge_id_dot, value) {
	const gauge_id_dash = gauge_id_dot.replace(/status\./g, '').replace(/\./g, '-');

	if (typeof gauges[gauge_id_dash] === 'undefined') return false;

	if (typeof gauges[gauge_id_dash].redraw !== 'function') return false;

	gauges[gauge_id_dash].redraw(value);

	return true;
}

// For gauges where a high value is undesirable
function gauge_create(name, label, min = 0, max = 100, minorTicks = 10, size = gaugeSizes.small) {
	const config = {
		size,
		label,
		min,
		max,
		minorTicks,
	};

	const range = config.max - config.min;

	config.yellowZones = [ {
		from : config.min + range * 0.8,
		to   : config.min + range * 0.9,
	} ];

	config.redZones = [ {
		from : config.min + range * 0.9,
		to   : config.max,
	} ];

	console.log('[dash][gauge_create] ' + name);

	gauges[name] = new Gauge(name, config);
	gauges[name].render();
}

// For gauges where both low and high values are undesirable
function gauge_create_lowHigh(name, label, min = 0.75, max = 1.25, minorTicks = 5, size = gaugeSizes.landscape2) {
	const config = {
		size,
		label,
		min,
		max,
		minorTicks,
	};

	const range = config.max - config.min;

	config.yellowZones = [
		{
			from : config.min + range * 0.1,
			to   : config.min + range * 0.2,
		},
		{
			from : config.min + range * 0.8,
			to   : config.min + range * 0.9,
		},
	];

	config.redZones = [
		{
			from : config.min,
			to   : config.min + range * 0.1,
		},
		{
			from : config.min + range * 0.9,
			to   : config.max,
		},
	];

	console.log('[dash][gauge_create_lowHigh] ' + name);

	gauges[name] = new Gauge(name, config);
	gauges[name].render();
}

// For gauges where a low value is undesirable
function gauge_create_reverse(name, label, min = 0, max = 100, minorTicks = 10, size = gaugeSizes.small) {
	const config = {
		size,
		label,
		min,
		max,
		minorTicks,
	};

	const range = config.max - config.min;

	config.redZones = [ {
		from : config.min,
		to   : config.min + range * 0.1,
	} ];

	config.yellowZones = [ {
		from : config.min + range * 0.1,
		to   : config.min + range * 0.2,
	} ];

	console.log('[dash][gauge_create_reverse] ' + name);

	gauges[name] = new Gauge(name, config);
	gauges[name].render();
}

// For temperature gauges
function gauge_create_temp(name, label, min = -20, max = 110, minorTicks = 5, size = gaugeSizes.landscape4) {
	const config = {
		size,
		label,
		min,
		max,
		minorTicks,
	};

	const range = config.max - config.min;

	config.blueZones = [ {
		from : config.min,
		to   : config.min + range * 0.2,
	} ];

	config.yellowZones = [ {
		from : config.min + range * 0.8,
		to   : config.min + range * 0.9,
	} ];

	config.redZones = [ {
		from : config.min + range * 0.9,
		to   : config.max,
	} ];

	console.log('[dash][gauge_create_temp] ' + name);

	gauges[name] = new Gauge(name, config);
	gauges[name].render();
}



function initDashV1() {
	console.log('[dash] initDashV1()');

	gauge_create('engine-throttle-pedal',                   'Ped %', 0, 100,  5, gaugeSizes.landscape4);
	// gauge_create('engine-rpm',                              'RPM',  0, 7000, 5, gaugeSizes.landscape4);
	gauge_create('engine-torque_value-after_interventions', 'lb-ft', 0, 400, 5, gaugeSizes.landscape4);
	gauge_create('engine-horsepower-after_interventions',   'HP',    0, 400, 5, gaugeSizes.landscape4);

	gauge_create_lowHigh('engine-lambda-lambda', 'λ', 0.75, 1.25, 5, gaugeSizes.landscape4);

	gauge_create('vehicle-dsc-torque_intervention_asc',    'ASC %',    0, 100, 10, gaugeSizes.landscape4);
	gauge_create('vehicle-dsc-torque_intervention_asc_lm', 'ASC LM %', 0, 100, 10, gaugeSizes.landscape4);
	gauge_create('vehicle-dsc-torque_intervention_msr',    'MSR %',    0, 100, 10, gaugeSizes.landscape4);

	// gauge_create('engine-torque-loss',                 'Loss %',    0, 100, 10, gaugeSizes.landscape4);
	gauge_create('engine-torque-output',               'Out %',     0, 100, 10, gaugeSizes.landscape4);
	gauge_create('engine-torque-before_interventions', 'Before %',  0, 100, 10, gaugeSizes.landscape4);
	gauge_create('engine-torque-after_interventions',  'After %',   0, 100, 10, gaugeSizes.landscape4);

	gauge_create_temp('temperature-coolant-c',  'Coolant', 60, 100);
	gauge_create_temp('temperature-oil-c',      'Oil',     60, 100);
	gauge_create_temp('temperature-intake-c',   'IAT',      0,  40);
	gauge_create_temp('temperature-exhaust-c',  'EGT',    300, 900);

	gauge_create('engine-ac-request', 'A/C request', 0, 100, 5, gaugeSizes.landscape4);
	gauge_create('engine-ac-torque',  'A/C torque',  0, 100, 5, gaugeSizes.landscape4);

	gauge_create_lowHigh('dme-voltage',             'DME', 12, 16, 5, gaugeSizes.landscape4);
	gauge_create_lowHigh('lcm-voltage-terminal_30', 'LCM', 12, 16, 5, gaugeSizes.landscape4);

	gauge_create('vehicle-wheel_speed-front-left',  'FL', 0, 240, 5, gaugeSizes.medium);
	gauge_create('vehicle-wheel_speed-front-right', 'FR', 0, 240, 5, gaugeSizes.medium);
	gauge_create('vehicle-wheel_speed-rear-left',   'RL', 0, 240, 5, gaugeSizes.medium);
	gauge_create('vehicle-wheel_speed-rear-right',  'RR', 0, 240, 5, gaugeSizes.medium);

	// gauge_create('fuel-consumption', 'Fuel cons', 0, 100);

	gauge_create_reverse('obc-average_speed-mph',  'MPH',    0,  85);
	gauge_create_reverse('obc-consumption-c1-mpg', 'MPG1',   0,  35);
	gauge_create_reverse('obc-consumption-c2-mpg', 'MPG2',   0,  35);
	gauge_create_reverse('obc-range-mi',           'Range',  0, 500);
	gauge_create_reverse('fuel-level',             'Fuel %', 0, 100, 2);
	gauge_create_reverse('fuel-pump-percent',      'EKP %',  0, 100);

	gauge_create('vehicle-steering-angle', '°', -675, 675, 5);
}


function respondToVisibility(elementId) {
	const element = document.getElementById(`${elementId}`);

	let options = {
		threshold : [0],
	};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			let visible = (entry.intersectionRatio > 0);

			if (visible === true) {
				send('websocket-dash-subscribe', elementId);
			}
			else {
				send('websocket-dash-unsubscribe', elementId);
			}

			console.log('[dash][respondToVisibility] %s : %o', elementId, visible);
		});
	}, options);

	observer.observe(element);
}

function initDashVisibility() {
	const gaugeElements = document.getElementsByClassName('d3-gauge');

	for (const gaugeElement of gaugeElements) {
		const gaugeElementId = gaugeElement.id;
		console.log('[dash][initDashVisibility] gaugeElementId: %o', gaugeElementId);
		respondToVisibility(gaugeElementId);
	}
}

$(() => {
	if (window.dashVersion === 1) initDashV1();

	window.gauges = gauges;
});
