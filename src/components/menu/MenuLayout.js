import { useState, useEffect, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function MenuLayout({ day, sections, children }) {
    const [shadow, setShadow] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [titleOffset, setTitleOffset] = useState(0);
    const [headerOffset, setHeaderOffset] = useState(0);
    const sectionsRef = useRef(null);

    const handleScroll = () => {
        setShadow(window.scrollY > titleOffset);
        const scrollY = window.scrollY + headerOffset;

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
        setTitleOffset(document.getElementById('menu-title').offsetHeight);
        setHeaderOffset(document.getElementById('menu-header').offsetHeight);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!headerOffset) return;

        window.addEventListener('scroll', handleScroll, { passive: true });
    }, [headerOffset]);

    return (
        <div className='flex flex-col h-full'>
            <h3
                id='menu-title'
                className='pt-4 text-xl text-center font-medium'
            >
                תפריט - יום {day}
            </h3>

            <ul
                id='menu-header'
                className={`flex flex-row-reverse sticky top-0 z-40 p-3 bg-white ${
                    shadow ? 'shadow-lg' : ''
                } transition-all ease-linear whitespace-nowrap`}
            >
                {sections.map(({ name }, index) => (
                    <li key={index} className='inline-block'>
                        <AnchorLink
                            id={'section-link-' + name}
                            href={'#' + name}
                            offset={headerOffset}
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
