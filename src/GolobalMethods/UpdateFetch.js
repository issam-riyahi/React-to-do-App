



function UpdateFetch(id = null, url, init, callBack = null){

    console.log((id !== null ? id  : ''))
    fetch(url+(id !== null ? id  : ''),init)
        .then(res => {
            if(res.ok){

                console.log('success')
                if(callBack instanceof Function){
                    callBack();
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export default UpdateFetch ;