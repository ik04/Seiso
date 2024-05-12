# Seiso
A simple laundry tracker for easy access to slip records from different laundromats.

## Tech stack 
- ![Nextjs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
- ![Expressjs](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
- ![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)


## For Contributions:
this is a script to install the necessary dependecies to run this project 
- [This is to install nvm](https://gist.github.com/ik04/b94423df79ed7f777b2c359c2f669b1b)
- after nvm is setup just run
```bash
nvm install node
npm install -g pnpm
```
make sure to run this in a new terminal instance

## To Setup the project:
### Nextjs:
```bash
cd client/web
pnpm i
pnpm dev
```
### Expressjs
```
cd server/rest
pnpm i
pnpm dev
```
Make sure to setup the .env files for both server and client and run the /init endpoint to hydrate the collection with laundries and an admin account
