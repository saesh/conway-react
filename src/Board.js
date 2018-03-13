import * as React from 'react';
import Cell from './Cell';
import { advanceGeneration } from './rules';

export default class Board extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = this.defaultState(this.props.size);

        setInterval(() => {
            if (this.state.ticking) {
                this.tick();
            }
        }, this.state.generationTime);

        this.lastRender = (new Date()).getTime();
    }
    
    defaultState(size) {
        return {
            generation: 1,
            ticking: true,
            cellStates: this.initialCellStates(size),
            size,
            generationTime: 100
        };
    }

    initialCellStates(size) {
        const rows = [];

        for (let row = 0; row < size; row++) {
            const cols = [];
            for (let col = 0; col < size; col++) {
                cols.push(Math.round(Math.random()));                
            }

            rows[row] = cols;
        }

        return rows;
    }

    tick() {
        const { cellStates, generation } = this.state;
        const nextState = advanceGeneration(cellStates);

        this.setState({
            generation: generation + 1,
            cellStates: nextState,
        });
    }

    toggleTicking() {
        this.setState({
            ticking: !this.state.ticking
        });
    }

    resetBoard() {
        this.setState({
            cellStates: this.initialCellStates(this.state.size)
        });
    }

    renderBoard() {
        const { cellStates, size } = this.state;
        const rows = [];

        for (let row = 0; row < size; row++) {
            const cells = [];

            for (let col = 0; col < size; col++) {
                cells.push(<Cell key={"cell-" + col} alive={cellStates[row][col]}/>)
            }

            rows.push(<div key={"row-" + row} className="row">{cells}</div>);
        }

        return rows;
    }

    render() {
        const now = (new Date()).getTime();
        const renderTime = now - this.lastRender;
        this.lastRender = now;
        return (
            <div>
                <div className="board">{this.renderBoard()}</div>
                <div>
                    <button onClick={this.toggleTicking.bind(this)}>{this.state.ticking ? 'Pause' : 'Play'}</button>
                    <button onClick={this.tick.bind(this)} disabled={this.state.ticking}>Step</button>
                    <button onClick={this.resetBoard.bind(this)}>Reset</button>
                    <div>Offset: {this.state.generationTime - renderTime}ms</div>
                </div>
            </div>
        );
    }
}