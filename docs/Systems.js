var Systems;
(function (Systems) {
    Systems.renderSpots = (ctx) => (state) => {
        state.entities.forEach((components, entity) => {
            if (components & ECS.Component.Spot && components & ECS.Component.Position)
                Graphics.drawSpot(ctx, state.positions[entity], state.spots[entity]);
        });
    };
    Systems.renderHealths = (ctx) => (state) => {
        state.entities.forEach((components, entity) => {
            if (components & ECS.Component.Health && components & ECS.Component.Position)
                Graphics.drawEntityValue(ctx, state.positions[entity], 14, 'red', state.healths[entity] / 100);
        });
    };
    Systems.renderScores = (ctx) => (state) => {
        state.entities.forEach((components, entity) => {
            if (components & ECS.Component.Position && components & ECS.Component.Genetics)
                Graphics.drawEntityText(ctx, state.positions[entity], '' + state.genetics[entity].score);
        });
    };
    function physics(state) {
        state.entities.forEach((components, entity) => {
            if (components & ECS.Component.Position && components & ECS.Component.Velocity) {
                const pos = state.positions[entity];
                const vel = state.velocities[entity];
                state.positions[entity] = pos.add(vel);
                state.velocities[entity] = vel.mul(0.998);
            }
        });
    }
    Systems.physics = physics;
    Systems.degeneration = (rate) => (state) => {
        state.entities.forEach((c, entity) => {
            if (c & ECS.Component.Health && c & ECS.Component.Genetics && c & ECS.Component.Position) {
                state.healths[entity] -= rate * Math.sqrt(state.genetics[entity].score * 0.1 + 1) * (state.positions[entity].mag * 0.005);
                if (state.healths[entity] <= 0) {
                    ECS.destroyEntity(entity);
                    state.vacancies.push(entity);
                }
            }
        });
    };
    function consumption(state) {
        state.entities.forEach((components, thisEntity) => {
            if (components & ECS.Component.Nutrition && components & ECS.Component.Position) {
                const eatingEntities = [];
                state.entities.forEach((components, thatEntity) => {
                    if (thisEntity !== thatEntity &&
                        components & ECS.Component.Mouth &&
                        components & ECS.Component.Position &&
                        components & ECS.Component.Health &&
                        state.positions[thisEntity].sub(state.positions[thatEntity]).mag < 13)
                        eatingEntities.push(thatEntity);
                });
                if (eatingEntities.length > 0) {
                    const healthForEachEater = state.nutritients[thisEntity] / eatingEntities.length;
                    eatingEntities.forEach(thatEntity => {
                        state.genetics[thatEntity].score++;
                        // state.healths[thatEntity] = Math.min(state.healths[thatEntity] + healthForEachEater, 100)
                        state.healths[thatEntity] += healthForEachEater;
                    });
                    state.positions[thisEntity] = Physics.randomPos(App.foodSizeArea);
                    // ECS.destroyEntity(thisEntity)
                }
            }
        });
    }
    Systems.consumption = consumption;
    function genesis(state) {
        if (state.vacancies.length > 0) {
            let mommy = { makeup: Genetics.genMakeup(), score: 0 };
            let daddy = { makeup: Genetics.genMakeup(), score: 0 };
            state.entities.forEach((c, entity) => {
                if (c & ECS.Component.Genetics && (mommy.score < state.genetics[entity].score)) {
                    daddy = mommy;
                    mommy = state.genetics[entity];
                }
            });
            state.vacancies.forEach(() => {
                // console.log(`mommy score=${mommy.score}, daddy score=${daddy.score}`)
                const child = Genetics.mate(mommy.makeup, daddy.makeup);
                ECS.createCreatureAssembly(Physics.randomPos(App.creatureBirthSizeArea), child);
            });
            state.vacancies = [];
        }
    }
    Systems.genesis = genesis;
    function thought(state) {
        const food = [];
        state.entities.forEach((c, entity) => {
            if (c & ECS.Component.Nutrition && c & ECS.Component.Position)
                food.push(state.positions[entity]);
        });
        state.entities.forEach((c, entity) => {
            if (c & ECS.Component.Genetics && c & ECS.Component.Velocity && c & ECS.Component.Health) {
                // const [s1, s2, s3] = Senses.smell(state.positions[entity], food)
                const [v1, v2, v3, v4] = Senses.see(state.positions[entity], food);
                const weights = Genetics.express(state.genetics[entity].makeup);
                const [dx, dy] = NeuralNetwork.think([v1, v2, v3, v4], weights);
                const thrust = new Linalg.Vec2(2 * dx - 1, 2 * dy - 1).mul(App.creatureThrustFactor);
                state.healths[entity] -= thrust.mag * 0.5;
                // const vel = state.velocities[entity]
                // state.velocities[entity] = vel.add(thrust)
                state.velocities[entity] = thrust;
            }
        });
    }
    Systems.thought = thought;
})(Systems || (Systems = {}));
