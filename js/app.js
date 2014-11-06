$(document).ready(function() {
    //instantiate the quiz object
    var questions = [{
            question: "What percent of Soviet males born in 1923 did not survive WWII?",
            choices: ["40%", "60%", "80%", "90%"],
            Num: 0,
            correct: 2, //3
            fact: "Eighty percent of Soviet males born in 1923 didn't survive the war."
        },
        {
            question: "WWII ended when?",
            choices: ["May 23, 1945", "August 21, 1945", "September 2, 1945", "October 3, 1945"],
            Num: 1,
            correct: 2, //3
            fact: "WWII ended on September 2, 1945, when Japan signed a surrender agreement on the USS Missouri in Tokyo Bay."
        },
        {
            question: "Hamburgers did not exist during WWII. What were they called instead?",
            choices: ["Liberty Burgers", "Liberty Steaks", "Freedom Patties", "Hamburgers"],
            Num: 2,
            correct: 1, //2
            fact: "During WWII, hamburgers in the US were dubbed \"Liberty Steaks\" to avoid the German-sounding name."
        },
        {
            question: "How young was the youngest US serviceman during WWII?",
            choices: ["10", "12", "15", "17"],
            Num: 3,
            correct: 1, //2
            fact: "The youngest US Serviceman was 12 year old Calvin Grahm, USN. He was wounded in combat and given a Dishonorable Discharge for lying about his age. (His benefits were later restored by an act of Congress.)"
        },
        {
            question: "In what year did the last Japanese soldier surrender?",
            choices: ["1944", "1945", "1955", "1974"],
            Num: 4,
            correct: 3, //4
            fact: "In 1974, a Japanese soldier named Hiroo Onoda came out of the jungle of the Pacific island of Lubang. He had been hiding there for 29 years, unaware that his country had surrendered."
    }]
    
    //global variables
    var numberCorrect = 0;
    var currentQuestion = 0;
    
    //question submission button
    $("#question_container").on("click", "#submit", function () {
        updateScore();
        currentQuestion++;
        nextQuestion();
    });

    //splash screen starter
    $("#splash").on("click", "#start", function () {
        $("#splash").css("display", "none");
        $("#qscore").css("display", "inline");
        $("#question_container").css("display", "block");
        nextQuestion();
    });
    
    //button to run the quiz again
    $("#question_container").on("click", "#retry_button", function () {
        numberCorrect = 0;
        currentQuestion = 0;
        var newQuestion = getNewQuestion();
        $("#question_container").html(newQuestion).fadeIn();
        $("#fact").html("");
        $("#fact_container").css("display", "none");
        updateQuestionNumber();
    });

    function getNewQuestion() {
        var newQuestion = '<div><span class="question">'+
            questions[currentQuestion].question+
            '</span><br></div><div id="answer_container"><input type="radio" name="option" class="option" value="0"><span class="answer">'+
            questions[currentQuestion].choices[0]+
            '</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">'+
            questions[currentQuestion].choices[1]+
            '</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">'+
            questions[currentQuestion].choices[2]+
            '</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">'+
            questions[currentQuestion].choices[3]+
            '</span><br></div><div id="button_holder"><input type="button" id="submit" value="Submit Answer"><input type="button" id="retry_button" value="Try Again!"></div>';
        return newQuestion;
    }

    //update the score
    function updateScore() {
        var answer = $("input[type='radio']:checked").val();
        if (answer == questions[currentQuestion].correct) {
            numberCorrect++;    
        }
    }

    function updateQuestionNumber() {
        var questionNumber = '<span id="question_num">Question: '+(currentQuestion+1)+' of '+questions.length+'</span>';
        $("#qscore").html(questionNumber).fadeIn();
    }

    //load the next question
    function nextQuestion() {
        $("#fact_container").css("display", "block");
        if (currentQuestion < 5) {
            updateQuestionNumber();
			$("#fact").hide();
            var newQuestion = getNewQuestion();
            $("#question_container").html(newQuestion).fadeIn();
            var lastFact = questions[currentQuestion-1].fact;
        }
        else {

			$("#last_question_fact").fadeOut();
            $("#submit").css("display", "none");
            $("#retry_button").css("display", "inline");
            var lastFact= questions[currentQuestion-1].fact;
            $("#question_container div:eq(0)").css("display", "none");
            var finalScore = '<span id="final">Congratulations on making it through the quiz!  You correctly answered '+numberCorrect+' question(s).'
        }
        $("#fact").html(lastFact).fadeIn();
        $("#answer_container").html(finalScore).fadeIn();
    }
});
