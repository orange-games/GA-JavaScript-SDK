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

        export function getDefaultAnnotations(user: User, session_id: string, build: string, timeOffset: number): DefaultAnnotations
        {
            var obj: DefaultAnnotations = {
                sdk_version: GameAnalytics.SDK_VERSION,
                platform: GA.Platform[GA.Platform.windows],
                os_version: GA.Platform[GA.Platform.windows] + ' 8',
                device: 'unknown',
                v: 2,
                user_id: user.user_id,
                client_ts: (Date.now()/ 1000 | 0) + timeOffset,
                manufacturer: 'unknown',
                session_id: session_id,
                session_num: getSessionNumber(user.user_id),
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
                obj.platform = GA.Platform[GA.Platform.ios];
                obj.device = ua.match(/iPad|iPod|iPhone/i)[0];
                obj.manufacturer = 'Apple'

                obj.os_version = GA.Platform[GA.Platform.ios] + ' ' + (ua.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1]).replace(/_/gi, '.');
            } else if(ua.match(/Android/i)){
                //code for Android here
                obj.platform = GA.Platform[GA.Platform.android];
                obj.device = (ua.match(/Mobile/i)) ? 'Phone' : 'Tablet';

                obj.os_version = GA.Platform[GA.Platform.android];
                if (!/Firefox/i.test(ua)) {
                    obj.os_version += ' ' + ua.match(/Android (\d+(?:\.\d+)+);/)[1];
                }
            } else if(ua.match(/Windows Phone/i)){
                //code for Windows phone here
                obj.platform = GA.Platform[GA.Platform.windows];
                obj.device = 'Windows Phone';

                obj.os_version = GA.Platform[GA.Platform.windows] + ' ' + ua.match(/Phone (\d+(?:\.\d+)+);/)[1];
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
                obj.platform = GA.Platform[GA.Platform.ios];

                obj.os_version = GA.Platform[GA.Platform.ios] + ' ' + (ua.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1]).replace(/_/gi, '.');
            } else if(ua.match(/Android/i)){
                //code for Android here
                obj.platform = GA.Platform[GA.Platform.android];

                obj.os_version = GA.Platform[GA.Platform.android];
                if (!/Firefox/i.test(ua)) {
                    obj.os_version += ' ' + ua.match(/Android (\d+(?:\.\d+)+);/)[1];
                }
            } else if(ua.match(/Windows Phone/i)){
                //code for Windows phone here
                obj.platform = GA.Platform[GA.Platform.windows];

                obj.os_version = GA.Platform[GA.Platform.windows] + ' ' + ua.match(/Phone (\d+(?:\.\d+)+);/)[1];
            }

            return obj;
        }

        function getSessionNumber(userId): number {
            var sessionNum: string = Utils.LocalStorage.getItem(userId);
            if (sessionNum) {
                return parseInt(sessionNum);
            }

            return 1;
        }
    }
}
