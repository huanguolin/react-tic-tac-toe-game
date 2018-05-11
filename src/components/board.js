import React from 'react';
import Square from './square';

const COL_CNT = 3;

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                key={i}
                highlight={this.props.winLine.indexOf(i) !== -1}
            />
        );
    }

    renderRow(i) {
        const cols = [];
        for (let j = 0; j < COL_CNT; j ++) {
            cols.push(this.renderSquare(i * COL_CNT + j));
        }
        return (<div className="board-row" key={i}>{cols}</div>);
    }

    render() {
        const rowCnt = this.props.squares.length / COL_CNT | 0;
        const rows = [];
        for (let i = 0; i < rowCnt; i++) {
            rows.push(this.renderRow(i));
        }
        return (<div>{rows}</div>);
    }
};
