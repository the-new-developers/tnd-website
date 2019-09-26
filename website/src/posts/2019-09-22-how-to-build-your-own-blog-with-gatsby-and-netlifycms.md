---
templateKey: blog-post
title: How to Build Your Own Blog with Gatsby and NetlifyCMS
date: 2019-09-22T17:59:45.511Z
author: Rodney Barnes
---
This tutorial will walk through the quickest way to get a blog up and running that uses Gatsby on the front end and NetlifyCMS to manage content. We'll be using a starter template and deploying through Netlify as it is a relatively friction-less process, and by the end you'll have a live website that you can begin tweaking to your own taste.

## Prerequisites:

1. Install [Gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/#using-the-gatsby-cli) (you will also need [npm installed](https://www.npmjs.com/get-npm))
2. [An account with Netlify](https://www.netlify.com/)
3. [An account with Github](https://github.com)

## Helpful Resources and Documentation:

* [Gatsby Docs](https://www.gatsbyjs.org/docs/)
* [NetlifyCMS Docs](https://www.netlifycms.org/docs/intro/)
* [Netlify Docs](https://www.netlify.com/docs/)

## To Do:

1. Navigate to the[ gatsby-netlifycms-starter repo](https://github.com/netlify-templates/gatsby-starter-netlify-cms) on Github.
2. Scroll down to the ['Getting Started' section](https://github.com/netlify-templates/gatsby-starter-netlify-cms#getting-started-recommended) of the readme and click on the 'Deploy to Netlify' button.
3. Click on the 'Connect to Github' button.
4. Once authenticated, choose a repository name and click 'Save and Deploy'. Netlify will create a repo in your Github account with a copy of the files from the template, then automatically build and deploy that repo with a randomly-generated URL.
5. While waiting for your site to deploy, open a terminal and navigate to the directory where you would like to host a local copy of the blog.
6. Type in this command to clone your repo, replacing the account and repository names with your own:\
      `$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git`
7. Once the files have finished copying, `cd` into the project directory and type `npm install` to install the project's dependencies. This will take some time.
8. Once Netlify has finished building and deploying the site, you should be able to navigate to the URL and explore the website.
9. In order to access the CMS, you will need to set up Netlify Identity. [You can follow the instructions here to do so.](https://www.netlify.com/docs/identity/#getting-started) 
10. Setting up Netlify Identity will involve authorizing yourself as a user. You can use your credentials to sign in to the CMS.
11. Once the dependencies have finished installing on your machine, you can type `gatsby develop` in your terminal to run your project in develop mode.
12. Your project is now live and ready for you to begin customizing it.

**Notes:**

This is a similar process to what I used to set up the New Developers website. While I had experience using Vue to build Single-Page Applications, I wanted to try using a static site generator as I had read that they're better-suited for our use case - serving up static content like blog and event posts. [You can read more about this benefit here.](https://www.reddit.com/r/reactjs/comments/9hqwls/begginer_question_about_running_react/e6e84qi/)

With my background in Vue I initially turned to [VuePress](https://vuepress.vuejs.org/) but got stuck on an asyncronous call that didn't seem to work (and which, being pretty new to all of this, I found myself unable to debug) so I decided to cut my losses and dived into to world of React via Gatsby. 

The documentation for both is among the friendliest I've ever seen, and gave me the confidence I needed to persist through the inevitable quirks and bugs that come with customizing a template. It's been a great introduction to one of the more popular Javascript frameworks and as well to GraphQL.

Please [contact us](contact@thenewdevelopers.com) if you get stuck with the walkthrough above or have any questions about it. If you're looking for an easy add to your portfolio or resume, we've got a [list of issues on our Github repo](https://github.com/the-new-developers/website/issues) you can try and pitch in on.
