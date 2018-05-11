import React from 'react';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            ascSortHistory: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggleSort() {
        this.setState({
            ascSortHistory: !this.state.ascSortHistory,
        });
    }

    renderMoveList(history) {        
        const moves = history.map((e, i, a) => {
            let desc;
            if (i === 0) {
                desc = 'Go to game start';
            } else {
                const player = i % 2 === 0 ? 'O' : 'X';
                const point = getMovePoint(e.squares, a[i-1].squares);
                desc = `Go to move #${i}, ${player} point at (${point.row}, ${point.col})`;
            }
            const btnBold = {
                fontWeight: 'bold',
            };               
            return (
                <li key={i}>
                    <button  
                        style={this.state.stepNumber === i ? btnBold : null}
                        onClick={() => this.jumpTo(i)}>
                        {desc}
                    </button>
                </li>
            );
        });

        if (!this.state.ascSortHistory) {
            moves.reverse();
        }

        return moves;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const win = calculateWinner(current.squares);

        let status;
        if (win) {
            status = 'Winner: ' + win.who;      
        } else if (history.length === 10) {
            status = 'No one win!'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let sortMsg = `Historay ${this.state.ascSortHistory ? 'descending' : 'ascending'}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winLine={win ? win.line : []}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button className="history-toggle"
                            onClick={() => this.toggleSort()}>
                            {sortMsg}
                        </button>
                    </div>
                    <ol>{this.renderMoveList(history)}</ol>
                </div>
            </div>
        );
    }
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            return {
                who: squares[a],
                line: lines[i],
            };
        }
    }
    return null;
}

function getMovePoint(current, last) {
    for(let i = 0; i < current.length; i++) {
        if (current[i] !== last[i]) {
            return {
                col: i % 3 + 1,
                row: Math.floor(i / 3) + 1,
            };
        }
    }
    return null;
}