<template>
    <div class="container">
      <div class="row mb-3">
      <div class="col">
        <b-form-group
          label="类型"
          label-for="money-type">
        <b-form-select 
          id="money-type" 
          v-model="moneyType" 
          :options="moneyTypeOptions" 
          multiple
          :select-size="4">
        </b-form-select>
        </b-form-group>
      </div>
      <div class="col">
        <b-form-group
          label="时间类型"
          label-for="time-type"
        >
          <b-form-select 
            id="time-type" 
            v-model="timeType" 
            :options="timeTypeOptions"
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
      <div class="row mb-3">
      <div v-if="timeType == 'customize'">
      <div class="col">
        <label for="start-time">开始时间</label>
          <b-form-datepicker 
              id="start-time"
              v-model="startTime"
              class="mb-2"
              required
          ></b-form-datepicker>
      </div>
      <div class="col">
        <label for="end-time">结束时间</label>
          <b-form-datepicker 
              id="end-time"
              v-model="endTime"
              class="mb-2"
              required
          ></b-form-datepicker>
      </div>
      </div>
      <div v-if="timeType == 'month'">
      <div class="col">
        <b-form-group
          label="年"
          label-for="year"
        >
        <b-form-select 
            id="year" 
            v-model="year" 
            :options="yearOptions"
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col">
        <b-form-group
          label="月"
          label-for="month"
        >
        <b-form-select 
            id="month" 
            v-model="month" 
            :options="monthOptions"
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
      </div>
      <div v-if="timeType == 'year'">
      <div class="col">
        <b-form-group
          label="年"
          label-for="year"
        >
        <b-form-select 
            id="year" 
            v-model="year" 
            :options="yearOptions"
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
      </div>
      </div>
      <div class="row mb-3">
      <div class="col">
        <b-form-group
          label="明细科目"
          label-for="sub-type"
        >
          <b-form-select 
            id="sub-type" 
            v-model="subtypeId" 
            :options="subtypeIdOptions"
            multiple
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
  
      <div class="col">
        <b-form-group
          label="币种"
          label-for="money-type"
        >
          <b-form-select 
            id="money-type" 
            v-model="currency" 
            :options="currencyOptions"
            multiple
            :select-size="4">
          </b-form-select>
        </b-form-group>
      </div>
      </div>
      </div>
  
        <b-button variant="primary" @click="onSubmit">查询</b-button>
        <b-button variant="danger" @click="onReset">重置</b-button>
        
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">用户:{{ userId }}</pre>
          <pre class="m-0">年:{{ year }}</pre>
          <pre class="m-0">月:{{ month }}</pre>
          <pre class="m-0">开始时间:{{ startTime }}</pre>
          <pre class="m-0">结束时间:{{ endTime }}</pre>
          <pre class="m-0">类型:{{ moneyType }}</pre>
          <pre class="m-0">明细:{{ subtypeId }}</pre>
          <pre class="m-0">币种:{{ currency }}</pre>
        </b-card>
        <div class="row mb-3">
          <h4>总收入{{ totalIncome }}</h4><h4>总支出{{ totalExpenses }}</h4>
        </div>
        <div class="row mb-3">
          <div id="barChart" :style="{ width: '1000px', height: '600px' }"></div>
        </div>
        <div class="row mb-3">
          <div id="pieChart" :style="{ width: '1000px', height: '600px' }"></div>
        </div>
        <b-table striped hover :items="items" :per-page="pageSize" :current-page="curPage" :fields="fields" id="tracks-table"></b-table>
        <b-pagination
          v-model="curPage"
          :total-rows="rows"
          :per-page="pageSize"
          aria-controls="tracks-table"
        ></b-pagination>
  
        <p class="mt-3">Current Page: {{ curPage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrackList',
     data() {
        const maxDate = new Date();
        const minDate = new Date();
        minDate.setMonth(maxDate.getMonth() - 12);
        maxDate.setDate(0);
        return {
            userId: '',
            startTime: this.formatDate(minDate),
            endTime: this.formatDate(maxDate),
            year: this.getLastYearMonth()[0],
            month: this.getLastYearMonth()[1],
            moneyType: ['expenses','income'],
            currency: ['CNY'],
            subtypeId: [''],
            timeType: 'month',
            timeTypeOptions: [
              { value: "customize", text: "自定义" },
              { value: "month", text: "月账单" },
              { value: "year", text: "年账单" },
            ],
            moneyTypeOptions: [
              { value: "income", text: "收入" },
              { value: "expenses", text: "支出" },
            ],
            yearOptions: [
              { value: "2023", text: "2023" },
              { value: "2022", text: "2021" },
              { value: "2021", text: "2022" },
            ],
            monthOptions: [
              { value: "1", text: "1" },
              { value: "2", text: "2" },
              { value: "3", text: "3" },
              { value: "4", text: "4" },
              { value: "5", text: "5" },
              { value: "6", text: "6" },
              { value: "7", text: "7" },
              { value: "8", text: "8" },
              { value: "9", text: "9" },
              { value: "10", text: "10" },
              { value: "11", text: "11" },
              { value: "12", text: "12" },
            ],
            subtypeIdOptions: [],
            currencyOptions: [
              { value: "CNY", text: "人民币" },
              { value: "USD", text: "美元" },
            ],
            isTimeRange: false,
            pageSize: 10,
            curPage: 1,
            barMonthTime: [],
            barMonthIncomeData: [],
            barMonthExpensesData: [],
            totalIncome: "",
            totalExpenses: "",
            pieIncomeData: [],
            pieExpensesData: [],
            fields: [
            {
              key: 'trackId',
              label: '记账编号',
            },
            {
              key: 'time',
              label: '记账时间',
            },
            {
              key: 'moneyType',
              label: '记账类型'
            },
            {
              key: 'money',
              label: '金额',
              sortable: true,
            },
            {
              key: 'currency',
              label: '币种',
            },
            {
              key: 'subtypeName',
              label: '子类型',
            },
            {
              key: 'tag',
              label: '标签',
            },
            {
              key: 'remark',
              label: '备注',
            },
            {
              key: 'delete',
              label: '删除',
            },
  
          ],
          items: [
            {
              "trackId": "0",
              "time": "2022-8-23 00:00:00",
              "moneyType": "income",
              "money": "200.00",
              "currency": "CNY",
              "subtypeName": "account",
              "tag": "",
              "remark": "",
            },
            {
              "trackId": "1",
              "time": "2022-8-24 00:00:00",
              "moneyType": "expenses",
              "money": "200.00",
              "currency": "CNY",
              "subtypeName": "account",
              "tag": "",
              "remark": "",
            },
          ]
        }
      },
      //DOM生命周期
      mounted() {
          this.getUserid().then(this.getTracks);
          this.getYears();
          this.drawMonthBar();
          this.drawPie();
      },
      computed: {  
        rows() {
          return this.items.length
        }
      },
      watch: {
        moneyType: function(val) {
          //if(this.moneyType.length == 1){
            //this.getTypeSubs(this.moneyType[0]);
            //this.getTypeSubs(this.moneyType);
          //}else{
            //this.subtypeId = [''];
          //}
          this.getTypeSubs(this.moneyType);
        },
        timeType: function(){
          if(this.timeType == 'year'){
              const dateResults = this.getLast12months(this.year, this.month);
              this.startTime = this.formatDate(dateResults[0]);
              this.endTime = this.formatDate(dateResults[1]);
          } else if(this.timeType == 'customize'){
              const now = new Date();
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const minDate = new Date(today);
              minDate.setDate(minDate.getDate() - 7);
              const maxDate = new Date(today);
              this.startTime = this.formatDate(minDate);
              this.endTime = this.formatDate(maxDate);
          }else if (this.timeType == 'month'){
              const dateResults = this.getThisMonth(this.year, this.month);
              this.startTime = this.formatDate(dateResults[0]);
              this.endTime = this.formatDate(dateResults[1]);
          }else{
              const now = new Date();
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const minDate = new Date(today);
              minDate.setDate(minDate.getDate() - 7);
              const maxDate = new Date(today);
              this.startTime = this.formatDate(minDate);
              this.endTime = this.formatDate(maxDate);
          }
        },
        year: function(val) {
          this.initDate();
          val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
          if(this.timeType == 'month'){
              this.year = val;
          }else{
              const dateResults = this.getLast12months(this.year, this.month);
              this.startTime = this.formatDate(dateResults[0]);
              this.endTime = this.formatDate(dateResults[1]);
          }
        },
        month: function(val) {
          this.initDate();
          this.month = val;
          const dateResults = this.getThisMonth(this.year, this.month);
          this.startTime = this.formatDate(dateResults[0]);
          this.endTime = this.formatDate(dateResults[1]);
        },
        startTime: function(val) {
          val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
          this.startTime = val;
        },
        endTime: function(val) {
          val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
          this.endTime = val;
        },
        barMonthTime: function(val){
          this.drawMonthBar();
          this.drawPie();
        },
        barMonthIncomeData: function(val){
          this.drawMonthBar();
          this.drawPie();
        },
        barMonthExpensesData: function(val){
          this.drawMonthBar();
          this.drawPie();
        },
        items: {
          handler: function(val){
            console.log("process items");
            for(let i = 0; i < val.length; i++){
              //val[i].accValue = val[i].accValue.trim().replace(/(\r\n|\n|\r)/gm, "");
              val[i].money = (val[i].money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
              this.items[i].money = val[i].money;
            }
          },
            deep: true
        },
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
        //初始化时间
        initDate: function () {
          this.startTime = '';
          this.endTime = '';
        },
        getLastYearMonth: function(){
          const now = new Date();
          var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          var month = "" + (today.getMonth() + 1);
          var year = today.getFullYear();
          return [year, month]
        },
        getLast7days: function(){
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const minDate = new Date(today);
          minDate.setDate(minDate.getDate() - 7);
          const maxDate = new Date(today);
          return [minDate, maxDate]
        },
        getThisMonth: function(year, month){
          const minDate = new Date(year, month, 1);
          minDate.setMonth(minDate.getMonth() - 1);
          const maxDate = new Date(year, month, 1);
          //maxDate.setMonth(maxDate.getMonth() + 1);
          console.log("maxDate", this.formatDate(maxDate));
          console.log("minDate", this.formatDate(minDate));
          return [minDate, maxDate]
        },
        getLast12months: function(year, month){
          const maxDate = new Date(year, month, 1);
          const minDate = new Date();
          minDate.setMonth(maxDate.getMonth() - 12);
          maxDate.setDate(0);
          console.log("maxDate", this.formatDate(maxDate));
          console.log("minDate", this.formatDate(minDate))
          return [minDate, maxDate]
        },
        onSubmit(event) {
          this.getTracks();
          //this.onReset();
        },
        onReset(event) {
          const dateResults = this.getLast7days();
          this.startTime = this.formatDate(dateResults[0]);
          this.endTime =  this.formatDate(dateResults[1]);
          this.moneyType = ['expenses','income'];
          this.currency = ['CNY'];
          this.subtypeId = [''];
        },
        getTypeSubs: async function (moneyType) {
          const url = this.$common.baseUrl + "money_tracker/showtypes";
          let response = await this.$http.get(url, {
              params: {
                  moneyType: moneyType.toString()
              }
          });
          const typeSubs = [];
          response.data["resData"]["subtypes"].forEach((subs) => {
            typeSubs.push({
              value: subs["subtypeId"],
              text: subs["subname"],
            });
          });
          this.subtypeIdOptions = typeSubs;
        },
        getYears: async function () {
          const url = this.$common.baseUrl + "money_tracker/showyears";
          let response = await this.$http.get(url);
          const yearList = [];
          response.data["resData"].forEach((results) => {
            yearList.push({
              value: results,
              text: results,
            });
          });
          this.yearOptions = yearList;
        },
        getUserid: async function () {
          const url = this.$common.baseUrl + "money_tracker/finduserid";
          let response = await this.$http.get(url, {
            params: {
              username: this.$route.params.username,
            },
          }).then(response => {
                if(response.data['code']=='1'){
                  this.userId = response.data['resData']['userid'];
                }else{
                  alert(response.data['msg']);
                }
              }).catch(function (error) {
              console.log(error);
          });
        },
        getTracks: async function () {
          //console.log(this.$common.baseUrl)
          const url = this.$common.baseUrl + "money_tracker/showtracks";
          this.$http.get(url, {
              params: {
                  userId: this.userId,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  moneyType: this.moneyType.toString(),
                  currency: this.currency.toString(),
                  subtypeId: this.subtypeId.toString(),
              }}).then(response => {
                  this.items = response.data['resData']['resList'];
                  //console.log(response.data["resData"]['expensesMonths']);
                  const barMonth = [];
                  const barMonthIncome = [];
                  const barMonthExpenses = [];
                  const pieIncome = [];
                  const pieExpenses = [];
                  //line expenses
                  for (var key in response.data["resData"]["expensesMonths"]) {
                      barMonthExpenses.push(response.data["resData"]["expensesMonths"][key]);
                      barMonth.push(key);
                  }
                  //line income
                  for (var key in response.data["resData"]["incomeMonths"]) {
                      barMonthIncome.push(response.data["resData"]["incomeMonths"][key]);
                  }
  
                  for(var key in response.data["resData"]["incomeSubtypes"]){
                      pieIncome.push({'value':response.data["resData"]["incomeSubtypes"][key], 'name': key})
                  }
                  for(var key in response.data["resData"]["expensesSubtypes"]){
                      pieExpenses.push({'value':response.data["resData"]["expensesSubtypes"][key], 'name': key})
                  }
                  this.totalExpenses = response.data["resData"]["totalExpenses"];
                  this.totalIncome = response.data["resData"]["totalIncome"];
                  this.barMonthTime = barMonth;
                  this.barMonthExpensesData = barMonthExpenses;
                  this.barMonthIncomeData = barMonthIncome;
                  this.pieIncomeData = pieIncome;
                  this.pieExpensesData = pieExpenses;
                  //console.log(this.pieIncomeData)
                  //console.log(this.pieExpensesData)
          }).catch(function (error) {
              console.log(error);
          });
        },
        deleteTrack: async function () {
          const url = this.$common.baseUrl + "money_tracker/deletetrack";
          let response = await this.$http.get(url, {
            params: {
              trackId: this.$route.params.id,
            }}).then(function (response) {
                alert(response.data['msg']);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        },
        findTracks: async function () {
          const url = this.$common.baseUrl + "money_tracker/showtracks";
              let response = await this.$http.get(url, {
              params: {
                  accName: this.accName,
                  accNumber: this.accNumber,
              }}).then(response => (this.items = response.data['resData']['resList']))
              .catch(function (error) {
                  console.log(error);
              });
        },
        //echart绘制曲线
        drawMonthBar() {
          let barChart = this.$echarts.init(document.getElementById("barChart"));
          barChart.setOption( {
              // title: {
              //     text: '收入支出图',
              //     subtext: '',
              //     left: 'center'
              // },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              legend: {},
              xAxis: {
                  type: 'category',
                  data: this.barMonthTime,
              },
              yAxis: {
                  type: 'value'
              },
              series: [
              {
                  name: '收入',
                  data: this.barMonthIncomeData,
                  type: 'bar'
              },
              {
                  name: '支出',
                  data: this.barMonthExpensesData,
                  type: 'bar'
              }
              ]
          });
          //console.log(barChart);
      },
      //echart绘制曲线
      drawPie() {
          let pieChart = this.$echarts.init(document.getElementById("pieChart"));
          pieChart.setOption({
              title: {
                  text: '收入分布',
                  subtext: 'Fake Data',
                  left: 'center'
              },
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  orient: 'vertical',
                  left: 'left'
              },
              series: [
              {
                  name: '收入分布饼图',
                  type: 'pie',
                  radius: '50%',
                  center: ['25%', '50%'],
                  data: this.pieIncomeData,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              },
              {
                  name: '支出分布饼图',
                  type: 'pie',
                  radius: '50%',
                  center: ['75%', '50%'],
                  data: this.pieExpensesData,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              },
              ]
          });
          //console.log(pieChart);
      },
      }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1, h2 {
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
  </style>
  