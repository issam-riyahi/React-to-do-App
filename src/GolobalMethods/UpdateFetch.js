



function UpdateFetch(id,data){


    fetch("http://localhost:3001/Tasks/"+id,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export default UpdateFetch ;