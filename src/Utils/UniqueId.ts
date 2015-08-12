/// <reference path="../references.ts" />

module GA
{
    export module Utils
    {
        /**
         * Copied from:
         * https://github.com/GameAnalytics/GA-Flash-SDK/blob/master/GameAnalytics/src/com/gameanalytics/utils/GAUniqueIdUtil.as
         * to be the same as Flash
         *
         * @returns {String}
         */
        export function createUniqueId(): string
        {
            var chars: string           = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var num_chars: number       = chars.length - 1;
            var randomString: string    = "";

            for (var i:number = 0; i < 35; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23)
                    randomString += "-";
                else
                    randomString += chars.charAt(Math.floor(Math.random() * num_chars));
            }

            return randomString;
        }
    }
}
