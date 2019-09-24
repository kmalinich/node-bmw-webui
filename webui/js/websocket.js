/* eslint no-console     : 0 */
/* eslint no-unused-vars : 0 */


window.socket_debug = false;

let socket;
let gauges = [];

// Toggle debug console output on and off
function debug_toggle() {
	window.socket_debug = !window.socket_debug;
	log('[debug_toggle] window.socket_debug = ' + window.socket_debug);
}

let gauge_sizes = {
	small  : 258,
	medium : 258,
	large  : 372,
	xl     : 385,
};


// For gauges where a high value is bad
function gauge_create(name, label, min = 0, max = 100, ticks = 10, size = gauge_sizes.small) {
	let config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	};

	let range = config.max - config.min;

	config.yellowZones = [ {
		from : config.min + range * 0.8,
		to   : config.min + range * 0.9,
	} ];

	config.redZones = [ {
		from : config.min + range * 0.9,
		to   : config.max,
	} ];

	log('[gauge_create] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}

// For temperature gauges
function gauge_create_temp(name, label, min = -20, max = 110, ticks = 10, size = gauge_sizes.small) {
	let config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	};

	let range = config.max - config.min;

	config.blueZones = [ {
		from : config.min,
		to   : config.min + range * 0.2,
	} ];

	config.yellowZones = [ {
		from : config.min + range * 0.9,
		to   : config.min + range * 0.95,
	} ];

	config.redZones = [ {
		from : config.min + range * 0.95,
		to   : config.max,
	} ];

	log('[gauge_create] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}


// For gauges where a low value is bad
function gauge_create_reverse(name, label, min = 0, max = 100, ticks = 10, size = gauge_sizes.small) {
	let config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	};

	let range = config.max - config.min;

	config.yellowZones = [ {
		from : config.min + range * 0.1,
		to   : config.min + range * 0.2,
	} ];

	config.redZones = [ {
		from : config.min,
		to   : config.min + range * 0.1,
	} ];

	log('[gauge_create_reverse] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}


function init_dash() {
	log('init_dash()');

	// gauge_create('engine-speed',          'RPM',     0, 7000, 5, gauge_sizes.large);
	// gauge_create('engine-throttle-pedal', 'Thrtl %', 0, 100,  5, gauge_sizes.large);

	gauge_create('vehicle-dsc-torque_reduction_1', 'Reduce1 %', 0, 100, 10, gauge_sizes.xl);
	gauge_create('vehicle-dsc-torque_reduction_2', 'Reduce2 %', 0, 100, 10, gauge_sizes.xl);

	gauge_create('engine-torque-loss',                 'Loss %');
	gauge_create('engine-torque-output',               'Out %');
	gauge_create('engine-torque-before_interventions', 'Before %');
	gauge_create('engine-torque-after_interventions',  'After %');

	// gauge_create('engine-torque_value-loss',                 'Loss %');
	// gauge_create('engine-torque_value-output',               'Out %');
	// gauge_create('engine-torque_value-before_interventions', 'Before %');
	gauge_create('engine-torque_value-after_interventions', 'lb-ft', 0, 400, 5, gauge_sizes.xl);

	// gauge_create('engine-horsepower-loss',                 'Loss %');
	// gauge_create('engine-horsepower-output',               'Out %');
	// gauge_create('engine-horsepower-before_interventions', 'Before %');
	gauge_create('engine-horsepower-after_interventions', '#BuffHorses', 0, 400, 5, gauge_sizes.xl);

	gauge_create_temp('system-temperature',     'CPU °C', 5, 80);
	gauge_create_temp('temperature-coolant-c',  'Clnt °C');
	gauge_create_temp('temperature-exhaust-c',  'EGT °C', 300, 900);
	gauge_create_temp('temperature-exterior-c', 'Atm °C', -20, 40);
	gauge_create_temp('temperature-intake-c',   'IAT °C', -20, 40);
	gauge_create_temp('temperature-oil-c',      'Oil °C');

	gauge_create('engine-atmospheric_pressure-psi', 'Atm psi',  13, 15);
	gauge_create('engine-aux_fan_speed',            'Aux fan',  0, 100, 5);
	// gauge_create('gpio-relay_0',                    'Audio',    0,   1, 1);
	// gauge_create('gpio-relay_1',                    'Pi fan',   0,   1, 1);
	gauge_create('dme-voltage',                     'DME V',    8,  16, 5);
	gauge_create('lcm-voltage-terminal_30',         'LCM V',    8,  16, 5);
	gauge_create('vehicle-ignition_level',          'Ignition', 0,   7, 2);

	gauge_create('vehicle-wheel_speed-front-left',  'WS FL', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-front-right', 'WS FR', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-rear-left',   'WS RL', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-rear-right',  'WS RR', 0, 240, 5, gauge_sizes.medium);

	gauge_create('fuel-consumption', 'Fuel cons', 0, 100);

	gauge_create_reverse('obc-average_speed-mph',  'MPH',    0,  85);
	gauge_create_reverse('obc-consumption-c1-mpg', 'MPG1',   0,  35);
	gauge_create_reverse('obc-consumption-c2-mpg', 'MPG2',   0,  35);
	gauge_create_reverse('obc-range-mi',           'Range',  0, 500);
	gauge_create_reverse('fuel-level',             'Fuel %', 0, 100, 2);
	gauge_create_reverse('fuel-pump-duty-percent', 'EKP %',  0, 100);

	gauge_create('vehicle-steering-angle', 'STR °', -675, 675, 5);

	gauge_create('system-cpu-load_pct', 'CPU %');
}

function log(msg) {
	console.log('[websocket] %s', msg);
}


function on_config_tx(data) {
	if (window.socket_debug === true) console.log(data);
}

function on_log_tx(data) {
	if (window.socket_debug === true) {
		console.log(JSON.stringify(data, null, 2));
	}
}

function on_status_tx(data) {
	if (window.socket_debug === true) console.log(data);

	let v_full = data.value.full;

	// Initial page load data
	switch (data.key.full) {
		case 'dme' : {
			gauges['dme-voltage'].redraw(v_full.voltage);
			break;
		}

		case 'engine' : {
			gauges['engine-atmospheric_pressure-psi'].redraw(v_full.atmospheric_pressure.psi);
			gauges['engine-aux_fan_speed'].redraw(v_full.aux_fan_speed);
			// gauges['engine-speed'].redraw(v_full.speed);
			// gauges['engine-throttle-pedal'].redraw(v_full.throttle.pedal);
			gauges['engine-torque-after_interventions'].redraw(v_full.torque.after_interventions);
			gauges['engine-torque-before_interventions'].redraw(v_full.torque.before_interventions);
			gauges['engine-torque-loss'].redraw(v_full.torque.loss);
			gauges['engine-torque-output'].redraw(v_full.torque.output);

			gauges['engine-torque_value-after_interventions'].redraw(v_full.torque_value.after_interventions);
			// gauges['engine-torque_value-before_interventions'].redraw(v_full.torque_value.before_interventions);
			// gauges['engine-torque_value-loss'].redraw(v_full.torque_value.loss);
			// gauges['engine-torque_value-output'].redraw(v_full.torque_value.output);

			gauges['engine-horsepower-after_interventions'].redraw(v_full.horsepower.after_interventions);
			// gauges['engine-horsepower-before_interventions'].redraw(v_full.horsepower.before_interventions);
			// gauges['engine-horsepower-loss'].redraw(v_full.horsepower.loss);
			// gauges['engine-horsepower-output'].redraw(v_full.horsepower.output);
			break;
		}

		case 'fuel' : {
			gauges['fuel-consumption'].redraw(v_full.consumption);
			gauges['fuel-level'].redraw(v_full.level);
			gauges['fuel-pump-duty-percent'].redraw(v_full.pump.percent);
			break;
		}

		// case 'gpio' : {
		// 	gauges['gpio-relay_0'].redraw(v_full.relay_0);
		// 	gauges['gpio-relay_1'].redraw(v_full.relay_1);
		// 	break;
		// }

		case 'lcm' : {
			gauges['lcm-voltage-terminal_30'].redraw(v_full.voltage.terminal_30);
			break;
		}

		case 'obc' : {
			gauges['obc-average_speed-mph'].redraw(v_full.average_speed.mph);
			gauges['obc-consumption-c1-mpg'].redraw(v_full.consumption.c1.mpg);
			gauges['obc-consumption-c2-mpg'].redraw(v_full.consumption.c2.mpg);
			gauges['obc-range-mi'].redraw(v_full.range.mi);
			break;
		}

		case 'system' : {
			gauges['system-cpu-load_pct'].redraw(v_full.cpu.load_pct);
			gauges['system-temperature'].redraw(v_full.temperature);
			break;
		}

		case 'temperature' : {
			gauges['temperature-coolant-c'].redraw(v_full.coolant.c);
			gauges['temperature-exhaust-c'].redraw(v_full.exhaust.c);
			gauges['temperature-exterior-c'].redraw(v_full.exterior.c);
			gauges['temperature-intake-c'].redraw(v_full.intake.c);
			gauges['temperature-oil-c'].redraw(v_full.oil.c);
			break;
		}

		case 'vehicle' : {
			gauges['vehicle-dsc-torque_reduction_1'].redraw(v_full.dsc.torque_reduction_1);
			gauges['vehicle-dsc-torque_reduction_2'].redraw(v_full.dsc.torque_reduction_2);

			gauges['vehicle-ignition_level'].redraw(v_full.ignition_level);

			gauges['vehicle-steering-angle'].redraw(v_full.steering.angle);

			gauges['vehicle-wheel_speed-front-left'].redraw(v_full.wheel_speed.front.left);
			gauges['vehicle-wheel_speed-front-right'].redraw(v_full.wheel_speed.front.right);
			gauges['vehicle-wheel_speed-rear-left'].redraw(v_full.wheel_speed.rear.left);
			gauges['vehicle-wheel_speed-rear-right'].redraw(v_full.wheel_speed.rear.right);
			break;
		}

		default : { // Delta updates
			let path_hyphen = data.key.full.replace(/\./g, '-');

			if (typeof gauges[path_hyphen] !== 'undefined') {
				if (window.socket_debug === true) console.log('Updating gauge \'%s\'', path_hyphen);
				gauges[path_hyphen].redraw(data.value.stub);
			}
		}
	}
}


// Send data over WebSocket
function send(event, data = null) {
	let message = {
		event : event,
		data  : data,
	};

	socket.emit('client-tx', message);
}


// Dashboard WebSocket
function init_websocket() {
	log('init_websocket()');

	ws_set_status('connecting');

	// Open WebSocket
	socket = io();

	socket.on('connect', () => {
		ws_set_status('connect');
		log('connected');
		send('status-request', 'all');
	});

	socket.on('error', (error) => {
		ws_set_status('error');
		log('error');
		console.error(error);
	});

	socket.on('disconnect', () => {
		log('disconnected');
		ws_set_status('disconnect');
	});

	socket.on('config-tx', on_config_tx);
	socket.on('log-tx',    on_log_tx);
	socket.on('status-tx', on_status_tx);

	init_dash();
}

function ws_set_status(status) {
	switch (status) {
		case 'connect'    : $('#status-ws').removeClass('btn-danger').addClass('btn-success').removeClass('btn-warning'); break;
		case 'error'      : $('#status-ws').addClass('btn-danger').removeClass('btn-success').removeClass('btn-warning'); break;
		case 'disconnect' : $('#status-ws').addClass('btn-danger').removeClass('btn-success').removeClass('btn-warning'); break;
		default           : $('#status-ws').removeClass('btn-danger').removeClass('btn-success').addClass('btn-warning');
	}

	switch (status) {
		case 'connect'    : $('#status-ws').text('Connected');    break;
		case 'error'      : $('#status-ws').text('Error');        break;
		case 'disconnect' : $('#status-ws').text('Disconnected'); break;
		default           :	$('#status-ws').text('Connecting');
	}
}
