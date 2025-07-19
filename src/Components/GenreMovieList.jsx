import GenresList from './../Constant/GenresList';
import MovieList from './MovieList';
import { useState, useEffect, useCallback } from 'react';

function GenreMovieList() {
    const [visibleGenres, setVisibleGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const genresPerPage = 3;

    useEffect(() => {
        const initialGenres = GenresList.genere.slice(0, genresPerPage);
        setVisibleGenres(initialGenres);
    }, []);

    const loadMoreGenres = useCallback(() => {
        if (isLoading) return;
        
        setIsLoading(true);
        const nextPage = currentPage + 1;
        const startIndex = (nextPage - 1) * genresPerPage;
        const endIndex = startIndex + genresPerPage;
        const newGenres = GenresList.genere.slice(startIndex, endIndex);
        
        if (newGenres.length > 0) {
            setTimeout(() => {
                setVisibleGenres(prev => [...prev, ...newGenres]);
                setCurrentPage(nextPage);
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(false);
        }
    }, [currentPage, isLoading]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 200) {
                loadMoreGenres();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreGenres]);

    return (
        <div className="space-y-6 md:space-y-8">
            {visibleGenres.map((item, index) => (
                <div key={item.id} className='px-4 md:px-8 lg:px-16'>
                    <h2 className='text-lg md:text-xl lg:text-2xl text-white font-bold mb-4 md:mb-6'>
                        {item.name}
                    </h2>
                    <MovieList genreId={item.id} index_={index} />
                </div>
            ))}
            
            {isLoading && (
                <div className="px-4 md:px-8 lg:px-16 py-8">
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        <span className="ml-4 text-white text-lg">Loading more genres...</span>
                    </div>
                </div>
            )}
            
            {visibleGenres.length >= GenresList.genere.length && (
                <div className="px-4 md:px-8 lg:px-16 py-8">
                    <div className="text-center text-gray-400 text-lg">
                        🎬 You've reached the end! All genres loaded.
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenreMovieList