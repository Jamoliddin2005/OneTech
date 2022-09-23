const translate = (rus, uzb, eng) => {
    return localStorage.getItem('language') === 'ru' ? rus : localStorage.getItem('language') === 'uz' ? uzb : localStorage.getItem('language') === 'en' ? eng : eng
}

export default translate