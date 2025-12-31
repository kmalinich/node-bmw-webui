import JustGage from './justgage.esm.js';


const gaugeSizes = {
	small  : 254,
	medium : 254,
	large  : 372,
	xl     : 385,

	landscape2 : 490,
	landscape4 : 254,
};


// const gauges = {};


gauges['engine-throttle-pedal'                 ] = new JustGage({ id : 'engine-throttle-pedal',                   label : 'Ped %', min : 0, max : 100 });

gauges['engine-torque_value-after_interventions'] = new JustGage({ id : 'engine-torque_value-after_interventions', title : 'lb-ft', label : '', min : 0, max : 400 });
gauges['engine-horsepower-after_interventions' ] = new JustGage({ id : 'engine-horsepower-after_interventions',    title : 'HP', label : '', min : 0, max : 400 });
gauges['engine-lambda-lambda'                  ] = new JustGage({ id : 'engine-lambda-lambda',                     title : 'λ', label : '',  min : 0.75, max : 1.25 });

gauges['vehicle-dsc-torque_intervention_asc'   ] = new JustGage({ id : 'vehicle-dsc-torque_intervention_asc',      title : '', label : '', min : 0, max : 100 });
gauges['vehicle-dsc-torque_intervention_asc_lm'] = new JustGage({ id : 'vehicle-dsc-torque_intervention_asc_lm',   title : '', label : '', min : 0, max : 100 });
gauges['vehicle-dsc-torque_intervention_msr'   ] = new JustGage({ id : 'vehicle-dsc-torque_intervention_msr',      title : '', label : '', min : 0, max : 100 });

gauges['engine-torque-output'                  ] = new JustGage({ id : 'engine-torque-output',                     title : '', label : '', min : 0, max : 100 });
gauges['engine-torque-before_interventions'    ] = new JustGage({ id : 'engine-torque-before_interventions',       title : '', label : '', min : 0, max : 100 });
gauges['engine-torque-after_interventions'     ] = new JustGage({ id : 'engine-torque-after_interventions',        title : '', label : '', min : 0, max : 100 });

gauges['temperature-coolant-c'                 ] = new JustGage({ id : 'temperature-coolant-c',                    title : '', label : '', min : 60, max : 100 });
gauges['temperature-oil-c'                     ] = new JustGage({ id : 'temperature-oil-c',                        title : '', label : '', min : 60, max : 100 });
gauges['temperature-intake-c'                  ] = new JustGage({ id : 'temperature-intake-c',                     title : '', label : '', min : 0, max : 40 });
gauges['temperature-exhaust-c'                 ] = new JustGage({ id : 'temperature-exhaust-c',                    title : '', label : '', min : 300, max : 900 });

gauges['dme-voltage'                           ] = new JustGage({ id : 'dme-voltage',                              title : '', label : '', min : 12, max : 16 });
gauges['lcm-voltage-terminal_30'               ] = new JustGage({ id : 'lcm-voltage-terminal_30',                  title : '', label : '', min : 12, max : 16 });

gauges['engine-ac-request'                     ] = new JustGage({ id : 'engine-ac-request',                        title : '', label : '', min : 0, max : 100 });
gauges['engine-ac-torque'                      ] = new JustGage({ id : 'engine-ac-torque',                         title : '', label : '', min : 0, max : 100 });

/*
gauges.obc. = new JustGage({ id : 'obc-average_speed-mph', title : '', label : '', min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-consumption-c1-mpg', title : '', label : '', min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-consumption-c2-mpg', title : '', label : '', min : 0, max : 100 });
gauges.fuel. = new JustGage({ id : 'fuel-level', title : '', label : '', min : 0, max : 100 });
gauges.fuel. = new JustGage({ id : 'fuel-pump-percent', title : '', label : '', min : 0, max : 100 });
gauges.obc. = new JustGage({ id : 'obc-range-mi', title : '', label : '', min : 0, max : 100 });

gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-front-left', title : '', label : '', min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-front-right', title : '', label : '', min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-rear-left', title : '', label : '', min : 0, max : 100 });
gauges.vehicle. = new JustGage({ id : 'vehicle-wheel_speed-rear-right', title : '', label : '', min : 0, max : 100 });

gauges.vehicle. = new JustGage({ id : 'vehicle-steering-angle', title : '', label : '', min : 0, max : 100 });
*/
