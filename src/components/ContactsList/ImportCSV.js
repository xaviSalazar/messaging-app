import React, {useState, useEffect} from "react";
import * as XLSX from "xlsx";
import './import.css';

import worker from "./WebWorker/worker";
import WebWorker from "./WebWorker/workerSetup";


let userId;
const saved = localStorage.getItem("whatsapp_app");
if (saved) {
const configs = JSON.parse(saved);
userId = configs.userId;


} else {
    alert('ingrese los tokens de config')
}

export const ImportCSV = ({ setContacts, setImportToggle }) => {

  let ApiWorker = new WebWorker(worker);
  useEffect(() => {
    ApiWorker.addEventListener("message", event => {
      const { data } = event;
      console.log("inside useEffect")
    });
  });

  function checkextension(e) {
    var file = document.querySelector("#fUpload");
    if (file.files[0]){
    if ( /\.(xlsx|csv)$/i.test(file.files[0].name) === false ) { alert("It's not an excel file! Can't Import! Try with (.xlsx, .csv) extensions"); return false }
    const fileU = e.target.files[0];
    readExcel(fileU);}
    else alert ("Please Select a file")
  }
  
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        data.forEach(object => {
          object.owner = userId;
        })
        console.log(data)
        ApiWorker.postMessage(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setContacts(d);
    });
  };

  return (
    <div>
      <div className="import">
        <div className="import-container">
          <input
            type="file"
            id="fUpload"
            onChange={(e) => {
              checkextension(e);
            }}
          />
        </div></div>
    </div>
  );
}
