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


      if(questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      }

    return {

        getQuestionLocalStorage: questionLocalStorage,

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

                      return true;
                  } else {
                        alert('You missed to check correct answer, or you checked answer without value');
                        return false;
                      }
                    } else {
                      alert('You must insert at least two options');
                      return false;
                      }
                    } else {
                      alert('Please, Insert Question');
                      return false;
                }
        }
    };
})();

///////UI CONTROLLER///////

let UIController = (function() {


    var domItems = {
        //Admin Panel Elements///////
        questInsertBtn: document.getElementById('question-insert-btn'),
        newQuestionText: document.getElementById('new-question-text'),
        adminOptions: document.querySelectorAll('.admin-option'),
        adminOptionsContainer: document.querySelector(".admin-options-container"),
        insertedQuestsWrapper: document.querySelector(".inserted-questions-wrapper"),
        questUpdateBtn: document.getElementById('question-update-btn'),
        questDeleteBtn: document.getElementById('question-delete-btn'),
        questsClearBtn: document.getElementById('questions-clear-btn')
    };


    return {
        getDomItems: domItems,
        addInputsDynamically: function() {

            let addInput = function() {

                let inputHTML, z;

                z = document.querySelectorAll(".admin-option").length;

                inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" name="answer" value="' + z + '"><input type="text" class="admin-option admin-option-' + z + '" value=""></div>';

                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);

                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);

                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
            }

            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
        },

        createQuestionList: function(getQuestions) {

            let questHTML, numberingArr;

            numberingArr = [];


            domItems.insertedQuestsWrapper.innerHTML = "";

            for(let i = 0; i < getQuestions.getQuestionCollection().length; i++) {

                numberingArr.push(i + 1);

                questHTML = '<p><span>' + numberingArr[i] + '. ' + getQuestions.getQuestionCollection()[i].questionText + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id + '">Edit</button></p>';

                // console.log(getQuestions.getQuestionCollection()[i].id);

                domItems.insertedQuestsWrapper.insertAdjacentHTML('afterbegin', questHTML);
            }

        },

        editQuestList: function(event, storageQuestList, addInpsDynFn, updateQuestionListFn) {
            let getId, getStorageQuestList, foundItem, placeInArr, optionHTML;

            if('question-'.indexOf(event.target.id)) {
              getId = parseInt(event.target.id.split('-')[1]);

              getStorageQuestList = storageQuestList.getQuestionCollection();

              for(let i = 0; i < getStorageQuestList.length; i++) {

                if(getStorageQuestList[i].id === getId){
                  foundItem = getStorageQuestList[i];
                  placeInArr = i;
                }

              }
              // console.log(foundItem, placeInArr);

              domItems.newQuestionText.value = foundItem.questionText;

              domItems.adminOptionsContainer.innerHTML = '';

              optionHTML = "";

              for(let x = 0; x < foundItem.options.length; x++) {
                  optionHTML += '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + x + '" name="answer" value="' + x + '"><input type="text" class="admin-option admin-option-' + x + '" value="'+ foundItem.options[x] + '"></div>';
              }
              domItems.adminOptionsContainer.innerHTML = optionHTML;

              domItems.questDeleteBtn.style.visibility = 'visible';

              domItems.questUpdateBtn.style.visibility = 'visible';

              domItems.questInsertBtn.style.visibility = 'hidden';

              domItems.questsClearBtn.style.pointerEvents = 'none';



                addInpsDynFn();

                // console.log(foundItem);

                // console.log(optionHTML);


                let backDefaultView = function() {
                    let updatedOptions;

                    domItems.newQuestionText.value = '';
                    updatedOptions = document.querySelectorAll(".admin-option");

                    for(let i = 0; i < updatedOptions.length; i++){
                       updatedOptions[i].value = '';
                       updatedOptions[i].previousElementSibling.checked = false;
                     }
                     domItems.questDeleteBtn.style.visibility = 'hidden';
                     domItems.questUpdateBtn.style.visibility = 'hidden';
                     domItems.questInsertBtn.style.visibility = 'visible';
                     domItems.questsClearBtn.style.pointerEvents = '';
                     updateQuestionListFn(storageQuestList);

                   }

                let updateQuestion = function() {
                  let newOptions, optionEls;

                  newOptions = [];

                  optionEls = document.querySelectorAll('.admin-option');
                  // 143
                  foundItem.questionText = domItems.newQuestionText.value;
                  // 146
                  foundItem.correctAnswer = '';

                  for(var i = 0; i < optionEls.length; i++) {
                      // 152
                      if(optionEls[i].value !== '') {
                          // 153
                          newOptions.push(optionEls[i].value);
                          // 154
                          if(optionEls[i].previousElementSibling.checked) {
                              // 155
                              foundItem.correctAnswer = optionEls[i].value;
                          }
                      }
                  }
                   foundItem.options = newOptions;

                   if(foundItem.questionText !== '') {
                     if(foundItem.options.length > 1) {
                       if(foundItem.correctAnswer !== '') {
                           getStorageQuestList.splice(placeInArr, 1, foundItem);
                           storageQuestList.setQuestionCollection(getStorageQuestList);

                           backDefaultView();

                      }else {
                          alert('You missed to check correct answer, or you checked answer without value');
                          }
                        } else {
                          alert('You must insert at least two options');
                        }
                      } else {
                          alert('Please, Insert Question');
                        }


                }
                domItems.questUpdateBtn.onclick = updateQuestion;

                let deleteQuestion = function() {
                  getStorageQuestList.splice(placeInArr, 1);

                  storageQuestList.setQuestionCollection(getStorageQuestList);

                  backDefaultView();

                  // console.log('Delete FX works Lucas');
                }
                domItems.questDeleteBtn.onclick = deleteQuestion;


            }


        }
    };

})();

///////////////CONTROLLER////////////

let controller = (function(quizCtrl, UICtrl) {


    let selectedDomItems = UICtrl.getDomItems;

    UICtrl.addInputsDynamically();

    UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
    //change with var selectedDomItems)///
    selectedDomItems.questInsertBtn.addEventListener('click', function() {

        let adminOptions = document.querySelectorAll('.admin-option');

        let checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

        if(checkBoolean)  {
            UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
        }

    });

    selectedDomItems.insertedQuestsWrapper.addEventListener('click', function(e) {

        UICtrl.editQuestList(e, quizCtrl.getQuestionLocalStorage, UICtrl.addInputsDynamically, UICtrl.createQuestionList);

    });

})(quizController, UIController);
