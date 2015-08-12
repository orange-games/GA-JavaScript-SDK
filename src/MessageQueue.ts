/// <reference path="references.ts" />

module GA
{
    /**
     * A message queue that stores messages that need to be sendEvent to GA
     * Saves the queue's to local storage and can be loaded from localStorage
     */
    export class MessageQueue
    {
        private queue: Message[] = [];

        /**
         * Load possible old queue from localStorage
         */
        constructor()
        {
            this.load();
        }

        public push(message: Message): void
        {
            this.queue.push(message);
        }

        public pop(): Message
        {
            return this.queue.pop();
        }

        get length() : number
        {
            return this.queue.length;
        }

        /**
         * Save the queue in localStorage
         */
        private save(): void
        {

        }

        /**
         * Load the queue from localStorage
         */
        private load(): void
        {

        }
    }

}