import React, { Component } from 'react'
import _ from 'lodash'
const emptyStyles = {}




const HeaderCell = React.memo(({name}) => {
  return <div className='cell headerCell'>{name}</div>
})


const Row = React.memo(({style, row, columns, onCellClick, columnSelectedInThisRow}) => {
  return  <tr className='row' style={style}>
   
  {columns.map(({key, structure, styles}) =>
    <Cell
      key={key}
      columnKey={key}
      rowKey={row.name}
      name={row.name}
      content={row[key]}
      structure={structure}
      isSelected={columnSelectedInThisRow === key}
      styles={styles || emptyStyles}
      onClick={onCellClick}
    />)}
</tr>
})


const Cell = React.memo(({name, content, rowKey, structure, columnKey, styles, onClick, isSelected}) => {
  return   <td onClick = {() => onClick(rowKey, columnKey)} className={isSelected ? ' cell selected' : 'cell'}>
  { structure === 'image' ? <img src={content} style={styles} alt={name}/> : content }
</td>
})



class Table extends Component {

  state = {
    rows: this.props.rows,
  }

  renderRow = ({index, style}) => {
    if (index === 0) {
      return this.renderHeader()
    }

    const row = this.state.rows[index-1]
    return <Row
      style={style}
      key={row.name}
      rowId={row.name}
      row={row}
      columns={this.props.columns}
    />
  }

  renderHeader(){
    return <div className='row header'>
      {_.map(this.props.columns, column => <HeaderCell key={column.key} name={column.name}/>) }
    </div>
  }


  

  render() {
    const {columns} =this.props

    const {rows} = this.state
    return (
      <table>
        <thead>
          <tr>
            {columns.map(column => <HeaderCell key={column.key} name={column.name}/>)}
          </tr>
        </thead>
        <tbody>
        {rows.map((row, rowIdx)=>
          <Row
            key={rowIdx}
            row={row}
            columns={columns}
            rowIdx={rowIdx}
            onCellClick={this.setActiveCell}
          />
        )}
        </tbody>
      </table>
    )
  }
}

export default Table
