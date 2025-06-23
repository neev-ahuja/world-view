import { Routes , Route } from 'react-router-dom';
import WorldViewLanding from './components/WorldViewLanding';
import WorldViewSearch from './components/WorldViewSearch';
function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<WorldViewLanding /> }/>
      <Route exact path='/search' element={<WorldViewSearch />} />
    </Routes>
    </>
  )
}

export default App
