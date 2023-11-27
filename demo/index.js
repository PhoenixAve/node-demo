const data = require('./data'); 

const xAxisData = []
data.forEach(item => {
  xAxisData.push(...item.content.map(v => v.datekey))
})

const xAxis = Array.from(new Set(xAxisData)).sort();

const seriesData = [];

const assetTypeToItemMap = {}

data.forEach(item => {
  const formatDataMap = {}
  item.content.forEach(con => {
    formatDataMap[con.datekey] = con.assetCnt
  })
  assetTypeToItemMap[item.assetType] = formatDataMap;
})

for (const name in assetTypeToItemMap) {
  if (Reflect.has(assetTypeToItemMap, name)) {
    const formatDataMap = assetTypeToItemMap[name];
    const data = xAxis.map(item => {
      return formatDataMap[item] || null
    })
    seriesData.push({
      name,
      data
    })
  }
}

console.log(seriesData)