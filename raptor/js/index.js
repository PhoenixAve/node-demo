// https://www.jianshu.com/p/31534691ed53
// 读取本地excel文件
async function readWorkbookFromLocalFile(file, callback) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      resolve(workbook);
    };
    reader.readAsBinaryString(file);
  });
}
let count = 0;

function deepParseData(str) {
  try {
    const obj = typeof str === 'object' ? str : JSON.parse(str);
    if (typeof obj === "object") {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const item = obj[key];
          if (typeof item === "string") {
            obj[key] = deepParseData(item);
          }
        }
      }
    }
    return obj;
  } catch (error) {
    return str;
  }
}

const app = new Vue({
  el: ".container",
  data: {
    file: null,
    activeName: "",
    columns: [
      {
        prop: "_mt_datetime",
        label: "上报时间",
        width: 160,
      },
      {
        prop: "pageurl",
        label: "页面标识",
        width: 80,
      },
      {
        prop: "realurl",
        label: "页面地址",
        width: 160,
      },
      {
        prop: "logContent",
        label: "logContent",
        width: 180,
      },
      {
        prop: "_mt_message",
        label: "消息",
        width: 80,
      },
    ],
    tablesMap: null,
    currentMessage: "",
    visible: false,
  },
  methods: {
    onChange(file, fileList) {
      this.file = file;
      this.toJson();
    },
    async toJson() {
      const { SheetNames, Sheets } = await readWorkbookFromLocalFile(
        this.file.raw
      );
      // 这里只取第一个sheet
      const workSheets = Sheets[SheetNames[0]];
      const sheetRows = XLSX.utils.sheet_to_json(workSheets, { header: 1 });
      this.formatJson(sheetRows);
    },
    formatJson(data) {
      const header = data[0];
      const body = data.slice(1, data.length);
      const tablesMap = {};
      body.forEach((item) => {
        const cellData = {};
        header.forEach((column, index) => {
          if (column === "_mt_message") {
            const obj = deepParseData(item[index]);
            // const obj = JSON.parse(item[index]);
            // obj.dynamicMetrics = JSON.parse(obj.dynamicMetrics);
            // obj.dynamicMetrics.error = JSON.parse(
            //   obj.dynamicMetrics.error || "{}"
            // );
            cellData[column] = obj;
            cellData.logContent = obj.logContent;
          } else if (column === "seccategory") {
            if (tablesMap[item[index]]) {
              tablesMap[item[index]].tableData.push(cellData);
            } else {
              tablesMap[item[index]] = {
                tableData: [cellData],
              };
            }
          } else {
            cellData[column] = item[index];
          }
        });
      });
      this.formatLogContent(tablesMap);
      this.tablesMap = tablesMap;
      console.log(JSON.stringify(this.tablesMap))
      this.activeName = Object.keys(tablesMap)[0];
    },
    formatLogContent(map) {
      for (const key in map) {
        if (Object.hasOwnProperty.call(map, key)) {
          const item = map[key];
          const hash = {};
          item.tableData.forEach((cell) => {
            const logContent = (cell.logContent || "").split("<br/>")[0];
            if (hash[logContent]) {
              hash[logContent].count++;
            } else {
              hash[logContent] = {
                count: 1,
              };
            }
          });
          item.logContents = [];
          for (const log in hash) {
            if (Object.hasOwnProperty.call(hash, log)) {
              const ele = hash[log];
              item.logContents.push({
                prop: log,
                percent:
                  ((ele.count / item.tableData.length) * 100).toFixed(2) + "%",
                ...ele,
              });
            }
          }
        }
      }
    },
    showMessage(msg) {
      this.currentMessage = JSON.stringify(msg);
      this.visible = true;
    },
  },
});
