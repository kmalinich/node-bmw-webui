<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include './include/head.php'; ?>
	</head>

	<body>
		<?php include './include/navbar.php'; ?>

		<div class="container-fluid">
			<div class="row">
				<div class="col">
					<button class="btn btn-block btn-raised btn-primary" id="btn-ike-set-clock" onclick="javascript:ike_set_clock();">Set OBC clock</button>
					<hr>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<label for="select-obc-value" class="bmd-label-floating">OBC value</label>

					<select class="form-control" id="select-obc-value">
						<option value="arrival"         >Arrival</option>
						<option value="aux-heating-off" >Aux heating off</option>
						<option value="aux-heating-on"  >Aux heating on</option>
						<option value="aux-vent-off"    >Aux vent off</option>
						<option value="aux-vent-on"     >Aux vent on</option>
						<option value="auxheatvent"     >Aux heat/vent</option>
						<option value="average-speed"   >Average speed</option>
						<option value="checkcontrol"    >Check control</option>
						<option value="cluster"         >Cluster</option>
						<option value="code"            >Code</option>
						<option value="consumption-1"   >Consumption 1</option>
						<option value="consumption-2"   >Consumption 2</option>
						<option value="date"            >Date</option>
						<option value="display"         >Display</option>
						<option value="distance"        >Distance</option>
						<option value="emergency-disarm">Emergency disarm</option>
						<option value="end-stellmode"   >End set mode</option>
						<option value="interim"         >Interim</option>
						<option value="limit"           >Limit</option>
						<option value="memo"            >Memo</option>
						<option value="outside-temp"    >Outside temp</option>
						<option value="phone"           >Phone</option>
						<option value="radio"           >Radio</option>
						<option value="range"           >Range</option>
						<option value="stopwatch"       >Stopwatch</option>
						<option value="test-mode"       >Test mode</option>
						<option value="time"            >Time</option>
						<option value="timer-1"         >Timer 1</option>
						<option value="timer-2"         >Timer 2</option>
					</select>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<button class="btn btn-block btn-raised btn-danger" id="btn-obc-value-reset" type="button">Reset</button>
				</div>
				<div class="col">
					<button class="btn btn-block btn-raised btn-primary" id="btn-obc-value-get" type="button">Get</button>
				</div>
			</div>

			<hr>

			<div class="row">
				<div class="col">
					<label for="ike-text" class="bmd-label-floating">Cluster text</label>
					<input type="text" class="form-control" id="ike-text">
					<span class="bmd-help">Text to display on IKE screen</span>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<button class="btn btn-block btn-raised btn-warning" type="reset">Clear</button>
				</div>
				<div class="col">
					<button class="btn btn-block btn-raised btn-primary" type="submit">Send</button>
				</div>
			</div>
		</div>

		<?php include './include/js.php'; ?>
	</body>
</html>
