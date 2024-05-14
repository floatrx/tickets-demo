curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 9200,
    "airlineId": 1,
    "flights": [
        {
            "number": "A4E-321",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T04:35:00.000Z",
            "transferIds": [4],
            "fromId": 1,
            "toId": 3
        },
        {
            "number": "A4E-322",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T04:35:00.000Z",
            "transferIds": [4],
            "fromId": 3,
            "toId": 1
        }
    ]
}'

curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 9200,
    "airlineId": 1,
    "flights": [
        {
            "number": "A4E-777",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T02:15:00.000Z",
            "transferIds": [1],
            "fromId": 4,
            "toId": 2
        },
        {
            "number": "A4E-778",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T02:15:00.000Z",
            "transferIds": [1],
            "fromId": 2,
            "toId": 4
        }
    ]
}'

curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 9200,
    "airlineId": 1,
    "flights": [
        {
            "number": "A4E-243",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T09:15:00.000Z",
            "transferIds": [4,2,1],
            "fromId": 3,
            "toId": 2
        },
        {
            "number": "A4E-244",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T09:15:00.000Z",
            "transferIds": [1,2,3],
            "fromId": 2,
            "toId": 3
        }
    ]
}'

curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 2300,
    "airlineId": 2,
    "flights": [
        {
            "number": "TU-243",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T05:00:00.000Z",
            "transferIds": [1,2,3],
            "fromId": 2,
            "toId": 1
        },
        {
            "number": "TU-244",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T05:00:00.000Z",
            "transferIds": [1,2,3],
            "fromId": 1,
            "toId": 2
        }
    ]
}'

curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 1200,
    "airlineId": 1,
    "flights": [
        {
            "number": "A4E-020",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T05:00:00.000Z",
            "transferIds": [],
            "fromId": 3,
            "toId": 4
        },
        {
            "number": "A4E-021",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T05:00:00.000Z",
            "transferIds": [],
            "fromId": 4,
            "toId": 3
        }
    ]
}'

curl --location 'http://localhost:3000/api/tickets' \
--header 'Content-Type: application/json' \
--data '{
    "price": 320,
    "airlineId": 1,
    "flights": [
        {
            "number": "A4E-016",
            "departureTime": "2024-01-01T00:00:00.000Z",
            "arrivalTime": "2024-01-02T03:00:00.000Z",
            "transferIds": [],
            "fromId": 3,
            "toId": 4
        },
        {
            "number": "A4E-017",
            "departureTime": "2024-01-03T00:00:00.000Z",
            "arrivalTime": "2024-01-04T03:00:00.000Z",
            "transferIds": [],
            "fromId": 4,
            "toId": 3
        }
    ]
}'
