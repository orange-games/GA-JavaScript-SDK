/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        /**
         * The user event acts like a session start.
         * It should always be the first event in the first batch sent to the collectors and added each time a session starts.
         */
        export class User implements GA.Events.Event
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.user;
        }
    }
}

