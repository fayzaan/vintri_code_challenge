# BeeRate - An app to rate your favorite beer

Purpose of the application is to allow users to search for beer by name and leave ratings and comments anonymously.

### Tech Stack

- NodeJS
- NoSQL
- ExpressJS
- VueJS
- Vuetify
- Mocha
- Sinon
- Chai

The Beer data is queried in real time from [PunkAPI](https://punkapi.com/). The ratings are stored in a NoSQL DB file, we store the Beer ID's from PunkAPI to be able to easily map the rating to the Beer.

### Data

PunkAPI was very easy to use, and the documentation was clear. There is no fields filter, so we have to query all metadata for each beer, the Node app then filters and only returns the data we need, as specified in the instructions.

Writing to the NoSQL DB is done using [NoSQL](https://github.com/petersirka/nosql), which writes to a local file that is contained in api/modules/database.

Ratings are written to the DB as,

```
{
   "beerId": 1,
   "rating": 3,
   "comment": "average"
}
```

The ratings are written to the root just for simplicity, but it would make more sense to move them into a nested node, such as 'ratings'.

### API

As per requirements, I used NodeJS with ExpressJS to implement the various endpoints to return Beers from PunkAPI and interact with Ratings from the DB.

I used JSON Schema with [AJV](https://www.npmjs.com/package/ajv) to simplify validation for input to the various endpoints. Each endpoint has a `schema` directory where the expectations are written.

I used [memory-cache](https://www.npmjs.com/package/memory-cache) module to implement caching of requests to PunkAPI, helps to reduce our requests to external source and faster return of data - the cache is set to expire in 24 hours for each request, and ofcourse it is in-memory, in NodeJS, so if app crashes then all requests will have to go out to the external source once again.

I added 3 middlewares, `jsonapi`, `validation`, and `authorized`.

jsonapi middleware acts as a wrapper to handle errors and responses, helps to standardize the responses and include additional metadata if needed.

validation middleware helps ensure any input to the endpoints has been validated before the controller logic runs, this way we don't have to write code to check each input before using the data.

authorized middleware checks the header to ensure a `x-user` value is included and is a valid email address, I used the JSON schema for validating the email-address using the spec in [RFC-5322](https://tools.ietf.org/html/rfc5322#section-3.4.1).

#### Steps to run locally
- `npm install` (to install all dependencies)
- write `.env`, reference the `.env.sample` for what to write
- `node app.js` (to start the server) - defaults port `3000`

#### GET `/api/beers`

Parameters:
- `beer_name` - `string` - (Passed to PunkAPI)

returns
```
{
    "success": true,
    "results": [
        {
            "id": 18,
            "name": "Russian Doll – India Pale Ale",
            "description": "The levels of hops vary throughout the range. We love hops, so all four beers are big, bitter badasses, but by tweaking the amount of each hop used later in the boil and during dry- hopping, we can balance the malty backbone with some unexpected flavours. Simcoe is used in the whirlpool for all four beers, and yet still lends different characters to each",
            "first_brewed": "08/2014",
            "food_pairing": [
                "Spicy chicken skewers",
                "Fish tacos with hot sauce",
                "Lemon pound cake with a ice sugar glaze"
            ],
            "image_url": "https://images.punkapi.com/v2/18.png"
        }
    ]
}
```

#### GET `/api/rating`
- `beerId` - `string` - (Parsed to number and queried against DB)
- `beerIds` - `[]string` - (Parsed to numbers and queried against DB)

returns
```
{
    "data": {
        "success": true,
        "results": [
            {
                "beerId": 1,
                "rating": 2
            },
            {
                "beerId": 1,
                "rating": 4,
                "comment": "really good beer"
            },
            {
                "beerId": 1,
                "rating": 2,
                "comment": "its aight :/"
            }
        ]
    }
}
```

### POST `/api/rating`
- `beerId` - `number` - (Used to associate the beer with the rating)
- `rating` - `number` - rating 1 to 5
- `comment` - `string` - maximum character limit of 160

returns
```
{ success: true }
```

### Client Application

This app was bootstrapped with [Vue Create App](https://cli.vuejs.org/guide/creating-a-project.html).

Simple single page application, no routing required as it only has a single view. There is a search bar and results of beers, with ratings and food pairings.

On initial load, the application will first query for beers without any `beer_name`, and has a hard limit of 9 results per query.

The search input creates a timeout on each request to reduce the number of calls to the api, timeout is cancelled as the user types, and once 500ms has passed without change, it will send out the query.

Rating a beer is done using a dialog, when you click review and a dialog pops up and you can fill in a comment and select your rating. Inputs are validated, restriction is placed on comments being less than 160 characters.

Because the data for Beers and Rating is separate, the client-side has to query both api's and merge the data, this could be improved by moving it to the api-side.

#### Steps to run locally
- `npm install` (to install all dependencies)
- `npm run start` (to run the app, defaults localhost:8080)

### Future Improvements

I deliberately kept the `x-user` parameter in heading hardcoded, keeps the app simple and there was no requirement on having the client fill it in. In the future we could require the client to enter their email in order to use the app or at least in order to give ratings.

Ratings are anonymous, anyone can rate a beer and can do so multiple times. We could help keep it unique by requiring users to login. We can also track the user's ratings by their email/id, that way they can look at all ratings they've given, avoid duplicate ratings by restricting to single rating per beer, etc.

Caching is ran inside of NodeJS, if NodeJS crashes or we deploy a new version of the app, we lose our cache. We could move it outside and use an external service to maintain cache and do so for longer periods of time. This will also help avoid reaching memory limitations.

Documentation, since I used JSON Schema, with some additional work we can automate documentation of the API endpoints.