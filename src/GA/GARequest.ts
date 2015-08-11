/// <reference path="../references.ts" />

class GARequest
{
    public static post(url:string, data:string, authHeader:string, callback: Function)
    {
        var xhr;
        if ((<any>window).XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function()
            {
                if (xhr.status === 200){
                    callback({
                        success: true,
                        message: 'Success: ' + xhr.responseText
                    });
                } else if (xhr.status > 0){
                    callback({
                        success: false,
                        message: 'Error: There was a problem with the request: status ' + xhr.status
                    });
                }
            };
        } else {
            callback({
                success: false,
                message: 'Error: Unable to send request, XMLHttpRequest not supported'
            });
            return;
        }

        try {
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', authHeader);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);
        } catch (e) {
            callback({
                success: false,
                message: 'Error: Unable to send request, CORS not allowed.'
            });
        }
    }

}
