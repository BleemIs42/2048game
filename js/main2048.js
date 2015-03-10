var board = new Array();
var grade = ['平民', '斗徒', '斗者', '斗师', '斗灵', '斗王',
             '斗皇', '斗宗', '斗尊', '斗圣', '斗帝', '斗神'];
var score = 0;
var stage = ['青莲地心火', '海心炎', '陨落心炎', '九龙雷罡火',
             '骨灵冷火', '三千焱炎火', '红莲业火', '生灵之炎',
             '金帝焚天炎',  '净莲妖火', '虚无吞炎', '混沌圣炎'];
            // 混沌圣炎    虚无吞炎    净莲妖火    金帝焚天炎
            // 生灵之炎    八荒破灭炎  九幽金祖火  红莲业火
            // 三千焱炎火  九幽风炎    骨灵冷火    九龙雷罡火
            // 龟灵地火    陨落心炎    海心炎      火云水焱
            // 风雷怒焱    青莲地心火  龙凤焱      六道轮回炎
            // 万兽灵火  玄黄炎

//单次按键每个格子中的碰撞检测
var hasConflicted = new Array();

//触摸坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    if (documentWidth >500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSlideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius', 0.02*gridContainerWidth);

    $('.grid-cell').css('border-radius', 0.02*cellSlideLength);
    $('.grid-cell').css('width', cellSlideLength);
    $('.grid-cell').css('height', cellSlideLength);
}

function newgame(){
    //初始化棋盘格
    init();

    //在随机两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){

    score = 2;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        };
    };
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        };
    };

    updateScore(score);
    updateBoardView();
}

function updateBoardView(){

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if (board[i][j] == 0) {
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSlideLength/2);
                theNumberCell.css('left',getPosLeft(i,j) + cellSlideLength/2);
            }
            else{
                theNumberCell.css('width', cellSlideLength);
                theNumberCell.css('height', cellSlideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                // theNumberCell.text(board[i][j]);
                switch (board[i][j]){
                    case 2:     theNumberCell.text(grade[0]);break;
                    case 4:     theNumberCell.text(grade[1]);break;
                    case 8:     theNumberCell.text(grade[2]);break;
                    case 16:    theNumberCell.text(grade[3]);break;
                    case 32:    theNumberCell.text(grade[4]);break;
                    case 64:    theNumberCell.text(grade[5]);break;
                    case 128:   theNumberCell.text(grade[6]);break;
                    case 256:   theNumberCell.text(grade[7]);break;
                    case 512:   theNumberCell.text(grade[8]);break;
                    case 1024:  theNumberCell.text(grade[9]);break;
                    case 2048:  theNumberCell.text(grade[10]);break;
                    case 4096:  theNumberCell.text(grade[11]);break;
                    default:    ;
                }
            }

            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cellSlideLength+'px');
    $('.number-cell').css('font-size', 0.45*cellSlideLength+'px');
}

function generateOneNumber(){

    if (nospace(board)) {
        return false;
    }

    //随机一个位置
    var randx =parseInt( Math.floor( Math.random()*4 ) );
    var randy =parseInt( Math.floor( Math.random()*4 ) );

    var times = 0;
    while(times < 50){
        if (board[randx][randy] == 0) {
            break;
        }

        randx =parseInt( Math.floor( Math.random()*4 ) );
        randy =parseInt( Math.floor( Math.random()*4 ) );

        times ++;
    }

    if (times == 50) {
        for ( var i = 0; i < 4; i++ ) {
            for ( var j = 1; j < 4; j++ ) {
                if ( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
        }
    };

    //随即一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机的位置上显示数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx, randy, randNumber );

    return true;
}

$(document).keydown(function(event) {

    event.preventDefault();
    switch(event.keyCode){
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                console.log(board);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

document.addEventListener('touchstart', function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.2*documentWidth && Math.abs(deltay) < 0.2*documentWidth) {
        return;
    };

    //x
    if ( Math.abs(deltax) >= Math.abs(deltay) ) {

        if ( deltax > 0 ) {
            //move right
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move left
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
    //y
    else{

        if ( deltay > 0 ) {
            //move down
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move up
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
})

function isgameover(){
    if ( nospace(board) && nomove(board) ) {
        gameover();
    };
}

function gameover(){
    if( confirm("Game Over! Restart?")){
        newgame();
    }
}

function moveLeft(){

    if (!canMoveLeft(board)) {
        return false;
    }

    //moveLeft
    for ( var i = 0; i < 4; i++ ) {
        for ( var j = 1; j < 4; j++ ) {
            if ( board[i][j] != 0 ){
                for ( var k = 0; k < j; k++ ) {
                    if ( board[i][k] == 0 && noBlockHorizontal( i, k, j, board ) ){
                        //move
                        showMoveAnimation( i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i, k, j, board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        // score += board[i][k];
                        score = score > board[i][k] ? score : board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;

                    }
                }
            }
        }
    }

    //延时等待移动动画播放完毕后刷新画面
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight(){

    if (!canMoveRight(board)) {
        return false;
    }

    //moveRight
    for ( var i = 0; i < 4; i++ ) {
        for ( var j = 2; j >= 0; j-- ) {
            if ( board[i][j] != 0 ){
                for ( var k = 3; k > j; k-- ) {
                    if ( board[i][k] == 0 && noBlockHorizontal( i, j, k, board ) ){
                        //move
                        showMoveAnimation( i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i, j, k, board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        // score += board[i][k];
                        score = score > board[i][k] ? score : board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;

                    }
                }
            }
        }
    }

    //延时等待移动动画播放完毕后刷新画面
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){

    if (!canMoveUp(board)) {
        return false;
    }

    //moveUp
    for ( var j = 0; j < 4; j++ ) {
        for ( var i = 1; i < 4; i++ ) {
            if ( board[i][j] != 0 ){
                for ( var k = 0; k < i; k++ ) {
                    if ( board[k][j] == 0 && noBlockVertical( j, k, i, board ) ){
                        //move
                        showMoveAnimation( i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j, k, i, board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        // score += board[k][j];
                        score = score > board[k][j] ? score : board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;

                    }
                }
            }
        }
    }

    //延时等待移动动画播放完毕后刷新画面
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){

    if (!canMoveDown(board)) {
        return false;
    }

    //moveDown
    for ( var j = 0; j < 4; j++ ) {
        for ( var i = 2; i >= 0; i-- ) {
            if ( board[i][j] != 0 ){
                for ( var k = 3; k > i; k-- ) {
                    if ( board[k][j] == 0 && noBlockVertical( j, i, k, board ) ){
                        //move
                        showMoveAnimation( i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j, i, k, board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        // score += board[k][j];
                        score = score > board[k][j] ? score : board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;

                    }
                }
            }
        }
    }

    //延时等待移动动画播放完毕后刷新画面
    setTimeout("updateBoardView()", 200);
    return true;
}