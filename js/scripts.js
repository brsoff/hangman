$(document).ready(function () {

  var dictionary = ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile", "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "hamster", "hippopotamus", "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "mouse", "octopus", "owl", "panda", "parrot", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark", "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"];
  var randomNum;
  var randomWord;
  var word;
  var numLetters;
  var tries;
  var blanks;
  var score = 0;
  var notSolved;
  var guess;
  var totalTries = 0;


  $(".score").text(score);

    function resetPlay() {
      notSolved = true;
      $("#text_guess").val("");

      $("input[type=checkbox]").prop("disabled", false).prop("checked", false).next( "span").css("color", "#000000");
      $("#guess_button").prop("disabled", false);
      $("#status").text("").animate({backgroundColor: "#cccccc"});

      $("p#tries, #the_letters, #status, #text_guess, #guess_button").fadeIn();

      randomNum = Math.random();
      randomWord = Math.floor(randomNum * dictionary.length);

      word = dictionary[randomWord];
      numLetters = $("#num_letters").text("(" + word.length + " letters)");
      tries = (word.length + 5);
      blanks = [];

      for (var i = 0; i < word.length; i++) {
        blanks.push("_");
      }

      $("#word_output").text(blanks.join(" "));
      $("span#tries_num").text(tries);

      console.log("new word: " + word)
    }


  $("#start, #resetButton").on("click", function () {
    $(this).hide();
    resetPlay();
  });


  $("input[type=checkbox]").click(function () {


    var letter = $(this).val();
    var letterBox = $(this);

    $(this).prop("disabled", true).next("span").css("color", "#f7f7f7");

    if (word.indexOf(letter) === -1) {
      $("#status").text(letter + " " + "was not found.").animate({backgroundColor: "#F5A9A9"}, 100);

    } else {

      for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          blanks[i] = letter;
        }
      }

      $("#status").text(letter + " " + "was found!").animate({backgroundColor: "#BCF5A9"}, 100);

    }

      $("#word_output").text(blanks.join(" "));

      tries--;

      if (blanks.join("") === word) {
        notSolved = false;
        isSolved();
      }

      if (notSolved && tries === 0) {
      outOfTries();
      }

    $("span#tries_num").text(tries);

  });



  $("#guess_button").on("click", function () {
    guess = $("#text_guess").val();
    console.log("word: " + word);
    console.log("guess: " + guess);
    tries--;
    if (guess === word) {
      notSolved = false;
      isSolved();
    }else{
      $("#status").text(guess + " " + "is incorrect.").animate({backgroundColor: "#F5A9A9"}, 100);
      //tries--;
      if (notSolved && tries === 0) {
      outOfTries();
      }
  }
  $("span#tries_num").text(tries);
  });




  function isSolved () {
        $("#status").text("you solved it!").animate({backgroundColor: "#82FA58"}, 100);
        score = score + 50;
        $(".score").text(score);
        $("input[type=checkbox]").prop("disabled", true).prop("checked", false);
        $("#guess_button").prop("disabled", true);
        $("#resetButton").show(100);
        scoreColor();
        totalTries++
        $(".possible").fadeIn(100)
        $("span.alltries").text(totalTries * 50);
  }


  function outOfTries () {

      score = score - 50;
      $(".score").text(score);
      $("#status").html("sorry, you're out of tries! The word was <br><b> " + word + "</b>").animate({backgroundColor: "#F5A9A9"}, 100);
      $("input[type=checkbox]").prop("disabled", true).prop("checked", false);
      $("#guess_button").prop("disabled", true);
      $("#resetButton").show(100);
      scoreColor();
      totalTries++
      $(".possible").fadeIn(100)
      $("span.alltries").text(totalTries * 50);
  }


  function scoreColor () {
    if (score < 0) {
      $(".score").css("color", "red");
      }else if (score > 0) {
      $(".score").css("color", "green");
      }else{
        $(".score").css("color", "black");
      }
  }

});