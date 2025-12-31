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
			<i class="material-icons position-absolute">track_changes</i>
			<div class="bmw-gauge" id="engine-throttle-pedal"></div>
			<div class="bmw-gauge" id="engine-torque_value-after_interventions"></div>
			<div class="bmw-gauge" id="engine-horsepower-after_interventions"></div>
			<div class="bmw-gauge" id="engine-lambda-lambda"></div>

			<h3>Torque %</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<div class="bmw-gauge" id="vehicle-dsc-torque_intervention_asc"></div>
			<div class="bmw-gauge" id="vehicle-dsc-torque_intervention_asc_lm"></div>
			<div class="bmw-gauge" id="vehicle-dsc-torque_intervention_msr"></div>
			<div class="bmw-gauge" id="engine-torque-output"></div>
			<div class="bmw-gauge" id="engine-torque-before_interventions"></div>
			<div class="bmw-gauge" id="engine-torque-after_interventions"></div>

			<h3>Temperatures</h3>
			<hr>
			<i class="material-icons position-absolute">hot_tub</i>
			<div class="bmw-gauge" id="temperature-coolant-c"></div>
			<div class="bmw-gauge" id="temperature-oil-c"></div>
			<div class="bmw-gauge" id="temperature-intake-c"></div>
			<div class="bmw-gauge" id="temperature-exhaust-c"></div>

			<!-- Ignition/power/voltage/etc -->
			<h3>Voltage/power</h3>
			<hr>
			<i class="material-icons position-absolute">power_settings_new</i>
			<div class="bmw-gauge" id="dme-voltage"></div>
			<div class="bmw-gauge" id="lcm-voltage-terminal_30"></div>
			<div class="bmw-gauge" id="engine-ac-request"></div>
			<div class="bmw-gauge" id="engine-ac-torque"></div>

			<!-- OBC data -->
			<h3>OBC</h3>
			<hr>
			<i class="material-icons position-absolute">computer</i>
			<div class="bmw-gauge" id="obc-average_speed-mph"></div>
			<div class="bmw-gauge" id="obc-consumption-c1-mpg"></div>
			<div class="bmw-gauge" id="obc-consumption-c2-mpg"></div>
			<!-- <div class="bmw-gauge" id="fuel-consumption"></div> -->
			<div class="bmw-gauge" id="fuel-level"></div>
			<div class="bmw-gauge" id="fuel-pump-percent"></div>
			<div class="bmw-gauge" id="obc-range-mi"></div>

			<h3>Wheel speeds</h3>
			<hr>
			<i class="material-icons position-absolute">toll</i>
			<!-- Wheel speeds -->
			<div class="bmw-gauge" id="vehicle-wheel_speed-front-left"></div>
			<div class="bmw-gauge" id="vehicle-wheel_speed-front-right"></div>
			<div class="bmw-gauge" id="vehicle-wheel_speed-rear-left"></div>
			<div class="bmw-gauge" id="vehicle-wheel_speed-rear-right"></div>

			<!-- Steering -->
			<h3>Steering</h3>
			<hr>
			<i class="material-icons position-absolute">donut_small</i>
			<div class="bmw-gauge" id="vehicle-steering-angle"></div>
		</div>
	</body>

	<script type="text/javascript">
		window.pageView    = 'dash';
		window.dashVersion = 2;
	</script>

	<?php include './include/js.php'; ?>

	<script src="js/node-bmw.js"></script>
	<script src="js/dash.js"></script>
	<script src="js/dash2.mjs" type="module"></script>
</html>
