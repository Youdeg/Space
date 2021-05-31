let canvas,
    ctx;

const scale = 2500, //масштаб в километрах
    fps = 60, //количество кадров в секунду
    speed = 1; //ускорение симуляции

window.onload = function () {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");

    //-----планеты------
    //todo: сделать парс планет из json файла\сделать редактор карты
    let earth = new Planet(300000 + 50000, 150000 + 50000, 6371 * 3, "green", 5.972 * Math.pow(10, 4), new Vector(0, 0));
    let moon = new Planet(300000 + 384000 + 50000, 150000 + 50000, 2737 * 3, "pink", 50 * Math.pow(10, -15), new Vector(0, 0));
    //------------------

    //установка таймера отрисовка
    setInterval(tic, 1000 / fps);
};

//функция отрисовки каждого шага
function tic() {
    //отчистить холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //проходимся по массиву планет
    for (const planet of planets) {
        let move_vector = planet.speed;
        //вычисляем все вектора и складываем
        for (const other_planet of planets) {
            if (planet.id === other_planet.id) continue;
            const speed_vector = getSpeedVector(planet, other_planet);
            move_vector.plus(speed_vector);
        }

        ctx.beginPath();
        //перемещаем планету
        planet.move(move_vector, speed, fps);
        //отрисовываем планету
        planet.draw(ctx);
        ctx.closePath();
    }
}

//формула ускорения. Принимает на вход массу объекта и расстояние до него
function getSpeed(m, r) {
return m / r;
}

//вычисление дистанции между двумя точками
function getDistance(x1, x2, y1, y2) {
return Math.sqrt(
    Math.pow(x1 - x2 , 2) + Math.pow(y1 - y2 , 2)
)
}

//получение вектора скорости между двумя планетами.
//принимает на вход две планеты
function getSpeedVector(p1, p2) {
    //вычисляем дистанцию
    let distance = getDistance(p1.x, p2.x, p1.y, p2.y);
    //создаём новый вектор с началом координат во второй планете
    let normal = new Vector(p2.x - p1.x, p2.y - p1.y);
    //нормализуем вектор, затем вычисляем его длинну через функция получения ускорения
    let newVec = normal.normalise(distance).unnormalise(getSpeed(p2.mass, distance));
    return newVec;
}

