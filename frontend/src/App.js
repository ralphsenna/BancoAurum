import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ContextoUsuario } from './Templates/Contexto';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaLogin from './Telas/TelaLogin';
import TelaInicial from './Telas/TelaInicial';
import TelaCadastroAgencia from './Telas/TelaCadastroAgencia';
import TelaCadastroCliente from './Telas/TelaCadastroCliente';
import TelaCadatroProduto from './Telas/TelaCadastroProduto';
import Tela404 from './Telas/Tela404';


function App() 
{
    const [usuario, setUsuario] = useState({
        nome: "",
        senha: "",
        logado: false
    });

    if (!usuario.logado) 
    {
        return <ContextoUsuario.Provider value={[usuario, setUsuario]}>
            <TelaLogin/>;
        </ContextoUsuario.Provider>;
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