declare var Promise: PromiseConstructor;

window.onload = async function() {

    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const colors = [ "green", "blue", "yellow", "purple" ];
    let snail_sprites: HTMLImageElement[] = [];

    for (const color of colors) {
        const sprite = new Image();
        sprite.src = "assets/" + color + "_snail.png";
        await sprite.decode();
        snail_sprites.push(sprite);
        console.log("Loaded " + color + " snail.")
    }

    let snail_x_positions = [ 0, 0, 0, 0 ];
    const snail_y_positions = [25, 120, 215, 310];

    function render() {
        context.fillStyle = `rgb(184, 115, 51)`;
        context.fillRect(0, 0, 800, 450);
        context.fillStyle = `rgb(135, 206, 235)`;
        context.fillRect(0, 0, 800, 75);
        for (let i = 0; i < snail_sprites.length; i++) {
            context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i], 110, 100);
        console.log("RENDERED")
        }
    }

    function update() {

    }

    render();
    // timer loop
    update()
    render()
};