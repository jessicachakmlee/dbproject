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
    Table, Label, Input, FormGroup,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import {Link, Route, Switch} from "react-router-dom";
import MakeReservationModal from '../src/components/MakeReservationModal.jsx';
import DataDisplayModal from "./components/DataDisplayModal";
import MakeRentalModal from "./components/MakeRentalModal";

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
justify-content: center;
margin-top: 30px;

div {
button {
    background: white;
    color: black;
    margin-right: 10px;
}
}
`;

const ClerkStyling = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ClerkStyling1 = styled.div`
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    
`;

const StylingForRetrieveReservation = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 50px;
div {
    input {
        width: 300px;
    }
}
`;

const Separator = styled.div`
text-align: center;
font-weight: 800;
margin-bottom: 50px;
`;

const App = () => {
    const getCurrentDate = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    const [dropdownCityOpen, setDropdownCityOpen] = useState(false);
    const [dropdownLocationOpen, setDropdownLocationOpen] = useState(false);
    const [dropdownCarTypeOpen, setDropdownCarTypeOpen] = useState(false);
    const [dropdownTableOpen, setDropdownTableOpen] = useState(false);
    const [dropdownClerkReportOpen, setDropdownClerkReportOpen] = useState(false);

    const [city, setCity] = useState('Vancouver');
    const [location, setLocation] = useState('1278 Granville St');
    const [vehiclesOutput, setVehiclesOutput] = useState([]);
    const [vehiclesNum, setVehiclesNum] = useState(0);
    const [vehicleType, setVehicleType] = useState(null);

    const toggleCity = () => setDropdownCityOpen(!dropdownCityOpen);
    const toggleLocation = () => setDropdownLocationOpen(!dropdownLocationOpen);
    const toggleCarType = () => setDropdownCarTypeOpen(!dropdownCarTypeOpen);
    const toggleTable = () => setDropdownTableOpen(!dropdownTableOpen);
    const toggleReport = () => setDropdownClerkReportOpen(!dropdownClerkReportOpen);
    const toggleModal = () => setResTempModalOpen(!resTempModalOpen);

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [table, setTable] = useState('reservation');
    const [tableOutput, setTableOutput] = useState(null);
    const [clerkReport, setClerkReport] = useState('Daily Rentals');
    const [clerkReportOutput, setClerkReportOutput] = useState([]);
    const [reportDate, setReportDate] = useState(getCurrentDate());
    const [locationReport, setLocationReport] = useState('');
    const [cityReport, setCityReport] = useState('');
    const [isRunQuery, setIsRunQuery] = useState(true);
    const [isVehicleAvailable, setIsVehicleAvailable] = useState(false);
    const [reservationConfNo, setReservationConfNo] = useState('');
    const [reservationOutput, setReservationOutput] = useState([]);
    const [resTempModalOpen, setResTempModalOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

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

    const reportDropdownItems = [
        'Daily Rentals', 'Daily Rentals for Branch', 'Daily Returns', 'Daily Returns for Branch'
    ];

    const disableMakeReservation = city && location && vehicleType && startDate && startTime && endDate && endTime && isVehicleAvailable;

    const getAllVehiclesFromGivenData = (isCount) => {
        const endpointString = `/api/vehicle/${isCount}/options?`;
        const cit = city === 'All' ? '' : `city=${city}&`;
        const loc = location === 'All' || location === '' ? '' : `location=${location}&`;
        const vt = vehicleType === 'All' || vehicleType === '' || vehicleType === null ? '' : `vehicleType=${vehicleType}&`;
        const sd = startDate === null ? '' : `startDate=${startDate}&`;
        const st = startTime === null ? '' : `startTime=${startTime}&`;
        const ed = endDate === null ? '' : `toDate=${endDate}&`;
        const et = endTime === null ? '' : `toTime=${endTime}&`;

        const finalQuery = endpointString.concat(cit).concat(loc).concat(vt).concat(sd).concat(st).concat(ed).concat(et).slice(0, -1);

        fetch(finalQuery)
            .then(res => res.json())
            .then(res => {
                setShowSpinner(false);
                if (res.error === 'Database error.') {
                    alert('Responded with Database error.There is an issue with this search. Please try again.');
                } else {
                    if (res.length === 0 || res[0].count === '0') {
                        setVehiclesNum(0);
                        alert(' There are no available vehicles with the given search parameters.' +
                            'Please adjust the parameters and try again');
                    } else if (res[0].count) {
                        setVehiclesNum(res[0].count);
                        setVehiclesOutput([]);
                    } else {
                        setVehiclesOutput(res);
                        setVehiclesNum(res.length);
                    }
                }
            });

    };

    const endPointForTables = () => {
        switch (table) {
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

    const dailyRentalsEndpoints = [
        `/api/rent/report/${reportDate}`,
        `/api/rent/report/sum_type/${reportDate}`,
        `/api/rent/report/sum_branch/${reportDate}`,
        `/api/rent/report/sum/${reportDate}`
    ];

    const dailyRentalsForBranchEndpoints = [
        `/api/rent/branch_report/${locationReport}/${cityReport}/${reportDate}`,
        `/api/rent/branch_report/sum_type/${locationReport}/${cityReport}/${reportDate}`,
        `/api/rent/branch_report/sum/${locationReport}/${cityReport}/${reportDate}`,
    ];

    const dailyReturnsEndpoints = [
        `/api/return/report/vehicle/${reportDate}`,
        `/api/return/report/sum_type/${reportDate}`,
        `/api/return/report/sum_branch/${reportDate}`,
        `/api/return/report/sum/${reportDate}`,
    ];

    const dailyReturnsForBranchEndpoints = [
        `/api/return/branch_report/${locationReport}/${cityReport}/${reportDate}`,
        `/api/return/branch_report/sum_type/${locationReport}/${cityReport}/${reportDate}`,
    ];

    const reportEndpoints = () => {
        switch (clerkReport) {
            case reportDropdownItems[0]:
                return reportDate ? dailyRentalsEndpoints : null;
            case reportDropdownItems[1]:
                return locationReport && cityReport && reportDate ? dailyRentalsForBranchEndpoints : null;
            case reportDropdownItems[2]:
                return reportDate ? dailyReturnsEndpoints : null;
            case reportDropdownItems[3]:
                return locationReport && cityReport && reportDate ? dailyReturnsForBranchEndpoints : null;
            default:
                return;
        }
    };

    const displayTablesInDatabase = (err, res) => {
        const endpoint = endPointForTables();
        fetch(endpoint).then(res => res.json()).then(res => setTableOutput(res));
    };

    const displayClerkQueries = () => {
        const reportEP = reportEndpoints();
        if (reportEP !== null) {
            setIsRunQuery(false);
            reportEP.map((ep, index) => {
                fetch(ep).then(res => res.json()).then(res => {
                    clerkReportOutput.push({order: index, output: res});
                });
            });
        } else {
            alert('Please input the proper parameters before running the query');
        }
    };

    const retrieveReservation = () => {
        if (reservationConfNo === '') {
            alert('Please input your reservation confirmation number.');
        } else {
            fetch(`/api/reservation/${reservationConfNo}`).then(res => res.json()).then(res => {
                if (res.error === 'Database error.') {
                    alert('Responded with Database error.There is an issue with this search. Please try again.');
                } else {
                    setReservationOutput(res);
                    console.log(reservationOutput);
                    setResTempModalOpen(true);
                }
            })
        }
    };

    useEffect(() => {
        getAllVehiclesFromGivenData(true);
    }, []);

    useEffect(() => {
        displayTablesInDatabase();
    }, [table]);

    useEffect(() => {
        setIsRunQuery(true);
        setClerkReportOutput([]);
    }, [clerkReport, reportDate, locationReport, cityReport]);

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
                                    {table ? 'Table: ' + table : 'Table: select one'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {tableDropdownItems.map(str => {
                                        return <DropdownItem key={str + '_tableDropDown'}
                                                             onClick={() => setTable(str)}>{str}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <Button color={'info'}>
                                <StyledModalButton to={{
                                    pathname: '/displayData', state: {
                                        isModal: true, dataDisplayTable: table, dataDisplay: tableOutput
                                    }
                                }}>
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
                        <Title>Clerk Reports</Title>
                        <div>
                            <Blurb>Generate a report for:</Blurb>
                            <ClerkStyling>
                                <Dropdown isOpen={dropdownClerkReportOpen} toggle={toggleReport}>
                                    <DropdownToggle caret>
                                        {clerkReport ? 'Report: ' + clerkReport : 'Report: select one'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {reportDropdownItems.map(str => {
                                            return <DropdownItem key={str + '_clerkDropDown'}
                                                                 onClick={() => setClerkReport(str)}>{str}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                                <TextField
                                    id="reportdate"
                                    label="Report Date"
                                    type="date"
                                    defaultValue={reportDate}
                                    onChange={e => setReportDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ClerkStyling>
                            <ClerkStyling1>
                                <FormGroup>
                                    <Label for="locationReport">Report Location</Label>
                                    <Input type="locationReport" name="locationReport" id="locationReport"
                                           value={locationReport} onChange={e => setLocationReport(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cityReport">Report City</Label>
                                    <Input type="cityReport" name="cityReport" id="cityReport"
                                           value={cityReport} onChange={e => setCityReport(e.target.value)}/>
                                </FormGroup>
                            </ClerkStyling1>
                            <div>
                                {isRunQuery ?
                                    <Button color={'primary'} onClick={() => {
                                        displayClerkQueries()

                                    }}>Run Query</Button>
                                    :
                                    <Button color={'info'}>
                                        <StyledModalButton to={{
                                            pathname: '/displayData', state: {
                                                isModal: true,
                                                clerkReport: clerkReport,
                                                clerkReportData: clerkReportOutput,
                                                locationReport: locationReport,
                                                cityReport: cityReport,
                                                reportDate: reportDate
                                            }
                                        }}>
                                            Display Query
                                        </StyledModalButton>
                                    </Button>
                                }
                            </div>
                        </div>
                    </Jumbotron>
                </Col>
                <Col>
                    <Jumbotron>
                        <Title>Returns</Title>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron>
                        <Title>Reservations & Rentals</Title>
                        <Blurb>Retrieve your reservation and/or select at least one of the following options to view available vehicles.</Blurb>
                        <StylingForRetrieveReservation>
                            <FormGroup>
                                <Label for="reservationConfNo">Reservation Confirmation Number</Label>
                                <Input type="reservationConfNo" name="reservationConfNo" id="reservationConfNo"
                                       value={reservationConfNo} onChange={e => setReservationConfNo(e.target.value)}/>
                            </FormGroup>
                            <Button color={'primary'} onClick={() => retrieveReservation()}>Retrieve Reservation</Button>
                            <Modal
                                isOpen={resTempModalOpen}
                                toggle={toggleModal}
                            >
                                {reservationOutput && reservationOutput.length  === 0 ?
                                    <div>
                                        <ModalHeader toggle={toggleModal}>No Reservation Found</ModalHeader>
                                        <ModalBody>You can make a reservation or a rental below the reservation retrieval area by
                                            selecting at least one of the following options to view available vehicles.</ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={toggleModal}>Go Back</Button>
                                        </ModalFooter>
                                    </div>
                                    :
                                    <div>
                                        <ModalHeader toggle={toggleModal}>Reservation Found</ModalHeader>
                                        <ModalBody>You can make a rental with this reservation.</ModalBody>
                                        <ModalFooter>
                                            <Button color={'danger'} onClick={toggleModal}>
                                            <StyledModalButton
                                                to={{
                                                    pathname: '/makeRental', state: {
                                                        isModal: true, reservationObj: reservationOutput[0]
                                                    }
                                                }}>Make Rental</StyledModalButton>
                                            </Button>
                                            <Button color="primary" onClick={toggleModal}>Go Back</Button>
                                        </ModalFooter>
                                    </div>
                                }
                            </Modal>
                        </StylingForRetrieveReservation>
                        <Separator>
                            <h2>OR</h2>
                        </Separator>
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
                                id="Fromdate"
                                label="From Date"
                                type="date"
                                defaultValue={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="Fromtime"
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
                                id="enDdate"
                                label="To Date"
                                type="date"
                                defaultValue={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="Totime"
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
                            <Button outline color={'primary'} onClick={() => {
                                getAllVehiclesFromGivenData(true);
                                setIsVehicleAvailable(true);
                                setShowSpinner(true);
                                }}>Search for Vehicles</Button>
                            <Button color={!disableMakeReservation ? 'secondary' : 'danger'}
                                    disabled={!disableMakeReservation} >
                                <StyledModalButton
                                    onClick={() => !disableMakeReservation ? alert('Please first search to see if there are available vehicles before making a reservation.' +
                                        ' After searching, You may make a reservation by filling in all of the form.') : null}
                                    to={{
                                        pathname: !disableMakeReservation ? '/' : '/makeReservation', state: {
                                            isModal: true, city: city, vehicleType: vehicleType, location: location,
                                            fromDate: startDate, fromTime: startTime, toDate: endDate, toTime: endTime
                                        }
                                    }}>Make a Reservation</StyledModalButton>
                            </Button>
                            <Button color={!disableMakeReservation ? 'secondary' : 'danger'} disabled={!disableMakeReservation}>
                                <StyledModalButton
                                    onClick={() => !disableMakeReservation ? alert('Please first search to see if there are available vehicles before making a rental.' +
                                        ' After searching, You may make a rental by filling in all of the form.') : null}
                                    to={{
                                        pathname: !disableMakeReservation ? '/' : '/makeRental', state: {
                                            isModal: true, reservationObj: {city: city, vehicleType: vehicleType, location: location,
                                                fromdate: startDate, fromtime: startTime, todate: endDate, totime: endTime}
                                        }
                                    }}>Make a Rental</StyledModalButton>
                            </Button>
                        </StyledButton>
                    </Jumbotron>
                </Col>
            </Row>
            <CenteredRow noGutters>
                <ListGroup>
                    <ListGroupItem>Number of Available Vehicles according to search
                        parameters: {vehiclesNum}</ListGroupItem>
                    <Button color={'primary'} onClick={() => getAllVehiclesFromGivenData(false)}>Get Vehicle
                        Details</Button>
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
                            <td>{vo.location}</td>
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
                <Route exact path="/makeRental" component={props => <MakeRentalModal {...props}/>}/>
            </Switch>
        </Container>
    );
};

export default App
