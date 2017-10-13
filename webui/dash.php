<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
		<?php include './include/css.php'; ?>
	</head>
	<body>
		<?php include './include/navbar.php'; ?>
		<div class="container-fluid">
			<i class="material-icons position-absolute">power_settings_new</i>
			<span id="rpm-container"></span>
			<span id="throttle-container"></span>
			<span id="coolant-container"></span>
			<span id="psi-container"></span>
			<span id="battery-container"></span>
			<span id="fuel-level-container"></span>

			<hr>

			<i class="material-icons position-absolute">toll</i>
			<span id="vehicle-wheel_speed-front-left-container"></span>
			<span id="vehicle-wheel_speed-front-right-container"></span>
			<span id="vehicle-wheel_speed-rear-left-container"></span>
			<span id="vehicle-wheel_speed-rear-right-container"></span>

			<hr>

			<div class="position-absolute">
				<i class="material-icons">donut_small</i>
				<h5>Steering</h5>
			</div>
			<span id="vehicle-steering-angle-container"></span>
			<span id="vehicle-steering-velocity-container"></span>

			<hr>

			<i class="material-icons position-absolute">hot_tub</i>
			<span id="cputemp1-container"></span>
			<span id="cpuload1-container"></span>
		</div>
	</body>
	<?php include './include/js.php'; ?>
</html>
