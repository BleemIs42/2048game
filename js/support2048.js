documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSlideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i,j){
    return cellSpace + i*(cellSpace+cellSlideLength);
}

function getPosLeft(i,j){
    return cellSpace + j*(cellSpace+cellSlideLength);
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2:     return "rgb(250, 152, 164)";break;
        case 4:     return "rgb(245, 87, 150)";break;
        case 8:     return "rgb(246, 227, 126)";break;
        case 16:    return "rgb(255, 215, 8)";break;
        case 32:    return "rgb(240, 154, 2)";break;
        case 64:    return "rgb(170, 235, 119)";break;
        case 128:   return "rgb(13, 255, 43)";break;
        case 256:   return "rgb(26, 214, 9)";break;
        case 512:   return "rgb(26, 214, 240)";break;
        case 1024:  return "rgb(10, 117, 253)";break;
        case 2048:  return "rgb(36, 28, 235)";break;
        case 4096:  return "rgb(149, 15, 213)";break;
    }
    return "black";
}

function getNumberColor(number){
    if (number <= 4) {
        return "white";
    }
    return "rgb(214, 14, 214)";
}

function nospace(board){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){

    for ( var i = 0; i < 4; i++ ) {
        for ( var j = 1; j < 4; j++ ) {
            if ( board[i][j] != 0 ){
                if ( board[i][j-1] == 0 || board[i][j-1] == board[i][j] ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){

    for ( var i = 0; i < 4; i++ ) {
        for ( var j = 0; j < 3; j++ ) {
            if ( board[i][j] != 0 ){
                if ( board[i][j+1] == 0 || board[i][j+1] == board[i][j] ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){

    for ( var j = 0; j < 4; j++ ) {
        for ( var i = 1; i < 4; i++ ) {
            if ( board[i][j] != 0 ){
                if ( board[i-1][j] == 0 || board[i-1][j] == board[i][j] ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){

    for ( var j = 0; j < 4; j++ ) {
        for ( var i = 0; i < 3; i++ ) {
            if ( board[i][j] != 0 ){
                if ( board[i+1][j] == 0 || board[i+1][j] == board[i][j] ) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断左右是否有阻挡
function noBlockHorizontal( row, col1, col2, board ){
    for ( var i = col1 + 1; i < col2; i ++ ){
        if ( board[row][i] != 0 ){
            return false;
        }
    }
    return true;
}

//判断上下是否有阻挡
function noBlockVertical( col, row1, row2, board ){
    for ( var i = row1 + 1; i < row2; i ++ ){
        if ( board[i][col] != 0 ){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if ( canMoveLeft(board) ||
         canMoveRight(board) ||
         canMoveUp(board) ||
         canMoveDown(board) ) {
        return false;
    }
    return true;
}

















































