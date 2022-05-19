//Script to handle neural network training

class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];

    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let output = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      output = Level.feedForward(output, network.levels[i]);
    }
    return output;
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.input = new Array(inputCount);
    this.output = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    Level.#randomize(this);
  }

  static #randomize(level) {
    for (let i = 0; i < level.input.length; i++) {
      for (let j = 0; j < level.output.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInput, level) {
    for (let i = 0; i < level.input.length; i++) {
      level.input[i] = givenInput[i];
    }

    for (let i = 0; i < level.output.length; i++) {
      let sum = 0;

      for (let j = 0; j < level.input.length; j++) {
        sum += level.input[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.output[i] = 1;
      } else {
        level.output[i] = 0;
      }
    }
    return level.output;
  }
}
