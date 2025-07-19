import GlobalApi from "../Services/GlobalApi";
import { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function MovieList({ genreId, index_ }) {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        getMovieByGenreId(1, true);
    }, [genreId])

    const getMovieByGenreId = async (pageNum = 1, reset = false) => {
        if (reset) {
            setIsLoading(true);
            setPage(1);
            setHasMore(true);
        } else {
            setIsLoadingMore(true);
        }

        try {
            const resp = await GlobalApi.getMovieByGenreID(genreId, pageNum);
            const newMovies = resp.data.results;
            
            if (reset) {
                setMovieList(newMovies);
            } else {
                setMovieList(prev => [...prev, ...newMovies]);
            }
            
            setHasMore(pageNum < resp.data.total_pages && newMovies.length > 0);
            setPage(pageNum);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    const sliderRight = (element) => {
        if (element) {
            const scrollAmount = window.innerWidth < 768 ? 300 : 500;
            element.scrollLeft += scrollAmount;
        }
    }
    
    const sliderLeft = (element) => {
        if (element) {
            const scrollAmount = window.innerWidth < 768 ? 300 : 500;
            element.scrollLeft -= scrollAmount;
        }
    }

    const handleScroll = useCallback(() => {
        if (!elementRef.current || isLoadingMore || !hasMore) return;

        const element = elementRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = element;
        
        const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100;

        if (isNearEnd) {
            console.log(`🔄 Loading more movies for genre ${genreId}, page ${page + 1}`);
            getMovieByGenreId(page + 1);
        }
    }, [page, isLoadingMore, hasMore, genreId]);

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        elementRef.current.touchStartX = touch.clientX;
    };

    const handleTouchMove = (e) => {
        if (!elementRef.current.touchStartX) return;
        
        const touch = e.touches[0];
        const diffX = elementRef.current.touchStartX - touch.clientX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                sliderRight(elementRef.current);
            } else {
                sliderLeft(elementRef.current);
            }
        }
        
        elementRef.current.touchStartX = null;
    };

    const handleTouchEnd = () => {
        elementRef.current.touchStartX = null;
    };

    useEffect(() => {
        const element = elementRef.current;
        if (element) {
            const handleScrollEvent = () => {
                handleScroll();
            };

            element.addEventListener('scroll', handleScrollEvent);
            return () => {
                element.removeEventListener('scroll', handleScrollEvent);
            };
        }
    }, [handleScroll]);

    return (
        <div className="relative">
            <HiChevronLeft 
                onClick={() => sliderLeft(elementRef.current)}
                className="hidden md:block text-[50px] text-white p-2 z-10 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-black/20 rounded-r-lg transition-all duration-200" 
            />
            <HiChevronRight 
                onClick={() => sliderRight(elementRef.current)}
                className="hidden md:block text-[50px] text-white p-2 z-10 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-black/20 rounded-l-lg transition-all duration-200" 
            />

            <HiChevronLeft 
                onClick={() => sliderLeft(elementRef.current)}
                className="md:hidden text-[40px] text-white p-2 z-10 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-r-lg" 
            />
            <HiChevronRight 
                onClick={() => sliderRight(elementRef.current)}
                className="md:hidden text-[40px] text-white p-2 z-10 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-r-lg" 
            />

            <div 
                ref={elementRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="flex overflow-x-auto gap-4 md:gap-8 snap-x snap-mandatory scrollbar-none scroll-smooth pt-5 px-3 pb-5 text-center"
            >
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex-shrink-0 snap-start">
                            <div className="w-[110px] md:w-[200px] h-[165px] md:h-[300px] bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    ))
                ) : (
                    <>
                        {movieList.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex-shrink-0 snap-start">
                                <MovieCard movie={item} />
                            </div>
                        ))}
                        
                        {isLoadingMore && (
                            <div className="flex-shrink-0 snap-start flex items-center justify-center">
                                <div className="w-[110px] md:w-[200px] h-[165px] md:h-[300px] bg-gray-700 rounded-lg flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default MovieList