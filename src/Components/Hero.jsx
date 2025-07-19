import { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function Hero() {
    const [movieList, setMovieList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const elementRef = useRef();

    useEffect(() => {
        getTrendingMovies();
    }, [])

    const getTrendingMovies = () => {
        GlobalApi.getTrendingVideos.then(resp => {
            setMovieList(resp.data.results);
        })
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === movieList.length - 1 ? 0 : prevIndex + 1
        );
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? movieList.length - 1 : prevIndex - 1
        );
    }

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, movieList.length]);

    return (
        <div className='relative h-[85vh] w-full overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out'>
                <img 
                    src={`https://image.tmdb.org/t/p/original${movieList[currentIndex]?.backdrop_path}`}
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10'
            >
                <HiChevronLeft className='text-2xl' />
            </button>
            <button 
                onClick={nextSlide}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10'
            >
                <HiChevronRight className='text-2xl' />
            </button>

            {/* Content */}
            <div className='absolute top-[20%] p-4 md:p-8 transition-all duration-500'>
                <h1 className='text-3xl md:text-5xl font-bold'>{movieList[currentIndex]?.title}</h1>
                <div className='flex gap-3 my-4'>
                    <button className='bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition-all'>
                        Play
                    </button>
                    <button className='border border-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition-all'>
                        Watch Later
                    </button>
                </div>
                <p className='text-gray-400 text-sm'>
                    Released: {movieList[currentIndex]?.release_date}
                </p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 my-4'>
                    {movieList[currentIndex]?.overview}
                </p>
            </div>

            {/* Dots Indicator */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10'>
                {movieList.slice(0, 5).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hero 