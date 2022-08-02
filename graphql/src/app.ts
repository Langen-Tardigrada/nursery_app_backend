import {ApolloServer,gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import { v4 as uuidv4} from 'uuid'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
    {
        id: '1',
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
        }
    }
] 
//*Type definitions (schema)
const typeDefs = gql`
    type Query {
        users(query: String): [User!]!
        # address0(query: String): [Address!]!
        # address:Address!
        # employees: [User!]!
        # customers: [Customer!]!
        # kids: [Kid!]!
        # account:[Account!]!
        # department:[Department!]!
        # parent:Parent!
    }

    # type Mutation {
    #     createUser(
    #         id:ID!
    #         firstname:String! 
    #         lastname:String!
    #         email: String!
    #         age: Int!
    #         date_of_birth:String!
    #         ethnicity:String!
    #         gender:String!
    #         national:String!
    #         phone:Int!
    #         region:String!
    #         info: String!
    #         username:String!
    #         password:Int!
    
    #        ): User!
    #     createAddress(
    #         info: String!
    #         province: String!
    #         sub_province: String!
    #         country: String!
    #         postcode: Int!
    #     ):Address!
    # }

    type Address {
        info: String!
        province: String!
        sub_province: String!
        country: String!
        postcode: Int!
    }

    type User {
        id: ID!
        firstname:String!
        lastname:String!
        age: Int!
        date_of_birth:date!
        gender:String!
        nationality:String!
        ethnicity:String!
        region:String!
        phone:Int!
        address: Address!
    # }
 
   
    # type Allergy {
    #     food: [String]!
    #     drug: [String]!
    # }
    # type Customer {
    #     user: User!
    #     kid:Kid!
    #     status: Boolean!
    #     email:String!
    #     account:Account!
    # }

    # type Kid {
    #     kid_info: User!
    #     nickname: String!
    #     weight: Float!
    #     height: Float!
    #     insurance: String!
    #     emergency_hosipital: String!
    #     vaccine: [String!]!
    #     allergy:Allergy!
    # }
    # type Account{
    #     id:ID!
    #     username:String!
    #     password:String!
    #     owner:User!
    # }
    # type Department{
    #     id:ID!
    #     name:String!
    #     position:String!
    #     duty:String!
    #     manage:Boolean!
        
    #  }
    # type Parent{
    #     parent_info: [Customer!]!
    #     parent_relative: String!
    # }

    # type Employee{
    #     employee_info: User!
    #     nickname: String!
    #     email: String!
    #     start_date: Date!
    #     account: Account!
    #     department: Department!
    }
`
    // type Checkin{
    //     parent_name: String!
    //     kid_name: String!
    //     kid_id: ID!
    //     employee_name: String!
    // }
    // type Checkout{
    //     parent_name: String!
    //     kid_name: String!
    //     kid_id: ID!
    //     employee_name: String!
    // }
    // type Class{
    //     nanny:Nanny!
    //     schedule:Schedule!
    //     class_name:String!
    //     id:ID!

    // }
    // type Nanny{
    //     name: String
    //     position: String
    // }
    // type Schedule{
    //     subject:String
    //     time:Time!
    // }
    // type Department{
    //     id: ID!
    //     name: String!
    //     position: String!date: Date
    //     Reason: String
    //     School: String
    //     kid: Kid
    //     duty: String!
    //     employee: Employee!
    //     manage: Boolean!
    //     class: Class!
    // }
    // type History{
    //     date: Date!
    //     Reason: String!
    //     School: String!
    //     kid: Kid!
    // }
    // type Health_check{
    //     date: Date!
    //     injure:Injure!
    //     ate_breakfast: Boolean!
    //     sympton: Sympton!
    //     comment: String!
    //     kid: Kid!
    //     department: Deprtment!
    // }
    // type Injure{
    //     eyes: Boolean!
    //     ears: Boolean!
    //     mouth: Boolean!
    //     skin:Boolean!
    //     comment: String!}
    // type  Sympton{
    //     runny nose: Boolean
    //     cough: Boolean}
    // type  Announcement{
    //     activities: Activity!
    //     study_board: [Subject!]!
    //     customer: [Customer!]!
    //     Holiday: [{
    //             date: Date!
    //             day: String!
    //     }]
    //     Food: [String!]!
    //     afternoon break: [String!]!
    // }
    // type Subject{
    //     name: String
    //     info: [{
    //             title: String
    //             date: Date
    //             class: String
    //             time: Time
    //     }]Object
    // }
    // type Leave{
    //     kid: Kid!
    //     date: [Date!]!
    //     reason: [String!]!(default "")

    // }
    // type Activity{
    //     start_date: Date
    //     end_date: Date
    //     info: [{
    //             date: Date
    //             title: String
    //     }]Object

    // }
    // type Behavior {
    //     kid: Kid
    //     date: Date
    //     hygiene: {
    //             have a lunch: {
    //                     much: boolean
    //                     nomal: boolean
    //                     less: boolean
    //                     not eat: boolean
    //             }
    //             go to toilet: {
    //                     go afternoon: Int
    //                     go morning: Int
    //                     not go: Int
    //             }
    //             drink milk:{
    //                     much: Boolean
    //                     less: Boolean
    //                     milk run out: Boolean
    //                     not drink: Boolean
    //             }
    //             brushing teeth: Boolean
    //             sleep: Boolean
    //     }
    //     activity: {
    //             intellectual dev: {
    //                     writing: Boolean
    //                     follow order: Boolean
    //                     talk with others: Boolean
    //             }
    //             social dev.: {
    //                     help others: Boolean
    //                     kindness: Boolean
    //                     play with others: Boolean
    //             }
    //             emotional & mental dev: {
    //                     level: Int
    //             }
    //             phisical dev: Boolean
    //     }
    //     comment: String
    //     class: Class
    // }
    // type Schoolrecord{
    //     estimate:[{
    //         subject: Subject
    //         record: String
    //         score: Float
    //         date_estimate: Date
    //         department: Department
    //      }]
    //     kid: Kid
    // }
    // type Stock{
    //     id: Id
    //     kid: Kid
    //     class: Class 
    //     uniform: {
    //             basic: Boolean
    //             PE: Boolean
    //             free style: Boolean
    //             free wed: Boolean
    //     }
    //     milk: number
    //     diapers: number
    //     towel: boolean
    //     water: boolean
    // }`
    


