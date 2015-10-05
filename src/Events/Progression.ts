module GA
{
    export module Events
    {
        var eventIdCheck = /^(Start|Fail|Complete):[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,2}$/;

        export class Progression implements GA.Events.IdEvent
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.progression;

            /**
             * A 2-4 part event id. Status:Progression1:Progression2:Progression3
             */
            public event_id: string;

            /**
             * The attempts performed on this level. Send only when Status is “Complete”.
             * Similar to the session_num. Incremented each time a progression attempt is started for this speficic event_id.
             */
            public attempt_num: number;

            /**
             * An optional player score for attempt. Only sent when Status is “Fail” or “Complete”.
             */
            public score: number;

            constructor(event_id: string, attempt_num?: number, score?: number)
            {
                if (null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for ProgressionEvent');
                }

                this.event_id = event_id;

                if (attempt_num !== undefined) {
                    this.attempt_num = attempt_num;
                }

                if (score !== undefined) {
                    this.score = score;
                }
            }
        }
    }
}

