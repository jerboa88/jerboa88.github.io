<!-- Project Header -->
<div align="center">
  <img class="projectLogo" src="src/images/icon.svg" alt="Project logo" title="Project logo" width="256">

  <h1 class="projectName">
    <a href="https://johng.io" title="johng.io">johng.io</a>
  </h1>

  <p class="projectBadges">
    <img src="https://img.shields.io/badge/type-Website-ff5722.svg" alt="Project type" title="Project type">
    <img src="https://img.shields.io/github/languages/top/jerboa88/jerboa88.github.io.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/jerboa88.github.io.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/jerboa88.github.io.svg" alt="Project license" title="Project license"/>
    </a>
    <a href="https://johng.io" title="Project URL">
			<img src="https://img.shields.io/website?url=https%3A%2F%2Fjohng.io&up_message=johng.io%20%E2%86%97" alt="Project URL" title="Project URL">
		</a>
  </p>

  <p class="projectDesc" data-exposition="My personal/portfolio site. Made by hand using Gatsby, React, and Tailwind CSS, this static site fetches repository data from the GitHub GraphQL API to display a selection of my public repositories on the home page. This project afforded to me a great opportunity to learn more about TypeScript, React, and the GraphQL Data Layer.">
    My personal/portfolio site. Made by hand using Gatsby, React, Tailwind CSS, and daisyUI.
  </p>

  <br/>
</div>


## About
This portfolio site is designed to showcase my work and provide a way to contact me.

It uses [React] on top of the [Gatsby] framework for static site generation. At build time, it fetches repository data from the [GitHub API] to display a selection of my public repositories.

The UI is styled with [Tailwind CSS] and [daisyUI]. [TypeScript] is used for type checking, and [Biome.js] is used for linting and formatting. [gatsby-plugin-component-to-image] is used to dynamically generate social images from React components.


## Installation
### Prerequisites
- [Node.js]
- [Yarn 4]
- A [GitHub personal access token] (PAT) that can be used to access the GitHub API. This token should have public (read-only) access to all repositories as it is used to fetch repository data for the projects section.

### Setup
1. Clone the repo with `https://github.com/jerboa88/jerboa88.github.io.git`. Alternatively, you can download the repository as a zip file and extract it.
2. Enter the project root with `cd jerboa88.github.io`.
4. Use `yarn install` to install the app and all of its dependencies.


## Usage
### Configuration
#### Required
The `GH_TOKEN` environment variable must be set to your GitHub PAT in order to fetch repository data, otherwise the build will fail. An easy way to do this is to create an `.env.development` or `.env.production` file in the project root like so:

```sh
# .env.development
GH_TOKEN=your_github_pat_here
```

The site is configured to fetch repository data from the `jerboa88` GitHub account by default, so if you want to fetch data for a different user, you will need to replace all instances of `jerboa88` in the code with your own username.

#### Optional
Most of the site's configuration options are set in [src/common/constants.tsx] and [src/config/*.tsx].

More sensitive configuration values like the author's phone number and email address can be set via environment variables like so:

```sh
# .env.development
AUTHOR_PHONE='(555) 555-5555'
AUTHOR_EMAIL='email@example.org'
```

Currently, these values are only used for the contact section of the resume.


### Building
We can build the site with the Gatsby CLI. All of the necessary commands are declared in `package.json` for convenience.

#### Development
Use `yarn develop` to run the app in development mode. This will start the development server at [localhost:8000] (by default). The project will automatically be rebuilt when changes are made.

#### Production
Use `yarn build` to generate a production build of the app, then use `yarn serve` to serve it. The site can be viewed at [localhost:9000] (by default).


### Other
`yarn clean` can be used to clear the local Gatsby cache if you encounter any issues with stale data/dependencies.

`yarn typecheck` can be used to perform type checking using TypeScript.

`yarn lint` and `yarn format` can be used to apply linting and formatting fixes to the codebase using Biome.js.

See the [Gatsby CLI docs] for additional commands and options. To run an arbitrary command, prefix it with `yarn` (ex. `yarn gatsby repl`).


## Contributing
This project is not open to code contributions, but feedback and bug reports are always welcome.

### Versioning
x.1 releases mark the final update for a given design, while x.0 releases are reserved for major redesigns. Changes between the first and last release of a design are not explicitly versioned.


## License
This project is licensed under the MIT License. See [LICENSE] for details. This project includes various resources which carry their own copyright notices and license terms. See [LICENSE-THIRD-PARTY.md] for more details.


[Biome.js]: https://biomejs.dev/
[daisyUI]: https://daisyui.com/
[Gatsby CLI docs]: https://www.gatsbyjs.com/docs/reference/gatsby-cli/
[gatsby-plugin-component-to-image]: https://github.com/jerboa88/gatsby-plugin-component-to-image
[Gatsby]: https://www.gatsbyjs.com/
[GitHub API]: https://docs.github.com/en/graphql
[GitHub personal access token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
[LICENSE-THIRD-PARTY.md]: LICENSE-THIRD-PARTY.md
[LICENSE]: LICENSE
[localhost:8000]: https://localhost:8000
[localhost:9000]: https://localhost:9000
[Node.js]: https://nodejs.org/
[React]: https://react.dev/
[src/common/constants.tsx]: /src/common/constants.tsx
[src/config/*.tsx]: /src/config/*.tsx
[Tailwind CSS]: https://tailwindcss.com/
[TypeScript]: https://www.typescriptlang.org/
[Yarn 4]: https://yarnpkg.com/
