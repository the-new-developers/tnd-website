<h1 align="center">
  🔥Herein lies the source code for <a href="https://thenewdevelopers.com/">thenewdevelopers.com</a>🔥
</h1>

Built using Gatsby because a blog is really just a series of static pages, and NetlifyCMS to make it easy to create those pages.

_Note: some of the below was cribbed from the default Gatsby readme._

## 🚀 How to get started

1.  **Install all dependencies.**

    You'll need git installed on your local machine in order to clone this repo and push any changes to a remote branch.
    Go ahead and [download it here](https://git-scm.com/downloads).

    In order to install the project's dependencies after you clone the repo, you will need `npm`, and to get npm you'll need node.
    Luckily they come as a package, which you can [download here](https://nodejs.org/en/download/).
    
    While you can use npm to build and run the project locally, you can optionally also use the Gatsby Command Line Interface (CLI).
    [Here's a great tutorial on how to install that](https://www.gatsbyjs.org/tutorial/part-zero/), which also includes instructions on setting up git and npm as well.

1.  **Clone this repo to your local machine.**

    In your command line tool of choice, navigate to the directory you wish to install the repo in. Then run
    
    ```
    git clone https://github.com/the-new-developers/tnd-website.git
    ```
    
    and voila! You now have a local copy of the project on your machine. 
    
    You may also wish to use a git client that offers a graphical interface; I found [Sourcetree](https://www.sourcetreeapp.com/)
    easy to pick up, but there's also [Kraken](https://www.gitkraken.com/). 
    
    [Here's a list of other git clients](https://git-scm.com/downloads/guis).
    
1.  **Install the project's dependencies.**
    
    `cd` into the website subdirectory of your local copy of the repo (tnd-website/website) then run:
    
    ```
    npm install
    ```
    This will install all of the project's dependencies into a `node_modules` folder which will be relatively massive and so may
    take some time to complete.

1.  **You're now ready to run!**

    Once installed, you can run 
    
    ```
    npm run develop
    ```
    or, if you have the Gatsby CLI installed,
    
    ```
    gatsby develop
    ```
    to get the website up and running. It will  take a few moments to compile, and once it's done you should be able to navigate to
    `http://localhost:8000` to view the website.

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_.
    GraphQL is the querying language that Gatsby uses to fetch the markdown files that represent the events and posts displayed on the website; 
    the tool exposed at this path is something you can use to experiment with to learn how to use GraphQL by building queries.
    Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

Here's a quick look at the top-level files and directories you'll see in this project:

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── static

1.  **`/node_modules`**: This directory contains all of the modules of code that this project depends on.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of the site (what you see in the browser).

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process. In this site, this file is where we make the call to fetch all of the pages for the site and render them dynamically using a template tied to each post's templateKey field.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`static`**: The admin subdirectory contains a `config.yaml` file that is the configuration file for our instance of NetlifyCMS. [You can read more about those configuration options here](https://www.netlifycms.org/docs/configuration-options/).

Inside the `src` directory you should see:

    .
    ├── components
    ├── events
    ├── images
    ├── pages
    ├── posts
    └── templates
    
1. **`components`**:  Gatsby is built on React, and this folder contains React components used to render the data from the Markdown files.

2. **`events`**: Contains Markdown files that each represent a unique event.

3. **`images`**: Contains images we can reference in our components.

4. **`pages`**: Gatsby renders the components inside this folder as static pages that use the filename in the URL path (i.e. `thenewdevelopers.com/events`). We've set up these pages as parent components that render child components from the `components` folder.

5. **`posts`**: Contains Markdown files that each represent a unique blog post.

6. **`templates`**: We use the components in this folder as part of the programmatic creation of pages from blog and event posts.

[Here is the official Gatsby documentation regarding project structure](https://www.gatsbyjs.org/docs/gatsby-project-structure/).

## 💫 Contributing to this project

We chose to set this site up using Gatsby because there's significant demand for React developers out there, and by contributing to this project you can put a neat little line on your resume that says something like, "experience with React, GraphQL, and static site generation."
React also has some of [the best documentation among all of the Javascript libraries used to create Single-Page applications (SPAs)](https://reactjs.org/docs/getting-started.html). 

We've also tried to set this site up in a way to be friendly to developers who may not have a lot of experience working with React, but if you ever get stuck or have any questions don't hesitate to reach out to us at newdevelopers@mohawkcollege.ca.

To get started in contributing, check out the `Issues` tab up top. There, you'll find a list of open issues with each having labels that you can filter by. `enhancement` is for feature requests, `bug` is for bugs, and we use `help wanted` to indicate issues that we think shouldn't take a lot of experience to tackle.

Pick an issue, and then in your local repo create a new branch to work off of. My usual workflow when I'm getting started on a new issue looks something like this:

```
git branch
```
The command line will then show a list of all branches in your current repo, with an asterisk beside the one you currently have checked out. If you are starting work on a new issue, make sure the asterisk is beside `master`.

```
git pull
```
This runs both `git fetch` and `git merge origin master` to make sure that my local repo is up to date with the repo on Github.

```
git checkout -b my-new-branch
```
This creates a new branch off master (`-b`) and switches to it. For branch names I'll often use a convention that goes something like this:
'label/issue#-issue-name'. For example, I recently submitted a pull request to fix issue #32, and my branch for that was named `bug/32-filter-and-format-posts`.

After you've created a new branch, feel free to play around in the code. Once you think you've completed the issue, you can use these commands to push your changes to the remote repository:

```
git add .
```
Stages all files you've created or modified to be ready to commit.

```
git commit -m "Type your commit message here"
```
This creates a commit for the changes you've made to your branch. We don't have any hard and fast rules for the syntax in the message, however I try and use the present tense when I can remember to.

```
git push origin [your branch name]
```
This creates a new branch in the remote repository on Github using the name of the branch you created earlier and pushes your commit(s) to that remote branch.

To have your changes merged into the master branch of the project, navigate back to `https://github.com/the-new-developers/tnd-website`. 
Under the 'Pull Requests' tab, you should see a green 'New Pull Request' button. Click that, and on the next page make sure that 'base' is set to 'master' and 'compare' is set to the branch you just pushed.
You should see an editor where you can fill in the title and add a description to your pull request, and below that a history of the commits in that branch as well as a view of the code that you've modified.

The title should auto-populate with the latest commit message in your branch, and you can use the description field to hook your PR into the issue by typing `Fixes #[number of the issue you have fixed]`.
When your PR is approved and merged, that issue will automatically close.

And that's it! If the reviewer of your PR requests any changes, you can make those changes to your local code and push them to your remote branch using the same steps described above - your PR will automatically update.

And again, if you get stuck or have any questions never hesitate to email us at newdevelopers@mohawkcollege.ca

## 🎓 Learning Gatsby

Gatsby has great documentation [on their website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, they recommend starting with their [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to their documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
