<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
	</head>
	<body onload="javascript:prepare_lcm();">
		<?php include './include/navbar.php'; ?>
		<div class="container-fluid">
			<form class="form-horizontal" name="form-lcm" id="form-lcm" action="javascript:form_lcm();">

				<h4>Dimmer wheel</h4>
				<div id="slider-lcm-dimmer" name="dimmer_value_2"></div>
				<hr>

				<div class="card-group">

					<div class="card" id="card-lcm-front">

						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-front">Front</a></h4>
						</div>

						<div id="collapse-lcm-front" class="card-collapse collapse">
							<div class="card-body">

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_fog_front_left" name="output_fog_front_left"/>
										Left fog
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_fog_front_right" name="output_fog_front_right"/>
										Right fog
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_highbeam_front_left" name="output_highbeam_front_left"/>
										Left high beam
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_highbeam_front_right" name="output_highbeam_front_right"/>
										Right high beam
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_lowbeam_front_left" name="output_lowbeam_front_left"/>
										Left low beam
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_lowbeam_front_right" name="output_lowbeam_front_right"/>
										Right low beam
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_front_left" name="output_standing_front_left"/>
										Left standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_front_right" name="output_standing_front_right"/>
										Right standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_turn_front_left" name="output_turn_front_left"/>
										Left turn
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_turn_front_right" name="output_turn_front_right"/>
										Right turn
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="card" id="card-lcm-rear">

						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-rear">Rear</a></h4>
						</div>

						<div id="collapse-lcm-rear" class="card-collapse collapse">
							<div class="card-body">

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_brake_rear_left" name="output_brake_rear_left"/>
										Left brake
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_brake_rear_middle" name="output_brake_rear_middle"/>
										Middle brake
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_brake_rear_right" name="output_brake_rear_right"/>
										Right brake
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_inner_rear_left" name="output_standing_inner_rear_left"/>
										Left inner standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_inner_rear_right" name="output_standing_inner_rear_right"/>
										Right inner standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_rear_left" name="output_standing_rear_left"/>
										Left outer standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_standing_rear_right" name="output_standing_rear_right"/>
										Right outer standing
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_turn_rear_left" name="output_turn_rear_left"/>
										Left turn
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_turn_rear_right" name="output_turn_rear_right"/>
										Right turn
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_reverse_rear_left" name="output_reverse_rear_left"/>
										Left reverse
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_reverse_rear_right" name="output_reverse_rear_right"/>
										Right reverse
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_license_rear_left" name="output_license_rear_left"/>
										Left license plate
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_license_rear_right" name="output_license_rear_right"/>
										Right license plate
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="card" id="card-lcm-led">
						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-led">LEDs</a></h4>
						</div>

						<div id="collapse-lcm-led" class="card-collapse collapse">
							<div class="card-body">

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_led_switch_hazard" name="output_led_switch_hazard"/>
										Hazard switch LED
									</label>
								</div>

								<div class="togglebutton">
									<label>
										<input type="checkbox" id="output_led_switch_light" name="output_led_switch_light"/>
										Light switch LED
									</label>
								</div>

							</div>
						</div>
					</div>
				</div>

				<hr>

				<div class="card-group">

					<div class="card" id="card-lcm-clamps">
						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-clamps">Clamps</a></h4>
						</div>

						<div id="collapse-lcm-clamps" class="card-collapse collapse">
							<div class="card-body">
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="clamp_15" name="clamp_15"/>
										15
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="clamp_30a" name="clamp_30a"/>
										30A
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="clamp_30b" name="clamp_30b"/>
										30B
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="clamp_r" name="clamp_r"/>
										R
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="card" id="card-lcm-modes">
						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-modes">Modes</a></h4>
						</div>
						<div id="collapse-lcm-modes" class="card-collapse collapse">
							<div class="card-body">
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="mode_failsafe" name="mode_failsafe"/>
										Failsafe
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="mode_sleep" name="mode_sleep"/>
										Sleep
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="card" id="card-lcm-inputs">
						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-inputs">Inputs</a></h4>
						</div>
						<div id="collapse-lcm-inputs" class="card-collapse collapse">
							<div class="card-body">
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_air_suspension" name="input_air_suspension"/>
										Air suspension
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_armoured_door" name="input_armoured_door"/>
										Armored door
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_brake_fluid_level" name="input_brake_fluid_level"/>
										Brake fluid
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_carb" name="input_carb"/>
										CARB
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_engine_failsafe" name="input_engine_failsafe"/>
										Engine failsafe
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_fire_extinguisher" name="input_fire_extinguisher"/>
										Fire extinguisher
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_hold_up_alarm" name="input_hold_up_alarm"/>
										Alarm (hold-up)
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_key_in_ignition" name="input_key_in_ignition"/>
										Key inserted
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_kfn" name="input_kfn"/>
										KFN
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_preheating_fuel_injection" name="input_preheating_fuel_injection"/>
										Fuel injection
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_seat_belts_lock" name="input_seat_belts_lock"/>
										Seat belts lock
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_tire_defect" name="input_tire_defect"/>
										Flat tire
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_vertical_aim" name="input_vertical_aim"/>
										Low beam aim
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="input_washer_fluid_level" name="input_washer_fluid_level"/>
										Washer fluid
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="card" id="card-lcm-switches">
						<div class="card-heading">
							<h4 class="card-title text-center"><a data-toggle="collapse" href="#collapse-lcm-switches">Switches</a></h4>
						</div>
						<div id="collapse-lcm-switches" class="card-collapse collapse">
							<div class="card-body">
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_brake" name="switch_brake"/>
										Brake
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_fog_front" name="switch_fog_front"/>
										Front fog
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_fog_rear" name="switch_fog_rear"/>
										Rear fog
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_hazard" name="switch_hazard"/>
										Hazards
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_highbeam" name="switch_highbeam"/>
										High beams
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_highbeam_flash" name="switch_highbeam_flash"/>
										Flash-to-pass
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_lowbeam_1" name="switch_lowbeam_1"/>
										Low beams #1
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_lowbeam_2" name="switch_lowbeam_2"/>
										Low beams #2
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_standing" name="switch_standing"/>
										Parking lights
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_turn_left" name="switch_turn_left"/>
										Left turn signal
									</label>
								</div>
								<div class="togglebutton">
									<label>
										<input type="checkbox" id="switch_turn_right" name="switch_turn_right"/>
										Right turn signal
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<hr>

				<button class="btn btn-raised btn-lg btn-primary btn-block" id="form-lcm-submit" type="submit">Send</button>
				<button class="btn btn-raised btn-lg btn-danger btn-block" id="form-lcm-reset" type="reset">Reset</button>
			</form>
		</div>
	</body>
	<?php include './include/js.php'; ?>
</html>

<!--
<div class="togglebutton">
<label>
<input type="checkbox" id="output_fog_rear_left" name="output_fog_rear_left"/>
Left fog
</label>
</div>

<div class="togglebutton">
<label>
<input type="checkbox" id="output_fog_rear_right" name="output_fog_rear_right"/>
Right fog
</label>
</div>

<div class="togglebutton">
<label>
<input type="checkbox" id="output_reverse_rear_trailer" name="output_reverse_rear_trailer">
Trailer reverse
</label>
</div>
-->
