/* eslint no-console     : 0 */
/* eslint no-unused-vars : 0 */

window.socket_debug = false;

let socket;
const gauges = [];


// Toggle debug console output on and off
function debug_toggle() {
	window.socket_debug = !window.socket_debug;
	log('[debug_toggle] window.socket_debug = ' + window.socket_debug);
}

function log(msg) {
	console.log('[node-bmw] %s', msg);
}

function get_type(object) {
	const type = typeof object;

	if (type === 'object') {
		if (object === null) return 'null';

		if (Array.isArray(object) === true) return 'array';
	}

	return type;
}


// Convert a string to hex
function str2hex(str) {
	let hex = '';
	for (let i = 0; i < str.length; i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

// Convert integer to hex string
function i2s(data, prefix = true) {
	let hexstr;

	hexstr = data.toString(16).toUpperCase();

	hexstr = hexstr.length === 1 && '0' + hexstr || hexstr;

	const string = prefix === true && '0x' + hexstr || hexstr;

	return string;
}


const form2json = elements => [].reduce.call(elements, (data, element) => {
	switch (element.type) {
		case 'checkbox' : data[element.name] = element.checked; break;

		case 'reset'  :
		case 'submit' : break;

		default : data[element.name] = element.value;
	}

	return data;
}, {});


const gauge_sizes = {
	small  : 254,
	medium : 254,
	large  : 372,
	xl     : 385,

	landscape2 : 490,
	landscape4 : 254,
};


// Clean all the text strings
function clean_class_all() {
	// This is really dumb and there is a better way
	clean_class('#engine-running');
	clean_class('#engine-speed');
	clean_class('#doors-front-left');
	clean_class('#doors-front-right');
	clean_class('#doors-hood');
	clean_class('#doors-rear-left');
	clean_class('#doors-rear-right');
	clean_class('#doors-trunk');
	clean_class('#obc-aux-heat-timer-1');
	clean_class('#obc-aux-heat-timer-2');
	clean_class('#obc-coding-unit-cons');
	clean_class('#obc-coding-unit-distance');
	clean_class('#obc-coding-unit-speed');
	clean_class('#obc-coding-unit-temp');
	clean_class('#obc-coding-unit-time');
	clean_class('#obc-consumption-1');
	clean_class('#obc-consumption-1-unit');
	clean_class('#obc-consumption-2');
	clean_class('#obc-consumption-2-unit');
	clean_class('#obc-date');
	clean_class('#obc-distance');
	clean_class('#obc-distance-unit');
	clean_class('#obc-range');
	clean_class('#obc-range-unit');
	clean_class('#obc-average-speed');
	clean_class('#obc-average-speed-unit');
	clean_class('#obc-speedlimit');
	clean_class('#obc-speedlimit-unit');
	clean_class('#obc-stopwatch');
	clean_class('#obc-temp-exterior');
	clean_class('#obc-temp-exterior-unit');
	clean_class('#obc-time');
	clean_class('#obc-timer');
	clean_class('#temperature-coolant');
	clean_class('#temperature-coolant-unit');
	clean_class('#vehicle-handbrake');
	clean_class('#vehicle-ignition');
	clean_class('#vehicle-reverse');
	clean_class('#vehicle-speed');
	clean_class('#vehicle-speed-unit');
	clean_class('#windows-front-left');
	clean_class('#windows-front-right');
	clean_class('#windows-rear-left');
	clean_class('#windows-rear-right');
	clean_class('#windows-roof');
	// clean_class('');
}

// Remove all color-coded CSS classes from a text id
function clean_class(id) {
	$(id).removeClass('text-danger').removeClass('text-success').removeClass('text-warning').removeClass('text-primary').removeClass('text-info').text('');
}


function hdmi_command(command) {
	$.ajax({
		url      : '/api/client/hdmi',
		type     : 'POST',
		dataType : 'json',
		data     : {
			command,
		},
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

function form_gm() {
	console.log($('#form-gm').serialize());
	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : $('#form-gm').serialize(),
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}


// Prepare IKE page
function prepare_ike() {
	prepare_ike_backlight();
}

// Initialize IKE backlight slider
function prepare_ike_backlight() {
	$('#slider-ike-backlight').on('slideStart', (data) => {
		console.log('ike_backlight_slideStart: %s', data.value);
		ike_backlight(data.value);
	});

	$('#slider-ike-backlight').on('slideStop', (data) => {
		console.log('ike_backlight_slidestop: %s', data.value);
		ike_backlight(data.value);
	});
}

function ike_backlight(value) {
	console.log('ike_backlight(%s);', value);

	$.ajax({
		url      : '/api/client/ike',
		type     : 'POST',
		dataType : 'json',
		data     : 'ike-backlight=' + value,
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}

function ike_set_clock() {
	$.ajax({
		url     : '/api/client/obc/set/clock',
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

function ike_text() {
	$.ajax({
		url     : '/api/client/ike/text/normal/' + $('#ike-text').val(),
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

function obc_get() {
	$.ajax({
		url     : '/api/client/obc/get/' + $('#select-obc-value').val(),
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

function obc_reset() {
	$.ajax({
		url     : '/api/client/obc/reset/' + $('#select-obc-value').val(),
		success : (return_data) => {
			console.log(return_data);
		},
	});
}


function form_lcm() {
	$.ajax({
		contentType : 'application/json',
		dataType    : 'json',

		data : JSON.stringify(form2json(document.getElementsByName('form-lcm')[0])),

		success : (return_data) => {
			console.log(return_data);
		},

		type : 'POST',
		url  : '/api/client/lcm/io-encode',
	});
}

// Central locking/unlocking
function gm_cl(action) {
	console.log('gm_cl(%s);', action);

	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : {
			'command'        : 'locks',
			'command-action' : action,
		},
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

// AJAX for GM interior_light
function gm_interior_light(value) {
	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : 'interior-light=' + value,
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}

// GM window control
function gm_windows(window, action) {
	console.log('gm_windows(%s, %s);', window, action);

	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : {
			window,
			'window-action' : action,
		},
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

// AJAX for LCM dimmer
function lcm_dimmer(value) {
	console.log('lcm_dimmer(%s);', value);

	$.ajax({
		url      : '/api/client/lcm',
		type     : 'POST',
		dataType : 'json',
		data     : 'lcm-dimmer=' + value,
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}

// Get GM IO status
function gm_get() {
	console.log('gm_get()');

	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : {
			'command' : 'door-status',
		},
		success : (return_data) => {
			console.log(return_data);
		},
	});

	$.ajax({
		url      : '/api/client/gm',
		type     : 'POST',
		dataType : 'json',
		data     : {
			'command' : 'io-status',
		},
		success : (return_data) => {
			console.log(return_data);
		},
	});
}

// Get LCM IO status
function lcm_get() {
	console.log('lcm_get()');

	$.ajax({
		url      : '/api/client/lcm',
		type     : 'POST',
		dataType : 'json',
		data     : 'lcm-get=true',
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}


// Prepare GM page
function prepare_gm() {
	prepare_gm_interior_light();
}

// Initialize GM interior_light slider
function prepare_gm_interior_light() {
	const slider = $('#slider-gm-interior-light')[0];

	noUiSlider.create(slider, {
		start   : 0,
		step    : 1,
		connect : [ true, false ],
		range   : {
			'min' : 0,
			'max' : 255,
		},
	});

	slider.noUiSlider.on('update', (data) => {
		const value = parseInt(data[0]);
		gm_interior_light(value);
	});
}


// Prepare LCM page
function prepare_lcm() {
	prepare_lcm_dimmer();
}

// Initialize LCM dimmer slider
function prepare_lcm_dimmer() {
	const slider = $('#slider-lcm-dimmer')[0];

	noUiSlider.create(slider, {
		start   : 0,
		step    : 1,
		connect : [ true, false ],
		range   : {
			'min' : 0,
			'max' : 255,
		},
	});

	slider.noUiSlider.on('change', (data) => {
		const value = parseInt(data[0]);
		console.log('LCM dimmer slider: %s', value);
	});
}


// Get status object
function status() {
	$.ajax({
		url      : '/api/client/status',
		type     : 'GET',
		dataType : 'json',
		success  : status_apply,
	});
}

// Take status object, parse, and display
function status_apply(return_data) {
	if (window.socket_debug === true) console.log('status_apply()', return_data);

	// Clean up page
	clean_class_all();

	// Time and date
	$('#obc-time').text(return_data.obc.time);
	$('#obc-date').text(return_data.obc.date);


	// Engine status
	$('#engine-speed').text(return_data.engine.speed);

	let engine_class = 'danger';
	let engine_text  = 'off';

	if (return_data.engine.running) {
		engine_class = 'success';
		engine_text  = 'running';
	}

	$('#engine-running').text('Engine ' + engine_text).addClass('text-' + engine_class);


	/*
	 * Temperatures
	 */

	// Units
	if (!return_data.coding.unit.temp) {
		return_data.coding.unit.temp = 'c';
	}

	$('#temperature-coolant-unit').text(return_data.coding.unit.temp.toUpperCase());
	$('#obc-temp-exterior-unit').text(return_data.coding.unit.temp.toUpperCase());

	if (return_data.coding.unit.temp === 'c') {
		$('#temperature-coolant').text(return_data.temperature.coolant.c);
		$('#obc-temp-exterior').text(return_data.temperature.exterior.obc.c);
	}
	else if (return_data.coding.unit.temp === 'f') {
		$('#temperature-coolant').text(return_data.temperature.coolant.f);
		$('#obc-temp-exterior').text(return_data.temperature.exterior.obc.f);
	}

	$('#vehicle-odometer-mi').text(return_data.vehicle.odometer.mi);
	$('#vehicle-vin').text(return_data.vehicle.vin);


	// Handbrake
	let handbrake_class = 'success';
	let handbrake_text  = 'off';

	if (return_data.vehicle.handbrake) {
		handbrake_class = 'danger';
		handbrake_text  = 'on';
	}

	$('#vehicle-handbrake').text('Handbrake ' + handbrake_text).addClass('text-' + handbrake_class);


	// Reverse
	let reverse_class = 'success';
	let reverse_text  = 'disengaged';

	if (return_data.vehicle.reverse) {
		reverse_class = 'danger';
		reverse_text  = 'engaged';
	}

	$('#vehicle-reverse').text('Reverse gear ' + reverse_text).addClass('text-' + reverse_class);


	// Ignition
	let ignition_class = 'danger';

	switch (return_data.vehicle.ignition) {
		case 'run'       : ignition_class = 'success'; break;
		case 'accessory' : ignition_class = 'info';    break;
		case 'start'     : ignition_class = 'warning';
	}

	$('#vehicle-ignition').text('Ignition ' + return_data.vehicle.ignition).addClass('text-' + ignition_class);


	// Door status
	const doors = {
		hood  : 'closed',
		trunk : 'closed',

		front : { left : 'closed', right : 'closed' },
		rear  : { left : 'closed', right : 'closed' },
	};

	if (return_data.doors.hood)  doors.hood  = 'open';
	if (return_data.doors.trunk) doors.trunk = 'open';

	if (return_data.doors.front_left)  doors.front.left  = 'open';
	if (return_data.doors.front_right) doors.front.right = 'open';
	if (return_data.doors.rear_left)   doors.rear.left   = 'open';
	if (return_data.doors.rear_right)  doors.rear.right  = 'open';

	$('#doors-hood').text('Hood ' + doors.hood);
	$('#doors-trunk').text('Trunk ' + doors.trunk);

	$('#doors-front-left').text('Door ' + doors.front.left);
	$('#doors-front-right').text('Door ' + doors.front.right);
	$('#doors-rear-left').text('Door ' + doors.rear.left);
	$('#doors-rear-right').text('Door ' + doors.rear.right);


	// Window status
	const windows = {
		roof : 'closed',

		front : { left : 'closed', right : 'closed' },
		rear  : { left : 'closed', right : 'closed' },
	};

	if (return_data.doors.roof) doors.roof = 'open';

	if (return_data.windows.front_left)  windows.front.left  = 'open';
	if (return_data.windows.front_right) windows.front.right = 'open';
	if (return_data.windows.rear_left)   windows.rear.left   = 'open';
	if (return_data.windows.rear_right)  windows.rear.right  = 'open';

	$('#doors-roof').text('Roof ' + doors.roof);
	$('#doors-trunk').text('Trunk ' + doors.trunk);

	$('#windows-front-left').text('Window ' + windows.front.left);
	$('#windows-front-right').text('Window ' + windows.front.right);
	$('#windows-rear-left').text('Window ' + windows.rear.left);
	$('#windows-rear-right').text('Window ' + windows.rear.right);


	// Interior lighting
	let interior_lights_text = 'off';
	if (return_data.lights.interior) interior_lights_text = 'on';
	$('#lights-interior').text('Interior lights ' + interior_lights_text);


	// Central locking
	let locked_text = 'Unlocked';
	if (return_data.vehicle.locked) locked_text = 'Locked';
	$('#vehicle-locked').text(locked_text);


	// Current, average, and limit speed
	if (typeof return_data.coding.unit.speed !== 'string' && return_data.coding.unit.speed === null) return_data.coding.unit.speed = 'mph';

	$('#vehicle-speed-unit').text(return_data.coding.unit.speed.toUpperCase());
	$('#obc-average-speed-unit').text(return_data.coding.unit.speed.toUpperCase());
	$('#obc-speedlimit-unit').text(return_data.coding.unit.speed.toUpperCase());
	$('#obc-speedlimit').text(return_data.obc.speedlimit);

	$('#vehicle-speed').text(return_data.vehicle.speed[return_data.coding.unit.speed]);
	$('#obc-average-speed').text(return_data.obc.average_speed[return_data.coding.unit.speed]);


	// Distance to arrival and range to empty
	$('#obc-distance-unit').text(return_data.coding.unit.distance);
	$('#obc-range-unit').text(return_data.coding.unit.distance);
	$('#obc-distance').text(return_data.obc.distance);

	$('#obc-range').text(return_data.obc.range[return_data.coding.unit.distance]);


	// Fuel consumption
	$('#obc-consumption-1-unit').text(return_data.coding.unit.cons);
	$('#obc-consumption-2-unit').text(return_data.coding.unit.cons);

	$('#obc-consumption-1').text(return_data.obc.consumption.c1[return_data.coding.unit.cons]);
	$('#obc-consumption-2').text(return_data.obc.consumption.c2[return_data.coding.unit.cons]);


	// Stopwatch, timer, aux heat timers
	$('#obc-aux-heat-timer-1').text(return_data.obc.aux_heat_timer.t1);
	$('#obc-aux-heat-timer-2').text(return_data.obc.aux_heat_timer.t2);
	$('#obc-stopwatch').text(return_data.obc.stopwatch);
	$('#obc-timer').text(return_data.obc.timer);


	// Coding data
	$('#obc-coding-unit-cons').text(return_data.coding.unit.cons);
	$('#obc-coding-unit-distance').text(return_data.coding.unit.distance);
	$('#obc-coding-unit-speed').text(return_data.coding.unit.speed);
	$('#obc-coding-unit-temp').text(return_data.coding.unit.temp);
	$('#obc-coding-unit-time').text(return_data.coding.unit.time);
}

function obc_refresh(callback) {
	// Data refresh from OBC/IKE
	$.ajax({
		url      : '/api/ike',
		type     : 'POST',
		dataType : 'json',
		data     : 'obc-get=all',
		success  : (return_data) => {
			console.log(return_data);
			if (typeof callback === 'function') callback();
		},
	});
}

function lcm_pulse() {
	// Pulse clamps 15, 30A, 30B, once
	$.ajax({
		url      : '/api/lcm',
		type     : 'POST',
		dataType : 'json',
		data     : 'clamp_15=on&clamp_30a=on&clamp_30b=on',
		success  : (return_data) => {
			console.log(return_data);
		},
	});
}


// Live IBUS data websocket
function ws_ibus() {
	// Open WebSocket
	const socket = io();

	socket.on('connect', () => {
		$('#ws-bus-header').removeClass('text-warning').removeClass('text-success').removeClass('text-danger').addClass('text-success').text('Socket connected');
	});

	socket.on('error', (error) => {
		console.error(error);
		$('#ws-bus-header').removeClass('text-warning').removeClass('text-success').addClass('text-danger').removeClass('text-success').text('Socket error');
	});

	socket.on('disconnect', () => {
		$('#ws-bus-header').removeClass('text-warning').removeClass('text-danger').addClass('text-warning').removeClass('text-success').text('Socket disconnected');
	});

	socket.on('data-receive', (data) => {
		let msg_fmt     = '';
		const timestamp = moment().format('h:mm:ss a');

		// Format the message
		data.msg.forEach((bit) => {
			// Convert it to hexadecimal
			msg_fmt += i2s(bit, false) + ' ';
		});

		// Add a new row to the table
		let tr = '';
		tr += '<tr>';
		tr += '<td>' + timestamp + '</td>';
		tr += '<td>' + data.bus + '</td>';
		tr += '<td>' + data.src.name + '</td>';
		tr += '<td>' + data.dst.name + '</td>';
		tr += '<td>' + msg_fmt + '</td>';
		tr += '</tr>';

		$('#ws-bus-table tbody').prepend(tr);
	});

	// Assemble and send data from form below table
	$('#ws-bus-send').click(() => {
		const data_send = {};

		// Parse incoming data
		data_send.src = $('#ws-bus-src').val();
		data_send.dst = $('#ws-bus-dst').val();

		// Create the message array by removing whitespaces and splitting by comma
		data_send.msg = $('#ws-bus-msg').val().replace(' ', '').replace('0x', '').split(',');

		// Format the message
		const msg_array = [];
		for (let i = 0; i < data_send.msg.length; i++) {
			// Convert it to hexadecimal
			msg_array.push(parseInt(data_send.msg[i], 16));
		}
		data_send.msg = msg_array;

		socket.emit('data-send', data_send);
	});
}

function gauge_redraw(gauge_id_dot, value) {
	const gauge_id_dash = gauge_id_dot.replace(/status\./g, '').replace(/\./g, '-');

	if (typeof gauges[gauge_id_dash] === 'undefined') return false;

	if (typeof gauges[gauge_id_dash].redraw !== 'function') return false;

	gauges[gauge_id_dash].redraw(value);

	return true;
}


// For gauges where a high value is undesirable
function gauge_create(name, label, min = 0, max = 100, minorTicks = 10, size = gauge_sizes.small) {
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

	log('[gauge_create] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}

// For gauges where both low and high values are undesirable
function gauge_create_lowHigh(name, label, min = 0.75, max = 1.25, minorTicks = 5, size = gauge_sizes.landscape2) {
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

	log('[gauge_create_lowHigh] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}

// For gauges where a low value is undesirable
function gauge_create_reverse(name, label, min = 0, max = 100, minorTicks = 10, size = gauge_sizes.small) {
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

	log('[gauge_create_reverse] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}

// For temperature gauges
function gauge_create_temp(name, label, min = -20, max = 110, minorTicks = 5, size = gauge_sizes.landscape4) {
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

	log('[gauge_create_temp] ' + name);

	gauges[name] = new Gauge(name + '-container', config);
	gauges[name].render();
}


function on_config_tx(data) {
	if (window.socket_debug === true) console.log(data);
}

function on_log_tx(data) {
	if (window.socket_debug === true) console.log(JSON.stringify(data, null, 2));
}

function on_status_tx(data) {
	if (window.socket_debug === true) console.log('on_status_tx()', data);

	if (window.page_view !== 'dash') return;

	const prefix = 'status.' + data.key.stub;

	// YEAH BABY I THOUGHT SO
	Object.entries(data.value.full).forEach(([ key_00, value_00 ]) => {
		const prefix_00     = prefix + '.' + key_00;
		const type_value_00 = get_type(value_00);

		if (type_value_00 !== 'array' && type_value_00 !== 'object') {
			let redraw = null;
			if (type_value_00 === 'number') redraw = gauge_redraw(prefix_00, value_00);
			// console.log('[00] %s (%s) =', prefix_00, type_value_00, value_00, redraw);
			return;
		}

		Object.entries(value_00).forEach(([ key_01, value_01 ]) => {
			const prefix_01     = prefix_00 + '.' + key_01;
			const type_value_01 = get_type(value_01);

			if (type_value_01 !== 'array' && type_value_01 !== 'object') {
				let redraw = null;
				if (type_value_01 === 'number') redraw = gauge_redraw(prefix_01, value_01);
				// console.log('[01] %s (%s) =', prefix_01, type_value_01, value_01, redraw);
				return;
			}

			Object.entries(value_01).forEach(([ key_02, value_02 ]) => {
				const prefix_02     = prefix_01 + '.' + key_02;
				const type_value_02 = get_type(value_02);

				if (type_value_02 !== 'array' && type_value_02 !== 'object') {
					let redraw = null;
					if (type_value_02 === 'number') redraw = gauge_redraw(prefix_02, value_02);
					// console.log('[02] %s (%s) =', prefix_02, type_value_02, value_02, redraw);
					return;
				}

				Object.entries(value_02).forEach(([ key_03, value_03 ]) => {
					const prefix_03     = prefix_02 + '.' + key_02;
					const type_value_03 = get_type(value_03);

					if (type_value_03 !== 'array' && type_value_03 !== 'object') {
						let redraw = null;
						if (type_value_03 === 'number') redraw = gauge_redraw(prefix_03, value_03);
						// console.log('[03] %s (%s) =', prefix_03, type_value_03, value_03, redraw);
					}
				});
			});
		});
	});
}


// Send data over WebSocket
function send(event, data = null) {
	socket.emit('client-tx', { event, data });
}


function init_dash() {
	log('init_dash()');

	gauge_create('engine-throttle-pedal',                   'Ped %', 0, 100,  5, gauge_sizes.landscape4);
	// gauge_create('engine-rpm',                              'RPM',  0, 7000, 5, gauge_sizes.landscape4);
	gauge_create('engine-torque_value-after_interventions', 'lb-ft', 0, 400, 5, gauge_sizes.landscape4);
	gauge_create('engine-horsepower-after_interventions',   'HP',    0, 400, 5, gauge_sizes.landscape4);

	gauge_create_lowHigh('engine-lambda-lambda', 'λ', 0.75, 1.25, 5, gauge_sizes.landscape4);

	gauge_create('vehicle-dsc-torque_intervention_asc',    'ASC %',    0, 100, 10, gauge_sizes.landscape4);
	gauge_create('vehicle-dsc-torque_intervention_asc_lm', 'ASC LM %', 0, 100, 10, gauge_sizes.landscape4);
	gauge_create('vehicle-dsc-torque_intervention_msr',    'MSR %',    0, 100, 10, gauge_sizes.landscape4);

	// gauge_create('engine-torque-loss',                 'Loss %',    0, 100, 10, gauge_sizes.landscape4);
	gauge_create('engine-torque-output',               'Out %',     0, 100, 10, gauge_sizes.landscape4);
	gauge_create('engine-torque-before_interventions', 'Before %',  0, 100, 10, gauge_sizes.landscape4);
	gauge_create('engine-torque-after_interventions',  'After %',   0, 100, 10, gauge_sizes.landscape4);

	gauge_create_temp('temperature-coolant-c',  'Coolant', 60, 100);
	gauge_create_temp('temperature-oil-c',      'Oil',     60, 100);
	gauge_create_temp('temperature-intake-c',   'IAT',      0,  40);
	gauge_create_temp('temperature-exhaust-c',  'EGT',    300, 900);

	gauge_create('engine-ac-request', 'A/C request', 0, 100, 5, gauge_sizes.landscape4);
	gauge_create('engine-ac-torque',  'A/C torque',  0, 100, 5, gauge_sizes.landscape4);

	gauge_create_lowHigh('dme-voltage',             'DME', 12, 16, 5, gauge_sizes.landscape4);
	gauge_create_lowHigh('lcm-voltage-terminal_30', 'LCM', 12, 16, 5, gauge_sizes.landscape4);

	gauge_create('vehicle-wheel_speed-front-left',  'FL', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-front-right', 'FR', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-rear-left',   'RL', 0, 240, 5, gauge_sizes.medium);
	gauge_create('vehicle-wheel_speed-rear-right',  'RR', 0, 240, 5, gauge_sizes.medium);

	// gauge_create('fuel-consumption', 'Fuel cons', 0, 100);

	gauge_create_reverse('obc-average_speed-mph',  'MPH',    0,  85);
	gauge_create_reverse('obc-consumption-c1-mpg', 'MPG1',   0,  35);
	gauge_create_reverse('obc-consumption-c2-mpg', 'MPG2',   0,  35);
	gauge_create_reverse('obc-range-mi',           'Range',  0, 500);
	gauge_create_reverse('fuel-level',             'Fuel %', 0, 100, 2);
	gauge_create_reverse('fuel-pump-percent',      'EKP %',  0, 100);

	gauge_create('vehicle-steering-angle', '°', -675, 675, 5);
}

function init_listeners() {
	const buttons = {
		obc : {
			get   : document.getElementById('btn-obc-value-get'),
			reset : document.getElementById('btn-obc-value-reset'),
		},
	};

	if (buttons.obc.get !== null) {
		buttons.obc.get.addEventListener('pointerup', () => { obc_get(); });
	}

	if (buttons.obc.reset !== null) {
		buttons.obc.reset.addEventListener('pointerup', () => { obc_reset(); });
	}
}

function respondToVisibility(elementId) {
	const element = document.getElementById(`${elementId}-container`);

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
		const gaugeElementId = gaugeElement.id.replace('-container', '');
		console.log('[initDashVisibility] gaugeElementId: %o', gaugeElementId);
		respondToVisibility(gaugeElementId);
	}
}


// Dashboard websocket
function init_websocket() {
	log('init_websocket()');

	ws_set_status('connecting');

	// Open WebSocket
	socket = io();

	socket.on('connect', () => {
		ws_set_status('connect');
		log('connected');
		send('status-request', 'all');

		if (window.page_view === 'dash') {
			initDashVisibility();
		}
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


$(() => {
	$('body').bootstrapMaterialDesign();

	init_listeners();
	init_websocket();
});
