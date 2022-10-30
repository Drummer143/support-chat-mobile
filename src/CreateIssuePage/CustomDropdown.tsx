import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';

type TopicItem = {
    label: string;
    value: number;
};
type Props = {
    placeholder: string;
    data: TopicItem[];

    disabled?: boolean;

    onChange: Function;
};

const CustomDropdown = ({ placeholder, data, onChange, disabled = false }: Props) => {
    return (
        <Dropdown
            style={styles.dropdown}
            itemTextStyle={styles.itemText}
            inputSearchStyle={styles.inputSearch}
            placeholderStyle={styles.placeholder}
            containerStyle={styles.container}
            data={data}
            labelField="label"
            valueField="value"
            onChange={e => onChange(e.value)}
            maxHeight={250}
            placeholder={placeholder}
            searchPlaceholder="Поиск темы..."
            search
            disable={disabled}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: '80%',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        marginTop: 25
    },
    itemText: {
        color: '#fff',
        backgroundColor: '#111',
        padding: 10,
        borderRadius: 5
    },
    inputSearch: {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 5,
        borderColor: '#666'
    },
    placeholder: {
        opacity: 0.6
    },
    container: {
        backgroundColor: '#222',
        color: '#fff',
        borderColor: '#777',
        borderRadius: 5
    }
});

export default CustomDropdown;
