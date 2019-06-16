/**
 * Finicky Configuration Reference.
 */

/**
 * This represents the full `.finicky.js` `module.exports` object.
 *
 * Example:
 *
 * ```js
 *  module.exports = {
 *    defaultBrowser: "Google Chrome",
 *    options: {
 *      hideIcon: false
 *    },
 *    handlers: [{
 *      match: finicky.matchDomains("example.com'),
 *      browser: "Firefox"
 *    }]
 *  }
 * ```
 */
export interface FinickyConfig {
  /** The default browser or app to open for urls where no other handler
   * matches.
   */
  defaultBrowser: Browser | BrowserFunction | Array<Browser | BrowserFunction>;
  options?: {
    /** Whether or not to hide the finicky icon in the menu bar */
    hideIcon?: boolean;
    /** An array of domain names to replace the built in list of url
     * shortener domains. Note that using this option replaces the list
     * completely.
     *
     * Example:
     * ```js
     *  module.exports = {
     *    options: {
     *      urlShorteners: ["another-url-shortener-service.com"]
     *    }
     *  }
     * ```
     */
    urlShorteners?: string[];
  };
  /** An array of Rewriters that can change the url being opened */
  rewrite?: Rewriter[];
  /** An array of Handlers to select which browser to open for urls */
  handlers?: Handler[];
}

/**
 * A handler contains a matcher and a browser. If the matcher matches when opening a url, the browser in the handler will be opened.
 */
interface Handler {
  match: Matcher | Matcher[];
  browser: Browser | BrowserFunction | Array<Browser | BrowserFunction>;
}

/**
 * A rewriter contains a matcher and a url. If the matcher matches when opening a url, the final url will be changed to whatever the url property is.
 */
interface Rewriter {
  match: Matcher | Matcher[];
  url: Url | UrlFunction;
}

/**
 * Matches urls (or other properties) to decide if to change the url or open a browser.
 *
 * If the matcher is a string, if the url equals the string exactly, it will match.
 * If the matcher is a regular expression, if it matches any part of the url, it will match.
 * If the matcher is a [[MatcherFunction]], it will match if the function returns `true`
 *
 */
type Matcher = string | RegExp | MatcherFunction;
export type MatcherFunction = (options: Options) => boolean;

/**
 * Represents a browser or app that finicky could start
 */
type Browser = string | BrowserObject;

/**
 * Represents a browser or app to open
 */
interface BrowserObject {
  name: string;
  type?: "appName" | "bundleId";
  openInBackground?: boolean;
}

/**
 * A function that returns a browser to open
 */
type BrowserFunction = (options: Options) => Browser;

/**
 * Represents a url that will be handled by finicky
 */
type Url = string | UrlObject;

/**
 * An object that represents a url
 */
interface UrlObject {
  protocol: string;
  username?: string;
  password?: string;
  host: string;
  port?: number;
  pathname?: string;
  search?: string;
  hash?: string;
}

/**
 * A function that returns a url
 */
export type UrlFunction = (options: Options) => Url;

/**
 * Options sent as the argument to [[MatcherFunction]], [[BrowserFunction]] and [[UrlFunction]]
 */
interface Options {
  /** The url being opened */
  urlString: string;
  /** The url being opened as an object */
  url: UrlObject;
  /** If opened in from an app, this string contains the bundle identifier from that app */
  sourceBundleIdentifier?: string;
  /** The state of keyboard state. E.g. shift === true if pressed. */
  keys: {
    shift: boolean;
    option: boolean;
    command: boolean;
    control: boolean;
    capsLock: boolean;
    function: boolean;
  };
}
