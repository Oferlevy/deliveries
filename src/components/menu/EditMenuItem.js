import { useEffect, useState } from 'react';

export default function EditMenuItem({
    initialItem,
    itemsList,
    dispatch,
    isOpen,
    close,
    isNewItem,
}) {
    const [newItem, setNewItem] = useState(initialItem || {});

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: isNewItem ? 'addItem' : 'editItem',
            item: newItem,
        });

        close();
    };

    const chooseFromList = (item, oldId) => {
        dispatch({ type: 'chooseFromList', item, oldId });
        setNewItem(item);
    };

    const deleteItem = () => {
        dispatch({ type: 'deleteItem', item: newItem });
        close();
    };

    useEffect(() => {
        if (!initialItem) return;

        setNewItem(initialItem);
    }, [initialItem]);

    if (!isOpen) return;

    return (
        <div className='p-4 pt-14 bg-white'>
            <form onSubmit={handleSubmit}>
                <div className='text-right'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            שם מנה
                        </label>
                        <input
                            name='name'
                            type='text'
                            dir='rtl'
                            required={true}
                            placeholder={'שם מנה'}
                            value={newItem.name || ''}
                            onChange={(event) =>
                                setNewItem({
                                    ...newItem,
                                    name: event.target.value,
                                })
                            }
                            className='border-b-2 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            תיאור המנה
                        </label>
                        <input
                            name='description'
                            type='text'
                            dir='rtl'
                            placeholder='תיאור המנה'
                            value={newItem.description || ''}
                            onChange={(event) =>
                                setNewItem({
                                    ...newItem,
                                    description: event.target.value,
                                })
                            }
                            className='border-b-2 w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            תמונה
                        </label>
                        <input
                            name='image'
                            type='text'
                            required={true}
                            placeholder='Image Path'
                            value={newItem.image || ''}
                            onChange={(event) =>
                                setNewItem({
                                    ...newItem,
                                    image: event.target.value,
                                })
                            }
                            className='border-b-2 w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-medium mb-2'>
                            מחיר
                        </label>

                        <div className='flex items-center flex-row-reverse'>
                            <p>₪</p>
                            <input
                                name='price'
                                type='number'
                                dir='rtl'
                                required={true}
                                placeholder='מחיר'
                                value={newItem.price || ''}
                                onChange={(event) =>
                                    setNewItem({
                                        ...newItem,
                                        price: event.target.value,
                                    })
                                }
                                className='border-b-2 flex-1 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                            />
                        </div>
                    </div>

                    {itemsList.length > 1 && (
                        <>
                            <p className='w-full mt-12 text-center border-b-2 text-xl font-medium leading-[0.1rem]'>
                                <span className='bg-white px-3'>או</span>
                            </p>

                            <div className='mt-8 mb-6'>
                                <label className='block text-gray-700 text-sm font-medium mb-2'>
                                    בחר פריט מהרשימה
                                </label>
                                <select
                                    value={newItem.name || ''}
                                    onChange={(event) =>
                                        chooseFromList(
                                            JSON.parse(event.target.value),
                                            newItem.id
                                        )
                                    }
                                    dir='rtl'
                                    className='px-3 py-2 w-full text-sm  text-gray-700 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0'
                                >
                                    {itemsList.map((item, index) => (
                                        <option
                                            key={index}
                                            value={JSON.stringify(item)}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </div>

                <div className='flex sticky bottom-3'>
                    {!isNewItem && (
                        <button
                            onClick={deleteItem}
                            className='bg-red-500 w-28 mr-2 rounded-md shadow-lg text-white'
                        >
                            <p className='font-semibold'>מחק</p>
                        </button>
                    )}
                    <button
                        type='submit'
                        className='bg-[#8b5cf6] flex-1
                        py-3 px-4 rounded-md shadow-lg text-white'
                    >
                        <p className='font-semibold'>אישור</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
