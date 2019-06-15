
const jqPromiseAjax = params => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: params.url,
            type: params.type || 'get',
            dataType: 'json',
            headers: params.headers || {},
            data: params.data || {},
            success(res) {
                resolve(res)
            },
            error(err) {
                reject(err)
            }
        })
    })
}
