function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}

async function get_id_of_quize(response) {
    const is = /"ID": (.*?),/gm
    const finish = is.exec(response)
    return finish[1]
}

async function get_id_of_cource(response) {
    const is = /"Course_Id": "(.*?)"},/gm
    const finish = is.exec(response)
    return finish[1]
}

async function edunet_request(link) {
    return fetch(`${link}`, {
    }).then(res => res.text().then(response => {
        return response
    }))
}






async function edunet_quize(ID, Course_Id) {
    return fetch('https://www.edunet.bh/Quiz/GetQuizQuestions', {
        method: 'POST',
        body: `ID=${ID}&Course_Id=${Course_Id}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }).then(res => {
        return res.json()
    }).catch(console.log)
}
var source_of_current_page = document.documentElement.innerHTML
get_id_of_quize(source_of_current_page).then(quize_id => {
    get_id_of_cource(source_of_current_page).then(cource_id => {
        edunet_quize(quize_id, cource_id).then(respon => {
            respon.forEach(element => {
                var qtype = element['QuestionTypeID']
                if (qtype === 3) {
                    var choice = element['ChoicesList']
                    choice.forEach(ans => {
                        var is_correct = ans['Correct_Choice']
                        if (is_correct === true) {
                            alert(`Question : ${removeTags(element['Question_Text'])}\nAnswer : ${ans['ChoiceText']}\n\nQuiz cheat by BDT (:`)
                        }
                    });
                }else if(qtype === 3){
                    alert(`Question : ${removeTags(element['Question_Text'])}\nAnswer : ${removeTags(element['EssayAnswer'])}\n\nQuiz cheat by BDT (:`)
                }

            });
        })
    })
})
