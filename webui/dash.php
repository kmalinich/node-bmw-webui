<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
	</head>
	<body>
		<?php include './include/navbar.php'; ?>

		<div class="container-fluid">
			<!-- Misc -->
			<i class="material-icons position-absolute">toll</i>
			<span id="engine-speed-container"></span>
			<span id="engine-throttle-pedal-container"></span>
			<hr>

			<!-- Engine data -->
			<i class="material-icons position-absolute">track_changes</i>
			<span id="engine-torque-output-container"></span>
			<span id="engine-torque-loss-container"></span>
			<span id="engine-torque-before_interventions-container"></span>
			<span id="engine-torque-after_interventions-container"></span>
			<!-- DSC data -->
			<span id="vehicle-dsc-torque_reduction_1-container"></span>
			<span id="vehicle-dsc-torque_reduction_2-container"></span>
			<hr>

			<!-- Temperatures -->
			<i class="material-icons position-absolute">hot_tub</i>
			<span id="temperature-coolant-c-container"></span>
			<span id="temperature-exterior-c-container"></span>
			<span id="temperature-intake-c-container"></span>
			<span id="temperature-oil-c-container"></span>
			<span id="engine-atmospheric_pressure-psi-container"></span>
			<span id="system-temperature-container"></span>
			<hr>

			<!-- Ignition/power/voltage/etc -->
			<i class="material-icons position-absolute">power_settings_new</i>
			<span id="lcm-voltage-terminal_30-container"></span>
			<span id="vehicle-ignition_level-container"></span>
			<span id="gpio-relay_0-container"></span>
			<span id="gpio-relay_1-container"></span>
			<span id="engine-aux_fan_speed-container"></span>
			<hr>

			<!-- OBC data -->
			<i class="material-icons position-absolute">computer</i>
			<span id="system-cpu-load_pct-container"></span>
			<!--
			<span id="system-cpu-speed-container"></span>
			-->
			<span id="obc-average_speed-mph-container"></span>
			<span id="obc-consumption-c1-mpg-container"></span>
			<span id="obc-consumption-c2-mpg-container"></span>
			<span id="fuel-level-container"></span>
			<span id="obc-range-mi-container"></span>
			<hr>

			<i class="material-icons position-absolute">toll</i>
			<!-- Wheel speeds -->
			<span id="vehicle-wheel_speed-front-left-container"></span>
			<span id="vehicle-wheel_speed-front-right-container"></span>
			<span id="vehicle-wheel_speed-rear-left-container"></span>
			<span id="vehicle-wheel_speed-rear-right-container"></span>
			<hr>

			<!-- Steering -->
			<i class="material-icons position-absolute">donut_small</i>
			<span id="vehicle-steering-angle-container"></span>
			<span id="vehicle-steering-velocity-container"></span>
			<hr>

		</div>
	</body>

	<?php include './include/js.php'; ?>
</html>
