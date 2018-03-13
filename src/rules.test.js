
import { numberOfNeighbors, getNextCellState, advanceGeneration, DEAD, ALIVE } from './rules';

describe("game rules", () => {
    
    describe("counting neighbors", () => {

        describe("in a 3x3 grid", () => {

            it("should return 0 if the cell has no neighbors", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(0);
            });
    
            it("should return 1 if the cell has one neighbor in the top left position", () => {
                const state = [
                    [ 1, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the top middle position", () => {
                const state = [
                    [ 0, 1, 0 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the top right position", () => {
                const state = [
                    [ 0, 0, 1 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the middle left position", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 1, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the middle right position", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 1 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the bottom left position", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 1, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the bottom middle position", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 0, 1, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });
    
            it("should return 1 if the cell has one neighbor in the bottom right position", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(1);
            });

            it("should return 1 if the cell is top left and has one right neighbor", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 0, 0, 1 ],
                    [ 1, 1, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 0, 0)).toEqual(1);
            });
    
            it("should return 8 if the cell is surrounded by neighbors", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 1, 1, 1 ],
                    [ 1, 1, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(8);
            });
    
            it("should return 3 if the cell has neighbors in the top row", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(3);
            });

            it("should return 3 if the cell has neighbors in the bottom row", () => {
                const state = [
                    [ 0, 0, 0 ],
                    [ 0, 1, 0 ],
                    [ 1, 1, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(3);
            });
    
            it("should return 4 if the cell has all diagonal neighbors", () => {
                const state = [
                    [ 1, 0, 1 ],
                    [ 0, 1, 0 ],
                    [ 1, 0, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(4);
            });
    
            it("should return 4 if the cell has all vertical and horizontal neighbors", () => {
                const state = [
                    [ 0, 1, 0 ],
                    [ 1, 1, 1 ],
                    [ 0, 1, 0 ]
                ];
    
                expect(numberOfNeighbors(state, 1, 1)).toEqual(4);
            });
        });

        describe("in a 4x4 grid", () => {

            it("should return 3 if the cell has 3 neighbors", () => {
                const state = [
                    [ 0, 0, 0, 0 ],
                    [ 0, 0, 0, 1 ],
                    [ 0, 0, 1, 1 ],
                    [ 0, 0, 0, 1 ]
                ];
    
                expect(numberOfNeighbors(state, 2, 2)).toEqual(3);
            });
        });
    });

    describe("a cell in a 3x3 grid", () => {
        
        describe("in a 3x3 grid", () => {
            const cellIndex = 4;

            it("should die if it has no neighbors", () => {
                const state = [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0]
                ];

                const cellX = 1;
                const cellY = 1;
                const cell = state[cellY][cellX];
    
                expect(getNextCellState(cell, numberOfNeighbors(state, cellY, cellX))).toEqual(DEAD);
            });
    
            it("should die if it has more than 3 neighbors", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 1 ]
                ];

                const cellX = 1;
                const cellY = 1;
                const cell = state[cellY][cellX];
    
                expect(getNextCellState(cell, numberOfNeighbors(state, cellY, cellX))).toEqual(DEAD);
            });
    
            it("should live if it is dead and has 3 neighbors", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 0, 0, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                const cellX = 1;
                const cellY = 1;
                const cell = state[cellY][cellX];
    
                expect(getNextCellState(cell, numberOfNeighbors(state, cellY, cellX))).toEqual(ALIVE);
            });
    
            it("should continue living if it has 3 neighbors", () => {
                const state = [
                    [ 1, 1, 1 ],
                    [ 0, 1, 0 ],
                    [ 0, 0, 0 ]
                ];
    
                const cellX = 1;
                const cellY = 1;
                const cell = state[cellY][cellX];
    
                expect(getNextCellState(cell, numberOfNeighbors(state, cellY, cellX))).toEqual(ALIVE);
            });
        });
    });

    describe("state advancing", () => {

        it("should advance to the correct next generation", () => {
            const state = [
                [ 1, 1, 1 ],
                [ 0, 0, 0 ], 
                [ 0, 0, 0 ]
            ];

            const expectedState = [
                [ 0, 1, 0 ],
                [ 0, 1, 0 ],
                [ 0, 0, 0 ]
            ];

            const nextState = advanceGeneration(state);

            expect(nextState).toEqual(expectedState);
        });

        it("should advance the glider in the next generation", () => {
            const state = [
                [ 0, 0, 0, 0, 0 ],
                [ 0, 0, 1, 0, 0 ],
                [ 1, 0, 1, 0, 0 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 0, 0, 0, 0 ]
            ];

            let nextState = advanceGeneration(state);

            expect(nextState).toEqual([
                [ 0, 0, 0, 0, 0 ],
                [ 0, 1, 0, 0, 0 ],
                [ 0, 0, 1, 1, 0 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 0, 0, 0, 0 ]
            ]);

            nextState = advanceGeneration(nextState);

            expect(nextState).toEqual([
                [ 0, 0, 0, 0, 0 ],
                [ 0, 0, 1, 0, 0 ],
                [ 0, 0, 0, 1, 0 ],
                [ 0, 1, 1, 1, 0 ],
                [ 0, 0, 0, 0, 0 ]
            ]);

            nextState = advanceGeneration(nextState);

            expect(nextState).toEqual([
                [ 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 1, 1, 0 ],
                [ 0, 0, 1, 0, 0 ]
            ]);

            nextState = advanceGeneration(nextState);

            expect(nextState).toEqual([
                [ 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 0, 0 ],
                [ 0, 0, 0, 1, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 1, 1, 0 ]
            ]);
        });
    })
});