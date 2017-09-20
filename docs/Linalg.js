var Linalg;
(function (Linalg) {
    class Vec2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this._mag = null;
        }
        get mag() {
            if (this._mag === null)
                this._mag = Math.sqrt(this.x * this.x + this.y * this.y);
            return this._mag;
        }
        add(v) { return new Vec2(this.x + v.x, this.y + v.y); }
        sub(v) { return new Vec2(this.x - v.x, this.y - v.y); }
        dot(v) { return this.x * v.x + this.y * v.y; }
        mul(c) { return new Vec2(this.x * c, this.y * c); }
        rotate(r) {
            const x = this.x * Math.cos(r) - this.y * Math.sin(r);
            const y = this.x * Math.sin(r) + this.y * Math.cos(r);
            return new Vec2(x, y);
        }
    }
    Linalg.Vec2 = Vec2;
})(Linalg || (Linalg = {}));
