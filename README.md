# trello-clone

## what is it?

Basically a CRUD app for boards and posts that supports saving GIFs from Tenor. 

Built using [Spring Boot](https://spring.io/projects/spring-boot/), [React](https://react.dev/), and [webpack](https://webpack.js.org/). 

## how to run

Define a few environment variables in your bash / zsh profile

```
export TENOR_API_KEY="<your key>"
export TRELLO_CLONE_PASSWORD="<some password>"
export TRELLO_CLONE_DB_USER="<some user>"
export TRELLO_CLONE_DB_PASSWORD="<some password>"
```

Build the UI:

```
npm run build
```
or
```
npm run watch
```

Run the service:

```
./mvnw spring-boot:run
```
