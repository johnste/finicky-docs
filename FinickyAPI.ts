/**
 * The Finicky API contains useful functions globally available under the globally available `finicky` variable.
 */

/**
 * Matcher function
 */
import { MatcherFunction } from "./FinickyConfig";

/**
 * These are the methods available on the globally available `finicky`
 * object.
 */
export interface Finicky {
  /** Create a function to match domains easier.
   *
   * Example:
   * ```js
   *  modules.exports = {
   *    handlers: [{
   *      match: finicky.matchDomains([/example\.(org|com)$/, "github.com"]),
   *      browser: "Firefox"
   *    }]
   *  }
   * ```
   */
  matchDomains: (
    domains: string | RegExp | Array<string | RegExp>
  ) => MatcherFunction;
  /**
   * Log a message to the Finicky console
   */
  log: (message: string) => void;
  /** Show an app notification
   *
   * Example:
   * ```js
   *  let numFacebookVisits = 0;
   *  modules.exports = {
   *    handlers: [{
   *      match: ({url}) => {
   *        return url.host === "facebook.com";
   *      },
   *      browser: () => {
   *        finicky.notify("Facebook again?", `That's ${++numFacebookVisits} too many!`);
   *        return "Firefox"
   *      }
   *    }]
   *  }
   * ```
   */
  notify: (title: string, subtitle?: string) => void;
}
