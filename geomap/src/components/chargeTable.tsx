import React from 'react'
import Table from './table'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

interface Props {
  data: any;
  height: any;
  onRowClick: any;
}


const ChargeTable: React.SFC<Props> = (props) => {
  const {
    data,
    height,
    onRowClick,
  } = props

  const columns= React.useMemo(() => [
    {
      Header: `Provider Charge Record (${data.length})`,
      align: 'center',
      columns: [
        {
          Header: 'NPI',
          accessor: 'npi',
          align: 'center',
          width: 1,
        },
        {
          Header: 'Name',
          accessor: 'name',
          align: 'center',
          width: 1,
        },
        {
          Header: 'Credentials',
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
          Header: 'Medicare Reimb Amt',
          accessor: 'paymentAmt',
          align: 'center',
          width: 1,
          Cell: (cell: any) => currencyFormatter.format(cell.value)
        }
      ]
    }
  ], [data])

  return (
    <Table columns={columns} data={data} height={height} onRowClick={onRowClick}/>
  )
}

export default ChargeTable
