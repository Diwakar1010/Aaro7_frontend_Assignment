import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Papa from 'papaparse';

const MainPage = () => {
    const [heading, setHeading] = useState([])
    const [tableData, setTableData] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [totalSalary, setTotalSalary] = useState(0)

    const handleChange = (event) => {

        if (event?.target?.files[0]?.type === "text/csv") {
            setErrorMsg("")
            Papa.parse(event.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    setTableData(result.data)
                    let obj = Object.keys(result.data[0])
                    setHeading(obj)
                    let total = result?.data.map((item, i) => {
                        let arr = item.net_salary.split("$")
                        return (
                            parseInt(arr[1])
                        )
                    })
                    total = total.reduce((acc, cur) => acc + cur)
                    setTotalSalary(total)
                },
            })
        } else {
            setErrorMsg("file is not supported")
        }

    }
    return (
        <Container className="m-5" >
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload the .csv  files only</Form.Label>
                        <Form.Control type="file" style={{ "width": "60%" }} onChange={handleChange} />
                    </Form.Group>
                </Col>
                <div style={{ "color": "red" }}>
                    {errorMsg}
                </div>
            </Row>
            <Row>
                <Col>
                    {tableData.length === 0 ? " No Data Available" :
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    {heading.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.employee_id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.net_salary}</td>
                                            <td>{item.lop_days}</td>
                                            <td>{item.pf}</td>
                                            <td>{item.esi}</td>
                                            <td>{item.tds_flags}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                </Col>
                {totalSalary === 0 ? "" :
                    <>
                       <strong>Total Net Salary : ${totalSalary}</strong>
                       <Button variant="primary" size='sm'> Proceed to Disbursal</Button>
                    </>}
                    
            </Row>
        </Container>


    )

}

export default MainPage