/// <reference path="../references.ts" />

module GA
{
    export module Utils
    {
        /**
         * Creates a UUID that can be used for GameAnalytics
         *
         * @returns {String}
         */
        export function createUniqueId(): string
        {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    }
}
