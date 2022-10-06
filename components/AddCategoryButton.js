import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Menu, Button, Text } from 'react-native-paper';

const AddCategoryButton = (props) => {
    const { addCallback, categoryList } = props;
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button icon="plus" mode="outlined" onPress={() => openMenu()}>
                Add Category
            </Button>}>
            <Menu.Item leadingIcon="plus" onPress={() => { }} title="Create new Category         " />
            <Divider bold />
            {categoryList.map((category) => (
                <React.Fragment key={category.uid}>
                    <Menu.Item onPress={() => addCallback(category.uid)} title={category.icon+" "+category.name} />
                </React.Fragment>
            ))}
        </Menu>
    );
};

export default AddCategoryButton;