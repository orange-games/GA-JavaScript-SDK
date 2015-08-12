/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        /**
         * The response object for an Init event. This tells us if we're allowed to do future requests
         */
        export class InitResponse implements Response {
            /**
             * Events should ONLY be sent if this field is present and set to true. If not true then deactivate.
             */
            public enabled:boolean;

            /**
             * An integer timestamp of the current server time in UTC (seconds since EPOCH).
             */
            public severs_ts:number;

            /**
             * An array of strings. Not used at the moment. In the future this could contain flags set by GA servers to control SDK behaviour.
             */
            public flags: string[];
        }

        /**
         * Init event, should be called when a new session starts
         */
        export class Init {
            public data: Utils.BaseAnnotations;

            constructor(data: Utils.BaseAnnotations) {
                this.data = data;
            }

            public toString() {
                return JSON.stringify(this.data);
            }
        }
    }
}

