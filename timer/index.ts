window.onload = async function() {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const colors = [ "green", "blue", "yellow", "purple" ];
    let snail_sprites: HTMLImageElement[] = [];
    
    (async () => {
        for (const color in colors) {
            const sprite = new Image();
            sprite.src = "assets/" + color + "_snail.png";
            await sprite.decode();
            snail_sprites.push(sprite);
            console.log("Loaded " + color + " snail.")
        }
        render()
    });

    const snail_x_positions = [ 0, 0, 0, 0 ];
    const snail_y_positions = [100, 200, 300, 400];

    function render() {
        //context.fillRect(10, 10, 150, 100);
        for (let i = 0; i < snail_sprites.length; i++) {
            context.drawImage(snail_sprites[i], snail_x_positions[i], snail_y_positions[i]);
        }
        console.log("RENDERED   ")
    }

};