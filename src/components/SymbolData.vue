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
          </div>
          <div class="col">
            <label for="end-datepicker">结束日期</label>
            <b-form-datepicker
              id="end-datepicker"
              v-model="enddate"
              class="mb-2"
            ></b-form-datepicker>
            <p>enddate: '{{ enddate }}'</p>
          </div>
          <div class="col">
            <label for="sympolTypeSelect" class="form-label">类型</label>
            <b-form-select
              v-model="symboltypeselected"
              :options="symboltypeoptions"
              :select-size="4"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ symboltypeselected }}</strong>
            </div>
          </div>
          <div class="col">
            <label for="sympolSelect" class="form-label">指标选择</label>
            <b-form-select
              v-model="symbolselected"
              :options="symboloptions"
              :select-size="4"
            ></b-form-select>
            <div class="mt-3">
              Selected: <strong>{{ symbolselected }}</strong>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <!-- lineSeries: '{{ lineSeries }}' -->
          <b-button block variant="primary" v-on:click="updateLineSeries">查询</b-button>
        </div>
        <div class="row mb-3">
          <div id="candleChart" :style="{ width: '3600px', height: '600px' }"></div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "SymbolDayData",
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() - 365);
      const maxDate = new Date(today);
      // Each item: open，close，lowest，highest
      const lineSeries = [
            ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
            ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
            ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
            ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
            ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
            ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
            ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
            ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
            ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
            ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
            ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
            ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
            ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
            ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
            ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
            ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
            ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
            ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
            ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
            ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
            ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
            ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
            ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
            ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
            ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
            ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
            ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
            ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
            ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
            ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
            ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
            ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
            ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
            ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
            ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
            ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
            ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
            ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89]
        ];
      return {
        startdate: this.formatDate(minDate),
        enddate: this.formatDate(maxDate),
        symboltypeselected: "index",
        symboltypeoptions: [
          { value: "index", text: "index" },
        //   { value: "stock", text: "stock" },
        ],
        symbolselected: "000001.SH",
        symboloptions: [
          { value: "000001.SH", text: "上证指数" },
          { value: "000300.SH", text: "沪深300" },
        ],
        lineSeries: this.splitData(lineSeries),
        upColor: '#ec0000',
        upBorderColor: '#8A0000',
        downColor: '#00da3c',
        downBorderColor: '#008F28',
      };
    },
    //实时监听数据
    watch: {
      lineSeries: function(val){
        this.drawLine();
      },
      symboltypeselected: function(val){
        this.getSymbols();
      },
    },
    //DOM生命周期
    mounted() {
      this.drawLine();
      this.getSymbolType();
      this.getSymbols();
    },
    methods: {
      //TODO: need edit
      splitData: function(rawData) {
        const categoryData = [];
        const values = [];
        for (var i = 0; i < rawData.length; i++) {
            //TODO: need update categoryDate
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
            volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumes: volumes
        };
      },
      formatDate: function (date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        //return [year, month, day].join("-");
        return [year, month, day].join("-");
      },
      formatSeriesDate: function (rawdate) {
        var year = rawdate.substring(0, 4);
        var month = rawdate.substring(4, 6);
        var day = rawdate.substring(6, 8);
        return [year, month, day].join("/");
      },
    //get all symbol type
    getSymbolType: async function () {
        const url = this.$common.baseUrl + "dataprovider/getSymbolType";
        let response = await this.$http.get(url);
        const symboltypeoptions = [];
        // TODO: need update
        response.data["data"]["resList"].forEach((element) => {
            symboltypeoptions.push({
              value: element,
              text: element,
          });
        });
        this.symboltypeoptions = symboltypeoptions;
      },
    //get all symbols
    getSymbols: async function () {
        const url = this.$common.baseUrl + "dataprovider/getSymbols";
        let response = await this.$http.get(url, {
          params: {
            symbolType: this.symboltypeselected,
          },
        });
        const symboloptions = [];
        response.data["data"]["resList"].forEach((element) => {
          symboloptions.push({
            value: element,
            text: element,
          });
        });
        this.symboloptions = symboloptions;
      },
      getSymbolDaily: async function (symbolName, symbolType) {
        const url = this.$common.baseUrl + "dataprovider/getSymbolDaily";
        let response = await this.$http.get(url, {
          params: {
            symbolName: symbolName,
            symbolType: symbolType,
            startTime: this.startdate.split('-').join(''),
            endTime: this.enddate.split('-').join(''),
          },
        });
        return response.data;
      },
      updateLineSeries: function () {
        // clear previous data
        //console.log(this.lineSeries);
        this.lineSeries = [];
        const series = [];
        this.getSymbolDaily(this.symbolselected, this.symboltypeselected).then(val => {
            val['data']['resList'].forEach((element) => {
                element[0] = this.formatSeriesDate(element[0]);
                //console.log(element);
                series.push(element);
            });
            //console.log(series)
            this.lineSeries = this.splitData(series);
            //console.log(this.lineSeries);
        });

      },

      calculateMA: function (dayCount) {
        var result = [];
        for (var i = 0, len = this.lineSeries.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += +this.lineSeries.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
      },
      //echart绘制曲线
      drawLine() {
        let candleChart = this.$echarts.init(document.getElementById("candleChart"));
        candleChart.setOption({
            title: { text: "上证指数" },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
                inactiveColor: '#777'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: {
                type: 'category',
                data: this.lineSeries.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
            ],
            series: [
            {
                name: '日K',
                type: 'candlestick',
                data: this.lineSeries.values,
                itemStyle: {
                    color: this.upColor,
                    color0: this.downColor,
                    borderColor: this.upBorderColor,
                    borderColor0: this.downBorderColor
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        }
                    ],
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: this.calculateMA(5),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: this.calculateMA(10),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: this.calculateMA(20),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: this.calculateMA(30),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            }
            ]
    })
    },
}
}
    

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