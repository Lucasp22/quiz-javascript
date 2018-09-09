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
            let optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;

            if(questionLocalStorage.getQuestionCollection() === null) {
              questionLocalStorage.setQuestionCollection([]);
            }

            optionsArr = [];

            isChecked = false;


            for (let i = 0; i < opts.length; i++) {
                if(opts[i].value !== ""){
                  optionsArr.push(opts[i].value);
                }
                if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
                  corrAns = opts[i].value;
                  isChecked = true;
                }
            }

              //[ {id: 0} {id: 1} ]
              if(questionLocalStorage.getQuestionCollection().length > 0) {
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
              } else {
                questionId = 0;
              }


              if(newQuestText.value !== "") {
                if(optionsArr.length > 1) {
                  if(isChecked) {
                      newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);

                      getStoredQuests = questionLocalStorage.getQuestionCollection();
                      getStoredQuests.push(newQuestion);
                      questionLocalStorage.setQuestionCollection(getStoredQuests);

                      newQuestText.value = "";

                      for(let x = 0; x < opts.length; x++) {
                        opts[x].value = "";
                        opts[x].previousElementSibling.checked = false;
                      }

                      console.log(questionLocalStorage.getQuestionCollection());
                  } else {
                        alert('You missed to check correct answer, or you checked answer without value');
                      }
                    } else {
                      alert('You must insert at least two options');
                      }
                    } else {
                      alert('Please, Insert Question');
                }
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
