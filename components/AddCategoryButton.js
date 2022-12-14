import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Menu, Button, Text } from 'react-native-paper';
import { debounce } from 'lodash';

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
            anchor={<Button style={{marginTop: "2%"}} icon="plus" mode="outlined" onPress={() => openMenu()}>
                Add Category
            </Button>}>
            <Menu.Item leadingIcon="plus" onPress={debounce(() => {closeMenu(); navigation.push("Create Category")},300)} title="Create new category         " />
            <Divider bold />
            {categoryList.map((category) => (
                <React.Fragment key={category.uid}>
                    <Menu.Item onPress={() => addCategory(category)} title={category.icon+" "+category.name} />
                </React.Fragment>
            ))}
        </Menu>
    );
};

export default AddCategoryButton;