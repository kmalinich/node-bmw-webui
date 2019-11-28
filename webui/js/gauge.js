/* eslint no-unused-vars : 0 */

function Gauge(placeholderName, configuration) {
	this.placeholderName = placeholderName;

	const self = this; // For internal d3 functions

	this.configure = function (configuration) {
		this.config = configuration;

		this.config.height = this.config.size * 0.81;
		this.config.width  = this.config.size * 0.93;

		this.config.size *= 0.95;

		this.config.radius = this.config.size / 2;
		this.config.cx     = this.config.size / 2;
		this.config.cy     = this.config.size / 2;

		this.config.min   = configuration.min !== undefined ? configuration.min : 0;
		this.config.max   = configuration.max !== undefined ? configuration.max : 100;
		this.config.range = this.config.max - this.config.min;

		this.config.majorTicks = configuration.majorTicks || 5;
		this.config.minorTicks = configuration.minorTicks || 2;

		this.config.blueColor   = configuration.blueColor   || '#3498db';
		this.config.greenColor  = configuration.greenColor  || '#2ecc71';
		this.config.yellowColor = configuration.yellowColor || '#f1c40f';
		this.config.orangeColor = configuration.orangeColor || '#e67e22';
		this.config.redColor    = configuration.redColor    || '#e74c3c';

		this.config.transitionDuration = configuration.transitionDuration || 200;
	};

	this.render = function () {
		this.body = d3.select('#' + this.placeholderName)
			.append('svg:svg')
			.attr('class', 'gauge')
			.attr('width', this.config.width)
			.attr('height', this.config.height);

		this.body.append('svg:circle')
			.attr('cx', this.config.cx)
			.attr('cy', this.config.cy)
			.attr('r', 0.95 * this.config.radius)
			.style('fill', '#646464')
			.style('stroke', '#000000d6')
			.style('stroke-width', '0.5px');

		this.body.append('svg:circle')
			.attr('cx', this.config.cx)
			.attr('cy', this.config.cy)
			.attr('r', 0.9 * this.config.radius)
			.style('fill', '#000000d6')
			.style('stroke', '#111')
			.style('stroke-width', '0.5px');

		for (const index_blue in this.config.blueZones) {
			this.drawBand(this.config.blueZones[index_blue].from, this.config.blueZones[index_blue].to, self.config.blueColor);
		}

		for (const index_green in this.config.greenZones) {
			this.drawBand(this.config.greenZones[index_green].from, this.config.greenZones[index_green].to, self.config.greenColor);
		}

		for (const index_yellow in this.config.yellowZones) {
			this.drawBand(this.config.yellowZones[index_yellow].from, this.config.yellowZones[index_yellow].to, self.config.yellowColor);
		}

		for (const index_orange in this.config.orangeZones) {
			this.drawBand(this.config.orangeZones[index_orange].from, this.config.orangeZones[index_orange].to, self.config.orangeColor);
		}

		for (const index_red in this.config.redZones) {
			this.drawBand(this.config.redZones[index_red].from, this.config.redZones[index_red].to, self.config.redColor);
		}

		let fontSize;
		let minorDelta;
		let point1;
		let point2;

		if (this.config.label !== undefined) {
			fontSize = Math.round(this.config.size / 8.8);

			this.body.append('svg:text')
				.attr('x', this.config.cx)
				.attr('y', this.config.cy / 2 + fontSize / 2)
				.attr('dy', fontSize / 2)
				.attr('text-anchor', 'middle')
				.text(this.config.label)
				.style('font-size', fontSize + 'px')
				.style('fill', '#fafafa')
				.style('stroke-width', '0px');
		}

		fontSize = Math.round(this.config.size / 16);
		const majorDelta = this.config.range / (this.config.majorTicks - 1);

		for (let major = this.config.min; major <= this.config.max; major += majorDelta) {
			minorDelta = majorDelta / this.config.minorTicks;

			for (let minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta) {
				point1 = this.valueToPoint(minor, 0.75);
				point2 = this.valueToPoint(minor, 0.85);

				this.body.append('svg:line')
					.attr('x1', point1.x)
					.attr('y1', point1.y)
					.attr('x2', point2.x)
					.attr('y2', point2.y)
					.style('stroke', '#fafafa')
					.style('stroke-width', '1px');
			}

			point1 = this.valueToPoint(major, 0.7);
			point2 = this.valueToPoint(major, 0.85);

			this.body.append('svg:line')
				.attr('x1', point1.x)
				.attr('y1', point1.y)
				.attr('x2', point2.x)
				.attr('y2', point2.y)
				.style('stroke', '#fafafa')
				.style('stroke-width', '2px');

			if (major === this.config.min || major === this.config.max) {
				const point = this.valueToPoint(major, 0.63);

				this.body.append('svg:text')
					.attr('x', point.x)
					.attr('y', point.y)
					.attr('dy', fontSize / 3)
					.attr('text-anchor', major === this.config.min ? 'start' : 'end')
					.text(major)
					.style('font-size', fontSize + 'px')
					.style('fill', '#fafafa')
					.style('stroke-width', '0px');
			}
		}

		const pointerContainer = this.body.append('svg:g').attr('class', 'pointerContainer');

		const midValue = (this.config.min + this.config.max) / 2;

		const pointerPath = this.buildPointerPath(midValue);

		const pointerLine = d3.svg.line()
			.x((d) => d.x)
			.y((d) => d.y)
			.interpolate('basis');

		pointerContainer.selectAll('path')
			.data([ pointerPath ])
			.enter()
			.append('svg:path')
			.attr('d', pointerLine)
			.style('fill', '#ff57244d')
			.style('stroke', '#ff572280')
			.style('fill-opacity', 0.9);

		// pointerContainer.append('svg:circle')
		//   .attr('cx', this.config.cx)
		//   .attr('cy', this.config.cy)
		//   .attr('r', 0.12 * this.config.radius)
		//   .style('fill', '#4684EE')
		//   .style('stroke', '#666')
		//   .style('opacity', 1);

		fontSize = Math.round(this.config.size / 10);
		pointerContainer.selectAll('text')
			.data([ midValue ])
			.enter()
			.append('svg:text')
			.attr('x', this.config.cx)
			.attr('y', this.config.size - this.config.cy / 4 - fontSize)
			.attr('dy', fontSize / 2)
			.attr('text-anchor', 'middle')
			.style('font-size', fontSize + 'px')
			.style('fill', '#fafafa')
			.style('stroke-width', '0px');

		this.redraw(this.config.min, 0);
	};

	this.buildPointerPath = function (value) {
		const delta = this.config.range / 13;

		const head  = valueToPoint(value, 0.85);
		const head1 = valueToPoint(value - delta, 0.12);
		const head2 = valueToPoint(value + delta, 0.12);

		const tailValue = value - (this.config.range * (1 / (270 / 360)) / 2);
		const tail  = valueToPoint(tailValue, 0.28);
		const tail1 = valueToPoint(tailValue - delta, 0.12);
		const tail2 = valueToPoint(tailValue + delta, 0.12);

		return [ head, head1, tail2, tail, tail1, head2, head ];

		function valueToPoint(value, factor) {
			const point = self.valueToPoint(value, factor);
			point.x -= self.config.cx;
			point.y -= self.config.cy;
			return point;
		}
	};

	this.drawBand = function (start, end, color) {
		if (end - start <= 0) return;

		this.body.append('svg:path')
			.style('fill', color)
			.attr('d', d3.svg.arc()
				.startAngle(this.valueToRadians(start))
				.endAngle(this.valueToRadians(end))
				.innerRadius(0.79 * this.config.radius)
				.outerRadius(0.86 * this.config.radius))
			.attr('transform', () => 'translate(' + self.config.cx + ', ' + self.config.cy + ') rotate(270)');
	};

	this.redraw = function (value, transitionDuration) {
		const pointerContainer = this.body.select('.pointerContainer');

		pointerContainer.selectAll('text').text(value);

		const pointer = pointerContainer.selectAll('path');
		pointer.transition()
			.duration(transitionDuration !== undefined ? transitionDuration : this.config.transitionDuration)
			// .delay(10)
			// .ease('linear')
			// .attr('transform', function(d)
			.attrTween('transform', () => {
				let pointerValue = value;

				if      (value > self.config.max) pointerValue = self.config.max + 0.02 * self.config.range;
				else if (value < self.config.min) pointerValue = self.config.min - 0.02 * self.config.range;

				const targetRotation  = (self.valueToDegrees(pointerValue) - 90);
				const currentRotation = self._currentRotation || targetRotation;

				self._currentRotation = targetRotation;

				return function (step) {
					const rotation = currentRotation + (targetRotation - currentRotation) * step;
					return 'translate(' + self.config.cx + ', ' + self.config.cy + ') rotate(' + rotation + ')';
				};
			});
	};

	this.valueToDegrees = function (value) {
		// thanks @closealert
		return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);
	};

	this.valueToRadians = function (value) {
		return this.valueToDegrees(value) * Math.PI / 180;
	};

	this.valueToPoint = function (value, factor) {
		return {
			x : this.config.cx - this.config.radius * factor * Math.cos(this.valueToRadians(value)),
			y : this.config.cy - this.config.radius * factor * Math.sin(this.valueToRadians(value)),
		};
	};

	// Initialization
	this.configure(configuration);
}
