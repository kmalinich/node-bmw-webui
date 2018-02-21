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

// For gauges where a high value is bad
function gauge_create(name, label, min = 0, max = 100, ticks = 10, size = 200) {
	let config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	};

	let range = config.max - config.min;

	config.yellowZones = [ {
		from : config.min + range * 0.75,
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

// For gauges where a low value is bad
function gauge_create_reverse(name, label, min = 0, max = 100, ticks = 10, size = 200) {
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
		to   : config.min + range * 0.25,
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

	// gauge_create('engine-speed',                    'RPM', 0, 7000, 5);
	//
	gauge_create('engine-throttle-pedal', 'THRTL %');
	gauge_create('engine-aux_fan_speed',  'AUXFAN');

	gauge_create('temperature-coolant-c',           'CLNT °C', -30, 110);
	gauge_create('temperature-oil-c',               'OIL °C',  -30, 110);
	gauge_create('engine-atmospheric_pressure-psi', 'ATM PSI',   8,  16);
	gauge_create('lcm-voltage-terminal_30',         'BATT V',    8,  16);

	gauge_create('engine-torque-output', 'TQOUT %');

	gauge_create('temperature-exterior-c', 'EXT °C', -30, 50);

	gauge_create('gpio-relay_0', 'AMP', 0, 1);
	gauge_create('gpio-relay_1', 'FAN', 0, 1);

	gauge_create('vehicle-wheel_speed-front-left',  'WS FL', 0, 240);
	gauge_create('vehicle-wheel_speed-front-right', 'WS FR', 0, 240);
	gauge_create('vehicle-wheel_speed-rear-left',   'WS RL', 0, 240);
	gauge_create('vehicle-wheel_speed-rear-right',  'WS RR', 0, 240);

	gauge_create_reverse('obc-average_speed-mph',  'AVG MPH');
	gauge_create_reverse('obc-consumption-c1-mpg', 'CON1 MPG', 0, 35);
	gauge_create_reverse('obc-range-mi',           'RNG MI',   0, 500);
	gauge_create_reverse('fuel-level',             'FUEL %',   0, 100, 2);

	gauge_create('vehicle-dsc-torque_reduction_1', 'TQ RD1 %');
	gauge_create('vehicle-dsc-torque_reduction_2', 'TQ RD2 %');

	gauge_create('vehicle-steering-angle',    'STR °', -675, 675, 5);
	gauge_create('vehicle-steering-velocity', 'STR V', -675, 675, 5);

	gauge_create('system-cpu-load_pct', 'CPU %');
	gauge_create('system-cpu-speed',    'CPU MHz', 0, 2200);
	gauge_create('system-temperature',  'CPU °',  20, 85);
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
		case 'engine' : {
			gauges['engine-atmospheric_pressure-psi'].redraw(v_full.atmospheric_pressure.psi);
			gauges['engine-aux_fan_speed'].redraw(v_full.aux_fan_speed);
			// gauges['engine-speed'].redraw(v_full.speed);
			gauges['engine-throttle-pedal'].redraw(v_full.throttle.pedal);
			gauges['engine-torque-output'].redraw(v_full.torque.output);
			break;
		}

		case 'fuel' : {
			gauges['fuel-level'].redraw(v_full.level);
			break;
		}

		case 'gpio' : {
			gauges['gpio-relay_0'].redraw(parseInt((v_full.relay_0 === true && 1 || 0)));
			gauges['gpio-relay_1'].redraw(parseInt((v_full.relay_1 === true && 1 || 0)));
			break;
		}

		case 'lcm' : {
			gauges['lcm-voltage-terminal_30'].redraw(v_full.voltage.terminal_30);
			break;
		}

		case 'obc' : {
			gauges['obc-average_speed-mph'].redraw(v_full.average_speed.mph);
			gauges['obc-consumption-c1-mpg'].redraw(v_full.consumption.c1.mpg);
			gauges['obc-range-mi'].redraw(v_full.range.mi);
			break;
		}

		case 'system' : {
			gauges['system-cpu-load_pct'].redraw(v_full.cpu.load_pct);
			gauges['system-cpu-speed'].redraw(v_full.cpu.speed);
			gauges['system-temperature'].redraw(v_full.temperature);
			break;
		}

		case 'temperature' : {
			gauges['temperature-coolant-c'].redraw(v_full.coolant.c);
			gauges['temperature-exterior-c'].redraw(v_full.exterior.c);
			gauges['temperature-oil-c'].redraw(v_full.oil.c);
			break;
		}

		case 'vehicle' : {
			gauges['vehicle-dsc-torque_reduction_1'].redraw(v_full.dsc.torque_reduction_1);
			gauges['vehicle-dsc-torque_reduction_2'].redraw(v_full.dsc.torque_reduction_2);

			gauges['vehicle-steering-angle'].redraw(v_full.steering.angle);
			gauges['vehicle-steering-velocity'].redraw(v_full.steering.velocity);

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
function ws_init() {
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
