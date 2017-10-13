/* eslint no-console: 0 */

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

function on_status_tx(data) {
	console.log(data);

	switch (data.key.stub) {
		case 'engine':
			gauges.rpm.redraw(data.value.full.speed);
			gauges.throttle.redraw(data.value.full.throttle.pedal);
			gauges.psi.redraw(data.value.full.atmospheric_pressure.psi);
			break;

		case 'lcm':
			gauges.battery.redraw(data.value.full.voltage.terminal_30);
			break;

		case 'temperature':
			gauges.coolant.redraw(data.value.full.coolant.c);
			break;

		case 'system':
			gauges.cpuload1.redraw(data.value.full.cpu.load_pct);
			gauges.cputemp1.redraw(data.value.full.temperature);
			break;
	}
}

function on_client_tx(data) {
	switch (data.event) {
		case 'host-data-request' : break;

		case 'bus-rx'      : break;
		case 'bus-tx'      : break;
		case 'lcd-color'   : break;
		case 'lcd-command' : break;
		case 'lcd-text'    : break;

		case 'log-bus'     : break;
		case 'log-msg'     : break;
	}
}

function on_daemon_tx(data) {
	switch (data.event) {
		case 'host-data' :
			// log(data.host.host.short+' '+data.event);
			// log(data.host.host.short+' temp/load: '+data.host.temperature+' C/'+data.host.cpu.load_pct);

			gauges.cputemp2.redraw(data.host.temperature);
			break;

		case 'host-data-request' : break;

		case 'bus-rx'      : break;
		case 'bus-tx'      : break;
		case 'lcd-color'   : break;
		case 'lcd-command' : break;
		case 'lcd-text'    : break;

		case 'log-bus'     : break;
		case 'log-msg'     : break;
	}
}

var socket;

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

	socket.on('client-tx', (data) => {
		on_client_tx(data);
	});

	socket.on('daemon-tx', (data) => {
		on_daemon_tx(data);
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

	gauge_create('battery',  '12v+',     8,   15, 10, 200);
	gauge_create('coolant',  'Coolant',  0,  110, 10, 200);
	gauge_create('throttle', 'Throttle', 0,  100, 10, 200);
	gauge_create('rpm',      'RPM',      0, 7000, 10, 200);

	gauge_create('psi', 'PSI',  8, 16, 10, 200);
	// gauge_create('cputemp2', 'P2 temp', 20,  85, 10, 200);

	gauge_create('cpuload1', 'P1 load',  0, 100, 10, 200);
	gauge_create('cputemp1', 'P1 temp', 20,  85, 10, 200);
}
