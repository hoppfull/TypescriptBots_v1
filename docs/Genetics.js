var Genetics;
(function (Genetics) {
    const m = () => 1000 * (Math.random() * 2 - 1) | 0;
    function genMakeup() {
        return {
            ChromosomeA: [
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(),
                m(), m(), m(), m()
            ],
            ChromosomeB: [
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(), m(), m(),
                m(), m(), m(), m(),
                m(), m(), m(), m()
            ]
        };
    }
    Genetics.genMakeup = genMakeup;
    function express(makeup) {
        const length = makeup.ChromosomeA.length;
        const result = new Array(length);
        for (let i = 0; i < length; i++)
            result[i] = (makeup.ChromosomeA[i] + makeup.ChromosomeB[i]) / 400;
        return result;
    }
    Genetics.express = express;
    function replicate(chromosome) {
        const length = chromosome.length;
        const result = new Array(length);
        for (let i = 0; i < length; i++)
            result[i] = chromosome[i] ^ (m() & m() & m() & m() & m());
        return result;
    }
    Genetics.replicate = replicate;
    function mate(mommy, daddy) {
        return Math.random() + 0.5 | 0
            ? {
                ChromosomeA: replicate(mommy.ChromosomeA),
                ChromosomeB: replicate(daddy.ChromosomeB)
            } : {
            ChromosomeA: replicate(daddy.ChromosomeA),
            ChromosomeB: replicate(mommy.ChromosomeB)
        };
    }
    Genetics.mate = mate;
})(Genetics || (Genetics = {}));
