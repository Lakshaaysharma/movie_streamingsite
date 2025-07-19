import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'

const Hero = () => {
  const [heroMovie, setHeroMovie] = useState(null)

  useEffect(() => {
    console.log('Hero component mounted')
    getTrendingMovie()
  }, [])

  const getTrendingMovie = async () => {
    try {
      console.log('Hero: Fetching trending movie...')
      const response = await GlobalApi.getTrendingVideos
      console.log('Hero: Trending movie response:', response)
      if (response?.data?.results) {
        setHeroMovie(response.data.results[0])
        console.log('Hero: Set hero movie:', response.data.results[0])
      }
    } catch (error) {
      console.error('Hero: Error fetching trending movie:', error)
    }
  }

  if (!heroMovie) {
    console.log('Hero: No hero movie data yet')
    return (
      <div className='relative h-[70vh] bg-black flex items-center justify-center'>
        <div className='text-white text-2xl'>Loading...</div>
      </div>
    )
  }

  console.log('Hero: Rendering with movie:', heroMovie)

  return (
    <div className='relative h-[70vh] bg-black'>
      <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10'></div>
      <img 
        src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
        alt={heroMovie.title || heroMovie.name}
        className='w-full h-full object-cover'
      />
      <div className='absolute bottom-20 left-10 z-20 text-white max-w-2xl'>
        <h1 className='text-5xl font-bold mb-4'>{heroMovie.title || heroMovie.name}</h1>
        <p className='text-lg mb-4'>{heroMovie.overview}</p>
        <div className='flex space-x-4'>
          <button className='bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200'>
            Play
          </button>
          <button className='bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700'>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero 