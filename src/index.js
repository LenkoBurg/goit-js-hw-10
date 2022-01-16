import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputNode = document.querySelector('#search-box')
const countriesList = document.querySelector('.country-list')
const countryItem = document.querySelector('.country-info')

function onInput() {
    const inpuText = inputNode.value.trim()

    countriesList.innerHTML = '';
    countryItem.innerHTML = '';

    if (!inpuText) {
        return
    }


    fetchCountries(inpuText)
        .then((countries) => {
            if (countries.status === 404) {
                return  Notiflix.Notify.failure("Oops, there is no country with that name.");
            }
            if (countries.length > 10) {
                return  Notiflix.Notify.info("Oops, there is no country with that name.");
            }
            if (countries.length > 1) {
                return regenerCountriesList(countries)
            }

            infoCountries(countries)
        })
}

inputNode.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function regenerCountriesList(countries) {
    countryItem.innerHTML = '';

    const markUp = countries.map(country => {
        return `
        <li class = 'country-list-item'>
            <img src = '${country.flag}' alt = '${country.name} flag' width = '40' />
            <p>${country.name}</p>
        </li>
        `;
    }).join('')

    countryItem.innerHTML = markUp;
}

function infoCountries(countries) {
    countriesList.innerHTML = '';

    const markUp = countries.map(country => {
        return `
        <div class="renderCountryInfo-firstString">
          <img src='${country.flag}' alt='${country.name} flag' width='40' />
          <h2>${country.name}</h2>
        </div>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${country.languages.map(item => ` ${item.name}`)}</p>
        `;
    }).join('')

    countriesList.innerHTML = markUp;
}