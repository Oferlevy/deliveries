import getMenu from '@/api/menu';
import getMenuItems from '@/api/menuItems';
import withSsrAuth from '@/lib/withSsrAuth';

import MenuModal from '@/components/menu/MenuModal';
import MenuSection from '@/components/menu/MenuSection';
import MenuLayout from '@/components/menu/MenuLayout';
import EditMenuItem from '@/components/menu/EditMenuItem';

import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import editMenuReducer from '@/contexts/editMenuReducer';

export default function EditMenuPage({ initialMenu, allItems }) {
    const [{ menu, itemsList }, dispatch] = useReducer(editMenuReducer, {
        menu: initialMenu,
        allItems,
        itemsList: [],
    });

    const [itemToShow, setItemToShow] = useState(null);
    const [isNewItem, setIsNewItem] = useState(false);

    const addItem = (section) => {
        setItemToShow({ section, price: '' });
        setIsNewItem(true);
    };

    const updateMenu = (event) => {
        event.preventDefault();

        const includes = (item) => {
            return allItems.some(
                (i) =>
                    Object.keys(i).length === Object.keys(item).length &&
                    Object.keys(i).every((key) => i[key] == item[key])
            );
        };

        const menuItems = menu.sections.map((section) => section.items).flat(1);
        const newItems = menuItems.filter((item) => item.id === undefined);
        const modifiedItems = menuItems.filter((item) => !includes(item));

        axios
            .post('/api/edit-menu', {
                menu,
                newItems,
                modifiedItems,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (!itemToShow) {
            setIsNewItem(false);
            return;
        }

        dispatch({ type: 'setList', item: itemToShow });
    }, [itemToShow]);

    return (
        <MenuLayout {...menu}>
            <ul className='h-full flex-1'>
                {menu.sections.map((section, index) => (
                    <li key={index}>
                        <MenuSection
                            {...section}
                            setItemToShow={setItemToShow}
                            withAddButton={true}
                            addItem={addItem}
                        />
                    </li>
                ))}
            </ul>

            <div className='sticky bottom-3 px-3'>
                <button
                    onClick={updateMenu}
                    className='sticky w-full py-3 px-4 bottom-3 rounded-md bg-[#8b5cf6] hover:bg-violet-600 text-white text-center font-semibold transition-colors'
                >
                    עדכן תפריט
                </button>
            </div>

            <MenuModal
                isOpen={itemToShow !== null}
                close={() => setItemToShow(null)}
            >
                <EditMenuItem
                    initialItem={itemToShow}
                    itemsList={itemsList}
                    dispatch={dispatch}
                    isOpen={itemToShow !== null}
                    close={() => setItemToShow(null)}
                    isNewItem={isNewItem}
                />
            </MenuModal>
        </MenuLayout>
    );
}

export const getServerSideProps = withSsrAuth(async () => {
    const initialMenu = await getMenu();
    const allItems = await getMenuItems();

    return {
        props: { initialMenu, allItems },
    };
}, '/crew/edit-menu');
