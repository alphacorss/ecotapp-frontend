# This endpoint is to get energy total consumption data

Api request endpoint and query:

curl --location 'http://localhost:4000/api/v1/statistic/energyStat/energyTotalDailyConsumption?start_date=2024-04-01&end_date=2024-11-10&energy_type=electricity&facility=684ed28b8ab869c2c883f901&tenant=6859e2a954c80f20233cd452' \
--header 'Authorization: Bearer <token>'

Note: either facility or tenant should be provided one at a time

Sample response:

{
"success": true,
"data": {
"message": "energy consumption retrieved successfull",
"stat": {
"total_consumption_till_date": 52374.4
}
}
}
