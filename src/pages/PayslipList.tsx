import React from "react";
import styled from "styled-components";
import { payslips } from "../utils/mockData";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PayslipListItem from "../components/PayslipListItem";

const ListContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
`;

const PayslipList: React.FC = () => {
  return (
    <ListContainer>
      <TransitionGroup>
        {payslips.map((payslip) => (
          <CSSTransition key={payslip.id} timeout={500} classNames="item">
            <PayslipListItem payslip={payslip} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListContainer>
  );
};

export default PayslipList;
