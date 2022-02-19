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
function getCountryData(country){
       fetch(`https://restcountries.com/v3.1/name/${country}`)
       .then((promise)=> promise.json())
       .then((data)=> {renderCountry(data[0]);
              console.log(data[0])
              const neighbour = data[0].borders;
              if(!neighbour) return; 
             
              //country 2
              for(let each of neighbour){
                     fetch(`https://restcountries.com/v3.1/name/${each}`).then((promise2)=> promise2.json()).then(data2=> {renderCountry(data2[0],'neighbour')})
              }
       }
       )
}
const inputCountry = prompt("Enter your favorite country: ").toLowerCase();
getCountryData(inputCountry);

