import { useState, useEffect, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function MenuLayout({ day, sections, children }) {
    const [shadow, setShadow] = useState(false);
    const [activeSection, setActiveSection] = useState({ name: '', offset: 0 });
    const [titleHeight, setTitleHeight] = useState(0);
    const [sectionsListHeight, setSectionsListHeight] = useState(0);

    const sectionsRef = useRef(null);
    const sectionsListRef = useRef(null);

    let previousSection = '';
    const handlePageScroll = () => {
        setShadow(window.scrollY > titleHeight);
        const scrollY = window.scrollY + sectionsListHeight;
        let currentSection = '';

        sectionsRef.current.forEach((section) => {
            const sectionOffsetTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollY >= sectionOffsetTop &&
                scrollY < sectionOffsetTop + sectionHeight
            ) {
                currentSection = section;
            }
        });

        if (currentSection && currentSection.id != previousSection) {
            previousSection = currentSection.id;
            const sectionButton = document.getElementById(
                'section-link-' + currentSection.id
            );

            // console.log('width1', sectionsListRef.current.offsetWidth);
            // console.log('left', sectionButton.offsetLeft);
            // console.log('width2', sectionButton.offsetWidth);
            setActiveSection({
                name: currentSection.id,
                offset:
                    sectionsListRef.current.offsetWidth -
                    sectionButton.offsetLeft -
                    sectionButton.offsetWidth +
                    16,
            });
        }
    };

    useEffect(() => {
        sectionsRef.current = document.querySelectorAll('section');
        sectionsListRef.current = document.getElementById('sections-list');

        setTitleHeight(document.getElementById('menu-title').offsetHeight);
        setSectionsListHeight(
            document.getElementById('sections-list').offsetHeight
        );

        return () => {
            window.removeEventListener('scroll', handlePageScroll);
        };
    }, []);

    useEffect(() => {
        if (!sectionsListHeight) return;

        window.addEventListener('scroll', handlePageScroll, { passive: true });
    }, [sectionsListHeight]);

    useEffect(() => {
        // console.log(activeSection.offset);
        sectionsListRef.current?.scroll({
            left: -activeSection.offset,
            behavior: 'smooth',
        });
    }, [activeSection]);

    return (
        <div className='flex flex-col'>
            <h3
                id='menu-title'
                className='pt-4 text-xl text-center font-medium'
            >
                תפריט - יום {day}
            </h3>

            <div
                className={`sticky top-0 px-4 z-50 bg-white ${
                    shadow ? 'shadow-lg' : ''
                } transition-all ease-linear`}
            >
                <ul
                    id='sections-list'
                    dir='rtl'
                    className='flex overflow-auto pt-2 pb-3 bg-green-100'
                >
                    {sections.map(({ name }, index) => (
                        <li key={index}>
                            <AnchorLink
                                id={'section-link-' + name}
                                href={'#' + name}
                                offset={sectionsListHeight}
                                className={`rounded-full outline-none px-3 py-2 text-ms font-medium ${
                                    name === activeSection.name
                                        ? 'hover:bg-[#8b5cf630] bg-[#8b5cf620] text-[#8b5cf6]'
                                        : 'hover:text-[#8b5cf6]'
                                }  `}
                            >
                                {name}
                            </AnchorLink>
                        </li>
                    ))}
                </ul>
            </div>

            {children}
        </div>
    );
}
