<div class="navbar navbar-primary">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-primary-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/">node-bmw</a>
		</div>
		<div class="navbar-collapse collapse navbar-primary-collapse" id="navbar">
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a data-target="#" class="dropdown-toggle" data-toggle="dropdown">
						Modules
						<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="dsp.html">DSP</a></li>
						<li><a href="gm.html">GM</a></li>
						<li><a href="hdmi.html">HDMI</a></li>
						<li><a href="ike.html">IKE</a></li>
						<li><a href="lcm.html">LCM</a></li>
					</ul>
				</li>
				<li><a href="dash.html">Dash</a></li>
				<li><a href="status.html">Status</a></li>
				<li><a href="ws-bus.html">Data bus</a></li>
				<li><a href="ws-log.html">Log</a></li>
			</ul>
			<div class="navbar-div navbar-right">
				<div id="status-ws-disconnected" class="btn btn-raised btn-danger hidden"  >Disconnected</div>
				<div id="status-ws-connecting"   class="btn btn-raised btn-warning hidden" >Connecting</div>
				<div id="status-ws-connected"    class="btn btn-raised btn-success hidden" >Connected</div>
			</div>
		</div>
	</div>
</div>
