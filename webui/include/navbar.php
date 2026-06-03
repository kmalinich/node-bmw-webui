<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
	<div id="status-ws" class="mr-2 btn btn-raised btn-warning mb-0" onclick="javascript:debug_toggle()">Connecting</div>

	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbar-menu">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item"><a class="nav-link" href="/">Dash</a></li>
			<li class="nav-item"><a class="nav-link" href="/dash2">Dash2</a></li>
			<li class="nav-item"><a class="nav-link" href="status">Status</a></li>

			<!--
			<li class="nav-item"><a class="nav-link" href="ws-bus">Data bus</a></li>
			<li class="nav-item"><a class="nav-link" href="ws-log">Log</a></li>
			-->

			<li class="nav-item dropdown">
				<a data-mdb-dropdown-init class="nav-link dropdown-toggle" href="#" id="nav-dropdown-modules" role="button" aria-expanded="false">Modules</a>
				<ul class="dropdown-menu" aria-labelledby="nav-dropdown-modules">
					<li><a class="dropdown-item" href="dsp">DSP</a></li>
					<li><a class="dropdown-item" href="gm">GM</a></li>
					<li><a class="dropdown-item" href="hdmi">HDMI</a></li>
					<li><a class="dropdown-item" href="ike">IKE</a></li>
					<li><a class="dropdown-item" href="lcm">LCM</a></li>
				</ul>
			</li>
		</ul>
	</div>
</nav>
