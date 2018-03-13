export const ALIVE = 1;
export const DEAD = 0;

export function advanceGeneration(cellStates) {
    const newState = [];
    const length = cellStates.length;
    
    for (let r = 0; r < length; r++) {
        const cols = [];
        for (let c = 0; c < length; c++) {
            const neighbors = numberOfNeighbors(cellStates, r, c);
            cols.push(getNextCellState(cellStates[r][c], neighbors));
        }
        newState[r] = cols;
    }

    return newState;
}

export function getNextCellState(cellState, neighbors) {
    // a cell is born
    if (cellState === DEAD && neighbors === 3) {
        return ALIVE;
    }

    // a cell can keep on living
    if (cellState === ALIVE && (neighbors === 2 || neighbors === 3)) {
        return ALIVE;
    }

    return DEAD;
}

export function numberOfNeighbors(cellStates, r, c) {
    const hasNeighborAtOffset = hasNeighborPartial(cellStates, r, c);
    
    const neighborOffsets = [
        [-1, -1], [-1,  0], [-1, 1],
        [ 0, -1],           [ 0, 1],
        [ 1, -1], [ 1,  0], [ 1, 1]
    ];

    return neighborOffsets.reduce((neighbors, o) => neighbors + hasNeighborAtOffset(o), 0);
}

function hasNeighborPartial(cellStates, row, col) {
    function isOutOfBounds(rowIndex, colIndex) {
        const length = cellStates.length;

        if (rowIndex < 0 || 
            colIndex < 0 || 
            rowIndex >= length || 
            colIndex >= length) {
            return true;
        }

        return false;
    }

    return function(offset) {
        const targetRow = row + offset[0];
        const targetCol = col + offset[1];

        if (isOutOfBounds(targetRow, targetCol)) {
            return 0;
        }

        return cellStates[targetRow][targetCol];
    }
}
