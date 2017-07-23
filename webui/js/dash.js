function set_status_ws(status) {
}

// Dashboard websocket
function init_dash() {
	// Open WebSocket
	var socket = io();

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
		var msg_fmt   = '';
		var timestamp = moment().format('h:mm:ss a');

		// Format the message
		data.msg.forEach((bit) => {
			// Convert it to hexadecimal
			msg_fmt += i2s(bit, false)+' ';
		});

		// Add a new row to the table
		var tr = '';
		tr += '<tr>';
		tr += '<td>'+timestamp+'</td>';
		tr += '<td>'+data.bus+'</td>';
		tr += '<td>'+data.src.name+'</td>';
		tr += '<td>'+data.dst.name+'</td>';
		tr += '<td>'+msg_fmt+'</td>';
		tr += '</tr>';

		$('#ws-bus-table tbody').prepend(tr);
	});

	// Assemble and send data from form below table
	$('#ws-bus-send').click(() => {
		var data_send = {};

		// Parse incoming data
		data_send.src = $('#ws-bus-src').val();
		data_send.dst = $('#ws-bus-dst').val();

		// Create the message array by removing whitespaces and splitting by comma
		data_send.msg = $('#ws-bus-msg').val().replace(' ', '').replace('0x', '').split(',');

		// Format the message
		var msg_array = [];
		for (var i = 0; i < data_send.msg.length; i++) {
			// Convert it to hexadecimal
			msg_array.push(parseInt(data_send.msg[i], 16));
		}
		data_send.msg = msg_array;

		socket.emit('data-send', data_send);
	});
}

$(() => {
	$.material.init();
});
