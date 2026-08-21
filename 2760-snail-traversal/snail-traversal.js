Array.prototype.snail = function(rowsCount, colsCount) {
    if (this.length !== rowsCount * colsCount) {
        return [];
    }

    const matrix = Array.from({ length: rowsCount }, () => new Array(colsCount));
    let flatIndex = 0;

    for (let col = 0; col < colsCount; col++) {
        if (col % 2 === 0) {
            for (let row = 0; row < rowsCount; row++) {
                matrix[row][col] = this[flatIndex++];
            }
        } else {
            for (let row = rowsCount - 1; row >= 0; row--) {
                matrix[row][col] = this[flatIndex++];
            }
        }
    }

    return matrix;
};