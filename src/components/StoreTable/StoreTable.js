import React, { useState } from 'react';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch } from 'react-redux';
import userFormActions from '../../actions/userFormActions';

const StyledContainerWrapper = styled.div`
  display: grid;
  grid-template-rows: 0fr 1fr;
  border-radius: 5px;
  margin: 0 100px;
  padding: 20px 0px;
  .table-bordered td, .table-bordered th {
    border: 0px;
  }
  .table-bordered th {
    border-bottom: 1px solid #dee2e6;
  }
  .react-bootstrap-table-pagination{
    div:first-child{
      display: flex;
      justify-content: flex-start;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  margin-right: auto;
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  width: ${props => props.width ? props.width : '50%'};
  height: 42px;
  border-radius: 5px;
  border: 1px solid ${props => props.color};
  background-color: ${props => props.color};
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
  &:disabled {
    background: #dddddd;
    border: 1px solid #dddddd;
    color: grey;
  }
`;



const StoreTable = ({ users }) => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  let rowsData = users;

  let columnsData = [
    {
      dataField: "firstName",
      text: "Name",
      sort: true
    },
    {
      dataField: "lastName",
      text: "",
      sort: true
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true
    },
    {
      dataField: "mobilePhone",
      text: "Mobile Phone",
      sort: true
    },
    {
      dataField: "nationality",
      text: "Nationality",
      sort: true
    },
    {
      dataField: "edit",
      text: "",
      formatter: (cell, row, rowIndex) => {
        return (
          <StyledButton color="orange"
            onClick={() => {
              dispatch(userFormActions.fetchUpdatedData(rowIndex))
            }}>
            Edit
          </StyledButton>
        )
      }
    },
    {
      dataField: "delete",
      text: "",
      formatter: (cell, row, rowIndex) => {
        return (
          < StyledButton color="red" onClick={() => {
            dispatch(userFormActions.deleteData(rowIndex))
          }}>
            Delete
          </StyledButton >
        )
      }
    }
  ];

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.id]);
    } else {
      setSelected(selected.filter(x => x !== row.id));
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      setSelected(ids);
    } else {
      setSelected([]);
    }
  }

  const handleDeleteAll = () => {
    if (selected?.length > 0) {
      dispatch(userFormActions.deleteAllData(selected));
    }
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    classes: "selection-row",
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };

  return (
    <StyledContainerWrapper>
      <StyledButtonWrapper>
        <StyledButton color="red" width="100px" onClick={handleDeleteAll} disabled={selected.length <= 0}>Delete All</StyledButton>
      </StyledButtonWrapper>
      <BootstrapTable
        keyField="id"
        data={rowsData}
        columns={columnsData}
        selectRow={selectRow}
        pagination={paginationFactory()}
      />
    </StyledContainerWrapper>
  );

};
export default StoreTable;