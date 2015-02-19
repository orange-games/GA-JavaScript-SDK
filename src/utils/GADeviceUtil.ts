/// <reference path="../references.ts" />

class GADeviceUtil
{
    constructor()
    {

    }

    public static createUserEventDeviceObject(sdkVersion:String):any
    {
        var obj:any = {
            sdk_version: sdkVersion
        };

        var ua:string = navigator.userAgent;

        if(ua.match(/iPad|iPod|iPhone/i)){
            //code for iPad here
            obj.platform = "iOS";
            obj.device = ua.match(/iPad|iPod|iPhone/i)[0];

            var uaindex = ua.indexOf('OS ');
            var userOSver = ua.substr(uaindex + 3, 3).replace('_', '.');
            obj.os_major = "iOS " + userOSver[0];
            obj.os_minor = "iOS " + userOSver;
        } else if(ua.match(/Android/i)){
            //code for Android here
            obj.platform = "Android";
            obj.device = (ua.match(/Mobile/i)) ? 'Phone' : 'Tablet';

            var uaindex = ua.indexOf('Android ');
            var userOSver = ua.substr(uaindex + 8, 3);
            obj.os_major = "Android " + userOSver[0];
            obj.os_minor = "Android " + userOSver;
        } else if(ua.match(/Windows Phone/i)){
            //code for Windows phone here
            obj.platform = "Windows";
            obj.device = 'Windows Phone';

            var uaindex = ua.indexOf('Windows Phone ');
            var userOSver = ua.substr(uaindex + 3, 3);
            obj.os_major = "Windows Phone " + userOSver[0];
            obj.os_minor = "Windows Phone " + userOSver;
        }

        return obj;
    }
}
