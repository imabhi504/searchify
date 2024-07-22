import * as React from "react";
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  TextCell
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
// @ts-ignore
import {FileContext} from '../../helpers/fileHandler';

  
interface Person {
  rows: [];
  cols: [];
}

interface DocViewerProps{
}

type Cols = { columnId: string; width: number };
const getColumns = (people: {rows:[],cols:[]}): Column[] =>{ 
  let headers: [] = people?.rows.slice(0, 1).map((val ,id) => {
    return val;
 })[0];
  let finalHeaders: Cols[] = []
  headers?.forEach((value: string) => {
    finalHeaders.push({ columnId: value, width: 150 })
})
  return finalHeaders;
}

type RowInner = {type:string,text:string}
type RowVal = {rowId:string|number,cells: RowInner[]}
const getRows = (people: {rows:[],cols:[]}): RowVal[] => {
  let finalRows: RowVal[] = []
  people?.rows.map((val : [] ,id : number) => {
    let innerRow: RowInner[] = []
    if(id == 0){
      val.map((innerVal) => {
        innerRow.push({type: "header", text: String(innerVal)})
      })
      finalRows.push({
        rowId: "header",
        cells: innerRow
      })
    }else{
      val.map((innerVal) => {
        innerRow.push({type: "text", text: String(innerVal)})
      })
      finalRows.push({
        rowId: id-1,
        cells: innerRow
      })
    }
    
 });
  return finalRows
}

const applyChangesToPeople = (
  changes: CellChange<TextCell>[],
  prevPeople: Person[]
): Person[] => {
  changes.forEach((change) => {
    const personIndex = change.rowId;
    const fieldName = change.columnId;
    // prevPeople[personIndex][fieldName] = change.newCell.text;
  });
  return [...prevPeople];
};

const DocViewer:React.FC<DocViewerProps> = ({}) => {
  const fileData = React.useContext<{rows:[],cols:[]}>(FileContext)
  const [people, setPeople] = React.useState<Person[]>([]);

  const rows = getRows(fileData);
  const columns = getColumns(fileData);


  const handleChanges = (changes: CellChange<TextCell>[]) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  // return (
  //   <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
  // );
  return (
    <ReactGrid rows={rows} columns={columns} />
  );
}

export {DocViewer}