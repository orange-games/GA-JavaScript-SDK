GA-JavaScript-SDK [![Build Status](https://travis-ci.org/gembly/GA-JavaScript-SDK.svg?branch=v2)](https://travis-ci.org/gembly/GA-JavaScript-SDK)
=================

GA-JavaScript-SDK is an open-source javascript implementation for [GameAnalytics](http://www.gameanalytics.com/) and their new, improved v2 REST API.

This library is fully compliant with the data structures specified in GameAnalytics' REST API docs

If you don't feel like reading any further, or you like to see how it works, [then check out the example in the repo](https://github.com/gembly/GA-JavaScript-SDK/blob/master/example/index.html)!

Getting Started
---------------
If you don't have an account yet [GameAnalytics](http://www.gameanalytics.com/) then hurry up and create one, it's for free!

Set up a game, and make sure you've received a game key and a private key, we need those to talk to GameAnalytics' API.

Once that's out of your way, snatch yourself a copy of this library either from the [repo](https://github.com/gembly/GA-JavaScript-SDK/blob/master/dist/GaJavaScriptSdk.min.js) or catch the latest stable from the [releases](https://github.com/gembly/GA-JavaScript-SDK/releases).

Include in your project like you usually do:

```html
<script src="/path/to/GaJavascriptSdk.min.js" />
```

And initialise the library, this requires the previously obtained game and secret key, a build string that specifies the current state of your game and a User object.

```javascript
var gameKey = "a50a4caeda2e82fd1bedc5aca519ed12"; //Your gamekey
var secretKey = "790518ec21b665def89412852862081649cf2a9c"; //Your secret key
var build = "1.0"; //The current version of your game, it's wise to bump this with every analytics/game change

//here's the user, it needs some things to start off
//First up is the unique id that specifies the current user
//Then (if applicable) you can send a facebook userid, this overwrites the previous set user_id
//Third is the gender of the user, for now GameAnalytics only accepts Male|Female
//And last is user's birth year, all for those awesome stats!
var user = new GA.User(Date.now().toString(), undefined, GA.Gender.male, 1970);

//Create an instance, initialise it!
//Here we use all those things we defined before, now everything should be set up correctly!
var gaan = GA.getInstance();
gaan.init(gameKey, secretKey, build, user)
```

Events
------

These are the different kind of Events that can be send to [GameAnalytics](http://www.gameanalytics.com/). They're all available under GA.Events, but all have different arguments that are required for succesfull sending of events.

Please note that the documentation on the event_id's is not complete. For a full documentation on this, please refer to [GameAnalytics' REST API documentation](http://www.gameanalytics.com/docs/rest-api)

### User

The user event acts like a session start. It should always be the first event in the first batch sent to the collectors and added each time a session starts.

```javascript
var event = new GA.Events.User();

GA.getInstance().addEvent(event);
```

### Progression

Progression events are used to track attempts at completing levels in order to progress in a game. During the progression attempt all other events activated in that period should be annotated with the progression values. This will enable dimension filtering in the GameAnalytics tool for each progression type. There are 3 types of progression events.

 - Start
 - Fail
 - Complete

```javascript
var progressStart = new GA.Events.Progression(
    'Start:Shpping'  //A 2-4 part event id.
);

var progressFail = new GA.Events.Progression(
    'Fail:Shopping', //A 2-4 part event id.
    1,               //The number of attempts for this level. Add only when Status is “Complete” or “Fail”. Increment each time a progression attempt failed for this specific level.
    200              //(optional) An optional player score for attempt. Only sent when Status is “Fail” or “Complete”
);

var progressComplete = new GA.Events.Progression(
    'Complete:Shopping', //A 2-4 part event id.
    5,                   //The number of attempts for this level. Add only when Status is “Complete” or “Fail”. Increment each time a progression attempt failed for this specific level.
    1337                 //(optional) An optional player score for attempt. Only sent when Status is “Fail” or “Complete”
);

GA.getInstance()
    .addEvent(progressStart)
    .addEvent(progressFail)
    .addEvent(progressComplete);
```

### Business

Business events are for real-money purchases.

```javascript
var event = new GA.Events.Business(
    'GemPack1:Gems1000',    //A 2 part event id
    100,                    //The amount in cents
    'EUR',                  //The currency
    11,                     //Store this value locally and increment each time a business event is submitted during the lifetime (installation) of the game/app.
    'level_end_shop'        //(optional) A string representing the cart (the location) from which the purchase was made.
);

GA.getInstance().addEvent(event);
```

### Resource

Resource events are for tracking the flow of virtual currency registering the amounts users are spending (sink) and receiving (source) for a specified virtual currency. There are 2 types of Resource events:

 - Sink
 - Source

Sink is when a user spends some currency and Source is when he gains some

```javascript
var sink = new GA.Events.Resource(
    'Sink:Lives:continuity:startLevel', //A 4 part event id string. [flowType]:[virtualCurrency]:[itemType]:[itemId]
    1                                   //The amount
);

var source = new GA.Events.Resource(
    'Source:Gems:purchase:gemPack1337', //A 4 part event id string. [flowType]:[virtualCurrency]:[itemType]:[itemId]
    1337                                //The amount
);

GA.getInstance()
    .addEvent(sink)
    .addEvent(source);
```

### Design

Every game is unique! Therefore it varies what information is needed to track for each game. Some needed events might not be covered by our other event types and the design event is available for creating a custom metric using an event id hierarchy.

```javascript
var event = new GA.Events.Design(
    'Character:Poop',   //A 1-5 part event id.
    10                  //(optional) a number
);

GA.getInstance().addEvent(event);
```

### SessionEnd

Whenever a session is determined to be over the code should always attempt to add a session end event and submit all pending events immediately.

Only one session end event per session should be activated.

```javascript
var sessionDuration = (Date.now() - sessionStart) / 1000;

var event = new GA.Events.Session(
    sessionDuration //the length of the session in seconds
);

GA.getInstance().addEvent(event);
```

### Exception

An Error event should be sent whenever something horrible has happened in your code - some Exception/state that is not intended.

the following error types are supported.

 - GA.Events.ErrorSeverity.debug
 - GA.Events.ErrorSeverity.info
 - GA.Events.ErrorSeverity.warning
 - GA.Events.ErrorSeverity.error
 - GA.Events.ErrorSeverity.critical

```javascript
window.addEventListener('error', function (event) {
    var stack = event.message;

    if (event.hasOwnProperty('error') && event.error.hasOwnProperty('stack')) {
        stack = event.error.stack;
    }

    var event = new GA.Events.Exception(GA.Events.ErrorSeverity.critical, stack);

    GA.getInstance().addEvent(event);
});

```

Changelog
---------

**2.0.2**
* Fixed an issue where the wrong OS versions are send
* Made sure http/https is used
* Updated README

**2.0.1**
* Fixed os/os_version
* Created enum for different os' support by GA
* Removed sandbox url / keys
* Updated example
* Added correction for server time difference

**2.0.0**
* Reworked everything to work with GameAnalytics v2 API