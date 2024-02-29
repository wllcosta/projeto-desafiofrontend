import { useState, useEffect } from 'react';
import axios from 'axios';
import UserEdit from '../components/UserEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);
  // Estado para armazenar o usuário selecionado
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false)


  const cancelEditing = () => {
    setIsEditing(false)
  }
  // Efeito para fazer a requisição à API quando o componente for montado

  // Função assíncrona para fazer a requisição à API
  const fetchUsers = async () => {
    try {
      // Faz a requisição à API
      const response = await axios.get('http://localhost:3333/api/users/');
      // Define os usuários no estado
      setUsers(response.data.users);
    } catch (error) {
      // Trata erros caso ocorram
      toast.error('Erro ao buscar usuários:', error);
    } finally {
      setSelectedUser(null)
    }
  };



  useEffect(() => {

    // Chama a função para buscar os usuários quando o componente for montado
    fetchUsers();
  }, []); // O segundo parâmetro vazio indica que este efeito só deve ser executado uma vez, quando o componente for montado

  // Função para lidar com a seleção de um usuário
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Função para lidar com a edição das informações do usuário selecionado
  const handleEdit = () => {
    setIsEditing(true)
  };

  // Função para lidar com a exclusão do usuário selecionado
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        // Faz a requisição à API para excluir o usuário selecionado
        await axios.delete(`http://localhost:3333/api/users/${selectedUser.id}`);
        // Remove o usuário da lista de usuários
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setSelectedUser(null); // Limpa o usuário selecionado
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    } else {
      console.log('Nenhum usuário selecionado.');
    }
  };

  return (
    <div className="flex flex-col">


      <div className="flex flex-col">
        <div className='flex'>
          <h1 className='text-zinc-300 bg-zinc-700 text-xl flex items-center justify-center py-3.5 w-full'>
            Lista de Usuários:
          </h1>
          {selectedUser &&
            <div className="flex gap-2 pe-1">
              <button className='bg-emerald-700 rounded text-white p-4' onClick={handleEdit}>Editar</button>
              <button className='bg-red-700 rounded text-white p-4' onClick={handleDelete}>Excluir</button>
            </div>
          }
        </div>
        <table className='w-full'>
          <thead className='text-center'>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Nome</th>
              <th className='px-4 py-2'>Email</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map(user => (
              <tr key={user.id} className={`p-3 cursor-pointer ${selectedUser === user ? 'bg-zinc-500 text-zinc-900' : ''}`} onClick={() => handleUserSelect(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Informações do Usuário:</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Nome:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
        )}
      </div>


      {selectedUser && isEditing && (
        <div className="flex fixed top-0 w-full h-full bg-zinc-800 items-center justify-center">
          <UserEdit user={selectedUser} atualizaTabela={fetchUsers}
            cancelEditing={cancelEditing} />
        </div>
      )}
    </div>
  );
}
