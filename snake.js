const SNAKES = document.getElementsByClassName('snake');
const FIELD = document.getElementsByClassName('field')[0];
const TARGET = document.getElementsByClassName('target')[0];
const START = document.getElementsByClassName('game_start')[0];
const END = document.getElementsByClassName('game_end')[0];
const SNAKE_SIZE = 20;
const TARGET_SIZE = 20;
const FIELD_SIZE = {
    height: FIELD.offsetHeight,
    width: FIELD.offsetWidth,
}
FIELD_SIZE.x = [FIELD.offsetLeft, FIELD.offsetLeft+FIELD_SIZE.width-SNAKE_SIZE];
FIELD_SIZE.y = [FIELD.offsetTop, FIELD.offsetTop+FIELD_SIZE.height-SNAKE_SIZE];
FIELD_SIZE.pixel_h = Math.floor(FIELD_SIZE.height/SNAKE_SIZE);
FIELD_SIZE.pixel_w = Math.floor(FIELD_SIZE.width/SNAKE_SIZE);

let state;
let flag;

let snake_pos = {
    x: [],
    y: [],
}
let target_pos = {
    x: null,
    y: null,
}
let direction = {
    x: 1,
    y: 0,
}

let initialize = () => {
    let pos=0;
    let init_x = null;
    state;
    flag;
    snake_pos = {
        x: [],
        y: [],
    }
    direction = {
        x: 1,
        y: 0,
    }
    for (snake of SNAKES) {
        init_x = FIELD_SIZE.x[0] - SNAKE_SIZE*pos + SNAKE_SIZE*10;
        snake.style.left = init_x + "px";
        snake_pos.x.push(init_x);
        snake_pos.y.push(FIELD_SIZE.y[0]);
        pos++;
    }
}

let set_target = () => {
        target_pos.y = Math.floor(Math.random()*FIELD_SIZE.pixel_h) * TARGET_SIZE + FIELD_SIZE.y[0];
        target_pos.x =  Math.floor(Math.random()*FIELD_SIZE.pixel_w) * TARGET_SIZE + FIELD_SIZE.x[0];

    TARGET.style.top = target_pos.y + "px";
    TARGET.style.left = target_pos.x + "px";
}

let move = direction => {
    let new_pos = [];
    let tmp_pos = 0;
    new_pos.push(snake_pos.x[0] + SNAKE_SIZE*direction.x);
    snake_pos.x = new_pos.concat(snake_pos.x).slice(0, 10);
    
    new_pos = [];
    new_pos.push(snake_pos.y[0] + SNAKE_SIZE*direction.y);
    snake_pos.y = new_pos.concat(snake_pos.y).slice(0, 10);

    for (snake of SNAKES) {
        if (snake_pos.x[tmp_pos] > FIELD_SIZE.x[1]) snake_pos.x[tmp_pos] = FIELD_SIZE.x[0]
        else if (snake_pos.x[tmp_pos] < FIELD_SIZE.x[0]) snake_pos.x[tmp_pos] = FIELD_SIZE.x[1]
        else if (snake_pos.y[tmp_pos] > FIELD_SIZE.y[1]) snake_pos.y[tmp_pos] = FIELD_SIZE.y[0]
        else if (snake_pos.y[tmp_pos] < FIELD_SIZE.y[0]) snake_pos.y[tmp_pos] = FIELD_SIZE.y[1]

        snake.style.top = snake_pos.y[tmp_pos] + "px";
        snake.style.left = snake_pos.x[tmp_pos] + "px";
        tmp_pos++;
    }
}

let judge = () => {
    if ((target_pos.x <= snake_pos.x[0]+SNAKE_SIZE/2) && (snake_pos.x[0]+SNAKE_SIZE/2 <= target_pos.x+TARGET_SIZE)) {
        if ((target_pos.y <= snake_pos.y[0]+SNAKE_SIZE/2) && (snake_pos.y[0]+SNAKE_SIZE/2 <= target_pos.y+TARGET_SIZE))
            set_target()
    }
}

let play = () => {
    move(direction);
    judge();
}

START.addEventListener('click', (e) => {
    initialize();
    set_target();
    state = true;
    flag = setInterval(() => play(), 200);
})
END.addEventListener('click', (e) => {
    clearInterval(flag);
    state = false;
})

addEventListener('keydown', e => {
    if (e.key == 'ArrowLeft') {
        direction.x = -1;
        direction.y = 0;
    } else if (e.key == 'ArrowUp') {
        direction.x = 0;
        direction.y = -1;
    } else if (e.key == 'ArrowRight') {
        direction.x = 1;
        direction.y = 0;
    } else if (e.key == 'ArrowDown') {
        direction.x = 0;
        direction.y = 1;
    }
})