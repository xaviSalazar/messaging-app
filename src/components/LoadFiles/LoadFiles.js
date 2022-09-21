import React from "react"
import { httpManager } from "../../managers/httpManager";

export const LoadFiles = ({setFile, format}) => {

    function checkextension(e) {
        var file = document.querySelector("#fUpload");
        if(file.files[0]) {
            //if ( /\.(jpg|jpeg|png|JPG)$/i.test(file.files[0].name) === false ) { alert("It's not an excel file! Can't Import! Try with (.xlsx, .csv) extensions"); return false }
            const fileU = e.target.files[0];
            readFile(fileU);}
            else alert ("Please Select a file")
        }
    
    const readFile = async (file) => {

        const promise = new Promise ( async (resolve, reject) => {
            console.log(file)
            console.log(file.type)
            const {data} = await httpManager.getPresignedUrl(file.name)   
            const pipe = {
                bucket: "myawsbucketwhatsapp",
                ...data.fields,
                'Content-Type':file.type ,
                file: file
            };
            const formData = new FormData();
            for (const name in pipe) {
                formData.append(name, pipe[name]);
            }
            const {status} = await httpManager.uploadFileFromBrowser(data.url, formData)
            console.log(status)
            if(status === 204) { resolve({link: `https://d1d5i0xjsb5dtw.cloudfront.net/${file.name}`, format: format}) } else {reject("error loading to S3")} 
        });

        promise.then((d) => {
            setFile(d);
            console.log(d)
          });
    };

    return (
        <input
            type="file"
            id="fUpload"
            onChange={(e) => {
              checkextension(e);
            }}
          />
    )


}