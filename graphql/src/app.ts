import {ApolloServer,gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import {makeExecutableSchema} from '@graphql-tools/schema'
import { v4 as uuidv4} from 'uuid'
import {GraphQLSchema,GraphQLObjectType, GraphQLString, GraphQLInt} from  'graphql'
import { DateScalar, TimeScalar, DateTimeScalar } from 'graphql-date-scalars'

// Scalar types - String, Boolean, Int, Float, ID
// Demo data
const userInfo = [
    { 
        id: uuidv4(),
        firstname:'Surting',
        lastname:'Lee',
        age: 22,
        date_of_birth:(()=>{
            let date:Date = new Date("1999-09-15")
            return date
        }),
        gender:'Female',
        nationality:'Thai',
        ethnicity:'Taiwan',
        region:'Budha',
        phone:'0932968089',
        address: {
            info: '199/55 Moo 9 Lannavill',
            district: 'Sanphisuea',
            sub_province: 'Mueng',
            province: 'Chiangmai',
            country: 'Thai',
            postcode: 50300
        },
        part_of: "employee",
    }
]

const users = userInfo.map((val,index) => {
    return {
        id: val.id,
        firstname: val.firstname,
        lastname: val.lastname,
        age: val.age,
        date_of_birth:val.date_of_birth,
        gender:val.gender,
        nationality:val.nationality,
        ethnicity:val.ethnicity,
        region:val.region,
        phone:val.phone,
        address: val.address,
        part_of: val.part_of,
    }
})

let employee:any[] = []
const ind = Object(userInfo)
for (let i of ind){
    if(i.part_of === "employee"){
        employee.push({
            id: uuidv4(),
            user: i.id,
            nickname: 'Ting',
            email: 'ting.test@email.com',
            start_date: (()=>{
                let date:Date = new Date("2022-08-05")
                return date
            }),
            account: null,
            department: [],
        })
    }
}

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: {
        info: { type: GraphQLString },
        district: { type: GraphQLString },
        sub_province: { type: GraphQLString },
        province: { type: GraphQLString},
        country: { type: GraphQLString},
        postcode: { type: GraphQLInt },
    }
})

//*Type definitions (schema)
const typeDefs = gql`

    scalar Date
    scalar DateTime
    scalar Time
    scalar Address

    type Query {
        users(query: String): [User!]!
        employees(query: String): [Employee]!
        accounts:[Account]!
        department:[Department]!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
    }

    input CreateUserInput{
        firstname:String!
        lastname:String!
        age: Int!
        date_of_birth: Date!
        gender:String!
        nationality:String!
        ethnicity:String!
        region:String!
        phone:String!
        address: Address!
    }

    type User {
        id: ID!
        firstname:String!
        lastname:String!
        age: Int!
        date_of_birth: Date!
        gender:String!
        nationality:String!
        ethnicity:String!
        region:String!
        phone:String!
        address: Address!
        part_of: String!
    },

    type Employee {
        id: ID!
        user: User!
        nickname: String!
        email: String!
        start_date: Date!
        account: Account
        department: [Department]!
    }
 
    type Account {
        id: ID!,
        username: String!
        password: String!
        owner: User!
    }

    type Department{
        id:ID!
     }
`

//*Resolvers
const resolvers = {
    Date: DateScalar,
    Time: TimeScalar,
    DateTime: DateTimeScalar,
    Address: AddressType,
    Query: { 
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.firstname.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        employees(parent,args,ctx,info) {        
            return employee
        },
    },
    Mutation: {
        createUser(parent, args, ctx, info){
            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)
            return user
        }
    },
    Employee:{
        user(parent, args, ctx, info){
            return users.find((user) => {
                return user.id
            })
        }
    }
}

const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
})

server.listen({ port:5000}).then(({url}) => {
    console.log(`Server ready at ${url}`)
})