import MenuItem from '@/components/menu/MenuItem';

export default function MenuSection({
    name,
    items,
    setItemToShow,
    withAddButton,
    addItem,
}) {
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

            {withAddButton && (
                <button
                    onClick={() => addItem(name)}
                    className='flex flex-row-reverse justify-center items-center p-2 mt-1 mb-4 rounded shadow bg-gray-200 hover:bg-gray-300 transition-colors font-medium'
                >
                    הוסף פריט
                </button>
            )}
        </section>
    );
}
