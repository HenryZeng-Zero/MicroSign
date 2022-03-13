class Graph {
    buffer: number[][]
    GraphNow: number[][]
    direction: number // 0:上 1:下 2:左 3:右
    constructor() {
        for (let i = 0; i < 5; i++) {
            this.buffer.push([0, 0, 0, 0, 0])
        }
    }

    public setDirection(direction: number) {
        this.direction = direction
    }

    public Draw() {
        for (let row of this.buffer) {

        }
    }

}

class NumTool {
    NumPack = [0, 8, 4, 2, 1, 12, 6, 3, 9, 10, 5, 13, 14, 7, 11, 15]
    transFormMap = [[0, 0], [0, -1], [1, 0], [0, -1]]
    constructor() { }
    public Num2List(num: number) {
        let list: boolean[]
        let image = this.NumPack[num]
        for (let i = 8; i >= 0; i /= 2) {
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
        led.plot(0, 0)
    }
}