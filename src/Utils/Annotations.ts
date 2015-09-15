/// <reference path="../references.ts" />

module GA
{
    export module Utils
    {
        export interface BaseAnnotations
        {
            /**
             * Custom solutions should ALWAYS use the string “rest api v2”
             */
            sdk_version: string;

            /**
             * A string representing the OS version, e.g. “ios 8.1”
             */
            platform: string;

            /**
             * A string representing the platform of the SDK, e.g. “ios”
             */
            os_version: string;
        }

        export interface DefaultAnnotations extends BaseAnnotations
        {
            //Mandatory values
            device:         string;
            v:              number;
            user_id:        string;
            client_ts:      number;
            manufacturer:   string;
            session_id:     string;
            session_num:    number;

            //Optional values
            googleplus_id?:         string;
            facebook_id?:           string;
            gender?:                string;
            birth_year?:            number;
            custom_01?:             string;
            custom_02?:             string;
            custom_03?:             string;
            build?:                 string;
            engine_version?:        string;
            connection_type?:       string;
            progression?:           string;

            //Values we don't really need as long we are web only
            ios_idfv?:              string;
            ios_idfa?:              string;
            google_aid?:            string;
            limit_ad_tracking?:     boolean;
            logon_gamecenter?:      boolean;
            logon_googleplay?:      boolean;
            jailbroken?:            boolean;
            android_id?:            string;
        }

        export function getDefaultAnnotations(user: User, session_id: string, build: string): DefaultAnnotations
        {
            var obj: DefaultAnnotations = {
                sdk_version: GameAnalytics.SDK_VERSION,
                platform: 'windows',
                os_version: 'windows 8',
                device: 'unknown',
                v: 2,
                user_id: user.user_id,
                client_ts: Date.now(),
                manufacturer: 'unknown',
                session_id: session_id,
                session_num: 1,
                build: build
            };

            if (user.facebook_id) {
                obj.facebook_id = user.facebook_id;
            }

            if (user.gender === Gender.male || user.gender === Gender.female) {
                obj.gender = Gender[user.gender];
            }

            if (user.birth_year) {
                obj.birth_year = user.birth_year;
            }

            var ua:string = navigator.userAgent;

            if(ua.match(/iPad|iPod|iPhone/i)){
                //code for iPad here
                obj.platform = "iOS";
                obj.device = ua.match(/iPad|iPod|iPhone/i)[0];
                obj.manufacturer = 'Apple'

                var uaindex = ua.indexOf('OS ');
                obj.os_version = ua.substr(uaindex, 6).replace('_', '.');
            } else if(ua.match(/Android/i)){
                //code for Android here
                obj.platform = "Android";
                obj.device = (ua.match(/Mobile/i)) ? 'Phone' : 'Tablet';

                var uaindex = ua.indexOf('Android ');
                obj.os_version = ua.substr(uaindex, 11);
            } else if(ua.match(/Windows Phone/i)){
                //code for Windows phone here
                obj.platform = "Windows";
                obj.device = 'Windows Phone';

                var uaindex = ua.indexOf('Windows Phone ');
                obj.os_version = ua.substr(uaindex, 17);
            }

            return obj;
        }


        export function getBaseAnnotations(): BaseAnnotations
        {
            var obj: BaseAnnotations = {
                sdk_version: GameAnalytics.SDK_VERSION,
                platform: 'unknown',
                os_version: 'unknown'
            };

            var ua:string = navigator.userAgent;

            if(ua.match(/iPad|iPod|iPhone/i)){
                //code for iPad here
                obj.platform = "iOS";

                var uaindex = ua.indexOf('iOS ');
                obj.os_version = ua.substr(uaindex, 6).replace('_', '.');
            } else if(ua.match(/Android/i)){
                //code for Android here
                obj.platform = "Android";

                var uaindex = ua.indexOf('Android ');
                obj.os_version =  ua.substr(uaindex, 11);
            } else if(ua.match(/Windows Phone/i)){
                //code for Windows phone here
                obj.platform = "Windows";

                var uaindex = ua.indexOf('Windows Phone ');
                obj.os_version = ua.substr(uaindex, 17);
            }

            return obj;
        }
    }
}
