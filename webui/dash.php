<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
		<?php include './include/css.php'; ?>
	</head>
	<body>
		<?php include './include/navbar.php'; ?>
		<div class="container-fluid">
			<span id="battery-container"></span>
			<span id="coolant-container"></span>
			<span id="throttle-container"></span>
			<span id="rpm-container"></span>
			<span id="psi-container"></span>

			<hr>

			<span id="vehicle-wheel_speed-front-left-container"></span>
			<span id="vehicle-wheel_speed-front-right-container"></span>
			<span id="vehicle-wheel_speed-rear-left-container"></span>
			<span id="vehicle-wheel_speed-rear-right-container"></span>

			<hr>

			<i class="material-icons float-right">donut_small</i>
			<span id="vehicle-steering-angle-container"></span>
			<span id="vehicle-steering-velocity-container"></span>

			<hr>

			<span id="cputemp1-container"></span>
			<span id="cpuload1-container"></span>
		</div>
	</body>
	<?php include './include/js.php'; ?>
</html>
