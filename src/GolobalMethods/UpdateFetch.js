



function UpdateFetch(id,init, callBack = null){


    fetch("http://localhost:3001/Tasks/"+id,init)
        .then(res => {
            if(res.ok){

                console.log('success')
                if(callBack instanceof Function){
                    callBack('deletedTask');
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export default UpdateFetch ;