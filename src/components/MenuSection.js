import MenuItem from '@/components/MenuItem';

export default function MenuSection({ name, items, setItemToShow }) {
    return (
        <section id={name} className='flex flex-col text-right mx-4 mb-4'>
            <p className='text-xl font-medium'>{name}</p>

            <ul className='divide-y'>
                {items.map((item, index) => (
                    <li key={index} onClick={() => setItemToShow(item)}>
                        <MenuItem {...item} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
