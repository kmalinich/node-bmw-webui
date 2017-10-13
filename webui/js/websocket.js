/* eslint no-console     : 0 */
/* eslint no-unused-vars : 0 */


window.socket_debug = false;
var socket;

function log(msg) {
	console.log('[websocket] %s', msg);
}

function ws_set_status(status) {
	switch (status) {
		case 'connect'    : $('#status-ws').removeClass('btn-danger').addClass('btn-success').removeClass('btn-warning'); break;
		case 'error'      : $('#status-ws').addClass('btn-danger').removeClass('btn-success').removeClass('btn-warning'); break;
		case 'disconnect' : $('#status-ws').addClass('btn-danger').removeClass('btn-success').removeClass('btn-warning'); break;
		default:
			$('#status-ws').removeClass('btn-danger').removeClass('btn-success').addClass('btn-warning');
	}

	switch (status) {
		case 'connect'    : $('#status-ws').text('Connected'); break;
		case 'error'      : $('#status-ws').text('Error'); break;
		case 'disconnect' : $('#status-ws').text('Disconnected'); break;
		default:
			$('#status-ws').text('Connecting');
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

// Dashboard websocket
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

	socket.on('status-tx', (data) => {
		on_status_tx(data);
	});

	init_dash();
}

function gauge_create(name, label, min = 0, max = 100, ticks = 10, size = 200) {
	var config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	};

	var range = config.max - config.min;

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

gauges = [];

function init_dash() {
	log('init_dash()');

	let size = 200;

	gauge_create('engine-speed',                    'RPM', 0, 7000, 5);
	gauge_create('engine-throttle-pedal',           'THRTL %');
	gauge_create('temperature-coolant-c',           'CLNT °C', 0, 110);
	gauge_create('engine-atmospheric_pressure-psi', 'PSI', 8,  16);
	gauge_create('lcm-voltage-terminal_30',         'BATT V',  8,  16);

	gauge_create('engine-torque-output', 'TQOUT %');

	gauge_create('vehicle-wheel_speed-front-left',  'WS FL', 0, 240);
	gauge_create('vehicle-wheel_speed-front-right', 'WS FR', 0, 240);
	gauge_create('vehicle-wheel_speed-rear-left',   'WS RL', 0, 240);
	gauge_create('vehicle-wheel_speed-rear-right',  'WS RR', 0, 240);

	gauge_create('obc-average_speed-mph',  'AVG MPH');
	gauge_create('obc-consumption-c1-mpg', 'CON1 MPG', 0, 35);
	gauge_create('obc-range-mi',           'RNG MI',   0, 500);
	gauge_create('fuel-level',             'FUEL %',   0, 100, 2);

	gauge_create('vehicle-dsc-torque_reduction_1', 'TQ RD1 %');
	gauge_create('vehicle-dsc-torque_reduction_2', 'TQ RD2 %');

	gauge_create('vehicle-steering-angle',    'STR °', -700, 700);
	gauge_create('vehicle-steering-velocity', 'STR V', -700, 700);

	gauge_create('system-cpu-load_pct', 'CPU %');
	gauge_create('system-temperature',  'CPU °', 20, 85);
}

function on_status_tx(data) {
	if (window.socket_debug === true) console.log(data);

	let path_hyphen = data.key.full.replace(/\./g, '-');
	console.log('path-dot : \'%s\', path-hyphen: \'%s\'', data.key.full, path_hyphen);

	console.log(gauges[path_hyphen]);

	switch (data.key.full) {
		case 'engine':
			gauges['engine-atmospheric_pressure-psi'].redraw(data.value.full.atmospheric_pressure.psi);
			gauges['engine-speed'].redraw(data.value.full.speed);
			gauges['engine-throttle-pedal'].redraw(data.value.full.throttle.pedal);
			gauges['engine-torque-output'].redraw(data.value.full.torque.output);
			break;

		case 'fuel':
			gauges['fuel-level'].redraw(data.value.full.level);
			break;

		case 'lcm':
			gauges['lcm-voltage-terminal_30'].redraw(data.value.full.voltage.terminal_30);
			break;

		case 'obc':
			gauges['obc-average_speed-mph'].redraw(data.value.full.average_speed.mph);
			gauges['obc-consumption-c1-mpg'].redraw(data.value.full.consumption.c1.mpg);
			gauges['obc-range-mi'].redraw(data.value.full.range.mi);
			break;

		case 'system':
			gauges['system-cpu-load_pct'].redraw(data.value.full.cpu.load_pct);
			gauges['system-temperature'].redraw(data.value.full.temperature);
			break;

		case 'temperature':
			gauges['temperature-coolant-c'].redraw(data.value.full.coolant.c);
			break;

		case 'vehicle':
			gauges['vehicle-wheel_speed-front-left'].redraw(data.value.full.wheel_speed.front.left);
			gauges['vehicle-wheel_speed-front-right'].redraw(data.value.full.wheel_speed.front.right);
			gauges['vehicle-wheel_speed-rear-left'].redraw(data.value.full.wheel_speed.front.left);
			gauges['vehicle-wheel_speed-rear-right'].redraw(data.value.full.wheel_speed.front.right);

			gauges['vehicle-steering-angle'].redraw(data.value.full.steering.angle);
			gauges['vehicle-steering-velocity'].redraw(data.value.full.steering.angle);

			gauges['vehicle-dsc-torque_reduction_1'].redraw(data.value.full.dsc.torque_reduction_1);
			gauges['vehicle-dsc-torque_reduction_2'].redraw(data.value.full.dsc.torque_reduction_2);
			break;
	}
}
