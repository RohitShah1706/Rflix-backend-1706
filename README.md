# RFLIX BACKEND-1706

This app is REST based API that allows you to fetch data from tmdb and other api's -
this is the backend for RFLIX-FRONTEND-1706.  
It also caches the data fetched from tmdb api using redis for faster response.

The backend is hosted on - https://rflix-backend-1706.onrender.com/  
The frontend is hosted on - https://rflix-frontend-1706.netlify.app/  
Frontend repo link - https://github.com/RohitShah1706/Rflix-frontend-1706

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`  
`TMDB_API_KEY`  
`DAILY_VIDEO_CHAT_API_KEY`  
`REDIS_HOST`  
`REDIS_PORT`  
`REDIS_PASSWORD`

## API Reference

#### BASE_URL = localhost:5000 or https://rflix-backend-1706.onrender.com

#### Get top movies

```http
  GET BASE_URL/api/top250movies/start/end
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `start`   | `string` | **Optional**. Get top movies starting from this no. |
| `end`     | `string` | **Optional**. Get top movies till this no.          |

#### Get top series

```http
  GET BASE_URL/api/top250series/start/end
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `start`   | `string` | **Optional**. Get top series starting from this no. |
| `end`     | `string` | **Optional**. Get top series till this no.          |

#### Get top movies in theatres

```http
  GET BASE_URL/api/inTheatres/start/end
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `start`   | `string` | **Optional**. Get top series starting from this no. |
| `end`     | `string` | **Optional**. Get top series till this no.          |

#### Get top movies in given genre

```http
  GET BASE_URL/api/genres/movies/genre_id/start/end
```

| Parameter  | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `genre_id` | `string` | **Required**. genre_id is specific to TMDB API.                       |
| `start`    | `string` | **Optional**. Get top movies of given genre_id starting from this no. |
| `end`      | `string` | **Optional**. Get top movies of given genre_id till this no.          |

#### Get top series in given genre

```http
  GET BASE_URL/api/genres/series/genre_id/start/end
```

| Parameter  | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `genre_id` | `string` | **Required**. genre_id is specific to TMDB API.                       |
| `start`    | `string` | **Optional**. Get top series of given genre_id starting from this no. |
| `end`      | `string` | **Optional**. Get top series of given genre_id till this no.          |

#### Get embed links for youtube trailer of specific movies

```http
  GET BASE_URL/api/trailer/movie/tmdb_id
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `tmdb_id` | `string` | **Required**. tmdb_id is specific to TMDB API. |

#### Get embed links for youtube trailer of specific series

```http
  GET BASE_URL/api/trailer/series/tmdb_id
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `tmdb_id` | `string` | **Required**. tmdb_id is specific to TMDB API. |

#### Get a new room for video chat

```http
  GET BASE_URL/api/meetingroom
```

#### Sign in a new user with google firebase

```http
  POST BASE_URL/api/users/signin
```

| Data                          | Type   | Description  |
| :---------------------------- | :----- | :----------- |
| `Google firebase user object` | `json` | **Required** |

#### Get a user's list of stored movies and series

```http
  POST BASE_URL/api/users
```

| Data                          | Type   | Description  |
| :---------------------------- | :----- | :----------- |
| `Google firebase user object` | `json` | **Required** |

#### Add a movie or series to user's my list

```http
  POST BASE_URL/api/users/addtomylist
```

| Data                          | Type   | Description  |
| :---------------------------- | :----- | :----------- |
| `Google firebase user object` | `json` | **Required** |

## Run Locally

Clone the project

```bash
  git clone https://github.com/RohitShah1706/Rflix-backend-1706.git
```

Go to the project directory

```bash
  cd Rflix-backend-1706
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## Authors

- [@RohitShah1706](https://github.com/RohitShah1706)
