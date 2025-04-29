"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../app/globals.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import AddButtonComponent from "../button/AddButtonComponent";
import DeleteButtonComponent from "../button/DeleteButtonComponent";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridComponent = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [inputRow, setInputRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Id", field: "id", width: 100 },
    { headerName: "Name", field: "title", width: 250 },
    { headerName: "Location", field: "body", width: 250 },
    {
      headerName: "Action",
      field: "Action",
      cellRenderer: DeleteButtonComponent,
      onCellClicked: (event: any) => {
        deleteHandle(event);
      },
      width: 70,
    },
  ]);

  const deleteHandle = async (params: any) => {
    var response = window.confirm("Are you sure to delete this record ?");
    if (response) {
      try {
        var id = params.data.id;
        const response = await axios.delete(
          "https://jsonplaceholder.typicode.com/posts/" + id
        );
        if (response.status) {
          params.api?.applyTransaction({ remove: [params.data] });
        }
      } catch (error) {
        console.error("Error in deleting posts:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  if (loading) {
    return (
      <Button
        style={{
          flex: 1,
          marginTop: '20%',
          marginLeft: '50%',
          justifyContent: "center",
          alignItems: "center",
        }}
        color="primary"
        disabled
      >
        <Spinner size="sm">Loading...</Spinner>
        <span> Loading</span>
      </Button>
    );
  }

  return (
    <Container>
      <Row
        style={{
          textAlign: "center",
        }}
      >
        <Col>
          <h1>Luggage Tracker </h1>{" "}
        </Col>
        <Col style={{ float: "right", marginTop: "1%" }}>
          <AddButtonComponent />
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              width: "50%",
              height: "86vh",
              position: "absolute",
              left: "50%",
              top: "55%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50, 100]}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GridComponent;
