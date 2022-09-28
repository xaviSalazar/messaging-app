import  AddProduct from '../components/AddProduct/AddProduct'
import { useState  } from "react";
import { httpManager } from '../managers/httpManager';


const Products = () => {

    const [contactToggle, setContactToggle] = useState(false);
    const [file, setFile] = useState();

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
          const {data} = await httpManager.getPresignedUrl(`products/${file.name}`)   
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
          if(status === 204) { resolve({link: `https://d1d5i0xjsb5dtw.cloudfront.net/products/${file.name}`, format: file.type}) } else {reject("error loading to S3")} 
      });

      promise.then((d) => {
          setFile(d);
          console.log(d)
        });
  };

    const [addFormData, setAddFormData] = useState({
        Product_image: "",
        Producto_titulo: "",
        Descripcion_producto: "",
        Precio_producto: 0,
        Categoria_producto: "",
      });


    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        if(fieldName === 'Product_image') {
          console.log(event.target.files[0])
          checkextension(event);
        }

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
        console.log(newFormData)
      };

      const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        if(!file) { return }
        const newProduct = {
          Product_image: file,
          Producto_titulo: addFormData.Producto_titulo,
          Descripcion_producto: addFormData.Descripcion_producto,
          Precio_producto: addFormData.Precio_producto,
          Categoria_producto: addFormData.Categoria_producto,
        };
        console.log(newProduct)
        // await createUser(sendDatabase);
        // add new contact in here
        // const newProducts = [...contacts, newProduct];
        // setContacts(newProducts);
        setContactToggle(false);
      };

    return (
        <div>
            <button onClick={() => setContactToggle(!contactToggle)}>Add new product</button>
             {contactToggle ? <AddProduct handleAddFormChange={handleAddFormChange} handleAddFormSubmit={handleAddFormSubmit} setContactToggle={setContactToggle} setFile={setFile} /> : ""}
        </div>
    )

}


export default Products;