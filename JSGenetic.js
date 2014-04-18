JSGenetic = (function() {
	//Loading the Engine as a worker
	var engine = new Worker('GeneticEngine.js');

	var config = function(options) {
		engine.postMessage({
			action: 'config',
			options: options
		});
	}

	var setIndividualFactory = function(individualFactory) {
		engine.postMessage({
			action: 'setIndividualFactory',
			individualFactory: JSON.stringify(individualFactory, function(key, value) {
			  if (typeof value === 'function') {
			    return "funct1one=" + value.toString().replace("\"","\\\"");
			  } else {
			    return value;
			  }
			})
		});
	}

	var init = function() {
		engine.postMessage({
			action: 'init'
		});
	}

	var nextGeneration = function(callback,iterations) {
		engine.postMessage({
			action: 'nextGeneration',
			iterations: iterations
		});

		engine.onmessage = function(event) {
			callback(event.data.children);
		}
	}

	return {
		config:config,
		setIndividualFactory:setIndividualFactory,
		init:init,
		nextGeneration:nextGeneration
	};
})();

