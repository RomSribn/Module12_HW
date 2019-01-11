'use strict'
const log = txt => console.log(txt);


	const key = '5c265894d43f1d1580ffa62584e53c27d612d3cfaf289';
// const Handlebars = require('handlebars');
const cardMarkup = document.querySelector('.cards');
const deleteBtn = document.querySelector('.btn');
// console.log(deleteBtn);
const forSearching = {
	input: document.querySelector('input[type="text"]'),
	submit: document.querySelector('input[type="submit"]')
}

const source = document.querySelector('.cardTemplate').innerHTML.trim();

const template = Handlebars.compile(source);
(function(){
 console.log('obj');
	Object.values(localStorage).map(i => {
	cardMarkup.insertAdjacentHTML('afterbegin', template(JSON.parse(i)))
})
})();


// log(template(sourceJSON))
// cardMarkup.insertAdjacentHTML('afterbegin', template(sourceJSON))

function isValidUrl(url){
  var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return objRE.test(url);
}

function fetchAPI(link) {
	return fetch(`https://api.linkpreview.net/`, {
		method: 'POST',
  		mode: 'cors',
  		body: JSON.stringify({key: key, q: link}),
	})
			.then(response => {
				if(response.ok) return response.json();
				throw new Error('Error in fetching')
			})
			.catch(err => log('АШИБКА',err))
}



forSearching.submit.addEventListener('click', handleInputLink);
cardMarkup.addEventListener('click', handleDelete);

function handleInputLink(){
	if(!isValidUrl(forSearching.input.value)){
		alert('Invalid url');
		forSearching.input.value = '';
		return
	}
	// if()
	fetchAPI(forSearching.input.value).then(data => {
		if(!data){
			alert('Ничего не найдено((');
			forSearching.input.value = '';
			return
		}
		Object.values(localStorage).forEach(i => {
			if(JSON.parse(i).url === data.url){
				alert("Такое уже есть!");
				forSearching.input.value = '';
				return
			}
		});

		cardMarkup.insertAdjacentHTML('afterbegin', template(data))
		console.log(data);
		localStorage.setItem(data.url, JSON.stringify(data));
		forSearching.input.value = '';
	})
}


function handleDelete(evt){
	console.log(evt.target);
	if(evt.target.className === "btn"){
		localStorage.removeItem(evt.target.parentElement.parentElement.firstElementChild.href);
		evt.target.parentElement.parentElement.remove()
	}
}

// console.log(localStorage.getItem(1));

















