<template>
  <div :style="{ background: `url(${bg})` }" class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaToday.input }}</div>
          <div>{{ store.chinaToday.confirm }}</div>
          <div>今日现有确诊</div>
        </section>
        <section>
          <div>较上日+ 128</div>
          <div>{{ store.chinaToday.heal }}</div>
          <div>今日现有治愈</div>
        </section>
        <section>
          <div>较上日+ 12</div>
          <div>{{ store.chinaToday.dead }}</div>
          <div>今日现有死亡</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaTotal.input }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计现有确诊</div>
        </section>
        <section>
          <div>较上日+ 2342</div>
          <div>{{ store.chinaTotal.heal }}</div>
          <div>累计现有治愈</div>
        </section>
        <section>
          <div>较上日+ 456</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计现有死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center"></div>
    <div class="box-right">
      <table class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增</th>
            <th>确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group tag="tbody" enter-active-class="animate__animated  animate__flipInY ">
          <tr v-for="item in store.item" :key="item.id">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from "./assets/1.jpg";
import { useStore } from "./stores";
import { onMounted } from "vue";
import * as echarts from "echarts";
import "./assets/china";
import { geoCoordMap } from "./assets/geoMap";
import "animate.css";

const store = useStore();

onMounted(async () => {
  await store.getList();
  initChinaCharts();
  initPieCharts();
  initLineCharts();
});

// 地图配置
const initChinaCharts = () => {
  // 省份数据
  const province = store.list.areaTree[2].children;
  store.item = province[21].children;

  const data = province.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.confirm),
      children: v.children,
    };
  });

  // 获取DOM元素
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);

  // 图表配置
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });

  // 监听图表点击事件
  charts.on("click", (e: any) => {
    store.item = e.data.children;
    // console.log("store.item:", store.item);
  });
};

// 饼图配置
const initPieCharts = () => {
  const charts = echarts.init(document.querySelector(".box-left-pie") as HTMLElement);
  // console.log("cityDetail", store.cityDetail);

  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
        },

        data: store.cityDetail.map((v) => {
          return {
            name: v.name,
            value: v.total.confirm,
          };
        }),
      },
    ],
  });
};

// 折线图配置
const initLineCharts = () => {
  const charts = echarts.init(document.querySelector(".box-left-line") as HTMLElement);
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: store.cityDetail.map((v) => v.name),
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    label: {
      show: true,
    },
    series: [
      {
        data: store.cityDetail.map((v) => v.total.confirm),
        type: "line",
        smooth: true,
      },
    ],
  });
};
</script>

<style scoped lang="less">
@itemBg: #223651;
@itemBorder: #212028;
@itemColor: #41b0db;

.box {
  width: 100vw;
  height: 100vh;
  padding: 15px;
  display: flex;
  overflow: hidden;
  &-left {
    width: 400px;
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    &-pie {
      height: 320px;
      margin-top: 20px;
    }
    &-line {
      height: 320px;
      margin-top: 20px;
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
.table {
  width: 100%;
  background-color: #212028;
  display: block;
  max-height: 650px;
  overflow: auto;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }
    td {
      width: 100px;
      padding: 8px 12px;
      white-space: nowrap;
    }
  }
}
table,
table td,
table th {
  color: #fff;
  border: 1px solid #fff;
}
.box-left {
  color: #fff;
}
</style>
