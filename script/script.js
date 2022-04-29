const getDados = () => JSON.parse(localStorage.getItem('lista')) ?? [] //ver dados salvos no Local Storage
const setDados = (dados) => localStorage.setItem('lista', JSON.stringify(dados))//mandar dados

function insert(tarefa,status, indice){ //inserir dados no HTML
    let item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <button type="submit" data-indice=${indice}><i class="far fa-trash-alt" aria-hidden="true"></i></i></button>
    `

    document.getElementById('insert').appendChild(item)
}

function limparTela(){//limpar tela para não acumular mesma informação
    let insert = document.getElementById('insert')
    while(insert.firstChild){
        insert.removeChild(insert.lastChild)
    }
}

function reload (){//atualizar tela
    limparTela()
    const dados = getDados()
    dados.forEach((item, indice) => insert(item.tarefa, item.status, indice))
}

function insertNewItem (evento){ //receber tarefa nova
    let tecla = evento.key
    let tarefa = evento.target.value
    if (tecla === 'Enter'){
        const dados = getDados()
        dados.push({'tarefa': tarefa, 'status': ''})
        setDados(dados)
        reload()
        evento.target.value = '' //limpar tarefa
    }
}

function removeItem(indice){//excluir uma tarefa
    const dados = getDados()
    dados.splice(indice,1)
    setDados(dados)
    reload()

}

function refresh(indice){//atualizar status
    const dados = getDados()
    dados[indice].status = dados[indice].status === '' ? 'checked' : '';
    setDados(dados)
    reload()
}

function clickItem(evento){
    let elemento = evento.target
    if (elemento.type === 'submit'){
        let indice = elemento.dataset.indice
        removeItem(indice)
    }else if(elemento.type === 'checkbox'){//marcar como concludo
        let indice = elemento.dataset.indice
        refresh(indice)
    }

}

document.getElementById('newItem').addEventListener('keypress',insertNewItem)
document.getElementById('insert').addEventListener('click', clickItem)

reload()