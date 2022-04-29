const getDados = () => JSON.parse(localStorage.getItem('lista')) ?? [] //ver dados salvos no Local Storage

export default getDados