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
			<span class="d3-gauge" id="engine-lambda-lambda-container"></span>

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

			<!-- Ignition/power/voltage/etc -->
			<h3>Voltage/power</h3>
			<hr>
			<i class="material-icons position-absolute">power_settings_new</i>
			<span class="d3-gauge" id="dme-voltage-container"></span>
			<span class="d3-gauge" id="lcm-voltage-terminal_30-container"></span>
			<span class="d3-gauge" id="engine-aux_fan_speed-container"></span>

			<!-- OBC data -->
			<h3>OBC</h3>
			<hr>
			<i class="material-icons position-absolute">computer</i>
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

	<script type="text/javascript">
		function respondToVisibility(element, callback) {
			let options = {
				threshold : [0],
			};

			let observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					callback(entry.intersectionRatio > 0);
				});
			}, options);

			observer.observe(element);
		}

		respondToVisibility(document.getElementById('engine-throttle-pedal-container'),                   visible => { console.log('engine-throttle-pedal                   : %o', visible ); });
		// respondToVisibility(document.getElementById('engine-rpm-container'),                              visible => { console.log('engine-rpm                              : %o', visible ); });
		respondToVisibility(document.getElementById('engine-torque_value-after_interventions-container'), visible => { console.log('engine-torque_value-after_interventions : %o', visible ); });
		respondToVisibility(document.getElementById('engine-horsepower-after_interventions-container'),   visible => { console.log('engine-horsepower-after_interventions   : %o', visible ); });
		respondToVisibility(document.getElementById('engine-lambda-lambda-container'),                    visible => { console.log('engine-lambda-lambda                    : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-dsc-torque_intervention_asc-container'),     visible => { console.log('vehicle-dsc-torque_intervention_asc     : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-dsc-torque_intervention_asc_lm-container'),  visible => { console.log('vehicle-dsc-torque_intervention_asc_lm  : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-dsc-torque_intervention_msr-container'),     visible => { console.log('vehicle-dsc-torque_intervention_msr     : %o', visible ); });
		respondToVisibility(document.getElementById('engine-torque-output-container'),                    visible => { console.log('engine-torque-output                    : %o', visible ); });
		respondToVisibility(document.getElementById('engine-torque-before_interventions-container'),      visible => { console.log('engine-torque-before_interventions      : %o', visible ); });
		respondToVisibility(document.getElementById('engine-torque-after_interventions-container'),       visible => { console.log('engine-torque-after_interventions       : %o', visible ); });
		respondToVisibility(document.getElementById('temperature-coolant-c-container'),                   visible => { console.log('temperature-coolant-c                   : %o', visible ); });
		respondToVisibility(document.getElementById('temperature-oil-c-container'),                       visible => { console.log('temperature-oil-c                       : %o', visible ); });
		respondToVisibility(document.getElementById('temperature-intake-c-container'),                    visible => { console.log('temperature-intake-c                    : %o', visible ); });
		respondToVisibility(document.getElementById('temperature-exhaust-c-container'),                   visible => { console.log('temperature-exhaust-c                   : %o', visible ); });
		respondToVisibility(document.getElementById('dme-voltage-container'),                             visible => { console.log('dme-voltage                             : %o', visible ); });
		respondToVisibility(document.getElementById('lcm-voltage-terminal_30-container'),                 visible => { console.log('lcm-voltage-terminal_30                 : %o', visible ); });
		respondToVisibility(document.getElementById('engine-aux_fan_speed-container'),                    visible => { console.log('engine-aux_fan_speed                    : %o', visible ); });
		respondToVisibility(document.getElementById('obc-average_speed-mph-container'),                   visible => { console.log('obc-average_speed-mph                   : %o', visible ); });
		respondToVisibility(document.getElementById('obc-consumption-c1-mpg-container'),                  visible => { console.log('obc-consumption-c1-mpg                  : %o', visible ); });
		respondToVisibility(document.getElementById('obc-consumption-c2-mpg-container'),                  visible => { console.log('obc-consumption-c2-mpg                  : %o', visible ); });
		// respondToVisibility(document.getElementById('fuel-consumption-container'),                        visible => { console.log('fuel-consumption                        : %o', visible ); });
		respondToVisibility(document.getElementById('fuel-level-container'),                              visible => { console.log('fuel-level                              : %o', visible ); });
		respondToVisibility(document.getElementById('fuel-pump-percent-container'),                       visible => { console.log('fuel-pump-percent                       : %o', visible ); });
		respondToVisibility(document.getElementById('obc-range-mi-container'),                            visible => { console.log('obc-range-mi                            : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-wheel_speed-front-left-container'),          visible => { console.log('vehicle-wheel_speed-front-left          : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-wheel_speed-front-right-container'),         visible => { console.log('vehicle-wheel_speed-front-right         : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-wheel_speed-rear-left-container'),           visible => { console.log('vehicle-wheel_speed-rear-left           : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-wheel_speed-rear-right-container'),          visible => { console.log('vehicle-wheel_speed-rear-right          : %o', visible ); });
		respondToVisibility(document.getElementById('vehicle-steering-angle-container'),                  visible => { console.log('vehicle-steering-angle                  : %o', visible ); });
	</script>

	<?php include './include/js.php'; ?>

	<script type="text/javascript">
		init_dash();
	</script>
</html>
