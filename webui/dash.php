<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
	</head>

	<body>
		<?php include './include/navbar.php'; ?>

		<div class="container-fluid">
			<!-- Engine -->
			<h3>Engine</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="engine-throttle-pedal"></span>
			<!-- <span class="d3-gauge" id="engine-rpm"></span> -->
			<span class="d3-gauge" id="engine-torque_value-after_interventions"></span>
			<span class="d3-gauge" id="engine-horsepower-after_interventions"></span>
			<span class="d3-gauge" id="engine-lambda-lambda"></span>

			<h3>Torque %</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_asc"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_asc_lm"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_intervention_msr"></span>
			<span class="d3-gauge" id="engine-torque-output"></span>
			<span class="d3-gauge" id="engine-torque-before_interventions"></span>
			<span class="d3-gauge" id="engine-torque-after_interventions"></span>

			<h3>Temperatures</h3>
			<hr>
			<i class="material-icons position-absolute">hot_tub</i>
			<span class="d3-gauge" id="temperature-coolant-c"></span>
			<span class="d3-gauge" id="temperature-oil-c"></span>
			<span class="d3-gauge" id="temperature-intake-c"></span>
			<span class="d3-gauge" id="temperature-exhaust-c"></span>

			<!-- Ignition/power/voltage/etc -->
			<h3>Voltage/power</h3>
			<hr>
			<i class="material-icons position-absolute">power_settings_new</i>
			<span class="d3-gauge" id="dme-voltage"></span>
			<span class="d3-gauge" id="lcm-voltage-terminal_30"></span>
			<span class="d3-gauge" id="engine-ac-request"></span>
			<span class="d3-gauge" id="engine-ac-torque"></span>

			<!-- OBC data -->
			<h3>OBC</h3>
			<hr>
			<i class="material-icons position-absolute">computer</i>
			<span class="d3-gauge" id="obc-average_speed-mph"></span>
			<span class="d3-gauge" id="obc-consumption-c1-mpg"></span>
			<span class="d3-gauge" id="obc-consumption-c2-mpg"></span>
			<!-- <span class="d3-gauge" id="fuel-consumption"></span> -->
			<span class="d3-gauge" id="fuel-level"></span>
			<span class="d3-gauge" id="fuel-pump-percent"></span>
			<span class="d3-gauge" id="obc-range-mi"></span>

			<h3>Wheel speeds</h3>
			<hr>
			<i class="material-icons position-absolute">toll</i>
			<!-- Wheel speeds -->
			<span class="d3-gauge" id="vehicle-wheel_speed-front-left"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-front-right"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-left"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-right"></span>

			<!-- Steering -->
			<h3>Steering</h3>
			<hr>
			<i class="material-icons position-absolute">donut_small</i>
			<span class="d3-gauge" id="vehicle-steering-angle"></span>
		</div>
	</body>

	<script type="text/javascript">
		window.pageView    = 'dash';
		window.dashVersion = 1;
	</script>

	<?php include './include/js.php'; ?>

	<script src="js/d3.js"></script>
	<script src="js/gauge.js"></script>

	<script src="js/dash.js"></script>
	<script src="js/node-bmw.js"></script>
</html>
