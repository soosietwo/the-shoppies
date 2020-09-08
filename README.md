# The Shoppies

Search for your favourite movies and add them to your nominees list.

Once you have five nominations, submit your selections!

View the live version [here](https://the-shoppies.susiekims.vercel.app/).

Made with React, Polaris, GraphQL, Apollo-Boost, and Prisma.

## Local Setup

To run this file locally, clone this repository.

In the root directory, run `yarn install`

Create a file called `.env` and add `REACT_APP_API_KEY: <YOU_OMDB_API_KEY_HERE>`.

Run `yarn start` to start the development server.

In a separate terminal tab, `cd` to the `server` directory

Run `yarn install` here as well.

Once that has finished, run `yarn start`

You can view the app at http://localhost:3000 and the graphql playground at http://localhost:4000

## Notes

Although I had a personal project I wanted to share, I thought this would be a great opporunity to try out some parts of Shopify's tech stack so I thought I would do the challenge as well. I started the writing the challenge using `useReducer` and `useContext` to create a redux-like state management, a pattern I feel fairly comfortable with. Since I had some extra time, I decided to refactor it to instead use graphQL with Apollo. I wanted challenge myself to technologies I have not worked with extensively before, but maybe that wasn't a great idea as I felt like I had to rush through reading all the documenation 😅. I referenced https://www.howtographql.com/graphql-js/3-a-simple-mutation/ as well as Wes Bos’ advanced React course.

For the appearance, I decided to use Shopify’s design system Polaris. Although I had referenced it a lot before while working on a design system at work, I did not have the chance to actually use it so I thought this would be a good opportunity to do so. Overall I found it very easy to use and the documentation was very well-written!

Currently, “Submitting” your nominations just deletes all your nominees, but if I had more time I would have liked to add a page where you can view your past submissions, as well as the submissions of others.

Other optimizations/features I would have liked to add if I had more time:

- finishing refactoring app to fully rely on GraphQL (the OMDB API call is still using a Redux-like pattern)
- take better advantage of [Apollo's local state](https://www.apollographql.com/docs/tutorial/local-state/) so that I no longer have to use `useContext` and `useReducer`
- add user authentication so you can log into your account and submit nominees under your name
- spend more time reading Apollo Client’s and Polaris' documentation to make sure I am following best practices
- Do a more thorough a11y audit
- Try refactoring to TypeScript

Thanks for reviewing my challenge! 😊✨
