/* eslint no-console     : 0 */
/* eslint no-unused-vars : 0 */

window.socket_debug = false;

let socket;


// Toggle debug console output on and off
function debug_toggle() {
	window.socket_debug = !window.socket_debug;
	console.log('[node-bmw] [debug_toggle] window.socket_debug = ' + window.socket_debug);
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


// Clean all the text strings
function clean_class_all() {
	// This is really dumb and there are so many better ways
	clean_class('engine-running');
	clean_class('engine-speed');
	clean_class('doors-front-left');
	clean_class('doors-front-right');
	clean_class('doors-hood');
	clean_class('doors-rear-left');
	clean_class('doors-rear-right');
	clean_class('doors-trunk');
	clean_class('obc-aux-heat-timer-1');
	clean_class('obc-aux-heat-timer-2');
	clean_class('obc-coding-unit-cons');
	clean_class('obc-coding-unit-distance');
	clean_class('obc-coding-unit-speed');
	clean_class('obc-coding-unit-temp');
	clean_class('obc-coding-unit-time');
	clean_class('obc-consumption-1');
	clean_class('obc-consumption-1-unit');
	clean_class('obc-consumption-2');
	clean_class('obc-consumption-2-unit');
	clean_class('obc-date');
	clean_class('obc-distance');
	clean_class('obc-distance-unit');
	clean_class('obc-range');
	clean_class('obc-range-unit');
	clean_class('obc-average-speed');
	clean_class('obc-average-speed-unit');
	clean_class('obc-limit');
	clean_class('obc-limit-unit');
	clean_class('obc-stopwatch');
	clean_class('obc-temp-exterior');
	clean_class('obc-temp-exterior-unit');
	clean_class('obc-time');
	clean_class('obc-timer');
	clean_class('temperature-coolant');
	clean_class('temperature-coolant-unit');
	clean_class('vehicle-handbrake');
	clean_class('vehicle-ignition');
	clean_class('vehicle-reverse');
	clean_class('vehicle-speed');
	clean_class('vehicle-speed-unit');
	clean_class('windows-front-left');
	clean_class('windows-front-right');
	clean_class('windows-rear-left');
	clean_class('windows-rear-right');
	clean_class('windows-roof');
	// clean_class('');
}

// Remove all color-coded CSS classes from a text id
function clean_class(id) {
	console.log('clean_class(%o)', id);
	const elem = document.getElementById(id);

	// LOL, typescript does exist
	if (typeof elem === 'undefined' || elem === null) return;

	elem.classList.remove('text-danger');
	elem.classList.remove('text-success');
	elem.classList.remove('text-warning');
	elem.classList.remove('text-primary');
	elem.classList.remove('text-info');
	elem.innerHTML = '';
}


function hdmi_command(command) {
	fetch('/api/client/hdmi', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify({ command }),
	});
}


function ike_set_clock() {
	fetch('/api/client/obc/set/clock');
}

function ike_text() {
	const ikeText = document.getElementById('ike-text').value;
	fetch(`/api/client/ike/text/normal/${ikeText}`);
}

function obc_get() {
	const obcValue = document.getElementById('select-obc-value').value;
	fetch(`/api/client/obc/get/${obcValue}`);
}

function obc_reset() {
	const obcValue = document.getElementById('select-obc-value').value;
	fetch(`/api/client/obc/reset/${obcValue}`);
}


function form_lcm() {
	fetch('/api/client/lcm/io-encode', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify(form2json(document.getElementsByName('form-lcm')[0])),
	});
}

// Central locking/unlocking
function gm_locks() {
	// TODO: This one is an oddball, it just toggles the door locks
	fetch('/api/client/gm/locks', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
	});
}

// AJAX for GM interior_light
function gm_interior_light(value) {
	fetch(`/api/client/gm/interior-light/${value}`);
}

// GM window control
function gm_windows(window, action) {
	console.log('gm_windows(%s, %s);', window, action);

	fetch('/api/client/gm/windows', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify({ action, window }),
	});
}

// Get GM IO status
function gm_get() {
	console.log('gm_get()');

	fetch('/api/client/gm', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify({ command : 'door-status' }),
	});

	fetch('/api/client/gm', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify({ command : 'io-status' }),
	});
}


// AJAX for LCM dimmer
function lcm_dimmer(value) {
	console.log('lcm_dimmer(%s);', value);
	fetch(`/api/client/lcm/dimmer/${value}`);
}

// Get LCM IO status
function lcm_get() {
	console.log('lcm_get()');

	fetch('/api/client/lcm/get/io-status');
	fetch('/api/client/lcm/get/light-status');
	fetch('/api/client/lcm/get/vehicledata');
	fetch('/api/client/lcm/get/coding');
	fetch('/api/client/lcm/get/dimmer');
}


