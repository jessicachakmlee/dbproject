import React from 'react';
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';

export interface DropdownComponentProps {
    dropdownLabel: string;
    dropdownBoxValue: string;
    dropdownItems: [];
    isOpen: () => any;
    toggle: () => any;
    onClick: (value) => any;
}

export const DropDownComponent: React.FC<DropdownComponentProps> = ({dropdownLabel, dropdownBoxValue, dropdownItems, isOpen, toggle, onClick}) => {
    return (
        <Dropdown isOpen={dropdownCityOpen} toggle={toggleCity}>
            <DropdownToggle caret>
                { dropdownLabel +': '+ dropdownCity}
            </DropdownToggle>
            <DropdownMenu>
                {dropdownItems.map( str => {
                    return <DropdownItem onClick={onClick(str)}>{str}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
    )
};