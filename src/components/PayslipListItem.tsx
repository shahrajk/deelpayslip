import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Payslip } from "../types/Payslip";

const ListItem = styled.div`
  padding: 16px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const ListItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ListItemText = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface PayslipListItemProps {
  payslip: Payslip;
}

const PayslipListItem: React.FC<PayslipListItemProps> = ({ payslip }) => {
  return (
    <ListItem>
      <ListItemLink to={`/payslip/${payslip.id}`}>
        <ListItemText>
          <span>
            {payslip.fromDate} - {payslip.toDate}
          </span>
          <span>View Payslip</span>
        </ListItemText>
      </ListItemLink>
    </ListItem>
  );
};

export default PayslipListItem;