// Prepare GM page
function prepare_gm() {
	prepare_gm_interior_light();
}

// Initialize GM interior_light slider
function prepare_gm_interior_light() {
	const slider = document.getElementById('slider-gm-interior-light');

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
	const slider = document.getElementById('slider-lcm-dimmer');

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
async function status() {
	const response = await fetch('/api/client/status');
	const data = await response.json();
	status_apply(data);
}

// Take status object, parse, and display
function status_apply(return_data) {
	if (window.socket_debug === true) console.log('status_apply()', return_data);

	// Clean up page
	clean_class_all();

	// Time and date
	document.getElementById('obc-time').innerText = return_data.obc.time;
	document.getElementById('obc-date').innerText = return_data.obc.date;


	// Engine status
	const engineSpeedElement = document.getElementById('engine-speed');
	if (typeof engineSpeedElement?.innerText === 'string') {
		engineSpeedElement.innerText = return_data.engine.speed;
	}

	let engine_class = 'danger';
	let engine_text  = 'off';

	if (return_data.engine.running) {
		engine_class = 'success';
		engine_text  = 'running';
	}

	const engineRunningElement = document.getElementById('engine-running');
	engineRunningElement.innerText = 'Engine ' + engine_text;
	engineRunningElement.classList.add('text-' + engine_class);


	/*
	 * Temperatures
	 */

	// Units
	if (!return_data.coding.unit.temp) {
		return_data.coding.unit.temp = 'c';
	}

	document.getElementById('temperature-coolant-unit').innerText = return_data.coding.unit.temp.toUpperCase();
	document.getElementById('obc-temp-exterior-unit').innerText = return_data.coding.unit.temp.toUpperCase();

	switch (return_data.coding.unit.temp) {
		case 'c' : {
			document.getElementById('temperature-coolant').innerText = return_data.temperature.coolant.c;
			document.getElementById('obc-temp-exterior').innerText = return_data.temperature.exterior.obc.c;
			break;
		}
		case 'f' : {
			document.getElementById('temperature-coolant').innerText = return_data.temperature.coolant.f;
			document.getElementById('obc-temp-exterior').innerText = return_data.temperature.exterior.obc.f;
		}
	}

	document.getElementById('vehicle-odometer-mi').innerText = return_data.vehicle.odometer.mi;
	document.getElementById('vehicle-vin').innerText = return_data.vehicle.vin;


	// Handbrake
	let handbrake_class = 'success';
	let handbrake_text  = 'off';

	if (return_data.vehicle.handbrake) {
		handbrake_class = 'danger';
		handbrake_text  = 'on';
	}

	const vehicleHandbrakeElement = document.getElementById('vehicle-handbrake');
	vehicleHandbrakeElement.innerText = `Handbrake ${handbrake_text}`;
	vehicleHandbrakeElement.classList.add(`text-${handbrake_class}`);


	// Reverse
	let reverse_class = 'success';
	let reverse_text  = 'disengaged';

	if (return_data.vehicle.reverse) {
		reverse_class = 'danger';
		reverse_text  = 'engaged';
	}

	const vehicleReverseElement = document.getElementById('vehicle-reverse');
	vehicleReverseElement.innerText = `Reverse ${reverse_text}`;
	vehicleReverseElement.classList.add(`text-${reverse_class}`);


	// Ignition
	let ignition_class = 'danger';

	switch (return_data.vehicle.ignition) {
		case 'run'       : ignition_class = 'success'; break;
		case 'accessory' : ignition_class = 'info';    break;
		case 'start'     : ignition_class = 'warning';
	}

	const vehicleIgnitionElement = document.getElementById('vehicle-ignition');
	vehicleIgnitionElement.innerText = `Ignition ${return_data.vehicle.ignition}`;
	vehicleIgnitionElement.classList.add(`text-${ignition_class}`);


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

	document.getElementById('doors-hood').innerText  = 'Hood ' + doors.hood;
	document.getElementById('doors-trunk').innerText = 'Trunk ' + doors.trunk;

	document.getElementById('doors-front-left').innerText  = 'Door ' + doors.front.left;
	document.getElementById('doors-front-right').innerText = 'Door ' + doors.front.right;
	document.getElementById('doors-rear-left').innerText   = 'Door ' + doors.rear.left;
	document.getElementById('doors-rear-right').innerText  = 'Door ' + doors.rear.right;


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

	document.getElementById('windows-roof').innerText        = 'Roof ' + windows.roof;
	document.getElementById('windows-front-left').innerText  = 'Window ' + windows.front.left;
	document.getElementById('windows-front-right').innerText = 'Window ' + windows.front.right;
	document.getElementById('windows-rear-left').innerText   = 'Window ' + windows.rear.left;
	document.getElementById('windows-rear-right').innerText  = 'Window ' + windows.rear.right;


	// Interior lighting
	let interior_lights_text = 'off';
	if (return_data.lights.interior) interior_lights_text = 'on';
	document.getElementById('lights-interior').innerText = 'Interior lights ' + interior_lights_text;


	// Central locking
	let locked_text = 'Unlocked';
	if (return_data.vehicle.locked) locked_text = 'Locked';
	document.getElementById('vehicle-locked').innerText = locked_text;


	// Current, average, and limit speed
	if (typeof return_data.coding.unit.speed !== 'string' && return_data.coding.unit.speed === null) return_data.coding.unit.speed = 'mph';

	document.getElementById('vehicle-speed').innerText      = return_data.vehicle.speed[return_data.coding.unit.speed];
	document.getElementById('vehicle-speed-unit').innerText = return_data.coding.unit.speed.toUpperCase();

	document.getElementById('obc-average-speed').innerText      = return_data.obc.average_speed[return_data.coding.unit.speed];
	document.getElementById('obc-average-speed-unit').innerText = return_data.coding.unit.speed.toUpperCase();

	document.getElementById('obc-limit').innerText      = return_data.obc.limit;
	document.getElementById('obc-limit-unit').innerText = return_data.coding.unit.speed.toUpperCase();


	// Distance to arrival and range to empty
	document.getElementById('obc-distance-unit').innerText = return_data.coding.unit.distance;
	document.getElementById('obc-distance').innerText      = return_data.obc.distance;

	document.getElementById('obc-range').innerText      = return_data.obc.range[return_data.coding.unit.distance];
	document.getElementById('obc-range-unit').innerText = return_data.coding.unit.distance;


	// Fuel consumption
	document.getElementById('obc-consumption-1').innerText      = return_data.obc.consumption.c1[return_data.coding.unit.cons];
	document.getElementById('obc-consumption-1-unit').innerText = return_data.coding.unit.cons;

	document.getElementById('obc-consumption-2').innerText      = return_data.obc.consumption.c2[return_data.coding.unit.cons];
	document.getElementById('obc-consumption-2-unit').innerText = return_data.coding.unit.cons;


	// Stopwatch, timer, aux heat timers
	document.getElementById('obc-aux-heat-timer-1').innerText = return_data.obc.aux_heat_timer.t1;
	document.getElementById('obc-aux-heat-timer-2').innerText = return_data.obc.aux_heat_timer.t2;
	document.getElementById('obc-stopwatch').innerText        = return_data.obc.stopwatch;

	let obcTimerValue = 0;
	if (return_data.obc.timer !== null) {
		obcTimerValue = return_data.obc.timer;
	}

	document.getElementById('obc-timer').innerText = obcTimerValue;


	// Coding data
	document.getElementById('obc-coding-unit-cons').innerText     = return_data.coding.unit.cons;
	document.getElementById('obc-coding-unit-distance').innerText = return_data.coding.unit.distance;
	document.getElementById('obc-coding-unit-speed').innerText    = return_data.coding.unit.speed;
	document.getElementById('obc-coding-unit-temp').innerText     = return_data.coding.unit.temp;
	document.getElementById('obc-coding-unit-time').innerText     = return_data.coding.unit.time;
}

// Data refresh from OBC/IKE
function obc_refresh(callback) {
	fetch('/api/client/obc/get-all');
}

function lcm_pulse() {
	// Pulse clamps 15, 30A, 30B, once
	fetch('/api/client/lcm/io-encode', {
		method  : 'POST',
		headers : { 'content-type': 'application/json' },
		body    : JSON.stringify({ clamp_15 : true, clamp_30a : true, clamp_30b : true }),
	});
}


// Live IBUS data websocket
// function ws_ibus() {
// 	// Open WebSocket
// 	const socket = io();
//
// 	socket.on('connect', () => {
// 		$('#ws-bus-header').removeClass('text-warning').removeClass('text-success').removeClass('text-danger').addClass('text-success').text('Socket connected');
// 	});
//
// 	socket.on('error', (error) => {
// 		console.error(error);
// 		$('#ws-bus-header').removeClass('text-warning').removeClass('text-success').addClass('text-danger').removeClass('text-success').text('Socket error');
// 	});
//
// 	socket.on('disconnect', () => {
// 		$('#ws-bus-header').removeClass('text-warning').removeClass('text-danger').addClass('text-warning').removeClass('text-success').text('Socket disconnected');
// 	});
//
// 	socket.on('data-receive', (data) => {
// 		let msg_fmt     = '';
// 		const timestamp = moment().format('h:mm:ss a');
//
// 		// Format the message
// 		data.msg.forEach((bit) => {
// 			// Convert it to hexadecimal
// 			msg_fmt += i2s(bit, false) + ' ';
// 		});
//
// 		// Add a new row to the table
// 		let tr = '';
// 		tr += '<tr>';
// 		tr += '<td>' + timestamp + '</td>';
// 		tr += '<td>' + data.bus + '</td>';
// 		tr += '<td>' + data.src.name + '</td>';
// 		tr += '<td>' + data.dst.name + '</td>';
// 		tr += '<td>' + msg_fmt + '</td>';
// 		tr += '</tr>';
//
// 		$('#ws-bus-table tbody').prepend(tr);
// 	});
//
// 	// Assemble and send data from form below table
// 	$('#ws-bus-send').click(() => {
// 		const data_send = {};
//
// 		// Parse incoming data
// 		data_send.src = $('#ws-bus-src').val();
// 		data_send.dst = $('#ws-bus-dst').val();
//
// 		// Create the message array by removing whitespaces and splitting by comma
// 		data_send.msg = $('#ws-bus-msg').val().replace(' ', '').replace('0x', '').split(',');
//
// 		// Format the message
// 		const msg_array = [];
// 		for (let i = 0; i < data_send.msg.length; i++) {
// 			// Convert it to hexadecimal
// 			msg_array.push(parseInt(data_send.msg[i], 16));
// 		}
// 		data_send.msg = msg_array;
//
// 		socket.emit('data-send', data_send);
// 	});
// }



function on_config_tx(data) {
	if (window.socket_debug === true) console.log(data);
}

function on_log_tx(data) {
	if (window.socket_debug === true) console.log(JSON.stringify(data, null, 2));
}

function on_status_tx(data) {
	if (window.socket_debug === true) console.log('[node-bmw] on_status_tx()', data);

	if (window.pageView !== 'dash') return;
	// if (window.dashVersion !== 1) return;

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


function init_listeners() {
	const buttons = {
		ike : {
			clear : document.getElementById('btn-ike-text-clear'),
			send  : document.getElementById('btn-ike-text-send'),
		},
		obc : {
			get   : document.getElementById('btn-obc-value-get'),
			reset : document.getElementById('btn-obc-value-reset'),
		},
	};

	if (buttons.ike.clear !== null) buttons.ike.clear.addEventListener('mousedown', () => { document.getElementById('ike-text').value = ''; });
	if (buttons.ike.send  !== null) buttons.ike.send.addEventListener('mousedown',  () => { ike_text(); });

	if (buttons.obc.get   !== null) buttons.obc.get.addEventListener('mousedown',   () => { obc_get(); });
	if (buttons.obc.reset !== null) buttons.obc.reset.addEventListener('mousedown', () => { obc_reset(); });
}


// Dashboard websocket
function init_websocket() {
	console.log('[node-bmw] init_websocket()');

	ws_set_status('connecting');

	// Open WebSocket
	socket = io();

	socket.on('connect', () => {
		ws_set_status('connected');
		console.log('[node-bmw][socket.onConnect] connected');
		send('status-request', 'all');

		if (window.pageView === 'dash') {
			initDashVisibility();
		}
	});

	socket.on('error', (error) => {
		ws_set_status('error');
		console.log('[node-bmw][socket.onError]');
		console.error(error);
	});

	socket.on('disconnect', () => {
		console.log('[node-bmw][socket.onDisconnect] disconnected');
		ws_set_status('disconnect');
	});

	socket.on('config-tx', on_config_tx);
	socket.on('log-tx',    on_log_tx);
	socket.on('status-tx', on_status_tx);
}

function ws_set_status(status) {
	console.log('ws_set_status(%o)', status);
	const wsStatusElement = document.getElementById('status-ws');


	if (typeof wsStatusElement?.classList !== 'object') return;

	wsStatusElement.classList.remove('btn-danger');
	wsStatusElement.classList.remove('btn-success');
	wsStatusElement.classList.remove('btn-warning');

	let statusClass = 'btn-warning';
	switch (status) {
		case 'connected'  : statusClass = 'btn-success'; break;
		case 'error'      : statusClass = 'btn-danger';  break;
		case 'disconnect' : statusClass = 'btn-danger';
	}

	let statusText = 'Connecting';
	switch (status) {
		case 'connected'  : statusText = 'Connected';    break;
		case 'error'      : statusText = 'Error';        break;
		case 'disconnect' : statusText = 'Disconnected';
	}

	console.log('ws_set_status(%o) :: %s :: %s', status, statusClass, statusText);

	wsStatusElement.classList.add(statusClass);
	wsStatusElement.innerText = statusText;
}


// document.querySelector('body').bootstrapMaterialDesign();

init_listeners();
init_websocket();
