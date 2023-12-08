# Caltact
A webapp allowing Cal Poly users to find and store multiple points of info about their friends and family. With a snappy UI, multiple methods to "CRUD", and a dedicated team, you'll never have a problem again with forgetting your loved ones!

For quick access to the latest version of caltact, head on over to [caltactdev.vercel.app](https://caltactdev.vercel.app)

## Dev Environment Setup
To setup a dev environment for testing/developing caltact, 
1. git clone the repo
2. npm install
3. Download the .env file to repo root (contact admins)
4. Success!

## Design Planning
### UML (~Schema)
[Diagrams](/docs/Diagram.md)
### UI Prototype
[Prototype UI](/docs/Prototype.md)

## Linter
We are using the rule set from https://github.com/standard/eslint-config-standard-with-typescript, with a few rules turned off that can be viewed in .eslintrc.json

To see errors, install the ESLint plugin on VSCode

To lint and run commands, run `npx eslint yourcommand`

Additionally, for convenience, set up your default formatter to be ESlint

To format, CTRL-SHIFT-P -> ESLint: Fix all auto-fixable Problems

## Dev testing routes

Testing backend REST API routes:
<p>
curl -X GET localhost:3000/api/getUser -H 'Content-Type: application/json' -d '{"email": "shynnlawrence@gmail.com"}' -v

curl -X POST GET localhost:3000/api/getUser -H 'POST localhost:3000/api/updateUser -H 'Content-Type: application/json' -d '{"email": "shynnlawrence@gmail.com", "firstName": "Shynn", "lastName": "Lawrence", "session": "c45e71ff-313f-4ddd-a990-774d9c4380ff", "other_info": {"instagram": "shua1008", "discord": "shua1008"}}' -v
