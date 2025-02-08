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

  <p class="projectDesc">
    My personal/portfolio site. Made by hand using Gatsby, React, Tailwind CSS, and daisyUI.
  </p>

  <br/>
</div>


## About
This portfolio site is designed to showcase my work and provide a way to contact me.

It uses [React] on top of the [Gatsby] framework for static site generation. At build time, it fetches repository data from the [GitHub API] to display a selection of my public repositories.

The UI is styled with [Tailwind CSS] and [daisyUI]. [TypeScript] is used for type checking, and [Biome.js] is used for linting and formatting. [gatsby-plugin-component-to-image] is used to dynamically generate social images from React components.


## Getting Started
### Prerequisites
- [Node.js]
- [Yarn 4]
- A [GitHub personal access token] (PAT) that can be used to access the GitHub API. This token should have public (read-only) access to all repositories as it is used to fetch repository data for the projects section.

### Installation
1. Clone the repo with `https://github.com/jerboa88/jerboa88.github.io.git`. Alternatively, you can download the repository as a zip file and extract it.
2. Enter the project root with `cd jerboa88.github.io`.
4. Use `yarn install` to install the app and all of its dependencies.
5. Configure required environment variables and constants:
   1. The `GH_TOKEN` environment variable must be set to your GitHub PAT in order to fetch repository data, otherwise the build will fail. An easy way to do this is to create an `.env.development` or `.env.production` file in the project root like so:
		```sh
		# .env.development
		GH_TOKEN=your_github_pat_here
		```

   2. The site is configured to fetch repository data from the `jerboa88` GitHub account by default. If you want to fetch data for a different user, replace the `username.github` value with your own username in [src/config/metadata/site.ts].
6. Use `yarn develop` to start the development server or `yarn build` to build the site for production.


## Advanced Usage
This project can be a bit unwieldy, so here's some more details that may help you adapt it to your own needs.

### Configuration
Config files for tools like [TypeScript] or [Gatsby] are located in the root directory.

Page content is defined in Markdown files under [src/content/]. These files are automatically read by [gatsby-source-filesystem], transformed by [gatsby-transformer-remark], and exposed via the GraphQL API for use in pages.

Most of the remaining values used throughout the site are defined in config files under [src/config/]. This includes page metadata and page content like previous employment roles or projects. Values defined in these config files are read by [src/common/config-manager.ts] and [src/content-manager.ts], which validate, transform, and expose the data via functions. This allows for better type safety and less boilerplate code than using Gatsby's data layer.

More sensitive configuration values like the author's phone number and email address can be set via environment variables like so:

```sh
# .env.development
AUTHOR_PHONE='(555) 555-5555'
AUTHOR_EMAIL='email@example.org'
```

Currently, these values are only used for the contact section of the resume.

### Commands
- `yarn develop` runs the app in development mode. This will start the development server at [localhost:8000] (by default). The project will automatically be rebuilt when changes are made.
- `yarn build` generates a production build of the app, which you can then serve with `yarn serve`. The site can be viewed at [localhost:9000] (by default).
- `yarn clean` can be used to clear the local Gatsby cache if you encounter any issues with stale data/dependencies.
- `yarn typecheck` can be used to perform type checking using TypeScript.
- `yarn lint` and `yarn format` can be used to apply linting and formatting fixes to the codebase using Biome.js.

See the [Gatsby CLI docs] for additional commands and options. To run an arbitrary command, prefix it with `yarn` (ex. `yarn gatsby repl`).

### Stack
- [Gatsby] is a [React]-based static site generator that runs on [Node.js]. It uses [GraphQL] to query data from various sources.
- There is no backend. The site is statically generated and hosted on [GitHub Pages]. APIs from [GitHub], [Botpoison], and [Formspark] are used to fetch data and handle form submissions in true Jamstack fashion
- [TypeScript] is used for type checking. Types are defined in the files where they are used when possible. Shared types are located under [src/types].
- Components are styled with [Tailwind CSS] and [daisyUI]. [daisyUI] extends [Tailwind CSS] with pre-designed component classnames, which makes it easier to bootstrap components quickly.

