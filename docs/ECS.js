var ECS;
(function (ECS) {
    function run(systems) {
        systems.forEach(system => system(ECS.state));
    }
    ECS.run = run;
    let Component;
    (function (Component) {
        Component[Component["Empty"] = 0] = "Empty";
        Component[Component["Position"] = 1] = "Position";
        Component[Component["Health"] = 2] = "Health";
        Component[Component["Velocity"] = 4] = "Velocity";
        Component[Component["Nutrition"] = 8] = "Nutrition";
        Component[Component["Genetics"] = 16] = "Genetics";
        Component[Component["Spot"] = 32] = "Spot";
        Component[Component["Mouth"] = 64] = "Mouth";
    })(Component = ECS.Component || (ECS.Component = {}));
    const N_ENTITIES = 100;
    ECS.state = {
        entities: new Array(N_ENTITIES).fill(Component.Empty),
        positions: new Array(N_ENTITIES).fill(new Linalg.Vec2(0, 0)),
        velocities: new Array(N_ENTITIES).fill(new Linalg.Vec2(0, 0)),
        nutritients: new Array(N_ENTITIES).fill(0),
        genetics: new Array(N_ENTITIES),
        healths: new Array(N_ENTITIES).fill(0),
        spots: new Array(N_ENTITIES).fill({ radius: 0, color: "black" }),
        vacancies: new Array(0)
    };
    function getEntity() {
        const index = ECS.state.entities.findIndex(entity => entity === Component.Empty);
        return index === -1 ? null : index;
    }
    ECS.getEntity = getEntity;
    function addMouthComponent(entity) {
        ECS.state.entities[entity] |= Component.Mouth;
    }
    ECS.addMouthComponent = addMouthComponent;
    function addPositionComponent(entity, position) {
        ECS.state.entities[entity] |= Component.Position;
        ECS.state.positions[entity] = position;
    }
    ECS.addPositionComponent = addPositionComponent;
    function addVelocityComponent(entity, velocity) {
        ECS.state.entities[entity] |= Component.Velocity;
        ECS.state.velocities[entity] = velocity;
    }
    ECS.addVelocityComponent = addVelocityComponent;
    function addNutritionComponent(entity, nutrition) {
        ECS.state.entities[entity] |= Component.Nutrition;
        ECS.state.nutritients[entity] = nutrition;
    }
    ECS.addNutritionComponent = addNutritionComponent;
    function addGeneticComponent(entity, genes) {
        ECS.state.entities[entity] |= Component.Genetics;
        ECS.state.genetics[entity] = { makeup: genes, score: 0 };
    }
    ECS.addGeneticComponent = addGeneticComponent;
    function addSpotComponent(entity, spot) {
        ECS.state.entities[entity] |= Component.Spot;
        ECS.state.spots[entity] = spot;
    }
    ECS.addSpotComponent = addSpotComponent;
    function addHealthComponent(entity, health) {
        ECS.state.entities[entity] |= Component.Health;
        ECS.state.healths[entity] = health;
    }
    ECS.addHealthComponent = addHealthComponent;
    function removeComponent(entity, component) {
        ECS.state.entities[entity] &= ~component;
    }
    ECS.removeComponent = removeComponent;
    function createCreatureAssembly(position, genes) {
        const entity = getEntity();
        if (entity !== null) {
            addPositionComponent(entity, position);
            addVelocityComponent(entity, new Linalg.Vec2(0, 0));
            addSpotComponent(entity, { radius: 10, color: 'lightblue' });
            addGeneticComponent(entity, genes);
            addHealthComponent(entity, 100);
            addMouthComponent(entity);
        }
        return entity;
    }
    ECS.createCreatureAssembly = createCreatureAssembly;
    function createFoodAssembly(position) {
        const entity = getEntity();
        if (entity) {
            addPositionComponent(entity, position);
            addSpotComponent(entity, { radius: 5, color: 'chartreuse' });
            addNutritionComponent(entity, 100);
        }
        return entity;
    }
    ECS.createFoodAssembly = createFoodAssembly;
    function destroyEntity(entity) {
        ECS.state.entities[entity] = Component.Empty;
    }
    ECS.destroyEntity = destroyEntity;
})(ECS || (ECS = {}));
