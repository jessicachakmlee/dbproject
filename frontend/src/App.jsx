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
    DropdownToggle,
    Button
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import {Link, Route, Switch} from "react-router-dom";
import MakeReservationModal from '../src/components/MakeReservationModal.jsx';

const Title = styled.h1`
text-align: center;
`;

const StylingForDropDown = styled.div`
display: flex;
justify-content: space-around;
`;

const Blurb = styled.p`
text-align: center;
`;

const StyledButton = styled.div`
margin-top: 25px;
text-align: center;

button {
margin-right: 10px;
}
`;

const StyledMakeAReservationButton = styled(Link)`
color: white;
:hover {
    color: white;
    text-decoration: none;
}
`;

const App = () => {
    const [dropdownCityOpen, setDropdownCityOpen] = useState(false);
    const [dropdownLocationOpen, setDropdownLocationOpen] = useState(false);
    const [dropdownCarTypeOpen, setDropdownCarTypeOpen] = useState(false);
    const [city, setCity] = useState('Vancouver');
    const [location, setLocation] = useState('one');
    const [vehiclesOutput, setVehiclesOutput] = useState([]);
    const [vehicleType, setVehicleType] = useState(null);
    const toggleCity = () => setDropdownCityOpen(!dropdownCityOpen);
    const toggleLocation = () => setDropdownLocationOpen(!dropdownLocationOpen);
    const toggleCarType = () => setDropdownCarTypeOpen(!dropdownCarTypeOpen);

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const cityDropdownItems = [
        'Burnaby', 'Coquitlam', 'Richmond', 'Surrey', 'Vancouver'
    ];

    const locationDropdownItems = [
        'One', 'Two', 'Three', 'Four', 'Five'
    ];

    const carTypeDropdownItems = [
        'Economy', 'Compact', 'Midsize', 'Standard', 'Full-size', 'SUV', 'Truck'
    ];

    const disableMakeReservation = city && location && vehicleType && startDate && startTime && endDate && endTime;

    const getAllVehniclesFromGivenData = (err, res) => {
        fetch(`/api/vehicleType/${city}/${location}/${vehicleType}/${startDate}/${startTime}/displayVehicleTypes`)
            .then(res => res.json())
            .then(res => {
                //TODO count number of results in res
                //TODO display details of each carType
                let vehiclesList = res.length === 0 ? res : res;
                setVehiclesOutput(vehiclesList);
            })
    };

    useEffect(() => {
        getAllVehniclesFromGivenData();
    }, []);

    return (
        <Container fluid className={'centered'}>
            <Navbar dark color={'dark'}>
                <Dropdown isOpen={dropdownCityOpen} toggle={toggleCity}>
                    <DropdownToggle caret>
                        {'City: ' + city}
                    </DropdownToggle>
                    <DropdownMenu>
                        {cityDropdownItems.map(str => {
                            return <DropdownItem key={str + '_cityDropDown'} onClick={() => setCity(str)}>{str}</DropdownItem>
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
                        <Blurb>Select at least one of the following options to view available vehicles.</Blurb>
                        <StylingForDropDown>
                            <Dropdown isOpen={dropdownCarTypeOpen} toggle={toggleCarType}>
                                <DropdownToggle caret>
                                    {vehicleType ? 'Vehicle Type: ' + vehicleType : 'Vehicle Type : Select One'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {carTypeDropdownItems.map(str => {
                                        return <DropdownItem key={str + '_vehicleDropDown'} onClick={() => setVehicleType(str)}>{str}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown isOpen={dropdownLocationOpen} toggle={toggleLocation}>
                                <DropdownToggle caret>
                                    {'Location: ' + location}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {locationDropdownItems.map(str => {
                                        return <DropdownItem key={str + '_locationDropDown'} onClick={() => setLocation(str)}>{str}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <TextField
                            id="date"
                            label="From Date"
                            type="date"
                            defaultValue={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                            <TextField
                                id="time"
                                label="From Time"
                                type="time"
                                defaultValue={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                id="date"
                                label="To Date"
                                type="date"
                                defaultValue={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="time"
                                label="To Time"
                                type="time"
                                defaultValue={startTime}
                                onChange={e => setEndTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </StylingForDropDown>
                        <StyledButton>
                        <Button color={'primary'} onClick={() => getAllVehniclesFromGivenData()}>Get Vehicles</Button>
                            <Button color={!disableMakeReservation ? 'secondary' :'danger'} disabled={!disableMakeReservation}>
                                <StyledMakeAReservationButton onClick={() => !disableMakeReservation ? alert('Please input information first to see if there are available vehicles before making a reservation.') : null} to={{pathname: !disableMakeReservation ? '/' : '/makeReservation', state: { isModal: true, city: city, vehicleType: vehicleType, location: location,
                                        fromDate: startDate, fromTime: startTime, toDate: endDate, toTime: endTime}
                                }}>Make a Reservation</StyledMakeAReservationButton>
                            </Button>
                        </StyledButton>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                {JSON.stringify(vehiclesOutput)}
            </Row>
            <Switch>
                <Route exact path="/makeReservation" component={props =>
                    <MakeReservationModal
                        {...props}
                    />}/>
            </Switch>
        </Container>
    );
}

export default App;
