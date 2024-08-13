# LEBRON

An NBA quiz game designed for CS340.

### Setup locally

Ensure you have a .env file:

``` shell
cp .env.example .env
```

And fill in your local database info in `.env`.

Install node >21 and install dependencies:

``` shell
npm install
```

### Running locally

``` shell
npm start
```

### Deploying

Files are currently hosted on the OSU student accounts, and this
script will copy the files up to the server.

Change username in the script if needed:

``` shell
bin/deploy
```

Current deployment mode is manual. Open a tmux shell ("tmux ls" to see open sessions, "tmux a -t 0" to attach to first open session, or "tmux" to open new session), and then run/restart:

`node_modules/forever/bin/forever server.js start`