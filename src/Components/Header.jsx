import { HiDotsVertical } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import { getIcons } from '../utils/icons.jsx';
import { FaGithub } from "react-icons/fa";

function Header() {
    const [icons, setIcons] = useState([]);

    const fetchData = async () => {
        const icons = await getIcons();
        setIcons(icons);
    }

    useEffect(() => {
        fetchData();
    }, []);
    const [toggle, setToggle] = useState(false);

    return (
        <div className='flex items-center justify-between p-5'>
            <div className='flex gap-8 items-center'>
                <div className='flex items-center gap-2'>
                    <div className='text-yellow-400 text-2xl md:text-3xl font-bold'>
                        🏴‍☠️ PIRATE STREAM
                    </div>
                </div>
                
                <div className='text-white flex items-center gap-3 text-[15px] font-semibold cursor-pointer'>
                    <div className='hidden md:flex gap-8 items-center'>
                        {icons.map((icon, index) => index < 6 && (
                            <div key={icon.id} className='flex items-center gap-2 hover:text-gray-300 transition-colors'>
                                {icon.icon}
                                <h2 className='hover:underline underline-offset-8'>{icon.name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='flex md:hidden gap-5'>
                        {icons.map((icon, index) => index < 3 && (
                            <div key={icon.id} className='flex items-center gap-2'>
                                {icon.icon}
                                <h2 className='hidden md:block hover:underline underline-offset-8'>{icon.name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HiDotsVertical />
                        {toggle ? <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-4 py-4'>
                            <div className='flex flex-col items-center gap-2 mb-3'>
                                {icons.map((icon, index) => index > 2 && (
                                    <div key={icon.id} className='flex items-center gap-2'>
                                        {icon.icon}
                                        <h2 className='hover:underline underline-offset-8'>{icon.name}</h2>
                                    </div>
                                ))}
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className='w-[25px] h-[25px] md:w-[40px] md:h-[40px] text-white' />
            </a>
        </div>
    )
}

export default Header