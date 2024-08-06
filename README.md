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