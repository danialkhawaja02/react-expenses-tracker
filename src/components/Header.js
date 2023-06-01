import styled from "styled-components";

const HeaderStyled = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

function Header() {
  return <HeaderStyled>Expense Tracker App</HeaderStyled>;
}

export default Header;
