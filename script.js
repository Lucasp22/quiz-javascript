

///////QUIZ CONTROLLER/////////////
//1
let quizController = (function() {

    //4
    ////Question Constructor///
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    //13
    return {
        //14
        addQuestionOnLocalStorage: function(newQuestText, opts) {
            let optionsArr, corrAns, questionId, newQuestion;

            optionsArr = [];

            questionId = 0;

            for (let i = 0; i < opts.length; i++) {
                if(opts[i].value !== ""){
                  optionsArr.push(opts[i].value);
                }
                if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
                  corrAns = opts[i].value;
                }
            }

              newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);

              console.log(newQuestion);

            // 18
            // console.log('Hi');
        }
    };

})();

///////////UI CONTROLLER//////
//3
let UIController = (function() {

    //5
    let domItems = {
        //Admin Panel Elements/////
        questInsertBtn: document.getElementById('question-insert-btn'), //6
        newQuestionText: document.getElementById('new-question-text'), //15
        adminOptions: document.querySelectorAll('.admin-option') //16
    };

    //7
    return {
        getDomItems: domItems //8
    };

})();

///////////////////////CONTROLLER/////
//3
let controller = (function(quizCtrl, UICtrl) {

    //11
    let selectedDomItems = UICtrl.getDomItems;

    //9 -- //12 (change with var selectedDomItems)
    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        //10
        // console.log('Works');
        //17
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);

    });

})(quizController, UIController);
