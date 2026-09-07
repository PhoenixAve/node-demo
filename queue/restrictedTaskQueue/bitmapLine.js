const dom = document.createElement("div");
const chart = echarts.init(dom);

const getTrendResult = (length) => {
  const date = [];
  const data = [];
  for (let i = 0; i < 10; i++) {
    date.push("2022-" + i);
    data.push(Math.random());
  }
  return { date, data };
};
const createOption = (source) => {
  const { color, seriesData, xAxisData } = source;
  return {
    grid: { left: "0%", top: "5%", width: "100%", height: "90%" },
    xAxis: {
      show: false,
      data: xAxisData,
    },
    yAxis: {
      show: false,
      boundaryGap: [0, 0],
      min: "dataMin",
      max: "dataMax",
    },
    series: [
      {
        color,
        type: "line",
        animation: false,
        data: seriesData,
        showSymbol: false,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(61,126,255,0.3) ", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(61,126,255,0.02)", // 100% 处的颜色
              },
            ],
          },
        },
        lineStyle: {
          width: 1,
        },
      },
    ],
  };
};
// 生成小背景图
window.bitmapLine = {
  update: (callback) => {
    const trendResult = getTrendResult(10);
    const vo = {
      width: 100,
      height: 26,
      color: "rgba(61,126,255,1)",
      xAxisData: trendResult.date,
      seriesData: trendResult.data,
    };
    chart.resize({ width: vo.width, height: vo.height });
    chart.setOption(createOption(vo));
    dom.querySelector("canvas").toBlob((blob) => {
      callback(URL.createObjectURL(blob));
    });
  },
};

