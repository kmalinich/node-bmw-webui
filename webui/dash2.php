<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
		<link rel="stylesheet" type="text/css" href="css/dash2.css">
	</head>

	<body>
		<?php include './include/navbar.php'; ?>

		<div class="container-fluid">
			<!-- Engine -->
			<h3>Engine</h3>
			<hr>
			<div id="engine-throttle-pedal-container" style="width: 400px; height: 320px;"></div>
		</div>
	</body>

	<script type="text/javascript">
		window.page_view = 'dash2';
	</script>

	<script src="js/socket.io.js"></script>
	<script src="js/jquery.js"></script>

	<script src="js/popper.js"></script>
	<script src="js/material.js"></script>


	<script src="js/dash2.mjs" type="module"></script>
	<script src="js/node-bmw.js"></script>
</html>
