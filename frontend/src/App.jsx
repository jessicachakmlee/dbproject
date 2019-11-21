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

const StylingForDropDown = styled.div`
display: flex;
justify-content: space-around;
`;

const Blurb = styled.p`
text-align: center`
;

const App = () => {
    const [dropdownCityOpen, setDropdownCityOpen] = useState(false);
    const [dropdownLocationOpen, setDropdownLocationOpen] = useState(false);
    const [dropdownCarTypeOpen, setDropdownCarTypeOpen] = useState(false);
    const [dropdownCity, setdropdownCity] = useState('Vancouver');
    const [location, setLocation] = useState('one');
    const [vehicles, setVehicles] = useState([]);
    const [carType, setCarType] = useState(null);
    const toggleCity = () => setDropdownCityOpen(!dropdownCityOpen);
    const toggleLocation = () => setDropdownLocationOpen(!dropdownLocationOpen);
    const toggleCarType = () => setDropdownCarTypeOpen(!dropdownCarTypeOpen);


    const cityDropdownItems = [
        'Burnaby', 'Coquitlam', 'Richmond', 'Surrey', 'Vancouver'
    ];

    const locationDropdownItems = [
        'One', 'Two', 'Three', 'Four', 'Five'
    ];

    const carTypeDropdownItems = [
        'compact', 'SUV'
    ]

    const getAllVehniclesFromCurrentBranch = (err, res) => {
        fetch(`/api/vehicle/${location}/${dropdownCity}/all`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let vehicles = res.length === 0 ? res : res;
                setVehicles(vehicles);
            })
    };

    useEffect(() => {
        getAllVehniclesFromCurrentBranch();
    }, [dropdownCity, location]);

    return (
        <Container fluid className={'centered'}>
            <Navbar dark color={'dark'}>
                <Dropdown isOpen={dropdownCityOpen} toggle={toggleCity}>
                    <DropdownToggle caret>
                        {'City: ' + dropdownCity}
                    </DropdownToggle>
                    <DropdownMenu>
                        {cityDropdownItems.map(str => {
                            return <DropdownItem onClick={() => setdropdownCity(str)}>{str}</DropdownItem>
                        })}
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
            <Row>
                <Col>
                    <Jumbotron>
                        <Title>View Vehicles</Title>
                        <Blurb>Select the following options to view available vehicles</Blurb>
                        <StylingForDropDown>
                        <Dropdown isOpen={dropdownCarTypeOpen} toggle={toggleCarType}>
                            <DropdownToggle caret>
                                {carType ? 'Car Type: ' + carType : 'CarType : Select One'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {carTypeDropdownItems.map(str => {
                                   return <DropdownItem onClick={() => setCarType(str)}>{str}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown isOpen={dropdownLocationOpen} toggle={toggleLocation}>
                            <DropdownToggle caret>
                                {'Location: ' + location}
                            </DropdownToggle>
                            <DropdownMenu>
                                {locationDropdownItems.map(str => {
                                    return <DropdownItem onClick={() => setLocation(str)}>{str}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        </StylingForDropDown>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                {JSON.stringify(vehicles)}
            </Row>
        </Container>
    );
}

export default App;
