# spa-moviedb

This project is a movie search tool. You can search by word and year of available. it use [Movie DB](https://www.themoviedb.org/), you can check the documentation [here](https://developers.themoviedb.org/3/getting-started/introduction)

# First step
Create a .env file and copy/paste this code, use your own API Key.

```bash
# .env
MOVIEDB_API_URL = 'https://api.themoviedb.org/3'
MOVIEDB_KEY = <YOUR API KEY>
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Ideas to improve code and UI
- Style
    - Responsive CSS
    - Use different color for each genres tag

- Code & Features
    - Use a Javascript Class for calling API
    - Add new filter like genre or include adult content

- Lint
    - Improve lint rules