### Project Structure
```sh
📂 .
├── 📄 biome.json            # Config for Biome.js (linting, formatting, etc.)
├── 📄 CNAME
├── 📄 gatsby-browser.ts     # Client-side code using the Gatsby browser APIs (global component wrappers, etc.)
├── 📄 gatsby-config.ts      # Config for Gatsby
├── 📄 gatsby-node.ts        # Server-side code using the Gatsby node APIs (page creation, node transformation, etc.)
├── 📄 package.json
├── 📄 tailwind.config.ts    # Config for Tailwind CSS
├── 📄 tsconfig.json         # Config for TypeScript
├── 📂 public                # Build output from Gatsby
└── 📂 src                   # Source code
    ├── 📂 common            #     Reusable utility functions and managers used in both server-side and client-side code
    │   └── 📂 utils         #         Utility functions
    ├── 📂 components        #     React components
    ├── 📂 config            #     Config files used to define values used throughout the site
    │   ├── 📂 content       #         Page content (projects, skills, etc.) available via content-manager.ts
    │   ├── 📂 metadata      #         Metadata for the site and individual pages (title, description, etc.)
    ├── 📂 content           #     Markdown content ingested by Gatsby plugins and available via GraphQL queries
    ├── 📂 images            #     Static images
    ├── 📂 node              #     Server-side only code (page creation, node transformation, etc.)
    ├── 📂 pages             #     Standalone pages automatically created by Gatsby
    ├── 📂 styles            #     Stylesheets
    ├── 📂 templates         #     Templates used for generating pages programmatically from gatsby-node.ts
    │   ├── 📂 page          #         Templates for normal pages
    │   └── 📂 social-image  #         Templates for pages used to generate social image previews
    └── 📂 types             #     Reusable TypeScript types
        └── 📂 content
```

Generated with `lsd --tree --icon-theme=unicode -I node_modules -I ".*" -I "*.tsx"`.

### Versioning
x.1 releases mark the final update for a given design, while x.0 releases are reserved for major redesigns. Changes between the first and last release of a design are not explicitly versioned.


## Contributing
This project is not open to code contributions, but feedback and bug reports are always welcome.


## License
This project is licensed under the MIT License. See [LICENSE] for details. This project includes various resources which carry their own copyright notices and license terms. See [LICENSE-THIRD-PARTY.md] for more details.


[Biome.js]: https://biomejs.dev/
[Botpoison]: https://botpoison.com/
[daisyUI]: https://daisyui.com/
[Formspark]: https://www.formspark.io/
[Gatsby CLI docs]: https://www.gatsbyjs.com/docs/reference/gatsby-cli/
[gatsby-plugin-component-to-image]: https://github.com/jerboa88/gatsby-plugin-component-to-image
[gatsby-source-filesystem]: https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/
[gatsby-transformer-remark]: https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/
[Gatsby]: https://www.gatsbyjs.com/
[GitHub API]: https://docs.github.com/en/graphql
[GitHub Pages]: https://pages.github.com/
[GitHub personal access token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
[GitHub]: https://docs.github.com/en/graphql
[GraphQL]: https://graphql.org/
[LICENSE-THIRD-PARTY.md]: LICENSE-THIRD-PARTY.md
[LICENSE]: LICENSE
[localhost:8000]: https://localhost:8000
[localhost:9000]: https://localhost:9000
[Node.js]: https://nodejs.org/
[Project Structure]: #project-structure
[React]: https://react.dev/
[src/common/config-manager.ts]: /src/common/config-manager.ts
[src/common/constants.ts]: /src/common/constants.ts
[src/config/]: /src/config/
[src/config/metadata/site.ts]: /src/config/metadata/site.ts
[src/content-manager.ts]: /src/content-manager.ts
[src/content/]: /src/content/
[src/types]: /src/types/
[Tailwind CSS]: https://tailwindcss.com/
[TypeScript]: https://www.typescriptlang.org/
[Yarn 4]: https://yarnpkg.com/

[meta:exposition]: # (My personal/portfolio site. Made by hand using Gatsby, React, and Tailwind CSS, this static site fetches repository data from the GitHub GraphQL API to display a selection of my public repositories on the home page. This project was a great opportunity to learn more about TypeScript, React, and the GraphQL Data Layer.)
[meta:category]: # (Website)
[meta:technologies]: # (Gatsby, React, Tailwind CSS, daisyUI)
[meta:schemaType]: # (WebApplication)
[meta:schemaApplicationCategory]: # (DeveloperApplication)
[meta:schemaOperatingSystem]: # (All)
