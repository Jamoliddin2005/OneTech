
const language = localStorage.getItem('language') || 'ru'

if (language === 'ru') {
    localStorage.setItem('language', 'ru')
}


export const BASE_URL = process.env.REACT_APP_URL + language + '/' 