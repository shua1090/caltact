# Linter
We are using the rule set from https://github.com/standard/eslint-config-standard-with-typescript, with a few rules turned off that can be viewed in .eslintrc.json

To see errors, install the ESLint plugin on VSCode

To lint and run commands, run `npx eslint yourcommand`

Additionally, for convenience, set up your default formatter to be ESlint

To format, CTRL - SHIT - P -> ESLint: Fix all auto-fixable Problems

Testing backend REST APIs
curl -X GET localhost:3000/api/getUser -H 'Content-Type: application/json' -d '{"email": "shynnlawrence@gmail.com"}' -v

curl -X POST lGET localhost:3000/api/getUser -H 'POST localhost:3000/api/updateUser -H 'Content-Type: application/json' -d '{"email": "shynnlawrence@gmail.com", "firstName": "Shynn", "lastName": "Lawrence", "session": "c45e71ff-313f-4ddd-a990-774d9c4380ff", "other_info": {"instagram": "shua1008", "discord": "shua1008"}}' -v
