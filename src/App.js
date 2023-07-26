import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PokemonPage from './pages/PokemonPage'

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/pokemon/:pname" element={<PokemonPage />} />
        </Routes>
    )
}

export default App
