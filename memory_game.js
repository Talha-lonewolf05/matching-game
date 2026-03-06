$(document).ready(function(){

    let symbols = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓"];

    let first_card = null;
    let second_card = null;
    let lock_board = false;

    let moves = 0;
    let matched_pairs = 0;

    let timer = 0;
    let timer_started = false;
    let timer_interval;

   
    shuffle_cards();
    create_board();

    
    function shuffle_cards(){
        symbols.sort(() => Math.random() - 0.5);
    }

    
    function create_board(){
        for(let i=0;i<symbols.length;i++)
            {
            let card = $("<div></div>");
            card.addClass("card");
            card.attr("data_symbol", symbols[i]);
            card.text("?");
            $("#game_board").append(card);
        }
    }

    function start_timer(){
        timer_interval = setInterval(function(){
            timer++;
            $("#timer").text(timer);
        },1000);
    }

    $(document).on("click",".card",function()
    {

        if(lock_board) return;
        if($(this).hasClass("flipped")) return;

        if(!timer_started){
            start_timer();
            timer_started = true;
        }

        $(this).addClass("flipped");
        $(this).text($(this).attr("data_symbol"));

        if(first_card == null){
            first_card = $(this);
        } else {
            second_card = $(this);
            lock_board = true;

            moves++;
            $("#moves").text(moves);

            check_match();
        }
    });

    
  function check_match(){

    if(first_card.attr("data_symbol") == second_card.attr("data_symbol")){

        matched_pairs++;

        reset_cards();

        if(matched_pairs == symbols.length/2){

            clearInterval(timer_interval);

            $("#win_message").fadeIn();

        }

    }
    else{

        setTimeout(function(){

            first_card.removeClass("flipped").text("?");

            second_card.removeClass("flipped").text("?");

            reset_cards();

        },1000);

    }

}

    function reset_cards(){
        first_card = null;
        second_card = null;
        lock_board = false;
    }

   
    $("#restart_button").click(function()
    {
        first_card = null;
        second_card = null;
        lock_board = false;
        moves = 0;
        matched_pairs = 0;
        timer = 0;
        timer_started = false;

        $("#moves").text(moves);
        $("#timer").text(timer);
        $("#win_message").hide();
        $("#game_board").empty();

        shuffle_cards();
        create_board();

        clearInterval(timer_interval);
    });

});
