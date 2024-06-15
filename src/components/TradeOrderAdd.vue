<template>
    <div class="container">
        <div>
          <!-- <b-alert show variant="success">插入成功</b-alert> -->
        </div>
        <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
        <b-form-group
          id="input-group-1-1"
          label="股票编码"
          label-for="input-1-1"
        >
        <b-form-input
            id="input-1-1"
            v-model="symbolCode"
            placeholder="000001.SH"
            required
        ></b-form-input>
        <b-form-group
          id="input-group-1-2"
          label="买入价格"
          label-for="input-1-2"
        >
        <b-form-input
            id="input-1-2"
            v-model="price"
            placeholder="买入价格"
            type="number"
            required
        ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1-3"
          label="买入数量"
          label-for="input-1-3"
        >
        <b-form-input
            id="input-1-3"
            v-model="quantity"
            placeholder="数量"
            type="number"
            required
        ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1-4"
          label="手续费"
          label-for="input-1-4"
        >
        <b-form-input
            id="input-1-4"
            v-model="commission"
            placeholder="手续费"
            type="number"
            required
        ></b-form-input>
        </b-form-group>
        </b-form-group>
        <div class="row mb-3">
        <div class="col">
        <b-form-group
          id="input-group-2"
          label="方向"
        >
        <b-form-select v-model="sideselected" :options="sideOptions" :select-size="2">
        </b-form-select>
        </b-form-group>
        </div>
        <div class="col">
        <b-form-group
          id="input-group-3"
          label="成交状态"
        >
        <b-form-select v-model="statusselected" :options="statusOptions" :select-size="4">
        </b-form-select>
        </b-form-group>
        </div>
        <div class="col">
        <b-form-group
          id="input-group-4"
          label="挂单"
        >
        <b-form-select v-model="tradetypeselected" :options="tradeTypeOptions" :select-size="4">
        </b-form-select>
        </b-form-group>
        </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="trade-datepicker">交易日期</label>
            <b-form-datepicker
              id="trade-datepicker"
              v-model="tradedate"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="col">
            <label for="trade-timepicker">时间</label>
            <b-form-timepicker
              id="trade-timepicker"
              v-model="tradetime"
            ></b-form-timepicker>
          </div>
        </div>  
  
        <b-button type="submit" variant="primary" @click="saveTradeOrder">提交</b-button>
        <b-button type="reset" variant="danger" @click="initTradeOrder">重置</b-button>
      <!-- </b-form> -->
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">股票代码:{{ symbolCode }}</pre>
        <pre class="m-0">账号id:{{ accountId }}</pre>
        <pre class="m-0">交易日期:{{ tradeDatetime }}</pre>
        <pre class="m-0">交易方向:{{ sideselected }}</pre>
        <pre class="m-0">状态:{{ statusselected }}</pre>
        <pre class="m-0">成本:{{ price }}</pre>
        <pre class="m-0">持仓:{{ quantity }}</pre>
        <pre class="m-0">交易佣金:{{ commission }}</pre>
        <pre class="m-0">止盈/止损:{{ tradetypeselected }}</pre>  
      </b-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TradeOrderAdd',
     data() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        return {
          symbolCode: '',
          accountId: '',
          tradeDatetime: this.formatDatetime(today),
          tradedate: this.formatDate(today),
          tradetime: this.formatTime(today),
          price: '',
          quantity: '',
          commission: '',
          // isFixedAssets: false,
          sideselected: "buy",
          sideOptions: [
              { value: "buy", text: "买入" },
              { value: "sell", text: "卖出" },
          ],
          statusselected: "filled",
          statusOptions: [
              { value: "filled", text: "成交" },
              { value: "cancelled", text: "未成交" },
          ],
          tradetypeselected: "market",
          //stop_loss, take_profit, limit, market
          tradeTypeOptions: [
              { value: "stop_loss", text: "止损" },
              { value: "take_profit", text: "止盈" },
              { value: "limit", text: "现价" },
              { value: "market", text: "市价" },
          ],
        }
      },
      //实时监听数据
      watch: {     
          tradedate: function(val) {
              this.tradeDatetime = [val, this.tradetime].join(" ");
          },
          tradetime: function(val) {
            this.tradeDatetime = [this.tradedate, val].join(" ");
          },
          symbolCode: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.symbolCode = val;
          },
          price: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.price = val;
          },
          quantity: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.quantity = val;
          },
          commission: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.ledgerAge3 = val;
          },
      },
      //DOM生命周期
      mounted() {
          this.getAccSubs();
          //this.initCompanies();
      },
      methods: {
        initTradeOrder(){
          console.log("init");
          this.symbolCode = "";
          this.accountId = "";
          this.tradeDatetime = this.formatDate(today);
          this.price = '';
          this.quantity = '';
          this.commission = '';
        },
        formatDatetime: function (date) {
          var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
          var hour = "" + d.getHours();
          var minute = "" + d.getMinutes();
          var second = "" + d.getSeconds();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
          if (hour.length < 2) hour = "0" + hour;
          if (minute.length < 2) minute = "0" + minute;
          if (second.length < 2) second = "0" + second;
          var date = [year, month, day].join("-");
          var time = [hour, minute, second].join(":")
          return [date, time].join(" ");
        },
        formatTime: function (date) {
          var d = new Date(date);
          var hour = "" + d.getHours();
          var minute = "" + d.getMinutes();
          var second = "" + d.getSeconds();
          if (hour.length < 2) hour = "0" + hour;
          if (minute.length < 2) minute = "0" + minute;
          if (second.length < 2) second = "0" + second;
          return [hour, minute, second].join(":");
        },
        formatDate: function (date) {
          var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
          return [year, month, day].join("-");
        },
        //TODO: need update
        getAccountid: async function () {
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
        checkRe(){
          var number_re = new RegExp("^\d+\.\d{2}$");
          if (!number_re.test(this.price)) {
              this.price = '';
              alert("价格数据错误");
              return false;
          }
          if (!number_re.test(this.quantity)) {
              this.quantity = '';
              alert("数量数据错误");
              return false;
          }
          if (!number_re.test(this.commission)) {
              this.commission = '';
              alert("交易费数据错误");
              return false;
          }
          return true;
        },
        getAccSubs: async function () {
          const url = this.$common.baseUrl + "acc_noter/showsubs";
          let response = await this.$http.get(url);
          const accSubs = [];
          response.data["resData"].forEach((subs) => {
            accSubs.push({
              value: subs["acc_number"],
              text: subs["acc_name"],
            });
          });
          this.accOptions = accSubs;
        },
        saveTradeOrder: async function () {
          const url = this.$common.baseUrl + "/trader/saveTradeOrder";
          this.filteCompanies();
          let response = await this.$http.get(url, {
            params: {
              symbolCode: this.symbolCode,
              accountId: this.accountId,
              tradeDatetime: this.tradeDatetime,
              side: this.sideselected,
              price: this.price,
              tradeType: this.tradetypeselected,
              quantity: this.quantity,
              status: this.statusselected,
              commission: this.commission,
            }}).then(function (response) {
                alert(response.data['msg']);
                this.initNote();
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            this.initTradeOrder();
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
  