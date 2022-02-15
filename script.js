'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function(data,className =''){
       const cardHTML= `<article class="country ${className}">
              <img class="country__img" src="${data.flags['png']}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
              </div>
            </article>`
            countriesContainer.insertAdjacentHTML('beforeend',cardHTML);
            countriesContainer.style.opacity=1;
}
/*
const getCountry = function(country){
       const request = new XMLHttpRequest();
       request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
       request.send();
       request.addEventListener('load',function(){
              const [data] = JSON.parse(this.responseText);
              const altSpell = data.altSpellings[1];
              console.log(data);
              const cardHTML= `<article class="country">
              <img class="country__img" src="${data.flags['png']}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
              </div>
            </article>`
            countriesContainer.insertAdjacentHTML('beforeend',cardHTML);
            countriesContainer.style.opacity=1;
       })
}*/
const getCountryAndNeighbour=function(country){
       //AJAX call country1
       const request = new XMLHttpRequest();
       request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
       request.send();
       request.addEventListener('load',function(){
              const [data] = JSON.parse(this.responseText);
              console.log(data)
              // render country1
              renderCountry(data);
              //Get country2
              const neigbour = data.borders;
              console.log('CIC',neigbour)
              if(!neigbour) return;
              //AJAX call country2
              for(let each of neigbour){
                     const request2 = new XMLHttpRequest();
                     request2.open('GET',`https://restcountries.com/v3.1/alpha/${each}
                     `);
                     request2.send();
                     request2.addEventListener('load',function(){
                            const [data2] = JSON.parse(this.responseText);
                            renderCountry(data2,'neighbour');
                     })
       }
       })
}
const inputName = prompt('Enter which country you want: ');
getCountryAndNeighbour(inputName);

