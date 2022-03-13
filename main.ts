class Graph {
    buffer: boolean[][]
    alpha_buffer: number[][]
    direction: number // 0:上 1:下 2:左 3:右
    constructor() {
        this.buffer = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ]
        this.alpha_buffer = [
            [255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255],
            [255, 255, 255, 255, 255]
        ]
    }

    public setBufferTF(x: number, y: number, key: boolean) {
        this.buffer[y][x] = key
    }
    public setBufferNu(x: number, y: number, key: number) {
        if (key == 0) {
            this.buffer[y][x] = false
        } else {
            this.buffer[y][x] = true
        }
    }

    public setAlphaNu(x: number, y: number, num: number) {
        this.alpha_buffer[y][x] = num
    }

    public setDirection(direction: number) {
        this.direction = direction
    }

    public transform(x: number, y: number) {
        // TODO:转换器
        return [x, y]
    }

    public ledKey(x: number, y: number, key: boolean) {
        if (key == true) {
            //led.plot(x, y)
            led.plotBrightness(x, y, this.alpha_buffer[y][x])
        } else {
            led.unplot(x, y)
        }
    }

    public Draw() {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                let p = this.transform(x, y)
                if (led.point(p[0], p[1]) != this.buffer[y][x]) {
                    this.ledKey(p[0], p[1], this.buffer[y][x])
                }
            }
        }
    }

}

class NumTool {
    NumPack = [0, 8, 4, 2, 1, 12, 6, 3, 9, 10, 5, 13, 14, 7, 11, 15]
    transFormMap = [[0, 0], [0, 1], [1, 0], [0, -1]]
    GH_device: Graph
    constructor(instance: Graph) {
        this.GH_device = instance
    }
    public Num2List(num: number) {
        // 数字转换到二进制数组
        let list: boolean[] = []
        let image = this.NumPack[num]
        for (let i = 8; i >= 1; i /= 2) {
            let bit = image / i
            if (Math.floor(bit) == 1) {
                list.push(true)
                image -= i;
            } else {
                list.push(false)
            }
        }

        return list
    }

    public Update(x: number, y: number, num: number) {
        let image = this.Num2List(num)
        let count = 0
        for (let tfM of this.transFormMap) {
            x += tfM[0]
            y += tfM[1]
            this.GH_device.setBufferTF(x, y, image[count])
            count++
        }
    }
}

let Graph_device = new Graph()
let num = new NumTool(Graph_device)

num.Update(0, 0, 1)


let a = 0

input.onButtonPressed(Button.A, function() {
    a+=1
    num.Update(0, 0, a)
    Graph_device.Draw()
})