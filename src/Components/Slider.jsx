import { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

function Slider() {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef();
    useEffect(() => {
        getTrendingMovies();
    }, [])

    const getTrendingMovies = () => {
        GlobalApi.getTrendingVideos.then(resp => {
            setMovieList(resp.data.results);
        })
    }

    const sliderRight = (element) => {
        element.scrollLeft += element.clientWidth - 110
    }
    const sliderLeft = (element) => {
        element.scrollLeft -= element.clientWidth - 110
    }

    return (
        <div>
            <HiChevronLeft className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer z-10"
                onClick={() => sliderLeft(elementRef.current)} />
            <HiChevronRight className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-10"
                onClick={() => sliderRight(elementRef.current)} />

            <div className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth" ref={elementRef}>
                {movieList.map((item, index) => {
                    return (
                        <img 
                            key={index}
                            src={IMAGE_BASE_URL + item.backdrop_path}
                            alt={item.title || item.name}
                            className="min-w-[180px] md:min-w-[280px] object-cover mr-4 rounded-md hover:scale-105 transition-all duration-200 ease-in"
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Slider