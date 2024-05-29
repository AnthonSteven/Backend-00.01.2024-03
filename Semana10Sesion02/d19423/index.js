const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rpineda:Ysb39VAkymQPyKl4@cluster0.6znffma.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');
        const first = await collection.findOne();
        console.log(first);
    } catch (error) {
        await client.close();
    }
}

async function crud(base, coleccion, accion, filtro = null, data = null) {
    await client.connect();
    const db = client.db(base);
    const collection = db.collection(coleccion);
    let respuesta = null;
    switch (accion) {
        case "leerUno":
            if (filtro !== null) {
                respuesta = await collection.findOne(filtro);
            } else {
                respuesta = await collection.findOne();
            }
            break;
        case "leerTodos":
            if (filtro !== null) {
                respuesta = await collection.find(filtro).toArray();;
            } else {
                respuesta = await collection.find().toArray();;
            }
            break;
        case "agregarUno":
            if (data !== null) {
                respuesta = await collection.insertOne(data);
            } else {
                respuesta = "no se puede agregar"
            }
            break;
        case "agregarVarios":
            if (data !== null) {
                respuesta = await collection.insertMany(data);
            } else {
                respuesta = "no se puede agregar"
            }
            break;
        case "actualizarUno":
            if (filtro !== null) {
                respuesta = await collection.updateOne(filtro, data);
            } else {
                respuesta = "no se puede actualizar"
            }
            break;
        case "actualizarVarios":
            if (filtro !== null) {
                respuesta = await collection.updateMany(filtro, data);
            } else {
                respuesta = "no se puede actualizar"
            }
            break;
        case "borrarUno":
            if (filtro !== null) {
                respuesta = await collection.deleteOne(filtro);
            } else {
                respuesta = "no se puede borrar"
            }
            break;
        case "borrarVarios":
            if (filtro !== null) {
                respuesta = await collection.deleteMany(filtro);
            } else {
                respuesta = "no se puede borrar"
            }
            break;
        default:
            respuesta = "No implementado"
            break;
    }
    return respuesta;
}

//run().catch(console.error)
let opciones = { rated: "PASSED" }
// crud("sample_mflix","movies","leerUno",opciones).then((res) => {
//     console.log(res)
// });
let data = {
    "plot": "A meek Belgian soldier (Harry Langdon) fighting in World War I receives penpal letters and a photo from \"Mary Brown\", an American girl he has never met. He becomes infatuated with her by ...",
    "genres": [
        "Comedy"
    ],
    "runtime": 75,
    "cast": [
        "Harry Langdon",
        "Priscilla Bonner",
        "Gertrude Astor",
        "William V. Mong"
    ],
    "num_mflix_comments": 2,
    "poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjE0OTQ2NF5BMl5BanBnXkFtZTcwNTUxMDIzMQ@@._V1_SY1000_SX677_AL_.jpg",
    "title": "The Strong Man",
    "fullplot": "A meek Belgian soldier (Harry Langdon) fighting in World War I receives penpal letters and a photo from \"Mary Brown\", an American girl he has never met. He becomes infatuated with her by long distance. After the war, the young Belgian journeys to America as assistant to a theatrical \"strong man\", Zandow the Great (Arthur Thalasso). While in America, he searches for Mary Brown... and he finds her, just as word comes that Zandow is incapacitated and the little nebbish must go on stage in his place.",
    "languages": [
        "English"
    ],
    "released": {
        "$date": {
            "$numberLong": "-1365984000000"
        }
    },
    "directors": [
        "Frank Capra"
    ],
    "writers": [
        "Arthur Ripley (story)",
        "Hal Conklin (adapted by)",
        "Robert Eddy (adapted by)",
        "Reed Heustis (titles by)",
        "Clarence Hennecke (adaptation)",
        "James Langdon (adaptation)",
        "Tim Whelan (adaptation)"
    ],
    "awards": {
        "wins": 1,
        "nominations": 0,
        "text": "1 win."
    },
    "lastupdated": "2015-08-22 00:10:17.500000000",
    "year": 1926,
    "imdb": {
        "rating": 6.8,
        "votes": 547,
        "id": 17437
    },
    "countries": [
        "USA"
    ],
    "type": "movie",
    "tomatoes": {
        "viewer": {
            "rating": 3.7,
            "numReviews": 165,
            "meter": 84
        },
        "lastUpdated": {
            "$date": "2015-08-26T18:32:52.000Z"
        }
    }
};

