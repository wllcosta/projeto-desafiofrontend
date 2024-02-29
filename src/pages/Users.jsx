import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users() {
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);

  // Efeito para fazer a requisição à API quando o componente for montado
  useEffect(() => {
    // Função assíncrona para fazer a requisição à API
    const fetchUsers = async () => {
      try {
        // Faz a requisição à API
        const response = await axios.get('http://localhost:3333/api/users/');
        // Define os usuários no estado
        setUsers(response.data.users);
      } catch (error) {
        // Trata erros caso ocorram
        console.error('Erro ao buscar usuários:', error);
      }
    };

    // Chama a função para buscar os usuários quando o componente for montado
    fetchUsers();
  }, []); // O segundo parâmetro vazio indica que este efeito só deve ser executado uma vez, quando o componente for montado

  return (
    <div>
      <h1 className='text-zinc-300 
      bg-zinc-700
      text-xl flex items-center justify-center py-4'>
        Lista de Usuários:
        </h1>
      {/* Renderiza a lista de usuários */}
      <table className='w-full'>
        <thead>
<tr>
  <th>ID</th>
  <th>Nome</th>
  <th>Email</th>
</tr>

        </thead>
        {users.map(user => (
          <tr key={user.id} className='p-3'
           >
           <td className='flex gap-2 items-center'>
              <span className='text-lg'>{user.id}</span>
              <button className='bg-emerald-800 rounded txt-white p-2'>Editar</button>
            </td>
            <td>
              {user.name}
            </td>
            <td>
              {user.email}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
