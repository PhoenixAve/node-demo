const topLayout = [
  {
    type: "group",
    direction: "horizontal", //左右
    height: "30%",
    width: "100%",
    children: [
      {
        type: "group",
        direction: "portrait", //上下
        width: "40%",
        height: "100%",
        children: [
          {
            type: "node",
            index: 2,
          },
          {
            type: "node",
            index: 3,
          },
        ],
      },
      {
        type: "group",
        direction: "portrait", // 上下
        width: "60%",
        height: "100%",
        children: [
          {
            type: "group",
            width: "100%",
            height: "80%",
            direction: "horizontal",
            children: [
              {
                type: "node",
                index: 1,
              },
              {
                type: "node",
                index: 0,
              },
            ],
          },
          {
            type: "group",
            direction: "portrait", // 上下
            width: "100%",
            height: "20%",
            children: [
              {
                type: "node",
                index: 4,
              },
            ],
          },
        ],
      },
    ],
  },
];
const centerLayout = [
  {
    type: "group",
    direction: "horizontal", //左右
    height: "30%",
    width: "100%",
    children: [
      {
        type: "group",
        width: "50%",
        height: "100%",
        direction: "portrait",
        children: [
          {
            type: "node",
            index: 5,
          },
          {
            type: "node",
            index: 7,
          },
        ],
      },
      {
        type: "group",
        width: "50%",
        height: "100%",
        direction: "horizontal",
        children: [
          {
            type: "node",
            index: 8,
          },
          {
            type: "node",
            index: 6,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    width: "100%",
    height: "30%",
    direction: "horizontal",
    children: [
      {
        type: "node",
        index: 8,
      },
      {
        type: "node",
        index: 6,
      },
      {
        type: "node",
        index: 5,
      },
      {
        type: "node",
        index: 7,
      },
    ],
  },
];
const bottomLayout = [
  {
    type: "group",
    width: "100%",
    height: "40%",
    direction: "horizontal",
    children: [
      {
        type: "group",
        width: "30%",
        height: "100%",
        direction: "portrait",
        children: [
          {
            type: "node",
            index: 9,
          },
          {
            type: "node",
            index: 11,
          },
          {
            type: "node",
            index: 10,
          },
        ],
      },
      {
        type: "group",
        width: "70%",
        height: "100%",
        direction: "portrait",
        children: [
          {
            type: "group",
            width: "100%",
            height: "30%",
            direction: "horizontal",
            children: [
              {
                type: "node",
                index: 12,
              },
              {
                type: "node",
                index: 16,
              },
            ],
          },
          {
            type: "group",
            width: "100%",
            height: "70%",
            direction: "horizontal",
            children: [
              {
                type: "group",
                width: "50%",
                height: "100%",
                direction: "horizontal",
                children: [
                  {
                    type: "node",
                    index: 17,
                  },
                ],
              },
              {
                type: "group",
                width: "50%",
                height: "100%",
                direction: "portrait",
                children: [
                  {
                    type: "node",
                    index: 13,
                  },
                  {
                    type: "node",
                    index: 14,
                  },
                  {
                    type: "node",
                    index: 15,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "group",
    width: "100%",
    height: "40%",
    direction: "portrait",
    children: [
      {
        type: "group",
        width: "100%",
        height: "30%",
        direction: "horizontal",
        children: [
          {
            type: "node",
            index: 9,
          },
          {
            type: "node",
            index: 11,
          },
          {
            type: "node",
            index: 10,
          },
        ],
      },
      {
        type: "group",
        width: "100%",
        height: "70%",
        direction: "horizontal",
        children: [
          {
            type: "group",
            width: "60%",
            height: "100%",
            direction: "portrait",
            children: [
              {
                type: "node",
                index: 12,
              },
              {
                type: "node",
                index: 13,
              },
            ],
          },
          {
            type: "group",
            width: "40%",
            height: "100%",
            direction: "portrait",
            children: [
              {
                type: "group",
                width: "100%",
                height: "30%",
                direction: "portrait",
                children: [
                  {
                    type: "node",
                    index: 14,
                  },
                ],
              },{
                type: "group",
                width: "100%",
                height: "40%",
                direction: "horizontal",
                children: [
                  {
                    type: "node",
                    index: 16,
                  },
                  {
                    type: "node",
                    index: 17,
                  },
                ],
              },{
                type: "group",
                width: "100%",
                height: "30%",
                direction: "horizontal",
                children: [
                  {
                    type: "node",
                    index: 15,
                  },
                ],
              }
            ],
          },
        ],
      },
    ],
  },
];

function getRandom(min = 0, max = 500) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomLayout(layout) {
  return layout[getRandom(0, layout.length - 1)];
}

function getLayout() {
  return [
    getRandomLayout(topLayout),
    getRandomLayout(centerLayout),
    getRandomLayout(bottomLayout),
  ];
}

const colors = [
  "red",
  "green",
  "purple",
  "pink",
  "orange",
  "yellowgreen",
  "greenyellow",
];

function percentToPx(cur, compared) {
  if (typeof cur !== "string" || !cur.includes("%")) return cur;
  return (compared * parseFloat(cur)) / 100;
}
