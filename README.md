# The Shoppies

Search for your favourite movies and add them to your nominees list.
Once you have five nominations, submit your selections!
View the live version [here](https://the-shoppies.susiekims.vercel.app/).
Made with React, Polaris, GraphQL, Apollo-Boost, and Prisma.

## Local Setup

To run this file locally, clone this repository.
In the root directory, run `yarn install`
`cd` to the `server` directory, run `yarn install` here as well.

Create a file called `.env` and add `REACT_APP_API_KEY: <YOU_OMDB_API_KEY_HERE>`

## Notes

I started the writing the challenge using `useReducer` and `useContext` to create a redux-like state management, a pattern I feel fairly comfortable with. Since I had some extra time, I decided to refactor it to instead use graphQL with Apollo. I wanted to use this opportunity to get acquainted with some of Shopify’s stack and challenge myself to technologies I have not worked with extensively before. I referenced https://www.howtographql.com/graphql-js/3-a-simple-mutation/ as well as Wes Bos’ advanced React course.

For the appearance, I decided to use Shopify’s design system Polaris because although I had referenced it a lot people, I did not have the chance to actually use it so I thought this would be a good time to do so. Overall I found it very easy to use and the documentation was very well-written!

Currently, “Submitting” your nominations just deletes all your nominees, but if I had more time I would have liked to add a page where you can view your past submissions, as well as the submissions of others.

Other optimizations/features I would have liked to add if I had more time:

- finishing refactoring app to fully rely on GraphQL (the OMDB API call is still using a Redux-like pattern)
- take better advantage of [Apollo's local state](https://www.apollographql.com/docs/tutorial/local-state/) so that I no longer have to use `useContext` and `useReducer`
- add user authentication so you can log in to your account and submit nominees under your name
- spend more time reading Apollo Client’s and Polaris' documentation to make sure I am following best practices
- Do a more thorough a11y audit
- Try refactoring to TypeScript
