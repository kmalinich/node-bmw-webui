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

function gauge_create(name, label, min = 0, max = 100, ticks = 20, size = 320) {
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

	gauge_create('battery',    '12v+',    8,   15, 10, 200);
	gauge_create('coolant',    'CLNT °',  0,  110, 10, 200);
	gauge_create('throttle',   'THRTL %', 0,  100, 10, 200);
	gauge_create('rpm',        'RPM',     0, 7000, 10, 200);
	gauge_create('psi',        'PSI',     8,   16, 10, 200);
	gauge_create('fuel-level', 'FUEL %',  0,  100, 25, 200);

	gauge_create('vehicle-wheel_speed-front-left',  'WS FL', 0, 240, 10, 200);
	gauge_create('vehicle-wheel_speed-front-right', 'WS FR', 0, 240, 10, 200);
	gauge_create('vehicle-wheel_speed-rear-left',   'WS RL', 0, 240, 10, 200);
	gauge_create('vehicle-wheel_speed-rear-right',  'WS RR', 0, 240, 10, 200);

	gauge_create('vehicle-steering-angle',    'STR °', -700, 700, 10, 200);
	gauge_create('vehicle-steering-velocity', 'STR V', -700, 700, 10, 200);

	gauge_create('cpuload1', 'CPU LD',  0, 100, 10, 200);
	gauge_create('cputemp1', 'CPU °',  20,  85, 10, 200);
}

function on_status_tx(data) {
	if (window.socket_debug === true) console.log(data);

	switch (data.key.stub) {
		case 'engine':
			gauges.rpm.redraw(data.value.full.speed);
			gauges.throttle.redraw(data.value.full.throttle.pedal);
			gauges.psi.redraw(data.value.full.atmospheric_pressure.psi);
			break;

		case 'fuel':
			gauges['fuel-level'].redraw(data.value.full.level);
			break;

		case 'lcm':
			gauges.battery.redraw(data.value.full.voltage.terminal_30);
			break;

		case 'system':
			gauges.cpuload1.redraw(data.value.full.cpu.load_pct);
			gauges.cputemp1.redraw(data.value.full.temperature);
			break;

		case 'temperature':
			gauges.coolant.redraw(data.value.full.coolant.c);
			break;

		case 'vehicle':
			gauges['vehicle-wheel_speed-front-left'].redraw(data.value.full.wheel_speed.front.left);
			gauges['vehicle-wheel_speed-front-right'].redraw(data.value.full.wheel_speed.front.right);
			gauges['vehicle-wheel_speed-rear-left'].redraw(data.value.full.wheel_speed.front.left);
			gauges['vehicle-wheel_speed-rear-right'].redraw(data.value.full.wheel_speed.front.right);

			gauges['vehicle-steering-angle'].redraw(data.value.full.steering.angle);
			gauges['vehicle-steering-velocity'].redraw(data.value.full.steering.angle);
			break;
	}
}
