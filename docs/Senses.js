var Senses;
(function (Senses) {
    const smellnervepos1 = new Linalg.Vec2(0, 20);
    const smellnervepos2 = smellnervepos1.rotate(Math.PI * 2 / 3);
    const smellnervepos3 = smellnervepos2.rotate(Math.PI * 2 / 3);
    const smellnerve = (position, items) => items.reduce((acc, item) => acc + 1 / item.sub(position).mag, 0);
    Senses.smell = (position, items) => {
        return [
            smellnerve(position.add(smellnervepos1), items),
            smellnerve(position.add(smellnervepos2), items),
            smellnerve(position.add(smellnervepos3), items)
        ];
    };
    Senses.see = (position, items) => {
        let north = 0;
        let south = 0;
        let west = 0;
        let east = 0;
        for (let i = 0; i < items.length; i++) {
            const relpos = items[i].sub(position);
            const brightness = 100 / relpos.mag;
            if (relpos.y >= 0)
                north += brightness;
            else
                south += brightness;
            if (relpos.x >= 0)
                west += brightness;
            else
                east += brightness;
        }
        return [north, south, west, east];
    };
})(Senses || (Senses = {}));
