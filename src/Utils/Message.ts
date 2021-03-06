module GA
{
    export module Utils {
        /**
         * Message
         * It's a wrapper for an event that can be sendEvent to GA. It can be constructed normally
         * or from a single string
         */
        export class Message {
            /**
             * The Event we would like to send to GameAnalytics
             */
            private event: Events.Event;

            /**
             * Some default data that needs to be send with any event
             */
            private annotations:Utils.DefaultAnnotations;

            constructor(event:Events.Event, annotations:Utils.DefaultAnnotations) {
                this.event = event;
                this.annotations = annotations;
            }

            /**
             * Returns the data that should be sendEvent over the wire
             *
             * @returns {{eventId: string, value: number, area: string, x: number, y: number, z: number, userId: string, sessionId: string, build: string}}
             */
            get data():Object {
                for (var property in this.event) {
                    if (this.event.hasOwnProperty(property)) {
                        if (property === 'category') {
                            //Use the string representation of the category
                            this.annotations[property] = Events.Category[this.event[property]];
                        } else {
                            this.annotations[property] = this.event[property];
                        }
                    }
                }

                return this.annotations;
            }
        }
    }

}