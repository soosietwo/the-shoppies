module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateNominee {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createNominee(data: NomineeCreateInput!): Nominee!
  updateNominee(data: NomineeUpdateInput!, where: NomineeWhereUniqueInput!): Nominee
  updateManyNominees(data: NomineeUpdateManyMutationInput!, where: NomineeWhereInput): BatchPayload!
  upsertNominee(where: NomineeWhereUniqueInput!, create: NomineeCreateInput!, update: NomineeUpdateInput!): Nominee!
  deleteNominee(where: NomineeWhereUniqueInput!): Nominee
  deleteManyNominees(where: NomineeWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Nominee {
  id: ID!
  title: String!
  poster: String
  year: Int!
}

type NomineeConnection {
  pageInfo: PageInfo!
  edges: [NomineeEdge]!
  aggregate: AggregateNominee!
}

input NomineeCreateInput {
  id: ID
  title: String!
  poster: String
  year: Int!
}

type NomineeEdge {
  node: Nominee!
  cursor: String!
}

enum NomineeOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  poster_ASC
  poster_DESC
  year_ASC
  year_DESC
}

type NomineePreviousValues {
  id: ID!
  title: String!
  poster: String
  year: Int!
}

type NomineeSubscriptionPayload {
  mutation: MutationType!
  node: Nominee
  updatedFields: [String!]
  previousValues: NomineePreviousValues
}

input NomineeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: NomineeWhereInput
  AND: [NomineeSubscriptionWhereInput!]
  OR: [NomineeSubscriptionWhereInput!]
  NOT: [NomineeSubscriptionWhereInput!]
}

input NomineeUpdateInput {
  title: String
  poster: String
  year: Int
}

input NomineeUpdateManyMutationInput {
  title: String
  poster: String
  year: Int
}

input NomineeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  poster: String
  poster_not: String
  poster_in: [String!]
  poster_not_in: [String!]
  poster_lt: String
  poster_lte: String
  poster_gt: String
  poster_gte: String
  poster_contains: String
  poster_not_contains: String
  poster_starts_with: String
  poster_not_starts_with: String
  poster_ends_with: String
  poster_not_ends_with: String
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  AND: [NomineeWhereInput!]
  OR: [NomineeWhereInput!]
  NOT: [NomineeWhereInput!]
}

input NomineeWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  nominee(where: NomineeWhereUniqueInput!): Nominee
  nominees(where: NomineeWhereInput, orderBy: NomineeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Nominee]!
  nomineesConnection(where: NomineeWhereInput, orderBy: NomineeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NomineeConnection!
  node(id: ID!): Node
}

type Subscription {
  nominee(where: NomineeSubscriptionWhereInput): NomineeSubscriptionPayload
}
`
      }
    