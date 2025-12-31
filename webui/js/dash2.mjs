import JustGage from './justgage.esm.js';

const gaugeSizes = {
	small  : 254,
	medium : 254,
	large  : 372,
	xl     : 385,

	landscape2 : 490,
	landscape4 : 254,
};


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

			console.log('[visible] %s : %o', elementId, visible);
		});
	}, options);

	observer.observe(element);
}

function initDashVisibility() {
	const gaugeElements = document.getElementsByClassName('d3-gauge');

	for (const gaugeElement of gaugeElements) {
		const gaugeElementId = gaugeElement.id;
		console.log('[initDashVisibility] gaugeElementId: %o', gaugeElementId);
		respondToVisibility(gaugeElementId);
	}
}


const gauges = {
	dme         : {},
	engine      : {},
	fuel        : {},
	lcm         : {},
	obc         : {},
	temperature : {},
	vehicle     : {},
};


gauges.engine.throttlePedal = new JustGage({ id : 'engine-throttle-pedal', title : 'Throttle', label : '%', value : 50, min : 0, max : 100 });

gauges.engine.torqueValueAfterInterventions = new JustGage({ id : 'engine-torque_value-after_interventions', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.horsepower = new JustGage({ id : 'engine-horsepower-after_interventions', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.lambda = new JustGage({ id : 'engine-lambda-lambda', title : '', label : '', value : 50, min : 0, max : 100 });

gauges.vehicle.dscTorqueInterventionAsc = new JustGage({ id : 'vehicle-dsc-torque_intervention_asc', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.vehicle.dscTorqueInterventionAscLm = new JustGage({ id : 'vehicle-dsc-torque_intervention_asc_lm', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.vehicle.dscTorqueInterventionMsr = new JustGage({ id : 'vehicle-dsc-torque_intervention_msr', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.torqueOutput = new JustGage({ id : 'engine-torque-output', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.torqueBeforeInterventions = new JustGage({ id : 'engine-torque-before_interventions', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.torqueAfterInterventions = new JustGage({ id : 'engine-torque-after_interventions', title : '', label : '', value : 50, min : 0, max : 100 });

gauges.temperature.coolantC = new JustGage({ id : 'temperature-coolant-c', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.temperature.oilC = new JustGage({ id : 'temperature-oil-c', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.temperature.intakeC = new JustGage({ id : 'temperature-intake-c', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.temperature.exhaustC = new JustGage({ id : 'temperature-exhaust-c', title : '', label : '', value : 50, min : 0, max : 100 });

gauges.dme.voltage = new JustGage({ id : 'dme-voltage', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.lcm.voltageTerminal30 = new JustGage({ id : 'lcm-voltage-terminal_30', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.acRequest = new JustGage({ id : 'engine-ac-request', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.engine.acTorque = new JustGage({ id : 'engine-ac-torque', title : '', label : '', value : 50, min : 0, max : 100 });

/*
gauges.obc. = new JustGage({ id : 'obc-average_speed-mph', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-consumption-c1-mpg', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-consumption-c2-mpg', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.fuel. = new JustGage({ id : 'fuel-level', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.fuel. = new JustGage({ id : 'fuel-pump-percent', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-range-mi', title : '', label : '', value : 50, min : 0, max : 100 });

gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-front-left', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-front-right', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-rear-left', title : '', label : '', value : 50, min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-rear-right', title : '', label : '', value : 50, min : 0, max : 100 });

gauges.vehicle. = new JustGage({ id : 'vehicle-steering-angle', title : '', label : '', value : 50, min : 0, max : 100 });
*/
