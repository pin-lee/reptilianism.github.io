declare var Promise: PromiseConstructor;

enum State {
    Clear,
    Running,
    Paused
}

const snail_sprites: HTMLImageElement[] = [];
const canvas_width = 800;
const canvas_height = 450;
const snail_y_offset = 25;
const snail_buffer_distance = 95;
let snail_x_positions = [ 0, 0, 0, 0 ];
const snail_y_positions = [
    snail_y_offset + snail_buffer_distance * 0,
    snail_y_offset + snail_buffer_distance * 1,
    snail_y_offset + snail_buffer_distance * 2,
    snail_y_offset + snail_buffer_distance * 3
];

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;


function render() {
    context.fillStyle = `rgb(184, 115, 51)`;
    context.fillRect(0, 0, canvas_width, canvas_height);
    context.fillStyle = `rgb(135, 206, 235)`;
    context.fillRect(0, 0, canvas_width, 75);
    for (let i = 0; i < snail_sprites.length; i++) {
        context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i], 110, 100);
    console.log("RENDERED")
    }
}

function update_snail(snail_index: number) {
    const snail_to_update = Math.floor(Math.random() * snail_x_positions.length);
    const distance_to_send_snail = Math.floor(Math.random() * 2 - 1);
}


let global_state = State.Clear;
let duration: number;
let time = document.getElementById("race-controls")?.innerHTML;
let start: number;

async function main() {
    switch (global_state) {
        case State.Clear:
            break;
        case State.Paused:
            break;
        case State.Running:
            render();
            setInterval(function() {
                const delta = Date.now() - start;
                console.log(Math.floor(delta / 1000));
                time.innerHTML = `${duration - delta}`;
            }, 1000);
            break;
    }
    requestAnimationFrame(main);
}

const time_form = document.getElementById("time-form") as HTMLInputElement;
const start_button = document.getElementById("start") as HTMLButtonElement;
start_button.addEventListener("click", function() {
    global_state = State.Running;
    duration = +time_form.value;
    start = Date.now();
});

window.onload = async function() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const colors = [ "green", "blue", "yellow", "purple" ];
        
    for (const color of colors) {
        const sprite = new Image();
        sprite.src = "assets/" + color + "_snail.png";
        await sprite.decode();
        snail_sprites.push(sprite);
        console.log("Loaded " + color + " snail.")
    }

    render();

    requestAnimationFrame(main);

}
