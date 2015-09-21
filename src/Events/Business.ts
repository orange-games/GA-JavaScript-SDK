/// <reference path="../references.ts" />

module GA
{
    export module Events
    {
        var eventIdCheck = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}$/;

        export class Business implements GA.Events.IdEvent
        {
            /**
             * The category of this event, sendEvent to GameAnalytics to identify the event type
             *
             * @type {GA.Events.Category}
             */
            public category: Category = Category.business;

            /**
             * A 2 part event id; ItemType:ItemId
             */
            public event_id: string;

            /**
             * The amount of the purchase in cents (integer)
             */
            public amount: number;

            /**
             * Currency need to be a 3 letter upper case string to pass validation.
             * In addition the currency need to be a valid currency for correct rate/conversion calculation at a later stage.
             * Look at the following link for a list valid currency values.
             *
             * http://openexchangerates.org/currencies.json.
             */
            public currency: string;

            /**
             * Similar to the session_num. Store this value locally and increment each time a business event is submitted during the lifetime (installation) of the game/app.
             * @type {number}
             */
            public transaction_num: number = 0;

            /**
             * A string representing the cart (the location) from which the purchase was made.
             * Could be menu_shop or end_of_level_shop.
             */
            public cart_type: string;

            /**
             * A JSON object that can contain 3 fields: store, receipt and signature. Used for payment validation of receipts.
             * Currently purchase validation is only supported for iOS and Android stores.
             *
             * For iOS the store is apple and the receipt is base64 encoded.
             * For Android the store is google_play and the receipt is base64 encoded + the IAP signature is also required.
             */
            public receipt_info: {};

            constructor(event_id: string, amount: number, currency: string, transaction_num: number, cart_type?: string, receipt_info?: {})
            {
                if (!event_id || null === event_id.match(eventIdCheck)) {
                    throw new Error('Invalid event_id supplied for BusinessEvent');
                }
                this.event_id = event_id;

                this.amount = amount;

                if (!currency || null === currency.match(/^[A-Z]{3}$/)) {
                    throw new Error('Invalid currency supplied for BusinessEvent');
                }
                this.currency = currency;

                this.transaction_num = transaction_num;

                if(cart_type) {
                    if(cart_type.length > 32) {
                        throw new Error('A too long cart_type was supplied, should be max 32 characters');
                    }

                    this.cart_type = cart_type;
                }

                if (receipt_info !== undefined) {
                    this.receipt_info = receipt_info;
                }
            }
        }
    }
}

