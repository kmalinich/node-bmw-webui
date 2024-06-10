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
			<div class="conical-gauge-wrapper">
				<div id="engine-throttle-pedal-container" class="conical-gauge"></div>
				<span class="label"></span>
				<div class="controls">
					<button class="control decrease">Decrease</button>
					<button class="control increase">Increase</button>
				</div>
			</div>
			<!--
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="engine-throttle-pedal-container"></span>
			<!-- <span class="d3-gauge" id="engine-rpm-container"></span> -->
			<!--
			<span class="d3-gauge" id="engine-torque_value-after_interventions-container"></span>
			<span class="d3-gauge" id="engine-horsepower-after_interventions-container"></span>
			-->

			<!--
			<h3>Torque %</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_asc-container"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_asc_lm-container"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_msr-container"></span>
			<span class="d3-gauge" id="engine-torque-output-container"></span>
			<span class="d3-gauge" id="engine-torque-before_interventions-container"></span>
			<span class="d3-gauge" id="engine-torque-after_interventions-container"></span>

			<h3>Temperatures</h3>
			<hr>
			<i class="material-icons position-absolute">hot_tub</i>
			<span class="d3-gauge" id="temperature-coolant-c-container"></span>
			<span class="d3-gauge" id="temperature-oil-c-container"></span>
			<span class="d3-gauge" id="temperature-intake-c-container"></span>
			<span class="d3-gauge" id="temperature-exhaust-c-container"></span>
			<span class="d3-gauge" id="temperature-exterior-c-container"></span>
			<span class="d3-gauge" id="engine-atmospheric_pressure-psi-container"></span>
			<span class="d3-gauge" id="system-temperature-container"></span>

			<!-- Ignition/power/voltage/etc -->
			<!--
			<h3>Voltage/power</h3>
			<hr>
			<i class="material-icons position-absolute">power_settings_new</i>
			<span class="d3-gauge" id="dme-voltage-container"></span>
			<span class="d3-gauge" id="lcm-voltage-terminal_30-container"></span>
			<span class="d3-gauge" id="vehicle-ignition_level-container"></span>
			<!-- <span class="d3-gauge" id="gpio-relay_0-container"></span> -->
			<!-- <span class="d3-gauge" id="gpio-relay_1-container"></span> -->
			<!--
			<span class="d3-gauge" id="engine-aux_fan_speed-container"></span>
			-->

			<!-- OBC data -->
			<!--
			<h3>OBC</h3>
			<hr>
			<i class="material-icons position-absolute">computer</i>
			<span class="d3-gauge" id="system-cpu-load_pct-container"></span>
			<!--
			<span class="d3-gauge" id="system-cpu-speed-container"></span>
			-->
			<!--
			<span class="d3-gauge" id="obc-average_speed-mph-container"></span>
			<span class="d3-gauge" id="obc-consumption-c1-mpg-container"></span>
			<span class="d3-gauge" id="obc-consumption-c2-mpg-container"></span>
			<!-- <span class="d3-gauge" id="fuel-consumption-container"></span> -->
			<!--
			<span class="d3-gauge" id="fuel-level-container"></span>
			<span class="d3-gauge" id="fuel-pump-percent-container"></span>
			<span class="d3-gauge" id="obc-range-mi-container"></span>
			-->

			<!-- Wheel speeds -->
			<!--
			<h3>Wheel speeds</h3>
			<hr>
			<i class="material-icons position-absolute">toll</i>
			<span class="d3-gauge" id="vehicle-wheel_speed-front-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-front-right-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-right-container"></span>
			-->

			<!-- Steering -->
			<!--
			<h3>Steering</h3>
			<hr>
			<i class="material-icons position-absolute">donut_small</i>
			<span class="d3-gauge" id="vehicle-steering-angle-container"></span>
			-->
		</div>
	</body>

	<script type="text/javascript">
		window.page_view = 'dash2';
	</script>

	<script src="js/socket.io.js" type="text/javascript"></script>
	<script src="js/jquery.js"    type="text/javascript"></script>

	<script src="js/popper.js"   type="text/javascript"></script>
	<script src="js/material.js"   type="text/javascript"></script>

	<script src="js/gauge-chart-js/dist/index.js" type="text/javascript"></script>
	<script type="module" src="js/dash2.mjs" type="text/javascript"></script>

	<script src="js/node-bmw.js" type="text/javascript"></script>
</html>
