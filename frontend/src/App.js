import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaInicial from './telas/TelaInicial';
import TelaCadastrarCliente from './telas/TelaCadastrarCliente';
import TelaAlterarCliente from './telas/TelaAlterarCliente';
import TelaAlterarConta from './telas/___TelaAlterarConta';
import TelaConsultarProdutos from './telas/TelaConsultarProdutos';
import TelaExcluirConta from './telas/TelaExcluirProduto';
import TelaConsultarAgencias from './telas/TelaConsultarAgencias';
import Tela404 from './telas/Tela404';
import TelaCadastrarAgencia from './telas/TelaCadastrarAgencia';
import TelaExcluirCliente from './telas/___TelaExcluirCliente';
import TelaAlterarAgencia from './telas/TelaAlterarAgencia';
import TelaConsultarClientes from './telas/TelaConsultarClientes';
import TelaCadastrarProduto from './telas/TelaCadastrarProduto';
import TelaExcluirProduto from './telas/TelaExcluirProduto';
import TelaContratarProduto from './telas/TelaContratarProduto';
import TelaCadastrarProdEmAgencia from './telas/TelaCadastrarProdEmAgencia';

// banco de dados: backendpfs2
// user: mauricioalberti
// senha: mauricioalbertipfs2

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TelaInicial />} />
          {/* CLIENTES */}
          <Route path='/cadastrarcliente' element={<TelaCadastrarCliente />} />
          <Route path='/alterarcliente' element={<TelaAlterarCliente />} />
          <Route path='/excluircliente' element={<TelaExcluirCliente />} />
          <Route path='/consultarclientes' element={<TelaConsultarClientes />} />
          <Route path='/contratarproduto' element={<TelaContratarProduto />} />

          {/* PRODUTOS */}
          <Route path='/cadastrarproduto' element={<TelaCadastrarProduto />} />
          <Route path='/excluirproduto' element={<TelaExcluirProduto />} />
          <Route path='/consultarprodutos' element={<TelaConsultarProdutos />} />

          {/* AGÊNCIAS */}
          <Route path='/cadastraragencia' element={<TelaCadastrarAgencia />} />
          <Route path='/consultaragencias' element={<TelaConsultarAgencias />} />
          <Route path='/alteraragencia' element={<TelaAlterarAgencia />} />
          <Route path='/cadastrarprodutoemagencia' element={<TelaCadastrarProdEmAgencia />} />

          {/* <Route path='/' */}
          <Route path='*' element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
