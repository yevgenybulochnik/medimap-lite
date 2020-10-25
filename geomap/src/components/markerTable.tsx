import React from 'react'
import Table from './table'


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

interface Props {
  data: any;
}

const MarkerTable: React.SFC<Props> = (props) => {
  const {
    data
  } = props

  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      align: 'center',
      width: 1,
    },
    {
      Header: 'Creds',
      accessor: 'credentials',
      align: 'center',
      width: 1,
    },
    {
      Header: 'Charge Amt',
      accessor: 'submittedCharge',
      align: 'center',
      width: 1,
      Cell: (cell: any) => currencyFormatter.format(cell.value)
    },
    {
      Header: 'Reimb Amt',
      accessor: 'paymentAmt',
      align: 'center',
      width: 1,
      Cell: (cell: any) => currencyFormatter.format(cell.value)
    }
  ], [])

  return (
    <Table
      columns={columns}
      data={data}
      height=''
      paginate={false}
      onRowClick={() => console.log('Marker table clicked')}
    />
  )
}

export default MarkerTable
