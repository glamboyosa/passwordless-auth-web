# Passwordless Authentication on the web.

## Requirements

- A mobile phone with a SIM card and mobile data connection
- [Node.js](https://nodejs.org)
- [ngrok](https://ngrok.com/)

## Getting Started

Clone the `starter-files` branch via:

```
git clone -b starter-files --single-branch https://github.com/tru-ID/passwordless-auth-web
```

If you're only interested in the finished code in `main` then run:

```
git clone -b main https://github.com/tru-ID/passwordless-auth-web.git
```

Create a [tru.ID Account](https://tru.id)

Install the tru.ID CLI via:

```bash
npm i -g @tru_id/cli

```

Input your **tru.ID** credentials which can be found within the tru.ID [console](https://developer.tru.id/console)

Create a new project via:

```bash
tru projects:create passwordless-auth-web --project-dir .
```

## Starting Project

To start the project first install dependencies via:

```bash
npm install
```

then run

```bash
npm start
```

This will run the project on PORT 4000.

Then run ngrok. In the terminal where ngrok is running, run the following:

```bash
ngrok http 4000
```

this will give you a `https` website e.g.

```bash
https://0d834043fe8d.ngrok.io -> http://localhost:4000
```

S
Open the ngrok URL on your mobile device

## References

- [**tru.ID** docs](https://developer.tru.id/docs)

## Meta

Distributed under the MIT License. See [LICENSE](https://github.com/tru-ID/passwordless-auth-web/blob/main/LICENSE.md)

[**tru.ID**](https://tru.id)
