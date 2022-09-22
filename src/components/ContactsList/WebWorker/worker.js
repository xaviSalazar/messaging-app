
//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://whatsapp-cloud-backend.herokuapp.com";
const createUser = async (userData) => {
  return 
}

export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener("message", e => {

    let { data } = e;
    //console.log(data)
    function saveContactFunction(item, __rowNum__) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'asunto': item.Asunto,
          'lastname': item.Apellidos,
          'name': item.Nombres,
          'workplace': item['Lugar de Trabajo'],
          'email': item.Email,
          'phoneNumber': item.Celular,
          'address': item.Direccion,
          'notes': item.Notas,
          'owner': item.owner,
          '__rowNum__': __rowNum__
          })}

        fetch(`${API_BASE_URL}/user`, requestOptions)
        // .then(response => response.json())
        // .then(data => this.setState({ postId: data.id }));
    }
    data.forEach(saveContactFunction);
    // whole data is coming
    // httpManager.createUser()

    // fetch("https://jsonplaceholder.typicode.com/comments")
    //   .then(response => response.json())
    //   .then(res => {
    //     console.log("res -> ", res);
    //     const list = res.filter((item, idx) => {
    //       return item.email.includes(data);
    //     });
    //     postMessage(list);
    //   })
    //   .catch(error => postMessage(null));
  });
};