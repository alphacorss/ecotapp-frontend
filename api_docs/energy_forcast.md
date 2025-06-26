# This endpoint is to get energy forecast data

Api request endpoint and query :

curl --location 'http://localhost:4000/api/v1/statistic/energyStat/regression/consumption?start\*date=2024-04-01&end_date=2024-11-10&energy_type=gas&organization=684ed176a0158325c82936a3&facility=684ed28b8ab869c2c883f901' \
--header 'Authorization: Bearer <token>'

Note:
either organization or facility should be provided one at a time



Sample response :

{
"success": true,
"data": {
"message": "energy forecast retrieved successfull",
"stat": [
{
"datetime": "2025-01-19",
"lowerRange": 8.78375323176953,
"upperRange": 15.626213513607055
},
{
"datetime": "2025-01-20",
"lowerRange": 6.033440478449788,
"upperRange": 12.875900760287315
},
{
"datetime": "2025-01-21",
"lowerRange": 7.842564668661084,
"upperRange": 14.685024950498612
},
{
"datetime": "2025-01-22",
"lowerRange": 6.969287041431394,
"upperRange": 13.811747323268921
},
{
"datetime": "2025-01-23",
"lowerRange": 12.218965655570951,
"upperRange": 19.06142593740848
},
{
"datetime": "2025-01-24",
"lowerRange": 7.198415225749936,
"upperRange": 14.040875507587462
},
{
"datetime": "2025-01-25",
"lowerRange": 7.62033751130673,
"upperRange": 14.462797793144258
},
{
"datetime": "2025-01-26",
"lowerRange": 5.425602954631773,
"upperRange": 12.268063236469299
},
{
"datetime": "2025-01-27",
"lowerRange": 6.038441512590375,
"upperRange": 12.880901794427903
},
{
"datetime": "2025-01-28",
"lowerRange": 8.20090434551808,
"upperRange": 15.043364627355604
},
{
"datetime": "2025-01-29",
"lowerRange": 9.520388320690124,
"upperRange": 16.36284860252765
},
{
"datetime": "2025-01-30",
"lowerRange": 9.619461582904783,
"upperRange": 16.46192186474231
},
{
"datetime": "2025-01-31",
"lowerRange": 7.783422524934736,
"upperRange": 14.625882806772264
}
]
}
}
