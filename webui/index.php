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
			<span class="d3-gauge" id="engine-throttle-pedal-container"></span>
			<!-- <span class="d3-gauge" id="engine-rpm-container"></span> -->
			<span class="d3-gauge" id="engine-torque_value-after_interventions-container"></span>
			<span class="d3-gauge" id="engine-horsepower-after_interventions-container"></span>

			<h3>Lambda</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="engine-lambda-lambda-container"></span>
			<span class="d3-gauge" id="engine-lambda-warmup-container"></span>

			<h3>Torque %</h3>
			<hr>
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="vehicle-dsc-torque_reduction_1-container"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_reduction_2-container"></span>
			<span class="d3-gauge" id="engine-torque-loss-container"></span>
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
			<h3>Voltage/power</h3>
			<hr>
			<i class="material-icons position-absolute">power_settings_new</i>
			<span class="d3-gauge" id="dme-voltage-container"></span>
			<span class="d3-gauge" id="lcm-voltage-terminal_30-container"></span>
			<span class="d3-gauge" id="vehicle-ignition_level-container"></span>
			<!-- <span class="d3-gauge" id="gpio-relay_0-container"></span> -->
			<!-- <span class="d3-gauge" id="gpio-relay_1-container"></span> -->
			<span class="d3-gauge" id="engine-aux_fan_speed-container"></span>

			<!-- OBC data -->
			<h3>OBC</h3>
			<hr>
			<i class="material-icons position-absolute">computer</i>
			<span class="d3-gauge" id="system-cpu-load_pct-container"></span>
			<!--
			<span class="d3-gauge" id="system-cpu-speed-container"></span>
			-->
			<span class="d3-gauge" id="obc-average_speed-mph-container"></span>
			<span class="d3-gauge" id="obc-consumption-c1-mpg-container"></span>
			<span class="d3-gauge" id="obc-consumption-c2-mpg-container"></span>
			<!-- <span class="d3-gauge" id="fuel-consumption-container"></span> -->
			<span class="d3-gauge" id="fuel-level-container"></span>
			<span class="d3-gauge" id="fuel-pump-percent-container"></span>
			<span class="d3-gauge" id="obc-range-mi-container"></span>

			<h3>Wheel speeds</h3>
			<hr>
			<i class="material-icons position-absolute">toll</i>
			<!-- Wheel speeds -->
			<span class="d3-gauge" id="vehicle-wheel_speed-front-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-front-right-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-right-container"></span>

			<!-- Steering -->
			<h3>Steering</h3>
			<hr>
			<i class="material-icons position-absolute">donut_small</i>
			<span class="d3-gauge" id="vehicle-steering-angle-container"></span>
		</div>
	</body>

	<script type="text/javascript">
		window.page_view = 'dash';
	</script>

	<?php include './include/js.php'; ?>

	<script type="text/javascript">
		init_dash();
	</script>
</html>
