let canvas,
    ctx,
    speed_inp,
    scale_inp,
    pause_btn,
    mouse = { x:0, y:0};

let scale = 2500, //масштаб в километрах
    fps = 60, //количество кадров в секунду
    speed = 100, //ускорение симуляции
    pause = true;

window.onload = function () {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // //-----планеты------
    // //todo: сделать парс планет из json файла\сделать редактор карты
    // let earth = new Planet(300000 + 50000, 150000 + 50000, 6371 * 3, "green", 5.972 * Math.pow(10, 4), new Vector(0, 0));
    // let moon = new Planet(300000 + 384000 + 50000, 150000 + 50000, 2737 * 3, "pink", 50 * Math.pow(10, -15), new Vector(0, 0));
    // //------------------

    //установка таймера отрисовка
    setInterval(tick, 1000 / fps);

    canvas.addEventListener("mousedown", function(e){       
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        const mass = document.getElementsByClassName("mass_1")[0].value,
        pow = document.getElementsByClassName("mass_2")[0].value,
        color = document.getElementsByClassName("color")[0].value,
        rad = document.getElementsByClassName("rad")[0].value,
        x = document.getElementsByClassName("x")[0].value,
        y = document.getElementsByClassName("y")[0].value;
        new Planet(mouse.x * scale, mouse.y * scale, rad * 6371 * 3, color, mass * Math.pow(10, pow) / 1000, new Vector(parseFloat(x), parseFloat(y)));
    });

    pause_btn = document.getElementsByClassName("pause")[0];
    speed_inp = document.getElementsByClassName("speed")[0];
    speed_inp.addEventListener('input', () => { speed = speed_inp.value; });

    scale_inp = document.getElementsByClassName("scale")[0];
    scale_inp.addEventListener('input', () => { scale = scale_inp.value; });
};

//функция отрисовки каждого шага
function tick() {
    //отчистить холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //проходимся по массиву планет
    for (const planet of planets) {
        if (!pause) {
        let move_vector = planet.speed;
        //вычисляем все вектора и складываем
        for (const other_planet of planets) {
            if (planet.id === other_planet.id) continue;
            const speed_vector = getSpeedVector(planet, other_planet);
            move_vector.plus(speed_vector);
        }
        planet.move(move_vector, speed, fps);
        // ctx.beginPath();
        // const norm_move_vector = move_vector.norm();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = 'blue';
        // ctx.moveTo(planet.x / scale, planet.y / scale);
        // ctx.lineTo((planet.x + norm_move_vector.x * scale * 50)  / scale, (planet.y + norm_move_vector.y * scale * 50)  / scale);
        // ctx.stroke();
        // ctx.closePath();
    }
        ctx.beginPath();
        //отрисовываем планету
        planet.draw(ctx);
        ctx.closePath();
    }
}

function set_pause() {
    pause = !pause;
    pause_btn.innerHTML = (pause) ? "Запустить симуляцию" : "Поставить на паузу";
}

//формула ускорения. Принимает на вход массу объекта и расстояние до него
function getSpeed(m, r) {
return m / Math.pow(r, 2);
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

