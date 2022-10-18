import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';

type TopicItem = {
    label: string
    value: number
}
type Props = {
    placeholder: string
    data: TopicItem[]

    disabled?: boolean

    onChange: Function
}

const CustomDropdown = ({ placeholder, data, onChange, disabled = false }: Props) => {
    return (
        <Dropdown
            style={styles.dropdown}
            itemTextStyle={styles.dropdownItem}
            inputSearchStyle={styles.dropdownSearchInput}
            placeholderStyle={styles.dropdownPlaceholder}
            containerStyle={styles.dropdownItemContainer}
            data={data}
            labelField='label'
            valueField='value'
            onChange={e => onChange(e.value)}
            maxHeight={250}
            placeholder={placeholder}
            searchPlaceholder='Поиск темы...'
            search
            disable={disabled}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        width: '80%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginTop: 25
    },
    dropdownItem: {
        color: '#fff',
        backgroundColor: '#111',
        padding: 10,
        borderRadius: 5
    },
    dropdownSearchInput: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 5,
        borderColor: '#666'
    },
    dropdownPlaceholder: {
        opacity: 0.6
    },
    dropdownItemContainer: {
        backgroundColor: '#222',
        color: '#fff',
        borderColor: '#777',
        borderRadius: 5
    },
})

export default CustomDropdown;