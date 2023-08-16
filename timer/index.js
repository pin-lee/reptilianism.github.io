var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var State;
(function (State) {
    State[State["Clear"] = 0] = "Clear";
    State[State["Paused"] = 1] = "Paused";
    State[State["Racing"] = 2] = "Racing";
})(State || (State = {}));
var snail_sprites = [];
var canvas_width = 800;
var canvas_height = 450;
var snail_y_offset = 25;
var snail_buffer_distance = 95;
var snail_x_positions = [0, 0, 0, 0];
var snail_y_positions = [
    snail_y_offset + snail_buffer_distance * 0,
    snail_y_offset + snail_buffer_distance * 1,
    snail_y_offset + snail_buffer_distance * 2,
    snail_y_offset + snail_buffer_distance * 3
];
var canvas;
var context;
var colors = ["green", "blue", "yellow", "purple"];
var time_form = document.getElementById("time-form");
function load_sprites() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, colors_1, color, sprite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.getElementById("canvas");
                    context = canvas.getContext("2d");
                    _i = 0, colors_1 = colors;
                    _a.label = 1;
                case 1:
                    if (!(_i < colors_1.length)) return [3 /*break*/, 4];
                    color = colors_1[_i];
                    sprite = new Image();
                    sprite.src = "assets/" + color + "_snail.png";
                    return [4 /*yield*/, sprite.decode()];
                case 2:
                    _a.sent();
                    snail_sprites.push(sprite);
                    console.log("Loaded " + color + " snail.");
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    render();
                    return [2 /*return*/];
            }
        });
    });
}
function render() {
    function draw_background() {
        context.fillStyle = "rgb(184, 115, 51)";
        context.fillRect(0, 0, canvas_width, canvas_height);
        context.fillStyle = "rgb(135, 206, 235)";
        context.fillRect(0, 0, canvas_width, 75);
    }
    function draw_snails() {
        for (var i = 0; i < snail_sprites.length; i++) {
            context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i], 110, 100);
        }
        ;
    }
    draw_background();
    draw_snails();
    console.log("RENDERED");
}
function update_snail() {
    var duration = (global_time_remaining === 0) ? parseInt(time_form.value) * 60 : global_time_remaining;
    var rate = Math.round(canvas_width / duration);
    var snail_to_update = Math.round(Math.random() * snail_x_positions.length);
    var distance_to_send_snail = rate;
    snail_x_positions[snail_to_update] += distance_to_send_snail;
}
function win(winner_index) {
    context.fillStyle = "black";
    context.font = "48px serif";
    context.fillText("".concat(colors[winner_index], " snail wins!"), 50, 50);
}
function timing_system() {
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    var duration = (global_time_remaining === 0) ? parseInt(time_form.value) * 60 : global_time_remaining;
    var start = Date.now();
    var time_elapsed = 0;
    function calculate_time() {
        if (global_state != State.Racing) {
            clearInterval(intervalId);
            return;
        }
        var delta = Math.floor((Date.now() - start) / 1000);
        global_time_remaining = duration - delta;
        console.log("".concat(global_time_remaining));
        var min = Math.floor(global_time_remaining / 60);
        var sec = global_time_remaining % 60;
        var min_word = (min != 1) ? "minutes" : "minute";
        var sec_word = (sec != 1) ? "seconds" : "second";
        minutes.innerHTML = "".concat(min, " ").concat(min_word);
        seconds.innerHTML = "".concat(sec, " ").concat(sec_word);
        time_elapsed++;
        if (global_time_remaining === 0) {
            var ties = [];
            var greatest_x = -Infinity;
            for (var i = 0; i < snail_x_positions.length; i++) {
                if (snail_x_positions[i] > greatest_x) {
                    greatest_x = snail_x_positions[i];
                    ties = [i];
                }
                else if (snail_x_positions[i] == greatest_x) {
                    ties.push(i);
                }
            }
            var winner = ties[Math.floor(Math.random() * ties.length)];
            win(winner);
            global_state = State.Paused;
            clearInterval(intervalId);
            return;
        }
        update_snail();
        render();
    }
    var intervalId = setInterval(calculate_time, 1000);
}
var global_state = State.Clear;
var global_time_remaining = 0;
load_sprites();
var start_button = document.getElementById("start");
start_button.addEventListener("click", function () {
    global_state = State.Racing;
    timing_system();
});
var button_state = "PAUSE";
var pause_button = document.getElementById("pause-resume");
pause_button.addEventListener("click", function () {
    if (button_state == "PAUSE") {
        global_state = State.Paused;
        button_state = "RESUME";
    }
    else {
        global_state = State.Racing;
        button_state = "PAUSE";
        timing_system();
    }
    pause_button.innerHTML = button_state;
});
var clear_button = document.getElementById("clear");
clear_button.addEventListener("click", function () {
    location.reload();
});
