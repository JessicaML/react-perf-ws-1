import React, { useState } from 'react'
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
});




const Table = function({columns, rows, index}) {


    return (
      <table>
        <thead>
          <tr>
            {columns.map(column => <HeaderCell key={column.key} name={column.name}/>)}
          </tr>
        </thead>
        <tbody>
        {rows.map((row, rowIdx)=> {
            renderRow(columns, row, rowIdx)

          return (<Row
            key={rowIdx}
            row={row}
            columns={columns}
            rowIdx={rowIdx}
          />)
        }
        )}
        </tbody>
      </table>
    )
}


export default Table


const renderRow = function ( columns, row, rowIdx){ 
  console.log("rowIdx", rowIdx)

  if (rowIdx === 0) {
    console.log("renderHeader", rowIdx)

     renderHeader(columns)
  } 

}


const renderHeader = function(columns){
  return <div className='row header'>
    {_.map(columns, column => <HeaderCell key={column.key} name={column.name}/>) }
  </div>
};


