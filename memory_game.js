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
