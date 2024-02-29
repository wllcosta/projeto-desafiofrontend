import { useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UserEdit(props) {
  // Estado para armazenar o nome e o email do novo usuário
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] =useState(false)

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isUpdating)
    {
      return false
    }

    setIsUpdating(true)
    // Validação do campo Nome
    if (!name.trim()) {
      setError("Por favor, insira um nome.");
      return;
    }

    // Validação do campo Email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // Se passou pela validação, envia os dados para a API

    axios.put(`http://localhost:3333/api/users/${props.user.id}`, { name, email })
    .then(()=>{      
      props.atualizaTabela()
      props.cancelEditing()
      toast.success("Usuario atualizado com sucesso")
    })
    .catch((error)=>{
      toast.error("Falha ao atualizar o usuario"+ JSON.stringify(error))
    })
    .finally(()=>{
      setIsUpdating(false)
    })
  };

  return (
    <div>
      
      <ToastContainer />
      <h1 className='text-zinc-300 bg-zinc-700 text-xl flex items-center justify-center py-4'>
        Edição de Usuários:
      </h1>
      {/* Renderiza o formulário de criação de usuário */}
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {/* Campo Nome Completo */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu nome aqui"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        {/* Campo E-mail */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu e-mail aqui"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Exibe mensagem de erro, se houver */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Botão de envio */}
        <button
         disabled={isUpdating}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar
        </button>

        <button className="bg-orange-200 rounded text-zinc-500" onClick={props.cancelEditing}>Cancelar</button>
      </form>
    </div>
  );
}
