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
        // headers: {
        //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0',
        //     'Accept': '*/*',
        //     // 'Cookie': cookies
        // }

    }).then(res => res.text().then(response => {
        return response
    }))
}
async function edunet_quize(ID, Course_Id) {
    return fetch('https://www.edunet.bh/Quiz/GetQuizQuestions', {
        method: 'POST',
        body: `ID=${ID}&Course_Id=${Course_Id}`,
        headers: {
            // 'Cookie': cookie,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0'
        },
    }).then(res => {
        return res.json()
    }).catch(console.log)
}
var response_of_current_page = document.documentElement.innerHTML
    // edunet_request(its_link).then(res => {
get_id_of_quize(response_of_current_page).then(quize_id => {
        get_id_of_cource(response_of_current_page).then(cource_id => {
            edunet_quize(quize_id, cource_id).then(respon => {
                respon.forEach(element => {
                    var choice = element['ChoicesList']
                    choice.forEach(ans => {
                        var is_correct = ans['Correct_Choice']
                        if (is_correct === true) {
                            console.log(`Question : ${removeTags(element['Question_Text']) }\nAnswer : ${ans['ChoiceText']}`)
                        }
                    });
                });
            })
        })
    })
    // })