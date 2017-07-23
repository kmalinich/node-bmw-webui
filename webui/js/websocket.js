function log(msg) {
	console.log('[websocket] %s', msg);
}

function ws_set_status(status) {
	$('#status-ws-disconnected').addClass('hidden');
	$('#status-ws-connected').addClass('hidden');
	$('#status-ws-connecting').addClass('hidden');

	switch (status) {
		case 'connect'    : $('#status-ws-connected').removeClass('hidden'); break;
		case 'error'      : $('#status-ws-disconnected').removeClass('hidden'); break;
		case 'disconnect' : $('#status-ws-disconnected').removeClass('hidden'); break;
		default:
			$('#status-ws-connecting').removeClass('hidden');
	}
}

function on_client_tx(data) {
	switch (data.event) {
		case 'status':
			log(data.host.host.short+' '+data.event);

			if (data.host.type === 'client') {
				if (typeof data.data.temperature !== 'undefined' && data.data.temperature !== null) {
					gauges.coolant.redraw(data.data.temperature.coolant.c);
				}

				if (typeof data.data.engine !== 'undefined' && data.data.engine !== null) {
					gauges.speed.redraw(data.data.engine.speed);
					gauges.throttle.redraw(data.data.engine.throttle);
				}
			}
			break;

		case 'host-data' :
			log(data.host.host.short+' '+data.event);
			console.log(data);
			log(data.host.host.short+' temp/load: '+data.host.temperature+' C/'+data.host.cpu.load_percent);

			gauges.cpuload1.redraw(data.host.cpu.load_percent);
			gauges.cputemp1.redraw(data.host.temperature);
			break;

		case 'host-data-request' : break;

		case 'bus-rx'      : break;
		case 'bus-tx'      : break;
		case 'lcd-color'   : break;
		case 'lcd-command' : break;
		case 'lcd-text'    : break;

		case 'log-bus'     : break;
		case 'log-msg'     : break;
		case 'host-data'   : break;
	}
}

function on_daemon_tx(data) {
	switch (data.event) {
		case 'host-data' :
			log(data.host.host.short+' '+data.event);
			console.log(data);
			log(data.host.host.short+' temp/load: '+data.host.temperature+' C/'+data.host.cpu.load_percent);

			gauges.cpuload2.redraw(data.host.cpu.load_percent);
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
		case 'host-data'   : break;
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

	init_dash();
}

function gauge_create(name, label, min = 0, max = 100, ticks = 20, size = 320) {
	var config = {
		size       : size,
		label      : label,
		min        : min,
		max        : max,
		minorTicks : ticks,
	}

	var range = config.max-config.min;

	config.yellowZones = [{
		from : config.min+range*0.75,
		to   : config.min+range*0.9,
	}];

	config.redZones = [{
		from : config.min+range*0.9,
		to   : config.max,
	}];

	log('[gauge_create] '+name);
	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}

gauges = [];

function init_dash() {
	log('init_dash()');
	gauge_create('cputemp1', 'P1 temp', 20, 85, 5, 250);
	gauge_create('cputemp2', 'P2 temp', 20, 85, 5, 250);

	gauge_create('cpuload1', 'P1 load', 0, 100, 5, 250);
	gauge_create('cpuload2', 'P2 load', 0, 100, 5, 250);

	gauge_create('coolant',  'Coolant',  0, 110);
	gauge_create('throttle', 'Throttle', 0, 100);
	gauge_create('rpm',      'RPM',      0, 7000, 10);
}

function gauge_update() {
	for (var key in gauges) {
		log('[gauge_update] '+key);
		var value = get_random_val(gauges[key])
		gauges[key].redraw(value);
	}
}
