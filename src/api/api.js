async function API(url, params, token) {
    const baseUrl = 'http://irateu.in:8080/api/';
    const response = await fetch(`${baseUrl}${url}/${encodeURIComponent(params.client_id)}/${encodeURIComponent(params.branch_id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        // body: JSON.stringify(body)
    })
    const data = await response.json();
    return data
}
export default API;