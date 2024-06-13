<template>
    <div class="container">
        <div>
          <!-- <b-alert show variant="success">插入成功</b-alert> -->
        </div>
        <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
        <b-form-group
          id="input-group-1"
          label="科目"
          label-for="input-1-1"
        >
  
        <b-form-select v-model="accNumber" :options="accOptions" :select-size="10">
        </b-form-select>
  
          <b-form-input
            id="input-1-2"
            v-model="accValue"
            placeholder="科目年末余额"
            type="number"
            required
          ></b-form-input>
          <b-form-input
            id="input-1-3"
            v-model="accValueLast"
            placeholder="科目年初余额"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
  
        <div v-if="isFixedAssets">
        <template v-for="(company, index) in companies">
        <b-form-group :key="index" label="固定资产:" label-for="input-2-1">
            <b-form-input
              v-model="company.name"
              placeholder="输入固定资产名称"
            ></b-form-input>
            <b-form-input
              v-model="company.value"
              placeholder="输入固定资产费用"
              type="number"
            ></b-form-input>
            <b-form-input
              v-model="company.last_value"
              placeholder="输入固定资产上年费用"
              type="number"
            ></b-form-input>
        </b-form-group>
        </template>
  
  
        <b-form-group id="input-group-2-1" label="累计折旧:" label-for="input-2-1">
          <b-form-input
            v-model="accValue2"
            placeholder="累计折旧"
            type="number"
          ></b-form-input>
          <b-form-input
            v-model="accValue2Last"
            placeholder="上年累计折旧"
            type="number"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group id="input-group-2-2" label="固定资产原值:" label-for="input-2-1">
          <b-form-input
            v-model="accValue3"
            placeholder="固定资产原值"
            type="number"
          ></b-form-input>
          <b-form-input
            v-model="accValue3Last"
            placeholder="固定资产上年原值"
            type="number"
          ></b-form-input>
        </b-form-group>
        </div>
  
        <div v-else-if="isMoneyFunds">
        <b-form-group id="input-group-3-1" label="库存现金:" label-for="input-2-1">
          <b-form-input
            v-model="companies[0].value"
            placeholder="输入年末库存现金费用"
            type="number"
          ></b-form-input>
          <b-form-input
            v-model="companies[0].last_value"
            placeholder="输入年初库存现金费用"
            type="number"
          ></b-form-input>
        </b-form-group>
  
         <b-form-group id="input-group-3-2" label="银行存款:" label-for="input-3-1">
          <b-form-input
            id="input-3-2"
            v-model="companies[1].value"
            placeholder="输入年末银行存款费用"
            type="number"
          ></b-form-input>
          <b-form-input
            v-model="companies[1].last_value"
            placeholder="输入年初银行存款费用"
            type="number"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group id="input-group-3-3" label="其他货币资金:" label-for="input-3-1">
          <b-form-input
            id="input-3-3"
            v-model="companies[2].value"
            placeholder="输入年末其他货币资金"
            type="number"
          ></b-form-input>
          <b-form-input
            v-model="companies[2].last_value"
            placeholder="输入年初其他货币资金"
            type="number"
          ></b-form-input>
        </b-form-group>
        </div>
  
        <div v-else-if="isPaidUpCapital">
        <template v-for="(company, index) in companies">
        <b-form-group :key="index" label="股东:" label-for="input-2-1">
            <b-form-input
              v-model="company.name"
              placeholder="输入股东名称"
            ></b-form-input>
            <b-form-input
              v-model="company.value"
              placeholder="输入股东费用"
              type="number"
            ></b-form-input>
            <b-form-input
              v-model="company.last_value"
              placeholder="输入上年股东费用"
              type="number"
            ></b-form-input>
        </b-form-group>
        </template>
        </div>
  
        <div v-else-if="isTaxesPayable">
        <template v-for="(company, index) in companies">
        <b-form-group :key="index" label="税务:" label-for="input-2-1">
            <b-form-input
              v-model="company.name"
              placeholder="输入税务名称"
            ></b-form-input>
            <b-form-input
              v-model="company.value"
              placeholder="输入税务费用"
              type="number"
            ></b-form-input>
            <b-form-input
              v-model="company.last_value"
              placeholder="输入上年税务费用"
              type="number"
            ></b-form-input>
        </b-form-group>
        </template>
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
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return {
          symbolCode: '',
          accountId: '',
          tradeDate: this.formatDate(today),
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
          this.tradeDate = this.formatDate(today);
          this.price = '';
          this.quantity = '';
          this.commission = '';
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
        checkRe(){
          var number_re = new RegExp("^\d+\.\d{2}$");
          if (!number_re.test(this.accValue)) {
              this.accValue = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.accValue2)) {
              this.accValue2 = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.accValue3)) {
              this.accValue3 = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.accValueLast)) {
              this.accValueLast = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.ledgerAge1)) {
              this.ledgerAge1 = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.ledgerAge2)) {
              this.ledgerAge2 = '';
              alert("accValue数据错误");
              return false;
          }
          if (!number_re.test(this.ledgerAge3)) {
              this.ledgerAge3 = '';
              alert("accValue数据错误");
              return false;
          }
          for(let i = 0; i < this.companies.length; i++){
              if (!number_re.test(this.companies[i].value)) {
                  this.companies[i].value = '';
                  this.companies[i].name = '';
                  alert("公司金融数据错误");
                  return false;
              }
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
              tradeDate: this.tradeDate,
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
            this.initNote();
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
  