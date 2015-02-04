/// <reference path="../vendor/cryptojs.d.ts" />
/**
 * GameAnalytics lib
 */
declare class GameAnalytics {
    private gameKey;
    private secretKey;
    private build;
    private userId;
    private sessionId;
    private apiUrl;
    private messageQueue;
    private static instance;
    /**
     * Fetches an created instance
     *
     * @returns {GameAnalytics}
     */
    static getInstance(): GameAnalytics;
    /**
     * This initializes the GameAnalytics stuff with some important parameters
     * GA won't work without!
     *
     * @param gameKey       a Game's unique key
     * @param secretKey     secret key used to auth an message
     * @param build         The build version of your application
     * @param userId        The id of the user
     */
    init(gameKey: string, secretKey: string, build: string, userId: string): void;
    /**
     * Adds an event to the message queue
     *
     * @param e
     */
    addEvent(e: GameAnalyticsEvent): void;
    /**
     * Combination of addEvent and sendData in one go
     * Sends events immediatly
     *
     * @param e
     */
    sendEvent(e: GameAnalyticsEvent): void;
    /**
     * Send data from the message queue
     */
    sendData(): void;
    /**
     * Sends a message to GA
     *
     * @param m
     */
    private send(databag, event);
}
/**
 * A message queue that stores messages that need to be send to GA
 * Saves the queue's to local storage and can be loaded from localStorage
 */
declare class MessageQueue {
    private designQueue;
    private businessQueue;
    private errorQueue;
    /**
     * Load possible old queue from localStorage
     */
    constructor();
    push(m: Message): void;
    pop(event: string): Message;
    length(event: string): number;
    private getQueue(event);
    /**
     * Load the queue from localStorage
     */
    private load();
    /**
     * Save the queue to local storage
     */
    private save(event);
}
/**
 * Message
 * It's a wrapper for an event that can be send to GA. It can be constructed normally
 * or from a single string
 */
declare class Message {
    private e;
    private build;
    private sessionId;
    private userId;
    constructor(e: GameAnalyticsEvent, userId: string, sessionId: string, build: string);
    /**
     * Load a Message from string, needed for localStorage recovery
     *
     * @param event
     * @param data
     * @returns {*}
     */
    static fromString(event: string, data: string): Message;
    /**
     * Returns the data that should be send over the wire
     *
     * @returns {{eventId: string, value: number, area: string, x: number, y: number, z: number, userId: string, sessionId: string, build: string}}
     */
    data: Object;
    /**
     * Returns the event category to where we want to post the event
     *
     * @returns {string}
     */
    event: string;
}
declare class GAUniqueidUtil {
    /**
     * Copied from:
     * https://github.com/GameAnalytics/GA-Flash-SDK/blob/master/GameAnalytics/src/com/gameanalytics/utils/GAUniqueIdUtil.as
     * to be the same as Flash
     *
     * @returns {String}
     */
    static createUniqueId(): string;
}
declare class GARequest {
    static post(url: string, data: string, authHeader: string, callback: Function): void;
}
/**
 * Generic event, all event types inherit from this
 */
declare class GameAnalyticsEvent {
    static DESIGN_EVENT: string;
    static BUSINESS_EVENT: string;
    static ERROR_EVENT: string;
    event: string;
    eventId: string;
    value: number;
    area: string;
    x: number;
    y: number;
    z: number;
    constructor(event: string, eventId?: string, value?: number, area?: string, x?: number, y?: number, z?: number);
}
/**
 * Design event
 * use this to do regular gameplay shizzle
 */
declare class DesignEvent extends GameAnalyticsEvent {
    constructor(eventId: string, value?: number, area?: string, x?: number, y?: number, z?: number);
}
/**
 * Error event
 * Used this to send any errors to GA
 */
declare class GaErrorEvent extends GameAnalyticsEvent {
    constructor(eventId: string, value?: number, area?: string, x?: number, y?: number, z?: number);
}
/**
 * Business event
 */
declare class BusinessEvent extends GameAnalyticsEvent {
    constructor(eventId: string, value?: number, area?: string, x?: number, y?: number, z?: number);
}
