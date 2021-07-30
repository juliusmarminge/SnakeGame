import React from 'react';
import './SnakeGame.css'
import Node from './node/Node';

type MyProps = {
    gridSize: number;
}

type MyState = {
    gridSize: number;
    grid: number[][];
    headX: number;
    headY: number;
    fruitX: number;
    fruitY: number;
    velocity: string;
    score: number;
    snakeSize: number;
}

class SnakeGame extends React.Component<MyProps, MyState> {
    private timer: any;
    constructor(props: MyProps) {
        super(props);
        this.state = {
            gridSize: this.props.gridSize,
            grid: this.getInitialGrid(this.props.gridSize),
            headX: 0,
            headY: 0,
            fruitX: 10,
            fruitY: 10,
            velocity: "right",
            score: 0,
            snakeSize: 1,
        };
    }

    getInitialGrid(gridSize: number) {
        return [...Array(gridSize)].map( () => Array(gridSize).fill(0));
    }

    updateHead() {

        const getNewHeadX = (state: MyState) => {
            if (state.headX === -1) {
                this.setState({headX: state.gridSize - 1})
            }
            if (state.velocity === "right") {
                return (state.headX + 1) % state.gridSize ;
            }
            if (state.velocity === "left") {
                return state.headX - 1
            }
            return state.headX;
        }

        const getNewHeadY = (state: MyState) => {
            if (state.headY === -1) {
                this.setState({headY: state.gridSize - 1})
            }
            if (state.velocity === "down") {
                return (state.headY + 1) % state.gridSize ;
            }
            if (state.velocity === "up") {
                return state.headY - 1
            }
            return state.headY;
        }

        this.setState(state => ({
           ...state,
           headX: getNewHeadX(state),
           headY: getNewHeadY(state),
        }));
    }

    updateGrid() {
        this.setState(state =>({
            ...state,
            grid : state.grid.map((row: number[], i: number) => row.map((node: number, j: number) => {
                return (
                    j === state.headX && i === state.headY ? 1 :
                    j === state.fruitX && i === state.fruitY ? 2 :
                    0
                );
            }))
        }));
    }

    checkIfHeadIsOnFruit() {
        if (this.state.headX === this.state.fruitX &&
            this.state.headY === this.state.fruitY) {
            this.setState({
               score: this.state.score + 1,
               snakeSize: this.state.snakeSize + 1,
               fruitX: Math.floor(Math.random() * this.state.gridSize),
               fruitY: Math.floor(Math.random() * this.state.gridSize)
            });
            this.growSnakeSize();
        }
    }

    growSnakeSize() {

    }

    handleKeyDown(key: KeyboardEvent) {

        const newVelocity =
            key.code === "ArrowDown" ? "down" :
            key.code === "ArrowUp" ? "up" :
            key.code === "ArrowLeft" ? "left" :
            key.code === "ArrowRight" ? "right" :
            this.state.velocity

        this.setState(state =>({
            ...state,
            velocity: newVelocity
            }));
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.updateHead();
            this.updateGrid();
            this.checkIfHeadIsOnFruit();
        }, 100);

        window.addEventListener('keydown', e => {
            this.handleKeyDown(e)});
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <p className={"score-field"}>Score: {this.state.score}</p>
                <div className="grid">
                    {this.state.grid.map( (row: number[]) => {
                        return (
                            <div className="row">
                            {row.map( (node: number) => {
                                return <Node
                                    isBody = {node === 1}
                                    isFruit = {node === 2}
                                />;
                            })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default SnakeGame;
