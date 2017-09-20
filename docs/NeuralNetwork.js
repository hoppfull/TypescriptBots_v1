var NeuralNetwork;
(function (NeuralNetwork) {
    const sigmoid = (x) => 1 / (1 + Math.pow(Math.E, -x));
    function think(input, ws) {
        const [vision1, vision2, vision3, vision4] = input;
        const [w00_bias, w00_vision1, w00_vision2, w00_vision3, w00_vision4, w01_bias, w01_vision1, w01_vision2, w01_vision3, w01_vision4, w02_bias, w02_vision1, w02_vision2, w02_vision3, w02_vision4, w03_bias, w03_vision1, w03_vision2, w03_vision3, w03_vision4, w04_bias, w04_vision1, w04_vision2, w04_vision3, w04_vision4, w10_bias, w10_n00, w10_n01, w10_n02, w10_n03, w10_n04, w11_bias, w11_n00, w11_n01, w11_n02, w11_n03, w11_n04, w12_bias, w12_n00, w12_n01, w12_n02, w12_n03, w12_n04, w20_bias, w20_n10, w20_n11, w20_n12, w21_bias, w21_n10, w21_n11, w21_n12] = ws;
        const n00 = sigmoid(w00_bias + w00_vision1 * vision1 + w00_vision2 * vision2 + w00_vision3 * vision3 + w00_vision4 * vision4);
        const n01 = sigmoid(w01_bias + w01_vision1 * vision1 + w01_vision2 * vision2 + w01_vision3 * vision3 + w01_vision4 * vision4);
        const n02 = sigmoid(w02_bias + w02_vision1 * vision1 + w02_vision2 * vision2 + w02_vision3 * vision3 + w02_vision4 * vision4);
        const n03 = sigmoid(w03_bias + w03_vision1 * vision1 + w03_vision2 * vision2 + w03_vision3 * vision3 + w03_vision4 * vision4);
        const n04 = sigmoid(w04_bias + w04_vision1 * vision1 + w04_vision2 * vision2 + w04_vision3 * vision3 + w04_vision4 * vision4);
        const n10 = sigmoid(w10_bias + w10_n00 * n00 + w10_n01 * n01 + w10_n02 * n02 + w10_n03 * n03 + w10_n04 * n04);
        const n11 = sigmoid(w11_bias + w11_n00 * n00 + w11_n01 * n01 + w11_n02 * n02 + w11_n03 * n03 + w11_n04 * n04);
        const n12 = sigmoid(w12_bias + w12_n00 * n00 + w12_n01 * n01 + w12_n02 * n02 + w12_n03 * n03 + w12_n04 * n04);
        const n20 = sigmoid(w20_bias + w20_n10 * n10 + w20_n11 * n11 + w20_n12 * n12);
        const n21 = sigmoid(w21_bias + w21_n10 * n10 + w21_n11 * n11 + w21_n12 * n12);
        return [n20, n21];
    }
    NeuralNetwork.think = think;
})(NeuralNetwork || (NeuralNetwork = {}));
