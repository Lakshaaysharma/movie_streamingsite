import { useState } from 'react';

const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/original";

function MovieCard({ movie }) {
    const [showPreview, setShowPreview] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).getFullYear();
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return 'No overview available';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const getRatingColor = (rating) => {
        if (rating >= 8) return 'text-green-400';
        if (rating >= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div 
            className="relative group"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
        >
            <img 
                src={IMAGE_BASE_URL + movie.poster_path}
                alt={movie.title || movie.name}
                className="w-[110px] md:w-[200px] rounded-lg
                hover:border-[3px] border-gray-400 cursor-pointer
                hover:scale-110 transition-all duration-150 ease-in
                active:scale-95 touch-manipulation
                shadow-lg hover:shadow-xl" 
                loading="lazy"
            />
            
            {/* Enhanced Hover Preview Container */}
            {showPreview && (
                <div className="absolute top-0 left-0 w-[110px] md:w-[200px] 
                    bg-gradient-to-b from-black/98 via-black/95 to-black/98 
                    backdrop-blur-md rounded-lg p-3 z-50 
                    shadow-2xl border border-gray-500/30
                    transform transition-all duration-300 ease-out
                    animate-in fade-in-0 zoom-in-95
                    hover:scale-105">
                    
                    {/* Movie Title with Gradient */}
                    <h3 className="text-white font-bold text-sm md:text-base mb-3 
                        line-clamp-2 bg-gradient-to-r from-white to-gray-300 
                        bg-clip-text text-transparent">
                        {movie.title || movie.name}
                    </h3>
                    
                    {/* Rating and Release Date with Icons */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 bg-gray-800/50 
                            px-2 py-1 rounded-full">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className={`text-xs font-bold ${getRatingColor(movie.vote_average)}`}>
                                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-800/50 
                            px-2 py-1 rounded-full">
                            <span className="text-blue-400 text-xs">📅</span>
                            <span className="text-gray-300 text-xs font-medium">
                                {formatDate(movie.release_date)}
                            </span>
                        </div>
                    </div>
                    
                    {/* Overview with Better Typography */}
                    <div className="mb-3">
                        <p className="text-gray-300 text-xs leading-relaxed line-clamp-4 
                            font-light">
                            {truncateText(movie.overview, 120)}
                        </p>
                    </div>
                    
                    {/* Additional Info with Icons */}
                    <div className="pt-2 border-t border-gray-600/50">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 bg-gray-800/30 
                                px-2 py-1 rounded">
                                <span className="text-purple-400">🌍</span>
                                <span className="text-gray-300 font-medium">
                                    {movie.original_language?.toUpperCase() || 'N/A'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-800/30 
                                px-2 py-1 rounded">
                                <span className="text-green-400">👥</span>
                                <span className="text-gray-300 font-medium">
                                    {movie.vote_count ? (movie.vote_count > 1000 ? 
                                        `${(movie.vote_count/1000).toFixed(1)}K` : 
                                        movie.vote_count) : 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-red-600 rounded-full 
                            flex items-center justify-center 
                            hover:bg-red-500 transition-colors duration-200">
                            <span className="text-white text-xs">▶</span>
                        </div>
                    </div>

                    {/* Bottom Gradient Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 
                        bg-gradient-to-t from-black/80 to-transparent 
                        pointer-events-none rounded-b-lg"></div>
                </div>
            )}
        </div>
    )
}

export default MovieCard