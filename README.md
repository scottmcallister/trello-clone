# trello-clone

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