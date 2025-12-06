import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Produtos from './containers/Produtos'

import { adicionar } from './features/carrinho/carrinhoSlice'
import { RootState } from './store'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  const dispatch = useDispatch()
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutos(res))
  }, [])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionar(produto))
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
