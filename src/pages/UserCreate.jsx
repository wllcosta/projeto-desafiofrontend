import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  // Estado para armazenar o nome e o email do novo usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do campo Nome
    if (!name.trim()) {
      setError("Por favor, insira um nome.");
      return;
    }


    if (name.length >= 100) {
      setError("O campo não pode ter mais que 100 caracteres.");
      return;
    }

    // Validação do campo Email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // Se passou pela validação, envia os dados para a API
    try {
      await axios.post('http://localhost:3333/api/users/', { name, email });
      toast.success('Usuário criado:');
      // Limpa os campos e erros após o envio bem-sucedido
      setName("");
      setEmail("");
      setError("");
      navigate("/users");
    } catch (error) {
      toast.error('Erro ao criar usuário:');
    }
  };

  return (
    <div>
      <h1 className='text-zinc-300 bg-zinc-700 text-xl flex items-center justify-center py-4'>
        Criação de Usuários:
      </h1>
      {/* Renderiza o formulário de criação de usuário */}
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {/* Campo Nome Completo */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Completo:</label>
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
        {error && <p className="text-red-500 p-1 bg-zinc-300">{error}</p>}
        {/* Botão de envio */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
