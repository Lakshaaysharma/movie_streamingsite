import './App.css'
import GenreMovieList from './Components/GenreMovieList'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Footer from './Components/Footer'

function App() {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <Hero />
      <GenreMovieList />
      <Footer />
    </div>
  )
}

export default App
