async function postObjectAsJson(url, object, httpVerb) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)

    const fetchOptions = {
        method: httpVerb,
        headers: {"Content-Type": "application/json"},
        body: objectAsJsonString
    }

   return await fetch(url, fetchOptions)
}

async function delObject(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json",},
        body: ""
    }
    return await fetch(url, fetchOptions)
}


function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

export {postObjectAsJson, fetchAnyUrl, delObject}