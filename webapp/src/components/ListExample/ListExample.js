import React, { useEffect, useState } from 'react';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'

import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants'
import { Alert, Spinner } from 'react-bootstrap';
import axios from 'axios'

/* 
    Este componente EJEMPLO usa la tabla de react-bootstrap para mostrar los datos ejemplo que provienen de una llamada al servidor,
    se puede ver como el resultado de esta llamada se guarda en el State que usa tabla para alimentarse.
*/
function ListExample(props) {
  const [showloadingMessageResult, setShowloadingMessage] = useState(false)
  const [loadedMessage, setLoadedMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    setLoadedMessage('')
    setShowloadingMessage(false)
    setLoading(true)
    axios.get(API_BASE_URL + '/list', { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then(function (response) {
        if (response.status === 200) {          
          setList(response.data)
        } else {
          setLoadedMessage('Error loading list')
          setShowloadingMessage(true)
          setList([])
        }
      })
      .catch(function (error) {
        setLoadedMessage('Error loading list')
        setShowloadingMessage(true)
        setList([])
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  const renderSpinner = () => {
    return loading ? (
      <div className="spinner-container text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    ) : ('')
  }

  const memoColumns = React.useMemo(
    () => [
      {
        Header: 'Atributo 1',
        accessor: 'attr1',
      },
      {
        Header: 'Atributo 2',
        accessor: 'attr2',
      },
      {
        Header: 'Atributo 3',
        accessor: 'attr3',
      },
      {
        Header: 'Atributo 4',
        accessor: 'attr4',
      }       
    ],
    []
  )

  function Table({ columns, data }) {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })
    return (
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
    )
  }

  return (
    <>
      {renderSpinner()}
      <Alert className="loading-list" variant="danger" dismissible show={showloadingMessageResult} onClick={() => setShowloadingMessage(false)}>
        <Alert.Heading>{loadedMessage}</Alert.Heading>
      </Alert>
      <div className="mt-3">
        <Table columns={memoColumns} data={list} />
      </div>
    </>
  )
}

export default ListExample;