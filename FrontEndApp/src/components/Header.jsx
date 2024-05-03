/*eslint-disable react/prop-types*/

import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: lightgray;
    height: 100px;
    font-size: large;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    justify-content: end;
    padding-right: 20px;
`;

function Header({ children }) {
    return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
