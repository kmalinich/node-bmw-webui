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
		function respondToVisibility(elementId, callback) {
			const element = document.getElementById(`${elementId}-container`);

			let options = {
				threshold : [0],
			};

			let observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					let visible = (entry.intersectionRatio > 0);
					if (visible === true) {
						send('websocket-dash-subscribe', elementId);
					}
					else {
						send('websocket-dash-unsubscribe', elementId);
					}

					return visible;
				});
			}, options);

			observer.observe(element);
		}

		respondToVisibility('engine-throttle-pedal',                   visible => { console.log('engine-throttle-pedal                   : %o', visible ); });
		respondToVisibility('engine-torque_value-after_interventions', visible => { console.log('engine-torque_value-after_interventions : %o', visible ); });
		respondToVisibility('engine-horsepower-after_interventions',   visible => { console.log('engine-horsepower-after_interventions   : %o', visible ); });
		respondToVisibility('engine-lambda-lambda',                    visible => { console.log('engine-lambda-lambda                    : %o', visible ); });
		respondToVisibility('vehicle-dsc-torque_intervention_asc',     visible => { console.log('vehicle-dsc-torque_intervention_asc     : %o', visible ); });
		respondToVisibility('vehicle-dsc-torque_intervention_asc_lm',  visible => { console.log('vehicle-dsc-torque_intervention_asc_lm  : %o', visible ); });
		respondToVisibility('vehicle-dsc-torque_intervention_msr',     visible => { console.log('vehicle-dsc-torque_intervention_msr     : %o', visible ); });
		respondToVisibility('engine-torque-output',                    visible => { console.log('engine-torque-output                    : %o', visible ); });
		respondToVisibility('engine-torque-before_interventions',      visible => { console.log('engine-torque-before_interventions      : %o', visible ); });
		respondToVisibility('engine-torque-after_interventions',       visible => { console.log('engine-torque-after_interventions       : %o', visible ); });
		respondToVisibility('temperature-coolant-c',                   visible => { console.log('temperature-coolant-c                   : %o', visible ); });
		respondToVisibility('temperature-oil-c',                       visible => { console.log('temperature-oil-c                       : %o', visible ); });
		respondToVisibility('temperature-intake-c',                    visible => { console.log('temperature-intake-c                    : %o', visible ); });
		respondToVisibility('temperature-exhaust-c',                   visible => { console.log('temperature-exhaust-c                   : %o', visible ); });
		respondToVisibility('dme-voltage',                             visible => { console.log('dme-voltage                             : %o', visible ); });
		respondToVisibility('lcm-voltage-terminal_30',                 visible => { console.log('lcm-voltage-terminal_30                 : %o', visible ); });
		respondToVisibility('engine-aux_fan_speed',                    visible => { console.log('engine-aux_fan_speed                    : %o', visible ); });
		respondToVisibility('obc-average_speed-mph',                   visible => { console.log('obc-average_speed-mph                   : %o', visible ); });
		respondToVisibility('obc-consumption-c1-mpg',                  visible => { console.log('obc-consumption-c1-mpg                  : %o', visible ); });
		respondToVisibility('obc-consumption-c2-mpg',                  visible => { console.log('obc-consumption-c2-mpg                  : %o', visible ); });
		respondToVisibility('fuel-level',                              visible => { console.log('fuel-level                              : %o', visible ); });
		respondToVisibility('fuel-pump-percent',                       visible => { console.log('fuel-pump-percent                       : %o', visible ); });
		respondToVisibility('obc-range-mi',                            visible => { console.log('obc-range-mi                            : %o', visible ); });
		respondToVisibility('vehicle-wheel_speed-front-left',          visible => { console.log('vehicle-wheel_speed-front-left          : %o', visible ); });
		respondToVisibility('vehicle-wheel_speed-front-right',         visible => { console.log('vehicle-wheel_speed-front-right         : %o', visible ); });
		respondToVisibility('vehicle-wheel_speed-rear-left',           visible => { console.log('vehicle-wheel_speed-rear-left           : %o', visible ); });
		respondToVisibility('vehicle-wheel_speed-rear-right',          visible => { console.log('vehicle-wheel_speed-rear-right          : %o', visible ); });
		respondToVisibility('vehicle-steering-angle',                  visible => { console.log('vehicle-steering-angle                  : %o', visible ); });
	</script>

	<?php include './include/js.php'; ?>

	<script type="text/javascript">
		init_dash();
	</script>
</html>
