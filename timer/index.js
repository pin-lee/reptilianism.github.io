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
var _a;
var State;
(function (State) {
    State[State["Clear"] = 0] = "Clear";
    State[State["Running"] = 1] = "Running";
    State[State["Paused"] = 2] = "Paused";
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
function render() {
    context.fillStyle = "rgb(184, 115, 51)";
    context.fillRect(0, 0, canvas_width, canvas_height);
    context.fillStyle = "rgb(135, 206, 235)";
    context.fillRect(0, 0, canvas_width, 75);
    for (var i = 0; i < snail_sprites.length; i++) {
        context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i], 110, 100);
        console.log("RENDERED");
    }
}
function update_snail(snail_index) {
    var snail_to_update = Math.floor(Math.random() * snail_x_positions.length);
    var distance_to_send_snail = Math.floor(Math.random() * 2 - 1);
}
var global_state = State.Clear;
var duration;
var time = (_a = document.getElementById("race-controls")) === null || _a === void 0 ? void 0 : _a.innerHTML;
var start;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (global_state) {
                case State.Clear:
                    break;
                case State.Paused:
                    break;
                case State.Running:
                    render();
                    setInterval(function () {
                        var delta = Date.now() - start;
                        console.log(Math.floor(delta / 1000));
                        time.innerHTML = "".concat(duration - delta);
                    }, 1000);
                    break;
            }
            requestAnimationFrame(main);
            return [2 /*return*/];
        });
    });
}
var time_form = document.getElementById("time-form");
var start_button = document.getElementById("start");
start_button.addEventListener("click", function () {
    global_state = State.Running;
    duration = +time_form.value;
    start = Date.now();
});
window.onload = function () {
    return __awaiter(this, void 0, void 0, function () {
        var colors, _i, colors_1, color, sprite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.getElementById("canvas");
                    context = canvas.getContext("2d");
                    colors = ["green", "blue", "yellow", "purple"];
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
                    render();
                    requestAnimationFrame(main);
                    return [2 /*return*/];
            }
        });
    });
};
