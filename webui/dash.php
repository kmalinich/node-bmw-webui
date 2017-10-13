<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
		<?php include './include/css.php'; ?>
	</head>
	<body>
		<?php include './include/navbar.php'; ?>
		<div class="container-fluid">

			<!-- Engine data -->
			<i class="material-icons position-absolute">power_settings_new</i>
			<span id="engine-speed-container"></span>
			<span id="engine-throttle-pedal-container"></span>
			<span id="temperature-coolant-c-container"></span>
			<span id="engine-atmospheric_pressure-psi-container"></span>
			<span id="lcm-voltage-terminal_30-container"></span>
			<span id="engine-torque-output-container"></span>
			<hr>

			<!-- Wheel speeds -->
			<i class="material-icons position-absolute">toll</i>
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

			<!-- DSC data -->
			<i class="material-icons position-absolute">gavel</i>
			<span id="vehicle-dsc-torque_reduction_1-container"></span>
			<span id="vehicle-dsc-torque_reduction_2-container"></span>
			<hr>

			<!-- OBC data -->
			<i class="material-icons position-absolute">computer</i>
			<span id="obc-average_speed-mph-container"></span>
			<span id="obc-consumption-c1-mpg-container"></span>
			<span id="obc-range-mi-container"></span>
			<span id="fuel-level-container"></span>
			<hr>

			<!-- RPi system stats -->
			<i class="material-icons position-absolute">hot_tub</i>
			<span id="system-cpu-load_pct-container"></span>
			<span id="system-temperature-container"></span>

		</div>
	</body>

	<?php include './include/js.php'; ?>
</html>
