<template>
    <div class="container">
        <div>
          <!-- <b-alert show variant="success">插入成功</b-alert> -->
        </div>
        <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
        <b-form-group
          id="input-group-1"
          label="股票编码"
          label-for="input-1-1"
        >
        <b-form-input
            id="input-1-1"
            v-model="symbolCode"
            placeholder="000001.SH"
            required
        ></b-form-input>
        <b-form-input
            id="input-1-2"
            v-model="price"
            placeholder="买入价格"
            type="number"
            required
        ></b-form-input>
        <b-form-input
            id="input-1-3"
            v-model="quantity"
            placeholder="数量"
            type="number"
            required
        ></b-form-input>
        <b-form-input
            id="input-1-4"
            v-model="commission"
            placeholder="手续费"
            type="number"
            required
        ></b-form-input>
      </b-form-group>
        <b-form-group
          id="input-group-2"
          label="方向"
        >
        <b-form-select v-model="sideselected" :options="sideOptions" :select-size="10">
        </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="成交状态"
        >
        <b-form-select v-model="statusselected" :options="statusOptions" :select-size="10">
        </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="挂单"
        >
        <b-form-select v-model="tradetypeselected" :options="tradeTypeOptions" :select-size="10">
        </b-form-select>
        </b-form-group>

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
            <b-form-select
              id="trade-timepicker"
              v-model="tradetime"
            ></b-form-select>
          </div>
        </div>  
  
        <b-button type="submit" variant="primary" @click="saveTradeOrder">提交</b-button>
        <b-button type="reset" variant="danger" @click="initTradeOrder">重置</b-button>
      <!-- </b-form> -->
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">股票代码:{{ symbolCode }}</pre>
        <pre class="m-0">账号id:{{ accountId }}</pre>
        <pre class="m-0">交易日期:{{ tradeDate }}</pre>
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
    name: 'AccNote',
     data() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        return {
          symbolCode: '',
          accountId: '',
          tradeDatetime: this.formatDate(today),
          tradedate: this.formatDate(today),
          tradetime: this.formatDate(today),
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
          accNumber: function(val) {
              console.log("accNumber", val);
              this.accNumber = val.toString().trim().replace(/(\r\n|\n|\r)/gm, "");
              for (let i = 0; i < this.accOptions.length; i++) {
                  if(this.accOptions[i].value == this.accNumber){
                      this.accName = this.accOptions[i].text;
                  }
              }
              //固定资产
              if (this.accNumber == "1601") {
                  this.isFixedAssets = true;
              } else if(this.accNumber == "0"){
                  this.isMoneyFunds = true;
                  this.companies[0].name = "库存现金";
                  this.companies[1].name = "银行存款";
                  this.companies[2].name = "其他货币资金";
              } else if(this.accNumber == "4001"){
                  this.isPaidUpCapital = true;
              } else if(this.accNumber == "2221"){
                  this.isTaxesPayable = true;
              //应收账款1122, 预付账款1123, 其他应收款1221, 应付账款2202, 预收账款2303, 其他应付款2241
              //} else if((this.accNumber == "1122") || (this.accNumber == "1123") || (this.accNumber == "1221") || (this.accNumber == "2203") || (this.accNumber == "2202") || (this.accNumber == "2241")){
              } else if((this.accNumber == "1122") || (this.accNumber == "1123") || (this.accNumber == "1221")){
                  this.isLedgerAge = true;
              } else {
                  this.isFixedAssets = false;
                  this.isMoneyFunds = false;
                  this.isPaidUpCapital = false;
                  this.isTaxesPayable = false;
                  this.isLedgerAge = false;
                  this.companies[0].name = "";
                  this.companies[1].name = "";
              }
          },
          accValue: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.accValue = val;
          },
          accValue2: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.accValue2 = val;
          },
          accValue3: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.accValue3 = val;
          },
          ledgerAge1: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.ledgerAge1 = val;
          },
          ledgerAge2: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.ledgerAge2 = val;
          },
          ledgerAge3: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.ledgerAge3 = val;
          },
          ledgerAge4: function(val) {
              val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
              this.ledgerAge4 = val;
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
        formatDate: function (date) {
          var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
          hour = d.getHours();
          minute = d.getMinutes();
          second = d.getSeconds();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
          console.log([year, month, day].join("-"));
          console.log([hour, minute, second].join(":"));
          return [year, month, day].join("-");
        },
        //TODO: need update
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
        //TODO: need update
        getAccountId: async function () {
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
  