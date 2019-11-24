import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Table} from "reactstrap";

const Title = styled.h1`
`;

const OverlayWrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2001;
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 60px 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;

const OverlaySpan = styled.span`
    margin: 0px auto;
`;

const ContentDiv = styled.div`
    max-width: calc(90%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 60px 20px;
    transform: scale(1);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 50px);
    background: white;
    margin: 0px auto;
    padding: 40px;
    overflow: auto;
`;

const StyledXButtonLink = styled(Link)`
color: black;
font-weight: 800;
position: absolute;
z-index: 2002;
top: 0;
left: 10px;
`;

const TableBlurbs = styled.div`
font-weight: 800;
`;

const DataDisplayModal = props => {
    let placeholderArray = [];
    const sortedClerkReportData = () => props.location.state.clerkReportData.slice().sort(compareFunction).map(curr => {
        placeholderArray.push(curr.output);
    });
    const compareFunction = (a, b) => {
        if(a.order < b.order){
            return -1;
        } else if (a.order > b.order)
            return 1;
        else return 0;
    };
    useEffect(() => {
        if (props.location.state.clerkReportData) {
            sortedClerkReportData();
        }
    });
    if (props.location.state.dataDisplay) {
        const TableHeaders = Object.keys(props.location.state.dataDisplay[0]);
        return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>Close X</StyledXButtonLink>
                        <Table>
                            <thead>
                            <tr>
                                {TableHeaders.map(h => {
                                        return (
                                            <th>{h}</th>
                                        )
                                    }
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {props.location.state.dataDisplay.map(vo => {
                                const values = Object.values(vo);
                                return (
                                    <tr key={values[0] + '_' + values[1]}>
                                        {values.map(v => {
                                            return (
                                                <td>{v}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>

        )
    } else if (props.location.state.insertData) {
        return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>Close X</StyledXButtonLink>

                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>
        )
    } else if (props.location.state.clerkReportData) {
        console.log(placeholderArray);
        const dailyRentals = [`Vehicles RENTED OUT on ${props.location.state.reportDate}`,
            `# of vehicles rented per vehicleType`, `# of rentals at each branch`, `Total # of new rentals across company`];
        const dailyRentalsForBranch = [`Vehicles rented out on ${props.location.state.reportDate}`, `# of vehicles rented per vehicleType`,
            `Total # of rentals within branch`];
        const dailyReturns = [`Vehicles RETURNED ON ${props.location.state.reportDate}`, `# of vehicles RETURNS per vehicleType`,
            `# of RETURNS at each branch`, 'Total # of new returns across company'];
        const dailyReturnsForBranch = [`Vehicles RETURNED ON ${props.location.state.reportDate}`, `# of vehicles rented per vehicleType`];
        const tableSeparator = () => {
            switch (props.location.state.clerkReport) {
                case 'Daily Rentals':
                    return dailyRentals;
                case 'Daily Rentals for Branch':
                    return dailyRentalsForBranch;
                case 'Daily Returns':
                    return dailyReturns;
                case 'Daily Returns for Branch':
                    return dailyReturnsForBranch;
            }
        };
        let tableBlurbs = tableSeparator();
        return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>Close X</StyledXButtonLink>
                        <Title>{props.location.state.clerkReport + ' Query'}</Title>
                        <p>Date: {props.location.state.reportDate}</p>
                        {props.location.state.locationReport ?
                            <p>Branch
                                Location: {props.location.state.locationReport} in {props.location.state.cityReport}</p> : null
                        }
                        {/*{props.location.state.clerkReportData.map(*/}
                        {/*    (table, index) => {*/}
                        {/*        const isEmptyTable = table.length === 0;*/}
                        {/*        const tableHeaders = isEmptyTable ? [] : Object.keys(table[0]);*/}
                        {/*        return (*/}
                        {/*            <div>*/}
                        {/*                <TableBlurbs>{tableBlurbs[index]}</TableBlurbs>*/}
                        {/*                <Table>*/}
                        {/*                    <thead>*/}
                        {/*                    <tr>*/}
                        {/*                        {tableHeaders.map(header => {*/}
                        {/*                            return <th>{header}</th>*/}
                        {/*                        })}*/}
                        {/*                    </tr>*/}
                        {/*                    </thead>*/}
                        {/*                    <tbody>*/}
                        {/*                    {isEmptyTable ? 'No results found' : table.map((obj, index) => {*/}
                        {/*                        const values = Object.values(obj);*/}
                        {/*                        return (*/}
                        {/*                            <tr key={values[0] + index + values[1]}>*/}
                        {/*                                {values.map((v, index) => {*/}
                        {/*                                    return <td key={v + index}>{v}</td>*/}
                        {/*                                })}*/}
                        {/*                            </tr>*/}
                        {/*                        )*/}
                        {/*                    })}*/}
                        {/*                    </tbody>*/}
                        {/*                </Table>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    })}*/}
                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>
        );
    } else {
        return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>Close X</StyledXButtonLink>
                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>
        )
    }
};

export default DataDisplayModal;