//массив всех объектов планет
let planets = [];

class Planet {
    /*
    x - double
    y - double
    radius - double
    color - string
    mass - double
    speed - Vector
     */
    constructor(x, y, radius, color, mass, speed) {
        this.id = planets.length + 1;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.mass = mass;
        this.speed = speed;
        //добавляем планету в массив планет
        planets.push(this);
    }

    //переместить планету на данный вектор
    //принимает на вход вектор перемещения и ускорение симуляции и количество кадров в секунду
    move(vector, speed, fps) {
        this.x += (vector.x / fps) * speed;
        this.y += (vector.y / fps) * speed;
    }

    //отрисовать круг на холсте
    //принимает на вход ссылку на холст
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.arc(this.x / scale, this.y / scale, this.radius / scale, 0, 2 * Math.PI);
        ctx.fill();
    }
}