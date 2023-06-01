import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 100%;
`;

const BalanceComponent = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const AddTransaction = styled.div`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  gap: 10px;
  padding: 15px 20px;
  margin: 15px 20px;
  width: 100%;
  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const Radio = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;
  & span {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => (props.isIncome ? "green" : "red")};
  }
`;

const AddTransactionView = (props) => {
  const [Amount, setAmount] = useState();
  const [Description, setDescription] = useState();
  const [Type, setType] = useState("Expense");

  const addTransaction = () => {
    props.addTransaction({
      Amount: Number(Amount),
      Description,
      Type,
      id: Date.now(),
    });
    props.toggle();
  };

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={Amount}
        type="number"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <input
        placeholder="Description"
        value={Description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Radio>
        <input
          type="radio"
          id="expense"
          name="type"
          value="Expense"
          checked={Type === "Expense"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="Income"
          checked={Type === "Income"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="Expense">Income</label>
      </Radio>
      <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
  );
};

const OverviewComponents = (props) => {
  const [isAddTranVisible, toggleAddTran] = useState(false);
  return (
    <Container>
      <BalanceComponent>
        Balance :${props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTran(!isAddTranVisible)}>
          {isAddTranVisible ? "Cancel" : "Add"}
        </AddTransaction>
        {isAddTranVisible && (
          <AddTransactionView
            toggle={toggleAddTran}
            addTransaction={props.addTransaction}
          />
        )}
      </BalanceComponent>
      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense<span>${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverviewComponents;
