import {StyleSheet, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const Demoo = () => {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderDropdownIcon={() => {
          return <View style={styles.dropdownIcon} />;
        }}
        defaultButtonText="Select a country"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownIcon: {
    width: 100,
    height: 0,
  },
});

export default Demoo;
