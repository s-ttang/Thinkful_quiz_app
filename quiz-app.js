$(document).ready(function(){
	console.log("Document Loaded");
	/*---GLOBAL VARIABLES ---*/
	/*---Array of Questions --*/
	var questions =[
		{
		question: "What is 22-15 ?", 
		choices: ["5", "7", "8", "9"], 
		correct:1
		}, 
		{
		question: "What is 12+25 ?", 
		choices: ["25", "33", "37", "36"], 
		correct:2
		},
		{
		question: "What is 34+12 ?", 
		choices: ["23", "47", "34", "46"], 
		correct:3
		},
		{
		question: "What is 43+10 ?", 
		choices: ["53", "52", "51", "43"], 
		correct:0
		}  
	];	
	//console.log("Print one of the objects " + questions[0]);
	//console.log("Print one of the questions: " + questions[2].question);
	//console.log("One of the choices is" + questions[2].choices[1]);
	//console.log("number of items in questions array is " + questions.length);
	
	var questionNum 	 = 1;
	var questionsCorrect = 0;
	var questionsWrong   = 0;
	var questionsTotal   = questions.length;
						   console.log("The total number of questions: " + questionsTotal);
	var answerIndex 		;
						   //console.log("The answerIndex is " + answerIndex);
	var answer			 = questions[(questionNum-1)].choices[answerIndex];
						   //console.log("The print answer is " + answer);
						   
	/*-- PRIMARY OPERATIONS --*/	
	/*---Start the quiz---*/
	$('#start-quiz-button').on('click', function(){
		console.log("Started Quiz!");
		$('#start-div').hide();
		$('#quiz-div').show();
		displayQuestion();
		//startTimer();

	});
	/*---Submit Answer Button --*/
	$('#submit-button').on('click', function(){	
		console.log("Submit!");
		checkAnswer(); 		 // check user input with the answer
		updateScore();		 // update score divs
		$('#answer').hide(); // hide answer box in case it was toggled on
		
		// if there are still questions left display the next question
		if (questionNum <= questionsTotal ){ 
			updateAnswer(); 
			displayQuestion(); 
		// else display end and hide quiz	
		} else { 
			endQuiz();
		}
	});
	/*-- FUNCTIONS --*/	
	/*-- displayQuestion Function---*/
	function displayQuestion(){
		$('#question-number').text("Question " + (questionNum) + " of " + questions.length);
			//console.log("Question Number: " + (questionNum));
		$('#question').text(questions[(questionNum-1)].question);
			//console.log("Printed question");
				
		var choiceTotal = questions[(questionNum-1)].choices.length;
		$('#choices').empty();
		for ( var i = 0 ; i<choiceTotal ; i++){
			$('#choices').append("<label><input type=\"radio\" class=\"guess\" name=\"guess\" value=\""+ i +"\"/>" + questions[(questionNum-1)].choices[i] + "</label>");
		}
		//<input type="radio" id="answer-2" value="2 /> <label for="answer-2">2</label>
		answerIndex = questions[(questionNum-1)].correct;
		console.log("displayquestion answerIndex is: " + answerIndex);
	};
	/*-- checkAnswer function--*/
	function checkAnswer(){
		var userGuess = $('input:radio[name=guess]:checked').val();
			//console.log("the user's guess is " + userGuess);
		
			if ( userGuess == null ){
				$('#message').text("Please select an answer")
				console.log("NULL");
			} else if ( userGuess == answerIndex ){
				$('#message').text("You are correct!").css('color', '#2AB535');
				questionsCorrect++ ;
				questionNum++;
				//console.log("CORRECT");
				//console.log("# of correct answers: " + questionsCorrect);
			} else {
				$('#message').text("I\'m sorry that is incorrect!").css('color', 'red');
				questionsWrong++ ;
				questionNum++;
				//console.log("WRONG!");
				//console.log("# of wrong answers: " + questionsWrong);
			}
			
			//display message 
			$('#message').show();
			//console.log("Current question number: " + (questionNum) );
	};
	/*-- updateAnswer of current question --*/
	function updateAnswer(){
			answerIndex 	 = questions[(questionNum-1)].correct;
				//console.log("The answerIndex is " + answerIndex);
			answer = questions[questionNum-1].choices[answerIndex];
				//console.log("The print answer is " + answer);
	};
	/*-- End quiz function --*/
	function endQuiz(){
		$('#quiz-div').hide();
		$('#message').text("You answered " + questionsCorrect + " out of " + questionsTotal + " correctly");
		$('#end-div').show();
		console.log("ended quiz");
	};
	/*-- updateScore Function --*/
	function updateScore(){
		$('#questionsCorrect').text("  " + questionsCorrect );
		$('#questionsWrong').text("  " + questionsWrong );
		console.log("Score updated");
	};
	
	/*---startTimer---*/
	var count=30; // in seconds
	
	function startTimer(){	
		// display message
		$('#message').show().css('color','blue').text("The clock has started. Good Luck!");
		//count by 1 second	
		var counter = setInterval(timer, 1000); 
		// function to be called by counter
		function timer(){
 			count=count-1;
 			$('#timer').text(" " + count);
 			console.log("count is running " + count);
 			if (count <= 10){
  				$('#timer').css('color', 'red');
  			}
  			if (count <= 0 || questionNum == questionsTotal){
    			clearInterval(counter);
    		 	return;
  			}
  		};
	};
	/*---Show Answer Button - Display answer - needs to be updated */
	$('#show-answer-button').on('click', function(){
		$('#answer').toggle().text("The answer is " + answer);
		console.log("show-answer-button clicked!");
	});
	/*---Hint Button - Eliminate Random two answers---*/
	$('#hint-button').on('click', function(){
		
		// Number of wrong answers in the array
		var numberOfWrongAnswers = (questions[questionNum].choices.length-1) ;
		console.log("ANSWER INDEX = " + answerIndex);
		console.log("The current questionNum is " + questionNum);
		console.log("Number of wrong answers is " + numberOfWrongAnswers );
		
		var hints = new Array();
		while (hints.length < numberOfWrongAnswers-1 && hints.indexOf(indexOfRemoved) == -1) {
     		// get a random integer between 0 and number of wrong answers
     		var indexOfRemoved = Math.floor(Math.random() * ((numberOfWrongAnswers - 0) + 1))
			console.log("Should I remove choice " + indexOfRemoved + " ?");

			// if randomly selected choice is not the answer then remove the wrong choice 
     		if ( indexOfRemoved != answerIndex ) {
         		// remove wrong Choice
				$('.guess').eq(indexOfRemoved).prop('disabled', true);
				console.log("choice removed ");
				// add choices that have already been removed to the array 
				hints.push(indexOfRemoved);
				// remember that user used up hint
         		hints++;
         		console.log(" hints used: " + hints);	
     		};
		}
	});
	

});


