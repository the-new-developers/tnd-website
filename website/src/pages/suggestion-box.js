import React from "react"
import { graphql } from "gatsby"
import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

export default function SuggestionBox() {
    return (
        <Layout>
        <SEO title="Digital Suggestion Box" />
        <div>
        <Typography
          variant="h4"
          component="h2"
          style={{ fontWeight: "300", color: "#FAFFF7" }}
        >
          Digital Suggestion Box
        </Typography>
            <form method="post" action="#">
                <label>
                    Name
                    <input type="text" name="name" id="name" />
                </label>
                <label>
                    Email
                    <input type="email" name="email" id="email" />
                </label>
                <label>
                    Subject
                    <input type="text" name="subject" id="subject" />
                </label>
                <label>
                    Message
                    <textarea name="message" id="message" rows="5" />
                </label>
                <button type="submit">Send</button>
                <input type="reset" value="Clear" />
            </form>
        </div>
      </Layout>
    )
}