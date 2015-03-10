function showNumberWithAnimation( i, j, randNumber ){

    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css( 'background-color', getNumberBackgroundColor( randNumber ) );
    numberCell.css( 'color', getNumberColor( randNumber ) );
    // numberCell.text( randNumber );
    numberCell.text(randNumber == 2 ? grade[0] : grade[1]);

    numberCell.animate({
        width: cellSlideLength,
        height: cellSlideLength,
        top:getPosTop( i, j ),
        left:getPosLeft( i, j ),
    }, 50);
}

function showMoveAnimation( fromx, fromy, tox, toy){

    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop( tox, toy ),
        left:getPosLeft( tox, toy ),
    }, 200);
}

function updateScore(score){
    switch (score){
        case 2:     $('#score').text(stage[0]);break;
        case 4:     $('#score').text(stage[1]);break;
        case 8:     $('#score').text(stage[2]);break;
        case 16:    $('#score').text(stage[3]);break;
        case 32:    $('#score').text(stage[4]);break;
        case 64:    $('#score').text(stage[5]);break;
        case 128:   $('#score').text(stage[6]);break;
        case 256:   $('#score').text(stage[7]);break;
        case 512:   $('#score').text(stage[8]);break;
        case 1024:  $('#score').text(stage[9]);break;
        case 2048:  $('#score').text(stage[10]);break;
        case 4096:  $('#score').text(stage[11]);break;
        default:    ;
    }
    // $('#score').text(score);
}