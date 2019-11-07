async function API(url, body, token){
    const baseUrl = 'http://irateu.in:8000/api/';
    const response = await fetch(baseUrl + url ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Autherization': `Token ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    return data
}
export default API;