# This endpoint is to get energy daily consumption data

Api request endpoint and query:

curl --location 'http://localhost:4000/api/v1/statistic/energyStat/energyDailyConsumption?start_date=2024-04-01&end_date=2024-11-10&energy_type=electricity&organization=684ed176a0158325c82936a3&facility=684ed28b8ab869c2c883f901&tenant=6859e2a954c80f20233cd452' \
--header 'Authorization: Bearer <token>'

Note:
either organization facility or tenant should be provided one at a time

Sample response:

{
"success": true,
"data": {
"message": "energy consumption retrieved successfull",
"stat": [
{
"consumption": 1838.9600000000003,
"datetime": "2024-04-01"
},
{
"consumption": 1759.8600000000004,
"datetime": "2024-04-02"
},
{
"consumption": 1776.66,
"datetime": "2024-04-03"
},
{
"consumption": 1796.480000000001,
"datetime": "2024-04-04"
},
{
"consumption": 1756.0399999999997,
"datetime": "2024-04-05"
},
{
"consumption": 1651.6900000000007,
"datetime": "2024-04-06"
},
{
"consumption": 1775.0099999999998,
"datetime": "2024-04-07"
},
{
"consumption": 1762.8300000000004,
"datetime": "2024-04-08"
},
{
"consumption": 1889.7700000000016,
"datetime": "2024-04-09"
},
{
"consumption": 1828.880000000001,
"datetime": "2024-04-10"
},
{
"consumption": 1941.7799999999997,
"datetime": "2024-04-11"
},
{
"consumption": 1925.9200000000014,
"datetime": "2024-04-12"
},
{
"consumption": 1943.4300000000003,
"datetime": "2024-04-13"
},
{
"consumption": 1848.0000000000007,
"datetime": "2024-04-14"
},
{
"consumption": 1888.7800000000013,
"datetime": "2024-04-15"
},
{
"consumption": 1760.3800000000006,
"datetime": "2024-04-16"
},
{
"consumption": 1811.249999999999,
"datetime": "2024-04-17"
},
{
"consumption": 1834.1699999999996,
"datetime": "2024-04-18"
},
{
"consumption": 1751.4500000000012,
"datetime": "2024-04-19"
},
{
"consumption": 1824.5300000000004,
"datetime": "2024-04-20"
},
{
"consumption": 1847.6200000000001,
"datetime": "2024-04-21"
},
{
"consumption": 1855.2800000000007,
"datetime": "2024-04-22"
},
{
"consumption": 1711.3499999999997,
"datetime": "2024-04-23"
},
{
"consumption": 1768.94,
"datetime": "2024-04-24"
},
{
"consumption": 1784.9299999999998,
"datetime": "2024-04-25"
},
{
"consumption": 1750.220000000001,
"datetime": "2024-04-26"
},
{
"consumption": 1703.2900000000002,
"datetime": "2024-04-27"
},
{
"consumption": 1894.9900000000007,
"datetime": "2024-04-28"
},
{
"consumption": 1907.1300000000003,
"datetime": "2024-04-29"
},
{
"consumption": 1870.560000000001,
"datetime": "2024-04-30"
},
{
"consumption": 1818.9899999999986,
"datetime": "2024-05-01"
},
{
"consumption": 1817.54,
"datetime": "2024-05-02"
},
{
"consumption": 1936.5100000000007,
"datetime": "2024-05-03"
},
{
"consumption": 1999.87,
"datetime": "2024-05-04"
},
{
"consumption": 2138.5400000000004,
"datetime": "2024-05-05"
},
{
"consumption": 2221.4399999999996,
"datetime": "2024-05-06"
},
{
"consumption": 2090.65,
"datetime": "2024-05-07"
},
{
"consumption": 2078.290000000001,
"datetime": "2024-05-08"
},
{
"consumption": 2087.25,
"datetime": "2024-05-09"
},
{
"consumption": 2050.669999999999,
"datetime": "2024-05-10"
},
{
"consumption": 2022.900000000001,
"datetime": "2024-05-11"
},
{
"consumption": 2087.26,
"datetime": "2024-05-12"
},
{
"consumption": 2045.1600000000003,
"datetime": "2024-05-13"
},
{
"consumption": 2085.340000000001,
"datetime": "2024-05-14"
},
{
"consumption": 2214.489999999999,
"datetime": "2024-05-15"
},
{
"consumption": 2240.850000000001,
"datetime": "2024-05-16"
},
{
"consumption": 2385.610000000002,
"datetime": "2024-05-17"
},
{
"consumption": 2435.4699999999993,
"datetime": "2024-05-18"
},
{
"consumption": 2599.3600000000006,
"datetime": "2024-05-19"
},
{
"consumption": 2817.1899999999996,
"datetime": "2024-05-20"
},
{
"consumption": 3013.700000000003,
"datetime": "2024-05-21"
},
{
"consumption": 3139.2399999999984,
"datetime": "2024-05-22"
},
{
"consumption": 3212.439999999999,
"datetime": "2024-05-23"
},
{
"consumption": 2930.3899999999994,
"datetime": "2024-05-24"
},
{
"consumption": 2724.3699999999985,
"datetime": "2024-05-25"
},
{
"consumption": 2513.219999999998,
"datetime": "2024-05-26"
},
{
"consumption": 2482.389999999998,
"datetime": "2024-05-27"
},
{
"consumption": 2304.499999999998,
"datetime": "2024-05-28"
},
{
"consumption": 2266.9500000000016,
"datetime": "2024-05-29"
},
{
"consumption": 2151.6399999999994,
"datetime": "2024-05-30"
},
{
"consumption": 1960.020000000001,
"datetime": "2024-05-31"
},
{
"consumption": 1994.6300000000008,
"datetime": "2024-06-01"
},
{
"consumption": 2255.5,
"datetime": "2024-06-02"
},
{
"consumption": 2257.9,
"datetime": "2024-06-03"
},
{
"consumption": 2273.710000000001,
"datetime": "2024-06-04"
},
{
"consumption": 2472.55,
"datetime": "2024-06-05"
},
{
"consumption": 2420.840000000002,
"datetime": "2024-06-06"
},
{
"consumption": 2452.5899999999997,
"datetime": "2024-06-07"
},
{
"consumption": 2285.0600000000004,
"datetime": "2024-06-08"
},
{
"consumption": 2123.6699999999983,
"datetime": "2024-06-09"
},
{
"consumption": 2234.8700000000003,
"datetime": "2024-06-10"
},
{
"consumption": 1931.2600000000004,
"datetime": "2024-06-11"
},
{
"consumption": 1951.5499999999997,
"datetime": "2024-06-12"
},
{
"consumption": 2044.9000000000005,
"datetime": "2024-06-13"
},
{
"consumption": 2192.24,
"datetime": "2024-06-14"
},
{
"consumption": 2210.3699999999994,
"datetime": "2024-06-15"
},
{
"consumption": 2267.520000000002,
"datetime": "2024-06-16"
},
{
"consumption": 2223.1899999999996,
"datetime": "2024-06-17"
},
{
"consumption": 2485.490000000001,
"datetime": "2024-06-18"
},
{
"consumption": 2994.64,
"datetime": "2024-06-19"
},
{
"consumption": 3197.73,
"datetime": "2024-06-20"
},
{
"consumption": 3381.4000000000005,
"datetime": "2024-06-21"
},
{
"consumption": 3122.819999999999,
"datetime": "2024-06-22"
},
{
"consumption": 2992.19,
"datetime": "2024-06-23"
},
{
"consumption": 3006.2000000000025,
"datetime": "2024-06-24"
},
{
"consumption": 2821.8099999999995,
"datetime": "2024-06-25"
},
{
"consumption": 2904.77,
"datetime": "2024-06-26"
},
{
"consumption": 2785.3399999999983,
"datetime": "2024-06-27"
},
{
"consumption": 2641.950000000001,
"datetime": "2024-06-28"
},
{
"consumption": 2522.990000000001,
"datetime": "2024-06-29"
},
{
"consumption": 2628.3099999999995,
"datetime": "2024-06-30"
},
{
"consumption": 2599.0999999999995,
"datetime": "2024-07-01"
},
{
"consumption": 2546.5600000000004,
"datetime": "2024-07-02"
},
{
"consumption": 2540.73,
"datetime": "2024-07-03"
},
{
"consumption": 2902.63,
"datetime": "2024-07-04"
},
{
"consumption": 3225.4199999999987,
"datetime": "2024-07-05"
},
{
"consumption": 3087.63,
"datetime": "2024-07-06"
},
{
"consumption": 3236.5299999999997,
"datetime": "2024-07-07"
},
{
"consumption": 3307.3399999999983,
"datetime": "2024-07-08"
},
{
"consumption": 3331.8900000000003,
"datetime": "2024-07-09"
},
{
"consumption": 3457.05,
"datetime": "2024-07-10"
},
{
"consumption": 3146.62,
"datetime": "2024-07-11"
},
{
"consumption": 3172.8100000000004,
"datetime": "2024-07-12"
},
{
"consumption": 3273.9600000000014,
"datetime": "2024-07-13"
},
{
"consumption": 3358.949999999998,
"datetime": "2024-07-14"
},
{
"consumption": 3475.750000000001,
"datetime": "2024-07-15"
},
{
"consumption": 3516.6199999999994,
"datetime": "2024-07-16"
},
{
"consumption": 3341.86,
"datetime": "2024-07-17"
},
{
"consumption": 3284.669999999998,
"datetime": "2024-07-18"
},
{
"consumption": 2862.7999999999993,
"datetime": "2024-07-19"
},
{
"consumption": 2726.8800000000006,
"datetime": "2024-07-20"
},
{
"consumption": 2906.56,
"datetime": "2024-07-21"
},
{
"consumption": 3109.2499999999995,
"datetime": "2024-07-22"
},
{
"consumption": 2998.650000000001,
"datetime": "2024-07-23"
},
{
"consumption": 3050.8999999999996,
"datetime": "2024-07-24"
},
{
"consumption": 3058.710000000001,
"datetime": "2024-07-25"
},
{
"consumption": 2917.3200000000015,
"datetime": "2024-07-26"
},
{
"consumption": 2806.419999999999,
"datetime": "2024-07-27"
},
{
"consumption": 2907.640000000001,
"datetime": "2024-07-28"
},
{
"consumption": 3226.469999999999,
"datetime": "2024-07-29"
},
{
"consumption": 3170.5000000000005,
"datetime": "2024-07-30"
},
{
"consumption": 3463.7000000000003,
"datetime": "2024-07-31"
},
{
"consumption": 3575.020000000001,
"datetime": "2024-08-01"
},
{
"consumption": 3714.989999999998,
"datetime": "2024-08-02"
},
{
"consumption": 3713.53,
"datetime": "2024-08-03"
},
{
"consumption": 3791.9999999999995,
"datetime": "2024-08-04"
},
{
"consumption": 3845.9900000000016,
"datetime": "2024-08-05"
},
{
"consumption": 3574.620000000001,
"datetime": "2024-08-06"
},
{
"consumption": 3079.9799999999977,
"datetime": "2024-08-07"
},
{
"consumption": 2894.9900000000016,
"datetime": "2024-08-08"
},
{
"consumption": 2983.3300000000004,
"datetime": "2024-08-09"
},
{
"consumption": 3159.6599999999994,
"datetime": "2024-08-10"
},
{
"consumption": 2830.1699999999983,
"datetime": "2024-08-11"
},
{
"consumption": 2604.1400000000017,
"datetime": "2024-08-12"
},
{
"consumption": 2434.15,
"datetime": "2024-08-13"
},
{
"consumption": 2569.7900000000004,
"datetime": "2024-08-14"
},
{
"consumption": 2686.3499999999995,
"datetime": "2024-08-15"
},
{
"consumption": 2845.679999999999,
"datetime": "2024-08-16"
},
{
"consumption": 2976.140000000001,
"datetime": "2024-08-17"
},
{
"consumption": 3124.1699999999987,
"datetime": "2024-08-18"
},
{
"consumption": 3149.9900000000002,
"datetime": "2024-08-19"
},
{
"consumption": 2486.169999999999,
"datetime": "2024-08-20"
},
{
"consumption": 2213.69,
"datetime": "2024-08-21"
},
{
"consumption": 2031.4399999999996,
"datetime": "2024-08-22"
},
{
"consumption": 2088.55,
"datetime": "2024-08-23"
},
{
"consumption": 2310.0200000000013,
"datetime": "2024-08-24"
},
{
"consumption": 2535.0699999999997,
"datetime": "2024-08-25"
},
{
"consumption": 2770.840000000001,
"datetime": "2024-08-26"
},
{
"consumption": 2885.490000000001,
"datetime": "2024-08-27"
},
{
"consumption": 3165.8399999999983,
"datetime": "2024-08-28"
},
{
"consumption": 3089.18,
"datetime": "2024-08-29"
},
{
"consumption": 2725.879999999999,
"datetime": "2024-08-30"
},
{
"consumption": 2958.1500000000005,
"datetime": "2024-08-31"
},
{
"consumption": 3165.490000000001,
"datetime": "2024-09-01"
},
{
"consumption": 3031.52,
"datetime": "2024-09-02"
},
{
"consumption": 2476.859999999999,
"datetime": "2024-09-03"
},
{
"consumption": 2250.539999999998,
"datetime": "2024-09-04"
},
{
"consumption": 2417.8200000000006,
"datetime": "2024-09-05"
},
{
"consumption": 2523.5700000000006,
"datetime": "2024-09-06"
},
{
"consumption": 2460.749999999998,
"datetime": "2024-09-07"
},
{
"consumption": 2342.1999999999994,
"datetime": "2024-09-08"
},
{
"consumption": 2098.17,
"datetime": "2024-09-09"
},
{
"consumption": 1995.9699999999996,
"datetime": "2024-09-10"
},
{
"consumption": 2018.2399999999993,
"datetime": "2024-09-11"
},
{
"consumption": 2134.0999999999995,
"datetime": "2024-09-12"
},
{
"consumption": 2167.71,
"datetime": "2024-09-13"
},
{
"consumption": 2348.2599999999993,
"datetime": "2024-09-14"
},
{
"consumption": 2504.22,
"datetime": "2024-09-15"
},
{
"consumption": 2804.9800000000005,
"datetime": "2024-09-16"
},
{
"consumption": 2730.2400000000002,
"datetime": "2024-09-17"
},
{
"consumption": 2632.22,
"datetime": "2024-09-18"
},
{
"consumption": 2601.79,
"datetime": "2024-09-19"
},
{
"consumption": 2627.019999999999,
"datetime": "2024-09-20"
},
{
"consumption": 2631.73,
"datetime": "2024-09-21"
},
{
"consumption": 2818.44,
"datetime": "2024-09-22"
},
{
"consumption": 2780.4899999999993,
"datetime": "2024-09-23"
},
{
"consumption": 2550.5700000000015,
"datetime": "2024-09-24"
},
{
"consumption": 2371.28,
"datetime": "2024-09-25"
},
{
"consumption": 2407.1300000000015,
"datetime": "2024-09-26"
},
{
"consumption": 2423.1399999999994,
"datetime": "2024-09-27"
},
{
"consumption": 2409.2999999999993,
"datetime": "2024-09-28"
},
{
"consumption": 2504.9000000000015,
"datetime": "2024-09-29"
},
{
"consumption": 2612.33,
"datetime": "2024-09-30"
},
{
"consumption": 2482.930000000001,
"datetime": "2024-10-01"
},
{
"consumption": 2439.510000000002,
"datetime": "2024-10-02"
},
{
"consumption": 2262.89,
"datetime": "2024-10-03"
},
{
"consumption": 2253.5000000000005,
"datetime": "2024-10-04"
},
{
"consumption": 2216.45,
"datetime": "2024-10-05"
},
{
"consumption": 2277.68,
"datetime": "2024-10-06"
},
{
"consumption": 2493.1900000000014,
"datetime": "2024-10-07"
},
{
"consumption": 2275.880000000001,
"datetime": "2024-10-08"
},
{
"consumption": 2234.9499999999985,
"datetime": "2024-10-09"
},
{
"consumption": 2100.98,
"datetime": "2024-10-10"
},
{
"consumption": 2036.1700000000012,
"datetime": "2024-10-11"
},
{
"consumption": 2167.7799999999997,
"datetime": "2024-10-12"
},
{
"consumption": 2121.73,
"datetime": "2024-10-13"
},
{
"consumption": 2106.489999999999,
"datetime": "2024-10-14"
},
{
"consumption": 2066.7499999999995,
"datetime": "2024-10-15"
},
{
"consumption": 1847.81,
"datetime": "2024-10-16"
},
{
"consumption": 1851.249999999999,
"datetime": "2024-10-17"
},
{
"consumption": 1727.98,
"datetime": "2024-10-18"
},
{
"consumption": 1827.2099999999994,
"datetime": "2024-10-19"
},
{
"consumption": 2043.6699999999994,
"datetime": "2024-10-20"
},
{
"consumption": 2045.2300000000007,
"datetime": "2024-10-21"
},
{
"consumption": 2133.0299999999997,
"datetime": "2024-10-22"
},
{
"consumption": 2165.72,
"datetime": "2024-10-23"
},
{
"consumption": 2118.73,
"datetime": "2024-10-24"
},
{
"consumption": 2018.3100000000006,
"datetime": "2024-10-25"
},
{
"consumption": 1964.0199999999993,
"datetime": "2024-10-26"
},
{
"consumption": 1950.43,
"datetime": "2024-10-27"
},
{
"consumption": 1949.9499999999994,
"datetime": "2024-10-28"
},
{
"consumption": 1848.42,
"datetime": "2024-10-29"
},
{
"consumption": 1850.9099999999996,
"datetime": "2024-10-30"
},
{
"consumption": 1941.0399999999995,
"datetime": "2024-10-31"
},
{
"consumption": 1848.8600000000006,
"datetime": "2024-11-01"
},
{
"consumption": 1888.7799999999997,
"datetime": "2024-11-02"
},
{
"consumption": 1902.4900000000002,
"datetime": "2024-11-03"
},
{
"consumption": 2000.6000000000001,
"datetime": "2024-11-04"
},
{
"consumption": 1867.2400000000005,
"datetime": "2024-11-05"
},
{
"consumption": 2014.9700000000005,
"datetime": "2024-11-06"
},
{
"consumption": 2001.5200000000002,
"datetime": "2024-11-07"
},
{
"consumption": 1910.0899999999995,
"datetime": "2024-11-08"
},
{
"consumption": 1862.66,
"datetime": "2024-11-09"
},
{
"consumption": 1880.2400000000016,
"datetime": "2024-11-10"
}
]
}
}
