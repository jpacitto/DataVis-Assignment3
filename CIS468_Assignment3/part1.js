function createVis(data)
{
    mapData = data[0];
    stationData = data[1];

    console.log(mapData);
    // All of your code should go here or call the functions that use mapData and stationData
}

// this loads the data and calls the createVis function
Promise.all([d3.json("https://gitcdn.xyz/repo/dakoop/fb4d65af84db0ee3f2233e02cdeb1874/raw/9a819d894ff29f786b61b7c3d0fa18f84b244362/nyc-community-districts.geojson"),
    d3.csv("https://gitcdn.xyz/repo/dakoop/fb4d65af84db0ee3f2233e02cdeb1874/raw/bb31d4c41bda64891455a68741accdfef40aeef3/bikeStationData.json")]).then(createVis)