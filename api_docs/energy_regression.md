# This is used to get energy regression data

Api request endpoint and query:

curl --location 'http://localhost:4000/api/v1/statistic/energyStat/energyLinearRegression?start_date=2024-01-01&end_date=2024-06-10&energy_type=gas&facility=684ed28b8ab869c2c883f901' \
--header 'Authorization: Bearer <token>'

Note:
this supports only facility

Sample response:

{
"success": true,
"data": {
"message": "energy linear regression retrieved successfull",
"stat": {
"correlation": 0.39046411233829165,
"intercept": 43216.76931111453,
"slope": 28.554330400771644
}
}
}
