const initCellSequenceByCellCount = (cellCount: number) => {
    const cells: string[] = [];
    const letters = "abcdefgh";
    const numbers = "12345678";
    for (let i = 0; i < cellCount; i++) {
        const randomSquare = letters[Math.floor(Math.random() * letters.length)];
        const cellNo = numbers[Math.floor(Math.random() * numbers.length)];
        cells.push(randomSquare + cellNo);
    }
    return cells;
};

export default initCellSequenceByCellCount;