<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
	</head>

	<body class="container-dash">
		<?php include './include/navbar.php'; ?>

		<div class="container-fluid">
			<!-- Misc -->
			<!--
			<i class="material-icons position-absolute">toll</i>
			<span class="d3-gauge" id="engine-speed-container"></span>
			<span class="d3-gauge" id="engine-throttle-pedal-container"></span>
			<hr>
			-->

			<!-- DSC/Torque output data -->
			<i class="material-icons position-absolute">track_changes</i>
			<span class="d3-gauge" id="engine-torque-loss-container"></span>
			<span class="d3-gauge" id="engine-torque-before_interventions-container"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_reduction_1-container"></span>
			<span class="d3-gauge" id="engine-torque-output-container"></span>
			<span class="d3-gauge" id="engine-torque-after_interventions-container"></span>
			<span class="d3-gauge" id="vehicle-dsc-torque_reduction_2-container"></span>
			<hr>

			<!-- Temperatures -->
			<i class="material-icons position-absolute">hot_tub</i>
			<span class="d3-gauge" id="temperature-coolant-c-container"></span>
			<span class="d3-gauge" id="temperature-exhaust-c-container"></span>
			<span class="d3-gauge" id="temperature-exterior-c-container"></span>
			<span class="d3-gauge" id="temperature-intake-c-container"></span>
			<span class="d3-gauge" id="temperature-oil-c-container"></span>
			<span class="d3-gauge" id="engine-atmospheric_pressure-psi-container"></span>
			<span class="d3-gauge" id="system-temperature-container"></span>
			<hr>

			<!-- Ignition/power/voltage/etc -->
			<i class="material-icons position-absolute">power_settings_new</i>
			<span class="d3-gauge" id="dme-voltage-container"></span>
			<span class="d3-gauge" id="lcm-voltage-terminal_30-container"></span>
			<span class="d3-gauge" id="vehicle-ignition_level-container"></span>
			<span class="d3-gauge" id="gpio-relay_0-container"></span>
			<span class="d3-gauge" id="gpio-relay_1-container"></span>
			<span class="d3-gauge" id="engine-aux_fan_speed-container"></span>
			<hr>

			<!-- OBC data -->
			<i class="material-icons position-absolute">computer</i>
			<span class="d3-gauge" id="system-cpu-load_pct-container"></span>
			<!--
			<span class="d3-gauge" id="system-cpu-speed-container"></span>
			-->
			<span class="d3-gauge" id="obc-average_speed-mph-container"></span>
			<span class="d3-gauge" id="obc-consumption-c1-mpg-container"></span>
			<span class="d3-gauge" id="obc-consumption-c2-mpg-container"></span>
			<span class="d3-gauge" id="fuel-level-container"></span>
			<span class="d3-gauge" id="fuel-pump-duty-percent-container"></span>
			<span class="d3-gauge" id="obc-range-mi-container"></span>
			<hr>

			<i class="material-icons position-absolute">toll</i>
			<!-- Wheel speeds -->
			<span class="d3-gauge" id="vehicle-wheel_speed-front-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-front-right-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-left-container"></span>
			<span class="d3-gauge" id="vehicle-wheel_speed-rear-right-container"></span>
			<hr>

			<!-- Steering -->
			<i class="material-icons position-absolute">donut_small</i>
			<span class="d3-gauge" id="vehicle-steering-angle-container"></span>
			<span class="d3-gauge" id="vehicle-steering-velocity-container"></span>
			<hr>

		</div>
	</body>

	<?php include './include/js.php'; ?>
</html>
