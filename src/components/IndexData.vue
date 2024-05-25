<template>
    <div id="predict">
      <div class="container">
        <div class="row mb-3">
          <div class="col">
            <label for="start-datepicker">开始日期</label>
            <b-form-datepicker
              id="start-datepicker"
              v-model="startdate"
              class="mb-2"
            ></b-form-datepicker>
            <p>startdate: '{{ startdate }}'</p>
            <p>starttime: '{{ starttime }}'</p>
          </div>
          <div class="col">
            <label for="start-timepicker">时间</label>
            <b-form-select
              id="start-timepicker"
              v-model="starttimeselected"
              :options="starttimeoptions"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ starttimeselected }}</strong>
            </div>
          </div>
          <div class="col">
            <label for="end-datepicker">结束时间</label>
            <b-form-datepicker
              id="end-datepicker"
              v-model="enddate"
              class="mb-2"
            ></b-form-datepicker>
            <p>enddate: '{{ enddate }}'</p>
            <p>endtime: '{{ endtime }}'</p>
          </div>
          <div class="col">
            <label for="end-timepicker">时间</label>
            <b-form-select
              id="end-timepicker"
              v-model="endtimeselected"
              :options="endtimeoptions"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ endtimeselected }}</strong>
            </div>
          </div>
          <div class="col">
            <label for="waterSelect" class="form-label">站点选择</label>
            <b-form-select
              v-model="waterselected"
              :options="wateroptions"
              multiple
              :select-size="4"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ waterselected }}</strong>
            </div>
          </div>
          <div class="col">
            <label for="indicatorSelect" class="form-label">指标选择</label>
            <b-form-select
              v-model="indicatorselected"
              :options="indicatoroptions"
              multiple
              :select-size="4"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ indicatorselected }}</strong>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          timeline: '{{ lineTime }}'
          linelegend: '{{ lineLegend }}'
          lineSeries: '{{ lineSeries }}'
          <b-button block variant="primary" v-on:click="updateLineSeries">查询</b-button>
        </div>
        <div class="row mb-3">
          <div id="myChart" :style="{ width: '1000px', height: '600px' }"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WaterData",
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() - 7);
      const maxDate = new Date(today);
      return {
        startdate: this.formatDate(minDate),
        enddate: this.formatDate(maxDate),
        starttimeselected: "00:00:00",
        starttimeoptions: [
          { value: "00:00:00", text: "00" },
          { value: "04:00:00", text: "04" },
          { value: "08:00:00", text: "08" },
          { value: "12:00:00", text: "12" },
          { value: "16:00:00", text: "16" },
          { value: "20:00:00", text: "20" },
        ],
        endtimeselected: "00:00:00",
        endtimeoptions: [
          { value: "00:00:00", text: "00" },
          { value: "04:00:00", text: "04" },
          { value: "08:00:00", text: "08" },
          { value: "12:00:00", text: "12" },
          { value: "16:00:00", text: "16" },
          { value: "20:00:00", text: "20" },
        ],
        starttime: this.formatDate(minDate) + " " + "00:00:00",
        endtime: this.formatDate(maxDate) + " " + "00:00:00",
        waterselected: ["吴村"],
        wateroptions: [
          { value: "吴村", text: "吴村" },
          { value: "大套桥", text: "大套桥" },
        ],
        indicatorselected: ["TOTAL_PHOSPHORUS"],
        indicatoroptions: [
          { value: "TOTAL_PHOSPHORUS", text: "总磷" },
          { value: "PH_VALUE", text: "pH" },
          { value: "DISSOLVED_OXYGEN", text: "溶解氧" },
          { value: "PERMANGANATE_INDEX", text: "高锰酸盐指数" },
          { value: "AMMONIA", text: "氨氮" },
          { value: "TOTAL_NITROGEN", text: "总氮" },
        ],
        lineTime: [],
        lineLegend: [],
        lineSeries: [],
      };
    },
    //实时监听数据
    // TODO: 需要处理起始时间不能大于结束时间的异常
    watch: {
      startdate: function (val) {
        this.starttime = val + " " + this.starttimeselected;
      },
      enddate: function (val) {
        this.endtime = val + " " + this.starttimeselected;
      },
      starttimeselected: function (val) {
        this.starttime = this.startdate + " " + val;
      },
      endtimeselected: function (val) {
        this.endtime = this.enddate + " " + val;
      },
      lineSeries: function(val){
        this.drawLine();
      },
      lineTime: function(){
        this.drawLine();
      }
    },
    //DOM生命周期
    mounted() {
      this.drawLine();
      this.getWaterStations();
    },
    methods: {
      //格式化时间数据
      formatDate: function (date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
      },
      //获取所有站点名
      getWaterStations: async function () {
        const url = "http://water.ecfun.cc:10075/public/water/waterauto_pos";
        let response = await this.$http.get(url);
        const waterstations = [];
        response.data["resData"]["resList"].forEach((station) => {
          //console.log(station);
          waterstations.push({
            value: station["surfaceName"],
            text: station["surfaceName"],
          });
        });
        this.wateroptions = waterstations;
      },
      //更新waterSeries
      updateLineSeries: function () {
        // 清空之前的数据
        this.lineSeries = [];
        this.lineTime = [];
        this.lineLegend = [];
        // init time line
        this.getTimeLine();
          // {
          //   name: "Search Engine",
          //   type: "line",
          //   stack: "Total",
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          // },
        // var series = [];
        var seriesItem = {};
        for (let i = 0; i < this.waterselected.length; ++i) {
          for (let j = 0; j < this.indicatorselected.length; ++j) {
            //获取promise返回值
            this.queryWater(this.waterselected[i], this.indicatorselected[j]).then(val => {
              //init seriesItem
              // seriesItem = {type: "line", stack: "Total"};
              // seriesItem = {type: "line", stack: "x"};
              seriesItem = {type: "line"};
              //add legends
              this.lineLegend.push(this.waterselected[i] + " " + this.indicatorselected[j]);
              //add series
              seriesItem["name"] = this.waterselected[i] + " " + this.indicatorselected[j];
              console.log(val);
              seriesItem["data"] = [];
              for (let index = 0; index < val["resData"]["line"].length; ++index) {
                seriesItem["data"].push(val["resData"]["line"][index]["value"]);
              }
              this.lineSeries.push(seriesItem);
            });
          }
        }
        // this.lineSeries = series;
      },
      //TODO: 考虑多选情况，例如选择多个站点和多个不同指标
      getTimeLine: async function () {
        const url = "http://water.ecfun.cc:10075/public/water/waterauto_trends";
        let response = await this.$http.get(url, {
          params: {
            surfaceName: this.waterselected[0],
            indicator: this.indicatorselected[0],
            startTime: this.starttime,
            endTime: this.endtime,
          },
        });
        this.lineTime = [];
        for (let index = 0; index < response.data["resData"]["line"].length; ++index) {
          this.lineTime.push(response.data["resData"]["line"][index]["time"]);
        }
      },
      //TODO: 考虑多选情况，例如选择多个站点和多个不同指标
      queryWater: async function (surfaceName, indicator) {
        const url = "http://water.ecfun.cc:10075/public/water/waterauto_trends";
        let response = await this.$http.get(url, {
          params: {
            surfaceName: surfaceName,
            indicator: indicator,
            startTime: this.starttime,
            endTime: this.endtime,
          },
        });
        return response.data;
      },
      //echart绘制曲线
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        myChart.setOption({
          title: { text: "水质数据趋势" },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            //data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
            data: this.lineLegend,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            //data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: this.lineTime,
          },
          yAxis: {
            type: "value",
          },
          series: this.lineSeries
        });
        console.log(myChart);
      },
    },
  };
  </script>
  
  
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  
  #myChart {
    position: absolute;
    left: 50%;
    /* top: 50%; */
    /* transform: translate(-50%, -50%); */
    transform: translate(-50%, 0);
    padding: 10px;
  }
  </style>
  