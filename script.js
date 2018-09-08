console.log('Hello Lucas :-)');
///////QUIZ CONTROLLER/////////////
let quizController = (function() {


    ////Question Constructor///
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

      let questionLocalStorage = {

          setQuestionCollection: function(newCollection) {
              localStorage.setItem('questionCollection', JSON.stringify(newCollection));
          },

          getQuestionCollection: function() {
              return JSON.parse(localStorage.getItem('questionCollection'));
          },

          removeQuestionCollection: function() {
              localStorage.removeItem('questionCollection');
          }
      }


    return {

        addQuestionOnLocalStorage: function(newQuestText, opts) {
            let optionsArr, corrAns, questionId, newQuestion, getStoredQuests;

            if(questionLocalStorage.getQuestionCollection() === null) {
              questionLocalStorage.setQuestionCollection([]);
            }

            optionsArr = [];


            for (let i = 0; i < opts.length; i++) {
                if(opts[i].value !== ""){
                  optionsArr.push(opts[i].value);
                }
                if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
                  corrAns = opts[i].value;
                }
            }

              //[ {id: 0} {id: 1} ]
              if(questionLocalStorage.getQuestionCollection().length > 0) {
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
              } else {
                questionId = 0;
              }

              newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);

              getStoredQuests = questionLocalStorage.getQuestionCollection();
              getStoredQuests.push(newQuestion);
              questionLocalStorage.setQuestionCollection(getStoredQuests);

              console.log(questionLocalStorage.getQuestionCollection());
            // console.log('Hi');
        }
    };
})();

///////////UI CONTROLLER//////

let UIController = (function() {

    let domItems = {
        //Admin Panel Elements/////
        questInsertBtn: document.getElementById('question-insert-btn'), //6
        newQuestionText: document.getElementById('new-question-text'), //15
        adminOptions: document.querySelectorAll('.admin-option') //16
    };


    return {
        getDomItems: domItems //8
    };

})();

///////////////////////CONTROLLER/////

let controller = (function(quizCtrl, UICtrl) {

    let selectedDomItems = UICtrl.getDomItems;

    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        // console.log('Works');
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);
    });

})(quizController, UIController);
