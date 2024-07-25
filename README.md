# LEBRON

An NBA quiz game designed for CS340.

### Running locally

Currently you can run a static file server for these files with one of these commands:

``` shell
python -m http.server 8000
ruby -run -ehttpd . -p8000
```

### Deploying

Files are currently hosted on the OSU student accounts, and this
script will copy the files up to the server.

Change username in the script if needed:

``` shell
bin/deploy
```