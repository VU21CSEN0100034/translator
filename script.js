const fromText = document.querySelector('.from-text');
let toText = document.querySelector('.to-text');
exchangeIcon=document.querySelector(".change");
selectTag = document.querySelectorAll("select");
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button");


selectTag.forEach( (tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code ==
        "en-GB" ? "selected" : "" : country_code ==
        "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
;
        tag.insertAdjacentHTML ("beforeend", option);
    }});
exchangeIcon.addEventListener("click", () =>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText. value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});


fromText.addEventListener("keyup", () => {
    if (fromText.value) {
        toText.value = "";
    }
});


translateBtn.addEventListener("click",()=>{
    let text = fromText.value,
    translateFrom=selectTag[0].value;
    translateTo=selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0){
                toText.value=data.translation;
            }
        });
        toText.setAttribute("placeholder","Translation");
    });
});

