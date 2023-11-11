import { useState, useEffect, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function MenuLayout({ day, sections, children }) {
    const [shadow, setShadow] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const sectionsRef = useRef(null);

    const handleScroll = () => {
        setShadow(window.scrollY > titleHeight);
        const scrollY = window.scrollY + navbarHeight;

        sectionsRef.current.forEach((section) => {
            const sectionOffsetTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollY >= sectionOffsetTop &&
                scrollY < sectionOffsetTop + sectionHeight
            )
                setActiveSection(section.id);
        });
    };

    useEffect(() => {
        sectionsRef.current = document.querySelectorAll('section');
        setTitleHeight(document.getElementById('menu-title').offsetHeight);
        setNavbarHeight(document.getElementById('menu-header').offsetHeight);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!navbarHeight) return;

        window.addEventListener('scroll', handleScroll, { passive: true });
    }, [navbarHeight]);

    return (
        <div className='flex flex-col'>
            <h3
                id='menu-title'
                className='pt-4 text-xl text-center font-medium'
            >
                תפריט - יום {day}
            </h3>

            <ul
                id='menu-header'
                className={`flex flex-row-reverse sticky top-0 z-50 p-3 bg-white ${
                    shadow ? 'shadow-lg' : ''
                } transition-all ease-linear whitespace-nowrap`}
            >
                {sections.map(({ name }, index) => (
                    <li key={index} className='inline-block'>
                        <AnchorLink
                            id={'section-link-' + name}
                            href={'#' + name}
                            offset={navbarHeight}
                            className={`rounded-full outline-none px-3 py-2 text-ms font-medium ${
                                name === activeSection
                                    ? 'hover:bg-[#8b5cf630] bg-[#8b5cf620] text-[#8b5cf6]'
                                    : 'hover:text-[#8b5cf6]'
                            }  `}
                        >
                            {name}
                        </AnchorLink>
                    </li>
                ))}
            </ul>

            {children}
        </div>
    );
}
