import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

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
    max-height: calc(100vh - 50px);
    background: white;
    margin: 0px auto;
    padding: 40px;
    overflow: auto;
`;

const StyledXButtonLink = styled(Link)``;

const DataDisplayModal = props => {
    return (
        <OverlayWrapper>
            <OverlaySpan>
                <StyledXButtonLink to={'/'}>X</StyledXButtonLink>
                <ContentDiv>
                    {JSON.stringify(props.location.state.dataDisplay)}
                </ContentDiv>
            </OverlaySpan>
        </OverlayWrapper>

    )
}

export default DataDisplayModal;