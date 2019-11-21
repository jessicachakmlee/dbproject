import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    Container,
    Navbar,
    NavbarBrand,
    Row,
    Col,
    Jumbotron,
    CardTitle,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';

const Title = styled.h1`
text-align: center;
`;

const App = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownCity, setdropdownCity] = useState('Vancouver');
    const [dropdownLocation, setdropdownLocation] = useState('1');
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);

    const getAllVehniclesFromCurrentBranch = (err, res) => {
        fetch(`/api/vehicle/${dropdownLocation}/${dropdownCity}/all`)
            .then(res => res.json())
            .then(res => {
                let vehicles = res.length === 0 ? res : res.map(obj => {
                    return JSON.stringify(obj);
                });
                setVehicles(vehicles);
            })
    };

    useEffect(() => {
        getAllVehniclesFromCurrentBranch();
    }, [dropdownCity, dropdownLocation]);

    return (
        <Container fluid className={'centered'}>
            <Navbar dark color={'dark'}>
                <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                    <DropdownToggle caret>
                        {'Location: ' + dropdownLocation}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setdropdownLocation('1')}>1</DropdownItem>
                        <DropdownItem onClick={() => setdropdownLocation('2')}>2</DropdownItem>
                        <DropdownItem onClick={() => setdropdownLocation('3')}>3</DropdownItem>
                        <DropdownItem onClick={() => setdropdownLocation('4')}>4</DropdownItem>
                        <DropdownItem onClick={() => setdropdownLocation('5')}>5</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {'City: ' + dropdownCity}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setdropdownCity('Burnaby')}>Burnaby</DropdownItem>
                        <DropdownItem onClick={() => setdropdownCity('Coquitlam')}>Coquitlam</DropdownItem>
                        <DropdownItem onClick={() => setdropdownCity('Richmond')}>Richmond</DropdownItem>
                        <DropdownItem onClick={() => setdropdownCity('Surrey')}>Surrey</DropdownItem>
                        <DropdownItem onClick={() => setdropdownCity('Vancouver')}>Vancouver</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Navbar>
            <Row>
                <Col>
                    <Jumbotron>
                        <Title className={'display-3'}>Car Rental</Title>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
