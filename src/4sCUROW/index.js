import React, { Component } from 'react'
import _ from 'lodash'
const emptyStyles = {}


class HeaderCell extends Component {
  render() {
    const { name } = this.props
      return  (<th className='cell headerCell'>{name}</th>)
    }
}

class Row extends Component {



  render() {
    const { style, row, columns, onCellClick, columnSelectedInThisRow, onRemoveClick } = this.props
      return  (
        <tr className='row' style={style}>
   
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
      )
    }
}

class Cell extends Component {
  render() {
    const { name, content, rowKey, structure, columnKey, styles, onClick, isSelected } = this.props
    return (
      <td onClick = {() => onClick(rowKey, columnKey)} className={isSelected ? ' cell selected' : 'cell'}>
        { structure === 'image' ? <img src={content} style={styles} alt={name}/> : content }
      </td>
    )
  }
}


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
