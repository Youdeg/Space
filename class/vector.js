class Vector {
    /*
    x - double
    y - double
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //сложить вектор с данным
    plus(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    //вычесть из вектора данный вектор 
    minus(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    //нормализовать вектор
    normalise(len) {
        return new Vector(this.x / len, this.y / len);
    }

    //денормализовать вектор
    unnormalise(len) {
        return new Vector(this.x * len, this.y * len);
    }
}
