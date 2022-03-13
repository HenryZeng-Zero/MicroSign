class Graph {
    buffer: number[][]
    GraphNow:number[][]
    direction:number // 0:上 1:下 2:左 3:右
    constructor() {
        for(let i = 0;i<5;i++){
            this.buffer.push([0,0,0,0,0])
        }
    }

    public setDirection(direction:number){
        this.direction = direction
    }
