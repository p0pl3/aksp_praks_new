const graphql = require('graphql');
const _ = require("lodash");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = graphql;

const cars = [
    {
        id: "1",
        title: "2105",
        brand: "LADA",
        price: 100000,
        age: 10
    },
    {
        id: "2",
        title: "C220",
        brand: "Mercedes",
        price: 10000000,
        age: 3
    },
    {
        id: "3",
        title: "Land Cruiser 200",
        brand: "Toyota",
        price: 50000000,
        age: 1
    }];

const CarInfoType = new GraphQLObjectType({
    name: 'CarInfo',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        brand: {type: GraphQLString},
        price: {type: GraphQLInt},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        info: {
            type: GraphQLString,
            resolve(parent, args) {
                return "Server is running"
            }
        },
        car: {
            type: CarInfoType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(cars, {id: args.id});
            }
        },
        cars: {
            type: new GraphQLList(CarInfoType),
            resolve(parent, args) {
                return cars;
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addcar: {
            type: CarInfoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: GraphQLString},
                price: {type: new GraphQLNonNull(GraphQLInt)},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const arrLength = cars.push(args);
                return cars [arrLength - 1];
            }
        },
        updatecar:{
            type: CarInfoType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: GraphQLString},
                price: {type: new GraphQLNonNull(GraphQLInt)},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const car = _.find(cars, {id: args.id});
                car.title = args.title;
                car.brand = args.brand;
                car.age = args.age;
                car.price = args.price;
                return _.find(cars, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
