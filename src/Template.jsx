import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Template = function () {
    return (
        <>
            <ToastContainer />
                <main className='
                    flex flex-col h-screen
                    min-h-screen min-w-screen
                    bg-zinc-800 text-zinc-400 
                    '   >
                <nav className='flex w-full justify-around  bg-zinc-900 gap-3'>
                    <Link className='group cursor-pointer 
                flex items-center gap-3 rounded px-3 py-2 outline-none
                 hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500
                  dark:hover:bg-zinc-800
                  ' to={'/'} >Home</Link>
                    <Link className='
                group cursor-pointer 
                flex items-center gap-3 rounded px-3 py-2 outline-none
                 hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500
                  dark:hover:bg-zinc-800
                ' to={'/users'} >Lista de Usuarios</Link>
                    <Link className='
                group cursor-pointer 
                flex items-center gap-3 rounded px-3 py-2 outline-none
                 hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500
                  dark:hover:bg-zinc-800
                ' to={'/user-create'} >Criar Usuario</Link>
                </nav>
                <Outlet />
            </main>
        </>
    )
}
