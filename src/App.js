import styled from "styled-components";
import Header from "./components/Header";
import TransactionComponents from "./components/TransactionComponent";
import OverviewComponents from "./components/OverviewComponents";
import { useState, useEffect } from "react";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 360px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App(props) {
  const [transactions, updateTranscation] = useState([]);
  const [expense, updateExpense] = useState([0]);
  const [income, updateIncome] = useState([0]);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTranscation(transactionArray);
  };
  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) =>
      payload.Type === "Expense"
        ? (exp = exp + payload.Amount)
        : (inc = inc + payload.Amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };
  useEffect(() => calculateBalance(), [transactions]);
  return (
    <Container>
      <HomeContainer>
        <Header />
        <OverviewComponents
          addTransaction={addTransaction}
          expense={expense}
          income={income}
        />
        <TransactionComponents transactions={transactions} />
      </HomeContainer>
    </Container>
  );
}

export default App;
