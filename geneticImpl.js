myTestFactory = (function() {

	LENGTH = 100;

	var getRandomIndividual = function() {
		var individual = []
		for(var i=0; i<LENGTH; i++) {
			individual.push(Math.floor(Math.random()*2));
		}
		return individual;
	};

	var calculateFitness = function(individual) {
		var fitness = LENGTH;

		for(var i=0; i<LENGTH; i++) {
			fitness -= individual[i];
		}

		return fitness;
	};

	var mutate = function(individual) { //don't touch the source!
		var individual_mutated = []

		if(Math.random() > 0.5) {
			//uniform mutation
			for (var i = 0; i < LENGTH; i++) {
				individual_mutated.push( Math.random() > 1/LENGTH ? individual[i] : Math.floor(Math.random()*2));
			};
		} else {
			//two point mutation
			var i1 = Math.floor(Math.random()*LENGTH);
			var i2 = Math.floor(Math.random()*LENGTH);

			if(i2 >= i1) { 
				for (var i = 0; i < LENGTH; i++) {
					individual_mutated.push( i >= i1 && i <= i2 ? Math.floor(Math.random()*2) : individual[i]);
				};
			} else {
				for (var i = 0; i < LENGTH; i++) {
					individual_mutated.push( i >= i2 && i <= i1 ? individual[i] : Math.floor(Math.random()*2));
				};
			}
		}
		return individual_mutated;
	};

	var crossover = function(individual1, individual2) {//don't touch the source!
		var individuals_crossed = [[],[]];

		var rand = Math.random();

		if(rand < 1/3) {
			//one point crossover
			var index = Math.random()*LENGTH;
			for (var i = 0; i < LENGTH; i++) {
				individuals_crossed[0].push( i <= LENGTH / 2 ? individual1[i] : individual2[i]);
				individuals_crossed[1].push( i > LENGTH / 2 ? individual1[i] : individual2[i]);
			};
		} else if(rand < 2/3) {
			//two points crossover
			var i1 = Math.floor(Math.random()*LENGTH);
			var i2 = Math.floor(Math.random()*LENGTH);

			if(i2 >= i1) { 
				for (var i = 0; i < LENGTH; i++) {
					individuals_crossed[0].push( i >= i1 && i <= i2 ? individual2[i] : individual1[i]);
					individuals_crossed[1].push( i >= i1 && i <= i2 ? individual1[i] : individual2[i]);
				};
			} else {
				for (var i = 0; i < LENGTH; i++) {
					individuals_crossed[0].push( i >= i2 && i <= i1 ? individual1[i] : individual2[i]);
					individuals_crossed[1].push( i >= i2 && i <= i1 ? individual2[i] : individual1[i]);
				};
			}
		} else {
			//uniform crossover
			for (var i = 0; i < LENGTH; i++) {
				var r = Math.random();
				individuals_crossed[0].push( r < 1/LENGTH ? individual2[i] : individual1[i]);
				individuals_crossed[1].push( r < 1/LENGTH ? individual1[i] : individual2[i]);
			};
		}

		return individuals_crossed;
	};

	return {
		LENGTH:LENGTH,
		getRandomIndividual:getRandomIndividual,
		calculateFitness:calculateFitness,
		crossover:crossover,
		mutate:mutate
	};
})();

JSGenetic.config({
	populationSize: 200,
	crossoverProbability: 0.8,
	mutationProbability: 0.05,
	eliteSelectionProbability: 0.8,
	tournamentSize: 2
});

JSGenetic.setIndividualFactory(myTestFactory);

JSGenetic.init();



function go() {
		JSGenetic.nextGeneration(function(children) {
			console.log("Gen: " ,children);
		},2000);
}