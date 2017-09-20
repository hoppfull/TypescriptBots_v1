var Physics;
(function (Physics) {
    Physics.randomPos = (areaSize) => new Linalg.Vec2(areaSize * (Math.random() * 2 - 1), areaSize * (Math.random() * 2 - 1));
})(Physics || (Physics = {}));
