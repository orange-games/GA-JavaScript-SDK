/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        /**
         * The session_end event should always be sent whenever a session is determined to be over.
         * For example whenever a mobile device is ‘going-to-background’ or when a user quit your game in other ways.
         * Only one session_end event per session should be generated/sent.
         */
        export class SessionEnd implements GA.Events.Event
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.session_end;

            /**
             * The length of the session in seconds
             *
             * @type {number}
             */
            public length: number = 0;

            constructor(lenth: number)
            {
                this.length = length;
            }
        }
    }
}

