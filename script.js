// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma tarefa
function adicionarTarefa() {
  const novaTarefa = document.getElementById("new-todo").value;
  
  // Verifica se a tarefa está vazia
  if (novaTarefa) {
    // Cria um objeto para a tarefa
    const tarefaObj = {
      texto: novaTarefa,
      completada: false,
    };
    
    // Adiciona a tarefa ao array
    tarefas.push(tarefaObj);
    
    // Limpa o campo de entrada
    document.getElementById("new-todo").value = "";
    
    // Atualiza a lista de tarefas na tela
    atualizarLista();
  } else {
    alert("Insira uma tarefa válida!");
  }
}

// Função para atualizar a lista de tarefas na tela
function atualizarLista() {
  const lista = document.getElementById("todo-list");
  lista.innerHTML = "";
  
  // Percorre o array de tarefas e cria elementos HTML
  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("div");
    item.classList.add("todo-item");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.completada;
    checkbox.addEventListener("change", () => {
      tarefa.completada = checkbox.checked;
      atualizarLista();
    });
    
    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;
    
    const excluirButton = document.createElement("button");
    excluirButton.textContent = "Excluir";
    excluirButton.addEventListener("click", () => {
      tarefas.splice(index, 1);
      atualizarLista();
    });

    // Atribui a classe "completed" ao elemento "item" se a tarefa estiver concluída
    if (tarefa.completada) {
        item.classList.add("completed");
      }
    
    item.appendChild(checkbox);
    item.appendChild(texto);
    item.appendChild(excluirButton);
    
    lista.appendChild(item);
  });
}

// Adiciona evento de clique ao botão de adicionar tarefa
const addButton = document.getElementById("add-todo");
addButton.addEventListener("click", adicionarTarefa);

// Inicialmente carrega a lista do localStorage (se existir)
tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
atualizarLista();

// Salva a lista no localStorage ao sair da página
window.addEventListener("beforeunload", () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
});
