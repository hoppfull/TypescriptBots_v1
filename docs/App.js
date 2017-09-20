var App;
(function (App) {
    App.foodSizeArea = 250;
    App.creatureBirthSizeArea = 200;
    App.creatureThrustFactor = 0.3;
    App.creatureDegenRate = 0.05;
    let MouseButton;
    (function (MouseButton) {
        MouseButton[MouseButton["Right"] = 0] = "Right";
        MouseButton[MouseButton["Middle"] = 1] = "Middle";
        MouseButton[MouseButton["Left"] = 2] = "Left";
    })(MouseButton || (MouseButton = {}));
    function main() {
        const canvas = document.getElementById('cnv_display');
        const context = canvas.getContext("2d");
        let mouseispressed = false;
        let mousepos = new Linalg.Vec2(0, 0);
        let campos = new Linalg.Vec2(0, 0);
        canvas.onmousedown = (e) => {
            if (e.button === MouseButton.Middle) {
                mousepos = new Linalg.Vec2(e.offsetX, e.offsetY).add(campos);
                mouseispressed = true;
            }
        };
        canvas.onmousemove = (e) => {
            if (mouseispressed)
                campos = new Linalg.Vec2(e.offsetX, e.offsetY).sub(mousepos).mul(-1);
        };
        canvas.onmouseup = () => { mouseispressed = false; };
        canvas.onmouseleave = () => { mouseispressed = false; };
        for (let i = 0; i < 30; i++)
            ECS.createCreatureAssembly(Physics.randomPos(App.creatureBirthSizeArea), Genetics.genMakeup());
        for (let i = 0; i < 30; i++)
            ECS.createFoodAssembly(Physics.randomPos(App.foodSizeArea));
        const systems = [
            Systems.degeneration(App.creatureDegenRate),
            Systems.renderSpots(context),
            Systems.renderHealths(context),
            Systems.renderScores(context),
            Systems.physics,
            Systems.consumption,
            Systems.genesis,
            Systems.thought
        ];
        Graphics.renderLoop(context, () => {
            Graphics.camPos(context, campos, 1);
            ECS.run(systems);
        });
    }
    App.main = main;
})(App || (App = {}));
