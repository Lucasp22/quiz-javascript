  ///////////// Quiz controller/////////////////////
  let quizController = (function() {

    localStorage.setItem('data', JSON.stringify([1, 2, 4, 5]));
    localStorage.setItem('data', JSON.stringify({name: 'John'}));

    localStorage.removeItem('data');

    console.log(JSON.parse(localStorage.getItem('data')));

  })();
  ///////////// UI controller/////////////////////
  let UIController = (function() {


  })();

  ///////////// Controller/////////////////////

  let controller = (function(quizCtrl, UICtrl) {



  })(quizController, UIController);
