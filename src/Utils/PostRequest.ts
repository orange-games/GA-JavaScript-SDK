/// <reference path="../references.ts" />

module GA
{
    export module Utils
    {
        export class Response
        {
            /**
             * The response state, if the call was successful or not
             *
             * @type {boolean}
             */
            public success: boolean = false;

            /**
             * The response of the server
             *
             * @type {string}
             */
            public message: string = ''
        }

        export function postRequest(url:string, data:string, authHeader:string, callback: (data: Response) => void)
        {
            var xhr;
            if ((<any>window).XMLHttpRequest) {
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        if (xhr.status === 200) {
                            callback({
                                success: true,
                                message: xhr.responseText
                            });
                        } else if (xhr.status > 0) {
                            callback({
                                success: false,
                                message: 'Error: There was a problem with the request: status ' + xhr.status
                            });
                        }
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
}

