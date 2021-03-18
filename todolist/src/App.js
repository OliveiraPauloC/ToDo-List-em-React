import React from 'react'
import styled from 'styled-components'
import GlobalStyle from './components/global'

const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #fb743e; */
  border-radius: 10px;
  background-color: #383e56;
  width: 600px;
  margin: 20px auto;
  color: #c5d7bd;
  box-shadow: 3px 3px #fb743e;

  h1{
    background-color: #383e56;
    color: #9fb8ad;
    font-size: 3rem;
    text-shadow: 1px 1px 0 #2f5d87, 
      2px 2px 0 #2e5a83, 
      3px 3px 0 #2d5880, 
      4px 4px 0 #2b557c, 
      5px 5px 0 #000;
    span{
      background-color: #383e56;
    }
    span:hover{
      -webkit-stroke-width: 5.3px;
      -webkit-stroke-color: #FFFFFF;
      -webkit-fill-color: #FFFFFF;
      text-shadow: 1px 0px 20px #fb743e;
      -webkit-transition: width 0.3s;
      transition: width 0.3s;
      -moz-transition: width 0.3s; 
      -o-transition: width 0.3s; 
    }
  }

  input{
    border-top: 5px solid #fb743e;
    border-left: 5px solid #fb743e;
    border-radius: 5px;
    font-size: 2rem;
    color: #fb743e;
  }

  label{
    background-color: #383e56;
    text-shadow: 1px 1px 0 #2f5d87,
                 2px 2px 0 #2d5880,  
                 3px 3px 0 #000;
  }

  select{
    font-size: 1.2rem;
    color: #fff;
    border-radius: 8px;
  }

  button{
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: #fb743e;
    color: #fff;
    box-shadow: 1px 1px #c5d7bd;
    &:hover{
      background-color: #9fb8ad;
      color: #000;
      box-shadow: none;
    }
  }
`

const TarefaList = styled.ul`
  padding: 0;
  width: 400px;
  border: none;
`

const Tarefa = styled.li`
  text-align: left;
  border: none;
  text-decoration: ${({completa}) => (completa ? 'line-through' : 'none')};
  font-size: 2rem;
  background-color: #383e56;
  text-shadow: 1px 1px 0 #2f5d87,
               2px 2px 0 #2d5880,  
               3px 3px 0 #000;
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  font-size: 2rem;
  background-color: #383e56;
`

class App extends React.Component {
  state = {
    tarefas: [{
    id: Date.now(), 
    texto: 'Estudar',
    completa: false
    },
    {
      id: Date.now(), 
      texto: 'ir no mercado',
      completa: true 
    }
  ],
    inputValue: '',
    filtro: ''
  }

componentDidUpdate() {
  localStorage.setItem('tarefas', JSON.stringify(this.state.tarefas))
};

componentDidMount() {
  if(localStorage.getItem('tarefas')){
    this.setState({tarefas: JSON.parse(localStorage.getItem('tarefas'))})
  }
};

onChangeInput = (event) => {
  this.setState({inputValue: event.target.value})
}

criaTarefa = () => {
  const novaTarefa = {
    id: Date.now(),
    texto: this.state.inputValue,
    completa: false
  }
  const novaLista = [...this.state.tarefas, novaTarefa]
  this.setState({tarefas: novaLista})
}

selectTarefa = (id) => {
  const novaListaDeTarefas = this.state.tarefas.filter((tarefa) =>{
    if (tarefa.id === id){
      tarefa.completa = !tarefa.completa;
    }
    return tarefa
  })
  this.setState({tarefas: novaListaDeTarefas})
}

onChangeFilter = (event) => {
  this.setState({filtro: event.target.value})
}

render() {
  const listaFiltrada = this.state.tarefas.filter(tarefa => {
    switch (this.state.filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  })

  return (
    <AppContainer>
      <h1>
        <span>L</span>
        <span>i</span>
        <span>s</span>
        <span>t</span>
        <span>a</span>
        &nbsp;
        <span>d</span>
        <span>e</span>
        &nbsp;
        <span>T</span>
        <span>a</span>
        <span>r</span>
        <span>e</span>
        <span>f</span>
        <span>a</span>
        <span>s</span>
      </h1>
      <InputsContainer>
        <input value={this.state.inputValue} onChange={this.onChangeInput} placeholder='Digite sua tarefa'/>
        <button onClick={this.criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br/>

      <InputsContainer>
        <label>Filtro</label>
        <select value={this.state.filter} onChange={this.onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => this.selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
      <GlobalStyle />
    </AppContainer>
  )
}
}

export default App