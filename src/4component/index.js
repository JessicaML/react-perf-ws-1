import React, { Component } from 'react'
import { FixedSizeList as List } from 'react-window'
import _ from 'lodash'
const emptyStyles = {}


class HeaderCell extends Component {
  render() {
    const { name } = this.props
    
      return  (<div className='cell headerCell'>{name}</div>)
    }
}

class Row extends Component {
  render() {
    const { style, row, columns, onCellClick, columnSelectedInThisRow, onRemoveClick } = this.props
      return  (
        <div className='row' style={style}>
          <div className='trash cell' onClick={()=> onRemoveClick(row)}>
            <span role='img' aria-label='remove'>🗑️</span>
          </div>
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
        </div>
      )
    }
}

class Cell extends Component {
  render() {
    const { name, content, rowKey, structure, columnKey, styles, onClick, isSelected } = this.props
    return (
      <div onClick = {() => onClick(rowKey, columnKey)} className={isSelected ? ' cell selected' : 'cell'}>
        { structure === 'image' ? <img src={content} style={styles} alt={name}/> : content }
      </div>
    )
  }
}



class Table extends Component {
  state = {
    activeRow: null,
    activeColumn: null,
    rows: this.props.rows,
    latLng: null
  }

  getLatLng = () => {
    return (this.state.rows.find(row => row.name === this.state.activeRow )||{}).latlng
  }

  setActiveCell = (activeRow, activeColumn) => {
    this.setState({activeRow, activeColumn})
  }

  removeRow = rowToDelete => {
    this.setState({rows: this.state.rows.filter(row => row !== rowToDelete)})
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
      columnSelectedInThisRow={this.state.activeRow === row.name ? this.state.activeColumn : undefined}
      onCellClick={this.setActiveCell}
      onRemoveClick={this.removeRow}
    />
  }

  renderHeader(){
    return <div className='row header'>
      <div className='cell headerCell'>Actions</div>
      {_.map(this.props.columns, column => <HeaderCell key={column.key} name={column.name}/>)}
    </div>
  }

  render() {
    const {rows, activeColumn, activeRow} = this.state
    return (
      <div>
        <div className='grid'>
          <List
            height={window.innerHeight}
            itemCount={rows.length}
            itemSize={90}
            width={window.innerWidth}
            itemData={[activeRow, activeColumn]}
          >
            {this.renderRow}
          </List>
        </div>
      </div>
    )
  }
}

export default Table
