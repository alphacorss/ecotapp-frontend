# This endpoint is to get energy realtime data

Api request endpoint and query:

curl --location 'http://localhost:4000/api/v1/statistic/energyStat/energyForcast?energy_type=electricity&facility=684ed28b8ab869c2c883f901&tenant=6859e2a954c80f20233cd452' \
--header 'Authorization: Bearer <token>'

Note:
either facility or tenant should be provided one at a time

Sample response:

{
"success": true,
"data": {
"message": "energy forecast retrieved successfull",
"stat": [
{
"datetime": "2025-06-18",
"lowerRange": 2132.938429339923,
"upperRange": 2338.7078448863836
},
{
"datetime": "2025-06-19",
"lowerRange": 2164.744181822933,
"upperRange": 2370.5135973693937
},
{
"datetime": "2025-06-20",
"lowerRange": 2046.193636726834,
"upperRange": 2251.9630522732946
},
{
"datetime": "2025-06-21",
"lowerRange": 2133.5429059071316,
"upperRange": 2339.312321453592
},
{
"datetime": "2025-06-22",
"lowerRange": 2122.1185642809646,
"upperRange": 2327.887979827425
},
{
"datetime": "2025-06-23",
"lowerRange": 2120.8748165265697,
"upperRange": 2326.6442320730303
},
{
"datetime": "2025-06-24",
"lowerRange": 2195.6557449925913,
"upperRange": 2401.425160539052
},
{
"datetime": "2025-06-25",
"lowerRange": 2189.703052316405,
"upperRange": 2395.4724678628654
},
{
"datetime": "2025-06-26",
"lowerRange": 2125.026066164471,
"upperRange": 2330.7954817109317
},
{
"datetime": "2025-06-27",
"lowerRange": 2126.0993106425776,
"upperRange": 2331.868726189038
},
{
"datetime": "2025-06-28",
"lowerRange": 2133.9600470487253,
"upperRange": 2339.729462595186
},
{
"datetime": "2025-06-29",
"lowerRange": 2030.0909740007896,
"upperRange": 2235.86038954725
},
{
"datetime": "2025-06-30",
"lowerRange": 2228.9269897396343,
"upperRange": 2434.696405286095
}
]
}
}
