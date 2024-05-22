import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import TelaLogin from './Telas/TelaLogin';
import TelaInicial from './Telas/TelaInicial';
import TelaCadastroAgencia from './Telas/TelaCadastroAgencia';
import TelaCadastroUsuario from './Telas/TelaCadastroUsuario';
import TelaCadatroProduto from './Telas/TelaCadastroProduto';
import TelaCadastroAgenciaProduto from './Telas/TelaCadastroAgenciaProduto';
import TelaCadastroUsuarioProduto from './Telas/TelaCadastroUsuarioProduto';
import Tela404 from './Telas/Tela404';

export const ContextoUsuario = createContext('');

function App() 
{
    // Define o estado inicial do usuário 
    const [usuario, setUsuario] = useState({
        email: 'adminaurum@admin',
        senha: 'admin',
        logado: true
    });

    // Verifica se o usuário está logado. Se não estiver, exibe a tela de login. Se estiver, exibe a aplicação
    if (!usuario.logado) 
    {
        return (
            <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                <TelaLogin/>;
            </ContextoUsuario.Provider>
        );
    }
    else
    {
        return (
            <div className='App'>
                <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<TelaInicial/>}/>
                            <Route path='/agencia' element={<TelaCadastroAgencia/>}/>
                            <Route path='/usuario' element={<TelaCadastroUsuario/>}/>
                            <Route path='/produto' element={<TelaCadatroProduto/>}/>
                            <Route path='/agencia/:codigo' element={<TelaCadastroAgenciaProduto/>}/>
                            <Route path='/usuario/:codigo' element={<TelaCadastroUsuarioProduto/>}/>
                            <Route path='*' element={<Tela404/>} />
                        </Routes>
                    </BrowserRouter>
                </ContextoUsuario.Provider>
            </div>
        );
    }
}

export default App;
