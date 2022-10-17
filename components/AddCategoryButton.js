import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Menu, Button, Text } from 'react-native-paper';

const AddCategoryButton = (props) => {
    const { addCallback, categoryList, navigation} = props;
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const addCategory = (uid) => {
        closeMenu();
        addCallback(uid);
    }

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button icon="plus" mode="outlined" onPress={() => openMenu()}>
                Add Category
            </Button>}>
            <Menu.Item leadingIcon="plus" onPress={() => {closeMenu(); navigation.push("Create Category")}} title="Create new Category         " />
            <Divider bold />
            {categoryList.map((category) => (
                <React.Fragment key={category.uid}>
                    <Menu.Item onPress={() => addCategory(category.uid)} title={category.icon+" "+category.name} />
                </React.Fragment>
            ))}
        </Menu>
    );
};

export default AddCategoryButton;