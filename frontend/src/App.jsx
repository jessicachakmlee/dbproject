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
    Button,
    ListGroup,
    ListGroupItem,
    Table
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import {Link, Route, Switch} from "react-router-dom";
import MakeReservationModal from '../src/components/MakeReservationModal.jsx';
import DataDisplayModal from "./components/DataDisplayModal";

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

const StyledModalButton = styled(Link)`
color: white;
:hover {
    color: white;
    text-decoration: none;
}
`;

const CenteredRow = styled(Row)`
justify-content: center;
margin-bottom: 30px;
`;

const StylingButtonsAndDropdown = styled.div`
display: flex;
justify-items: space-between;
`;

const App = () => {
    const [dropdownCityOpen, setDropdownCityOpen] = useState(false);
    const [dropdownLocationOpen, setDropdownLocationOpen] = useState(false);
    const [dropdownCarTypeOpen, setDropdownCarTypeOpen] = useState(false);
    const [dropdownTableOpen, setDropdownTableOpen] = useState(false);
    const [city, setCity] = useState('Vancouver');
    const [location, setLocation] = useState('1278 Granville St');
    const [vehiclesOutput, setVehiclesOutput] = useState([]);
    const [vehicleType, setVehicleType] = useState(null);
    const toggleCity = () => setDropdownCityOpen(!dropdownCityOpen);
    const toggleLocation = () => setDropdownLocationOpen(!dropdownLocationOpen);
    const toggleCarType = () => setDropdownCarTypeOpen(!dropdownCarTypeOpen);
    const toggleTable = () => setDropdownTableOpen(!dropdownTableOpen);

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [table, setTable] = useState('reservation');
    const [tableOutput, setTableOutput] = useState(null);

    const cityDropdownItems = [
        'Boston Bar', 'Haney', 'Oliver', 'Surrey', 'Vancouver', 'All'
    ];

    const locationDropdownItems = [
        '1001 96 Ave', '4190 Kinchant St', '1278 Granville St', '1131 Haaglund Rd', '258 Mesa Vista Drive',
        'asdfStreet', '280 Semiahmoo Drive', 'All', ''
    ];

    const carTypeDropdownItems = [
        'economy', 'compact', 'midsize', 'standard', 'full-size', 'suv', 'truck', 'All', ''
    ];

    const tableDropdownItems = [
        'reservation', 'rental', 'vehicle', 'vehicleType', 'customer', 'return', 'all tables'
    ];

    const disableMakeReservation = city && location && vehicleType && startDate && startTime && endDate && endTime;

    const getAllVehiclesFromGivenData = (err, res) => {
        const endpointString = `/api/vehicle/options?`;
        const cit = city === 'All' ? '' : `city=${city}&`;
        const loc = location === 'All' || location === '' ? '' : `location=${location}&`;
        const vt = vehicleType === 'All' || vehicleType === '' || vehicleType === null ? '' : `vehicleType=${vehicleType}&`;
        const sd = startDate === null ? '' : `startDate=${startDate}&`;
        const st = startTime === null ? '' : `startTime=${startTime}&`;
        const ed = endDate === null ? '' : `toDate=${endDate}&`;
        const et = endTime === null ? '' : `toTime=${endTime}&`;

        const finalQuery = endpointString.concat(cit).concat(loc).concat(vt).concat(sd).concat(st).concat(ed).concat(et).slice(0, -1);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        fetch(finalQuery, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(res => {
                if (res.error === 'Database error.') {
                    alert('Responded with Database error.There is an issue with this search. Please try again.');
                } else {
                    if (res.length === 0) {
                        alert(' There are no available vehicles with the given search parameters.' +
                            'Please adjust the parameters and try again');
                    }
                    setVehiclesOutput(res);
                }
            })
    };

    const endPointForTables = () => {
        switch(table) {
            case'reservation':
                return '/api/reservation';
            case 'rental':
                return '/api/rent/all';
            case 'vehicle':
                return '/api/vehicle/all';
            case 'vehicleType':
                return '/api/vehicleType';
            case 'customer':
                return '/api/customer';
            case 'return':
                return '/api/return/all';
            case 'all tables':
                return '/api/databaseManipulations/allTables';
            default:
                return;
        }
    };

    const displayTablesInDatabase = (err, res) => {
        const endpoint = endPointForTables();
        fetch(endpoint).then(res => res.json()).then(res => setTableOutput(res));
    };

    useEffect(() => {
        getAllVehiclesFromGivenData();
    }, []);

    useEffect(() => {
        displayTablesInDatabase();
    }, [table]);

    return (
        <Container fluid className={'centered'}>
            <Navbar dark color={'dark'}>
                <Dropdown isOpen={dropdownCityOpen} toggle={toggleCity}>
                    <DropdownToggle caret>
                        {'City: ' + city}
                    </DropdownToggle>
                    <DropdownMenu>
                        {cityDropdownItems.map(str => {
                            return <DropdownItem key={str + '_cityDropDown'}
                                                 onClick={() => setCity(str)}>{str}</DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown>
            </Navbar>
            <Row>
                <Col>
                    <Jumbotron>
                        <Title className={'display-3'}>Car Rental</Title>
                        <StylingButtonsAndDropdown>
                        <Dropdown isOpen={dropdownTableOpen} toggle={toggleTable}>
                            <DropdownToggle caret>
                                { table ? 'Table: ' + table : 'Table: select one'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {tableDropdownItems.map(str => {
                                    return <DropdownItem key={str + '_tableDropDown'}
                                                         onClick={() => setTable(str)}>{str}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color={'info'}>
                            <StyledModalButton to={{pathname: '/displayData', state: {
                                    isModal: true, dataDisplay: tableOutput
                                }}}>
                                Display Table
                            </StyledModalButton>
                        </Button>
                        </StylingButtonsAndDropdown>
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
                                        return <DropdownItem key={str + '_vehicleDropDown'}
                                                             onClick={() => setVehicleType(str)}>{str}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown isOpen={dropdownLocationOpen} toggle={toggleLocation}>
                                <DropdownToggle caret>
                                    {'Location: ' + location}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {locationDropdownItems.map(str => {
                                        return <DropdownItem key={str + '_locationDropDown'}
                                                             onClick={() => setLocation(str)}>{str}</DropdownItem>
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
                            <Button color={'primary'} onClick={() => getAllVehiclesFromGivenData()}>Get
                                Vehicles</Button>
                            <Button color={!disableMakeReservation ? 'secondary' : 'danger'}
                                    disabled={!disableMakeReservation}>
                                <StyledModalButton
                                    onClick={() => !disableMakeReservation ? alert('Please input information first to see if there are available vehicles before making a reservation.') : null}
                                    to={{
                                        pathname: !disableMakeReservation ? '/' : '/makeReservation', state: {
                                            isModal: true, city: city, vehicleType: vehicleType, location: location,
                                            fromDate: startDate, fromTime: startTime, toDate: endDate, toTime: endTime
                                        }
                                    }}>Make a Reservation</StyledModalButton>
                            </Button>
                        </StyledButton>
                    </Jumbotron>
                </Col>
            </Row>
            <CenteredRow noGutters>
                <ListGroup>
                    <ListGroupItem>Number of Available Vehicles according to search
                        parameters: {vehiclesOutput.length}</ListGroupItem>
                </ListGroup>
            </CenteredRow>
            <Table>
                <thead>
                <tr>
                    <th>City</th>
                    <th>Location</th>
                    <th>VehicleType</th>
                    <th>Vlicense</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Odometer</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {vehiclesOutput.map(vo => {
                    return (
                        <tr key={vo.vlicense + '_' + vo.vlicense}>
                            <td>{vo.city}</td>
                            <td >{vo.location}</td>
                            <td>{vo.vtname}</td>
                            <td>{vo.vlicense}</td>
                            <td>{vo.make}</td>
                            <td>{vo.model}</td>
                            <td>{vo.year}</td>
                            <td>{vo.odometer}</td>
                            <td>{vo.status}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <Switch>
                <Route exact path="/makeReservation" component={props => <MakeReservationModal {...props}/>}/>
                <Route exact path="/displayData" component={props => <DataDisplayModal {...props}/>}/>
            </Switch>
        </Container>
    );
};

export default App;
