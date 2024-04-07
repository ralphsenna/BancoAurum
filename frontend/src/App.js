import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaLogin from './Telas/TelaLogin';
import TelaInicial from './Telas/TelaInicial';
import TelaCadastroAgencia from './Telas/TelaCadastroAgencia';
import TelaCadastroCliente from './Telas/TelaCadastroCliente';
import TelaCadatroProduto from './Telas/TelaCadastroProduto';
import Tela404 from './Telas/Tela404';

export const ContextoUsuario = createContext("");

function App() 
{
    const [usuario, setUsuario] = useState({
        nome: "adminaurum",
        senha: "admin",
        logado: true
    });

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
            <div className="App">
                <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<TelaInicial/>}/>
                            <Route path='/agencia' element={<TelaCadastroAgencia/>}/>
                            <Route path='/cliente' element={<TelaCadastroCliente/>}/>
                            <Route path='/produto' element={<TelaCadatroProduto/>}/>
                            <Route path='*' element={<Tela404/>} />
                        </Routes>
                    </BrowserRouter>
                </ContextoUsuario.Provider>
            </div>
        );
    }
}

export default App;
