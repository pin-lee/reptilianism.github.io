declare var Promise: PromiseConstructor;

enum State {
    Clear,
    Paused,
    Racing
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
const colors = [ "green", "blue", "yellow", "purple" ];

const time_form = document.getElementById("time-form") as HTMLInputElement;

async function load_sprites() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (const color of colors) {
        const sprite = new Image();
        sprite.src = "assets/" + color + "_snail.png";
        await sprite.decode();
        snail_sprites.push(sprite);
        console.log("Loaded " + color + " snail.")
    };

    render();
}

function render() {

    function draw_background() {
        context.fillStyle = `rgb(184, 115, 51)`;
        context.fillRect(0, 0, canvas_width, canvas_height);
        context.fillStyle = `rgb(135, 206, 235)`;
        context.fillRect(0, 0, canvas_width, 75);
    }
    
     function draw_snails() {
         for (let i = 0; i < snail_sprites.length; i++) {
             context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i], 110, 100);
         };
     }

    draw_background()
    draw_snails()
    console.log("RENDERED")
}

function update_snail() {
    let duration = (global_time_remaining === 0) ? parseInt(time_form.value) * 60 : global_time_remaining;
    const rate = Math.round(canvas_width / duration);

    const snail_to_update = Math.round(Math.random() * snail_x_positions.length);
    const distance_to_send_snail = rate;
    snail_x_positions[snail_to_update] += distance_to_send_snail;
}

function win(winner_index: number) {
    context.fillStyle = "black";
    context.font = "48px serif";
    context.fillText(`${colors[winner_index]} snail wins!`, 50, 50);
}

function timing_system() {
    let minutes = document.getElementById("minutes") as HTMLElement;
    let seconds = document.getElementById("seconds") as HTMLElement;

    let duration = (global_time_remaining === 0) ? parseInt(time_form.value) * 60 : global_time_remaining;
    let start = Date.now();
    let time_elapsed = 0;

    function calculate_time() {
        if (global_state != State.Racing) {
            clearInterval(intervalId);
            return;
        }

        const delta = Math.floor((Date.now() - start) / 1000);
        global_time_remaining = duration - delta;
        console.log(`${global_time_remaining}`)

        const min = Math.floor(global_time_remaining / 60);
        const sec = global_time_remaining % 60;

        let min_word = (min != 1) ? "minutes" : "minute";
        let sec_word = (sec != 1) ? "seconds" : "second";

        minutes.innerHTML = `${min} ${min_word}`;
        seconds.innerHTML = `${sec} ${sec_word}`;

        time_elapsed++;

        if (global_time_remaining === 0) {
            let ties: number[] = [];
            let greatest_x = -Infinity;
            for (let i = 0; i < snail_x_positions.length; i++) {
                if (snail_x_positions[i] > greatest_x) {
                    greatest_x = snail_x_positions[i];
                    ties = [i];
                } else if (snail_x_positions[i] == greatest_x) {
                    ties.push(i);
                }
            }
            const winner = ties[Math.floor(Math.random() * ties.length)];
            win(winner);

            global_state = State.Paused;
            clearInterval(intervalId);
            return;
        }

        update_snail()
        render()
    }

    const intervalId = setInterval(calculate_time, 1000);
}

let global_state: State = State.Clear;
let global_time_remaining = 0;

load_sprites();


const start_button = document.getElementById("start") as HTMLButtonElement;
start_button.addEventListener("click", function() {

    global_state = State.Racing;
    timing_system()
    
});

let button_state = "PAUSE";
const pause_button = document.getElementById("pause-resume") as HTMLButtonElement;
pause_button.addEventListener("click", function() {
    if (button_state == "PAUSE") {
        global_state = State.Paused;
        button_state = "RESUME";
    } else {
        global_state = State.Racing;
        button_state = "PAUSE";
        timing_system()
    }
    
    pause_button.innerHTML = button_state;

});

const clear_button = document.getElementById("clear") as HTMLButtonElement;
clear_button.addEventListener("click", function() {
    location.reload();
});