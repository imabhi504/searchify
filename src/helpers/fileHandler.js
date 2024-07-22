import React, { useState,createContext,useContext } from "react";
import ReactDOM from "react-dom";
import { ExcelRenderer } from "react-excel-renderer";

export const FileContext = createContext(null)
export const FileContextProvider = ({children}) => {
  try {
    const [file, setFile] = useState(null);  
      function parseFile(e){
        let fileObj = e.target.files[0];
        console.log(fileObj);

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            console.log(resp.rows,resp.cols)
            setFile({
              cols: resp.cols,
              rows: resp.rows
            });
          }
        });
  }
    return (
    <FileContext.Provider value={file}>
      <input type="file" onChange={parseFile} />
      {children}
    </FileContext.Provider>)
    } catch (error) {
      console.log('error',error)
    }
}