// Resolvers
// const index = Object(userInfo)

//*Resolvers
const resolvers = {
    Query: { 
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.firstname.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        // address(parent, args, ctx, info) {
        //     if (!args.query) {
        //         return users.
        //     }
        
        // },
        // account(parent, args, ctx, info) {
        //     if (!args.query) {
        //         return account
        //     }},

        // employees(parent,args,ctx,info) {
        //     let emp: any[] = []
        //     for( let i in index){
        //         if(userInfo[i].identity === 'employee') {
        //             emp.push(userInfo[i])
        //         }
        //     }
        //     return emp
        // },

        // customers:(parent, args, ctx, info)=>{
        //     let cus: any[] = []
        //     for( let i in index){
        //         if(userInfo[i].identity === 'customer') {
        //             cus.push({
        //                 user: {
        //                     id: userInfo[i].id,
        //                     firstname:userInfo[i].firstname,
        //                     lastname:userInfo[i].lastname,
        //                     email: userInfo[i].email,
        //                     age: userInfo[i].age,
        //                     date_of_birth:userInfo[i].date_of_birth,
        //                     address:userInfo[i].address,
        //                     ethnicity:userInfo[i].ethnicity,
        //                     gender:userInfo[i].gender,
        //                     national: userInfo[i].national,
        //                     phone:userInfo[i].phone,
        //                     region:userInfo[i].region,
        //                     username:userInfo[i].username,
        //                     password:userInfo[i].password,
        //                 },
        //                 kid_id:userInfo[i].kid_id,
        //                 kid_nickname:userInfo[i].kid_nickname,
        //                 kid_relative:userInfo[i].relative,
        //                 status:userInfo[i].status
        //             })
        //         }
        //     }

        //     return cus
        // },

        // kids: () => {
        //     let kids: any[] = []
        //     for( let i in index){
        //         if(userInfo[i].identity === 'student') {
        //             kids.push({
        //                 user: {
        //                     id: userInfo[i].id,
        //                     firstname:userInfo[i].firstname,
        //                     lastname:userInfo[i].lastname,
        //                     email: userInfo[i].email,
        //                     age: userInfo[i].age,
        //                     date_of_birth:userInfo[i].date_of_birth,
        //                     address:userInfo[i].address,
        //                     ethnicity:userInfo[i].ethnicity,
        //                     gender:userInfo[i].gender,
        //                     national: userInfo[i].national,
        //                     phone:userInfo[i].phone,
        //                     region:userInfo[i].region,
        //                     username:userInfo[i].username,
        //                     password:userInfo[i].password,

        //                 },

        //                 parent_id: userInfo[i].parent_id,
        //                 parent_relative: userInfo[i].relative,
        //                 nickname: userInfo[i].nickname,
        //                 class: userInfo[i].class,
        //                 weight: userInfo[i].weight,
        //                 height: userInfo[i].height,
        //                 emergency_hospital: userInfo[i].emergency_hospital,
        //                 vaccine: userInfo[i].vaccine,
        //                 allergy: userInfo[i].allergy,
        //                 status: userInfo[i].status
        //             })
        //         }
        //     }
        //     console.log(kids)
        //     return kids
        // }
        
    },
    // Mutation: { 
    //             createAddress(parent, args, ctx, info) {
    //                 const addresses = {
    //                         info: args.info,
    //                         province:args.province,
    //                         sub_province: args.sub_province,
    //                         country: args.country,
    //                         postcode: args.postcode
    //                 }
    //                 address0.push(addresses)
    //                 return addresses
    //             },
    //             createUser(parent, args, ctx, info) {
    //                 const emailTaken = userInfo.some((user) => user.email === args.email)

    //                 if (emailTaken) {
    //                     throw new Error('Email taken')
    //                 }
    //                 const addresses = {
    //                     info: args.info,
    //                     province:args.province,
    //                     sub_province: args.sub_province,
    //                     country: args.country,
    //                     postcode: args.postcode
    //             }
    //                 const user = {
    //                     id: uuidv4(),
    //                     firstname:args.firstname,
    //                     lastname:args.lastname,
    //                     nickname:args.nickname,
    //                     email:args.email,
    //                     age: args.age,
    //                     date_of_birth:args.date_of_birth,
    //                     ethnicity:args.ethnicity,
    //                     gender:args.gender,
    //                     national:args.national,
    //                     phone:args.phone,
    //                     region:args.region,
    //                     username:args.username,
    //                     password:args.password,
    //                     identity:args.identity,
    //                     ...addresses
    //                 }
    //                 userInfo.push(user)

    //                 return user
    //             }
            
    
    // },
    // Address: {
    //     country(parent, args, ctx, info) {
    //         return userInfo.find((user) => {
    //             return user.address.country === parent.country
    //         })
    //     },
    //     sub_province(parent, args, ctx, info) {
    //         return userInfo.find((user) => {
    //             return user.address.sub_province === parent.sub_province
    //         })
    //     },
    //     province(parent, args, ctx, info) {
    //         return userInfo.find((user) => {
    //             return user.address.province === parent.province
    //         })
    //     },
    //     postcode(parent, args, ctx, info) {
    //         return userInfo.find((user) => {
    //             return user.address.postcode === parent.postcode
    //         })
    //     },
      
    // }
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})