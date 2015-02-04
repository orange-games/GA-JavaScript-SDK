/// <reference path="references.ts" />

class GARequest
{
    public static post(url:string, data:string, authHeader:string, callback: Function)
    {
        var xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    callback('There was a problem with the request: status ' + xhr.status);
                }
            }
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Authorisation', authHeader);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(data);
    }
}