let data1 = [
    {
        "plot": "A salesgirl with plenty of \"it\" (sex appeal) pursues a handsome playboy.",
        "genres": [
            "Comedy",
            "Romance"
        ],
        "runtime": 72,
        "rated": "PASSED",
        "cast": [
            "Clara Bow",
            "Antonio Moreno",
            "William Austin",
            "Priscilla Bonner"
        ],
        "num_mflix_comments": 1,
        "poster": "https://m.media-amazon.com/images/M/MV5BMTAxNTg3NzgxMzJeQTJeQWpwZ15BbWU4MDIyOTA4MDIx._V1_SY1000_SX677_AL_.jpg",
        "title": "It",
        "fullplot": "Shopgirl Betty Lou has designs on Cyrus Waltham, the handsome owner of the department store where she works. Waltham, though, doesn't even know Betty Lou is around. In hopes of attracting Waltham's attention, she accepts a date with his best friend, Monty, under the condition that they dine at the Ritz, where Waltham also has a dinner date that evening. Her plan works and in no time at all she and Waltham are contemplating marriage. The romance cools when a newspaper reporter mistakenly writes a story depicting Betty Lou as an unwed mother.",
        "countries": [
            "USA"
        ],
        "released": {
            "$date": {
                "$numberLong": "-1353110400000"
            }
        },
        "directors": [
            "Clarence G. Badger",
            "Josef von Sternberg"
        ],
        "writers": [
            "Elinor Glyn (story)",
            "Hope Loring (screen play)",
            "Louis D. Lighton (screen play)",
            "George Marion Jr. (titles)"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-08-06 00:01:15.977000000",
        "year": 1927,
        "imdb": {
            "rating": 7.5,
            "votes": 2025,
            "id": 18033
        },
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3.7,
                "numReviews": 4599,
                "meter": 83
            },
            "dvd": {
                "$date": "2001-02-20T00:00:00.000Z"
            },
            "critic": {
                "rating": 6.7,
                "numReviews": 9,
                "meter": 100
            },
            "lastUpdated": {
                "$date": "2015-08-16T18:41:33.000Z"
            },
            "rotten": 0,
            "production": "Critics' Choice Video",
            "fresh": 9
        }
    },
    {
        "plot": "A family saga in which three of a Bavarian widow's sons go to war for Germany and the fourth goes to America, Germany's eventual opponent.",
        "genres": [
            "Drama",
            "War"
        ],
        "runtime": 100,
        "rated": "PASSED",
        "cast": [
            "Margaret Mann",
            "James Hall",
            "Charles Morton",
            "Ralph Bushman"
        ],
        "num_mflix_comments": 0,
        "title": "Four Sons",
        "fullplot": "In Burgendorf, Bavaria, Mother Bernle has four sons. Franz is in the army, Johann works at the forge, Andreas tends the sheep. Joseph is riding a hay wagon with a pretty girl when some of the hay falls off, landing on the fearsome Maj. Von Stomm. Joseph gets a slap from the major... The jovial postman has brought a letter from America. Joseph has the offer of a job in the States. But getting there is so expensive... It's Mother Bernle's birthday and most of the town gathers for the dancing. Mother gives Joseph the money she has secreted away. He leaves for the USA... It is \"Der Tag\", The Day when war is declared. Franz and Johann are excited about their new uniforms. But America is still neutral. Joseph runs the German-American Delicatessen with his new wife Annabelle. The reports of the first German battles with the Russians are good. So why does the postman carry a black-edged letter for Mother Bernle? When America does enter the war, Joseph enlists and meets his friend, the iceman from the deli... Times are very bad in Burgendorf. Von Stomm accuses Mother Bernle: she is the \"mother of a traitor\"...",
        "languages": [
            "English"
        ],
        "released": {
            "$date": {
                "$numberLong": "-1321747200000"
            }
        },
        "directors": [
            "John Ford"
        ],
        "writers": [
            "Philip Klein (adapted by)",
            "I.A.R. Wylie (story)"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-08-19 00:41:24.220000000",
        "year": 1928,
        "imdb": {
            "rating": 7,
            "votes": 434,
            "id": 18909
        },
        "countries": [
            "USA"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3.7,
                "numReviews": 159,
                "meter": 79
            },
            "dvd": {
                "$date": "2006-02-14T00:00:00.000Z"
            },
            "lastUpdated": {
                "$date": "2015-07-01T19:32:08.000Z"
            }
        }
    }
]
// crud("sample_mflix", "movies", "agregarVarios", null, data1).then((res) => {
//     console.log(res)
// });

let filtro = { title: "White Shadows" }
let data2 = { $set: { year: 1925 } }
// crud("sample_mflix", "movies", "actualizarUno", filtro, data2).then((res) => {
//     console.log(res)
// });

let filtro2 = { year: 1925 }

// crud("sample_mflix", "movies", "borrarUno", filtro2).then((res) => {
//     console.log(res)
// });

crud("sample_mflix", "movies", "borrarVarios", filtro2).then((res) => {
    console.log(res)
});