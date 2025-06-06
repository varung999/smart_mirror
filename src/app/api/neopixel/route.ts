import ws281x from 'rpi-ws281x-native';

export async function GET() {
    const options = {
        gpio: 18,
        dma: 10,
        freq: 800000,
        invert: false,
        brightness: 255,
        stripType: ws281x.stripType.WS2812
    };

    const channel = ws281x(20, options);
    const colors = channel.array;

    // update color-values
    colors[42] = 0xffcc22;
    ws281x.render();
}