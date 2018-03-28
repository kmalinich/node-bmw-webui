<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
	<!--
	<a class="navbar-brand" href="/">node-bmw</a>
	-->
	<div id="status-ws" class="mr-2 btn btn-raised btn-warning" style="margin-bottom: 0;" onclick="javascript:debug_toggle()">Connecting</div>

	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbar-menu">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<a class="nav-link" href="/">Home</a>
			</li>

			<li class="nav-item"><a class="nav-link" href="dash">Dash</a></li>
			<li class="nav-item"><a class="nav-link" href="status">Status</a></li>

			<!--
			<li class="nav-item"><a class="nav-link" href="ws-bus">Data bus</a></li>
			<li class="nav-item"><a class="nav-link" href="ws-log">Log</a></li>
			-->

			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="nav-dropdown-modules" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Modules</a>

				<div class="dropdown-menu" aria-labelledby="nav-dropdown-modules">
					<a class="dropdown-item" href="dsp">DSP</a>
					<a class="dropdown-item" href="gm">GM</a>
					<a class="dropdown-item" href="hdmi">HDMI</a>
					<a class="dropdown-item" href="ike">IKE</a>
					<a class="dropdown-item" href="lcm">LCM</a>
				</div>
			</li>
		</ul>
	</div>
</nav>


<!-- vim: set syntax=html filetype=html ts=2 sw=2 tw=0 noet :-->
