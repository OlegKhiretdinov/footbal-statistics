import cls from './CustomTable.module.css'

const CustomTable = (props) => {
  const {columnConfig, store} = props

  const tableHeader = columnConfig.map((item, index) => <th key={index}>{item.columnHeader}</th>)

  const rowRender = (rowContent) => (
    <tr className={cls.tr} key={rowContent.id}>
      {columnConfig.map(item => <td key={item.key}>{item.contentRender(rowContent)}</td>)}
    </tr>
  )

  const tableBody = store?.map(item => rowRender(item))

  console.log(tableBody)

  return (
    <table className={cls.table}>
      <thead>
        <tr key={'header'}>{tableHeader}</tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )
}

export default CustomTable
