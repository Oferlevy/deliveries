const addItem = (state, action) => {
    const sectionIndex = state.menu.sections.findIndex(
        (section) => section.name === action.item.section
    );

    if (!state.menu.sections[sectionIndex].items.includes(action.item))
        state.menu.sections[sectionIndex].items.push(action.item);

    return state;
};

const editItem = (state, action) => {
    const sectionIndex = state.menu.sections.findIndex(
        (section) => section.name === action.item.section
    );

    state.menu.sections[sectionIndex].items = state.menu.sections[
        sectionIndex
    ].items.map((item) => (item.id === action.item.id ? action.item : item));

    return state;
};

const chooseFromList = (state, action) => {
    const sectionIndex = state.menu.sections.findIndex(
        (section) => section.name === action.item.section
    );

    const oldItemIndex = state.menu.sections[sectionIndex].items.findIndex(
        (item) => item.id === action.oldId
    );

    state.menu.sections[sectionIndex].items[oldItemIndex] = action.item;

    return setList(state, action);
};

const setList = (state, action) => {
    const sectionIndex = state.menu.sections.findIndex(
        (section) => section.name === action.item.section
    );

    const itemsList = state.allItems.filter((item) => {
        if (item.section !== action.item.section) return false;

        const index = state.menu.sections[sectionIndex].items.findIndex(
            (i) => i.id === item.id
        );

        return index === -1;
    });
    itemsList.unshift(action.item);

    return { ...state, itemsList };
};

const deleteItem = (state, action) => {
    const sectionIndex = state.menu.sections.findIndex(
        (section) => section.name === action.item.section
    );

    state.menu.sections[sectionIndex].items = state.menu.sections[
        sectionIndex
    ].items.filter((item) => item.id !== action.item.id);

    return state;
};

export default function editMenuReducer(state, action) {
    switch (action.type) {
        case 'addItem':
            return addItem(state, action);
        case 'editItem':
            return editItem(state, action);
        case 'chooseFromList':
            return chooseFromList(state, action);
        case 'setList':
            return setList(state, action);
        case 'deleteItem':
            return deleteItem(state, action);
        default:
            return state;
    }
}
