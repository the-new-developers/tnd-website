import React from "react";
// Gatsby seems to hijack all <a> tags and, if they do not begin with http://
// or https://, appends the path to the domain instead of setting the URL as
// expected.

/**
 * The [linkElements] will contains a list of (some) keywords
 * that will be found in common URLs.
 */
const linkElements = ["http", "twitch", "www", ".ca", ".com"]

/**
 * This function is used to check if the given parameter will
 * contains any hyper-text link or not.
 * It uses the list of keywords defined above as a matching rules,
 * on successful match, a parameter value is transformed
 * into an HTML anchor (<a></a>) tag and returned back.
 * @param {String} param - string to check
 * @returns {Any} returns either a new <a> tag or the param as it is.
 */
export const checkLink = (param) => {
    // Another type of link found in a paragraph.
    // If and only if a link is wrapped in a pair () brackets within a paragraph.
    /* i.e Sign up using the Google Form here (https://forms.gle/PSAoRVzbhHF25K3s7), and the link will be emailed out the Monday before the event */
    if (param.includes("(http") && param.includes(")")) {
        let startIndex = param.indexOf("(") + 1;
        let endIndex = param.indexOf(")");
        let url = param.substring(startIndex, endIndex);
        let linkifiedParagraph = <p style={{display: "inline"}} >{param.substring(0, startIndex)}
            <a href={url} target="_blank" rel="noreferrer">{url}</a>
            {param.substring(endIndex, param.length - 1)}
        </p>;
        return linkifiedParagraph;
    } else if (!param.includes(" ") && linkElements.some(e => param.includes(e))) {
        // [WayGuan pr-#147] START - a modification from [WayGuan] to include emailable links.
        if (param.includes("@")) {
            // create and return new clickable mailto link (if contact is an email)
            return <a href={"mailto:" + param} target="_blank" rel="noreferrer">{param}</a>;
        }
        // [WayGuan pr-#147] END
        else if (!param.includes("http")) {
            // add protocol type (if not available)
            param = "http://" + param
        }
        // create and return new clickable link
        return <a href={param} target="_blank" rel="noreferrer">{param}</a>;
    } else {
        return param; // not a link
    }
};
