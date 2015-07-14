function check(guess){
	if (guess == num){
		$('#guess-count').text('You Won!!!').css('color', 'white');
		$('#how-good').text('');
		$('#guessed').text('');
		$('.main-box').css('background-color', 'red');
		$('.input').prop("readonly", true);
		return;
	}
	else if (!(guess>=1 && guess<=100)){
		$('#how-good').text('Number must be between 1-100!');
		return;
	}
	else if (guesses.indexOf(guess)>-1){
		$('#how-good').text('Guess a new number!');
		return;	
	}
	else if (lives==1){
		$('#guess-count').text('You Lost, the number was ' + num).css('color', 'black');
		$('#how-good').text('');
		$('#guessed').text('');
		$('.main-box').css('background-color', 'blue');
		$('.input').prop("readonly", true);
		return;
	}
	else{
		lives--;
		guesses.push(guess);
		var howClose;

		$('#guess-count').text('Remaining Guesses: '+lives);		
		
		if(Math.abs(guess-num)>45)
			howClose ='Icy';
		else if(Math.abs(guess-num)>25)
			howClose ='Cold';
		else if(Math.abs(guess-num)>7)
			howClose ='Warm';
		else
			howClose ='Fiery';

		$('#guessed').append('<p>' + guess + ' - ' + howClose + '</p>');

		if(Math.abs(guess-num)>Math.abs(guesses[guesses.length-2]-num)&&guesses.length>1)
			howClose+=' <br>Getting colder!';
		else if (Math.abs(guess-num)<Math.abs(guesses[guesses.length-2]-num))
			howClose+=' <br>Getting warmer!';

		if (guess-num>0)
			howClose+=' <br>Guess lower...';
		else
			howClose+=' <br>Guess higher...';
 
		$('#how-good').html(howClose);
	}
}

function newGame(){
	num = Math.floor(100*Math.random()+1);
	guesses = [];
	lives = 5;
}


$(document).ready(function(){
	newGame();
	
	$('.input').keydown(function(e) {
		if (e.keyCode == 13)
			check($(this).val());
	});
	
	$('.btn-danger').on('click', function(){
		check($(this).prev().val());
	});

	$('.start').on('click', function(){
		newGame();
		$('.main-box').css('background-color', '#333333');
		$('#guess-count').text('Remaining Guesses: 5').css('color', 'white');
		$('.input').val('').focus();
		$('.input').prop("readonly", false);
		$('#how-good').text('');
		$('#guessed').text('');
	});

	$('.hint').on('click',function(){
		$('.input').val('maybe '+num+'?');
	})

	$('.input:text').focus(function(){
		$(this).val('');
	})

});