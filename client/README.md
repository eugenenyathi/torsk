# krynn

### Compiles and hot-reloads for development

```
npm run serve
```

### Start mock-backend

-   Navigate to src/db and run

`json-server -w db.json`

### Login screen

-   Just press login and everything else will
    take care of its self

## Updates to the structure

Using the Device's route as an example,

The Device route has children routes which are Desktops, Laptops etc and each of these
children routes need an entry port and therefore they need they own file with its own layout
and supporting code.

These children are the same in terms of functionality and identity, instead of
code duplication in each of the children route files l created one file that determines
which is the current route and then loads the corresponding layout/template, this file is essentially the entry point of every child route. These one entry and multiple route handler file are named with a post of Routes at the end for example NetworkingRoutes to handle the children routes of the networking route.

These children have the same supporting code, l created one file that has all the needed code, this file is noticed by a postfix of Manifesto and its brought into the entry file for children routes that is mentioned above, the Manifesto file is brought in as Layout.
