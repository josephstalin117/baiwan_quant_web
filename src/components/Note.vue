<template>
  <div class="container">
      <div>
        <!-- <b-alert show variant="success">插入成功</b-alert> -->
      </div>
      <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
      <b-form-group
        id="input-group-1"
        :label= "accName"
        label-for="input-1-1"
      >

        <b-form-input
          id="input-1-2"
          v-model="accValue"
          placeholder="科目年末余额"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <div v-if="isFixedAssets">

      <b-form-group id="input-group-2-1" label="累计折旧:" label-for="input-2-1">
        <b-form-input
          v-model="accValue2"
          placeholder="累计折旧"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2-2" label="固定资产净值:" label-for="input-2-1">
        <b-form-input
          v-model="accValue3"
          placeholder="固定资产净值"
          type="number"
        ></b-form-input>
      </b-form-group>
      </div>

      <div v-else-if="isMoneyFunds">
      <b-form-group id="input-group-3-1" label="库存现金:" label-for="input-2-1">
        <b-form-input
          v-model="companies[0].value"
          placeholder="输入库存现金费用"
          type="number"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3-2" label="银行存款:" label-for="input-3-1">
        <b-form-input
          id="input-3-2"
          v-model="companies[1].value"
          placeholder="输入银行存款费用"
          type="number"
        ></b-form-input>
      </b-form-group>
      </div>

      <div v-else-if="isPaidUpCapital">
      <b-form-group id="input-group-3-1" label="股东:" label-for="input-2-1">
        <b-form-input
          v-model="companies[0].name"
          placeholder="输入股东1名称"
        ></b-form-input>
        <b-form-input
          v-model="companies[0].value"
          placeholder="输入股东1费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[0].last_value"
          placeholder="输入股东1上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3-2" label="股东2:" label-for="input-3-1">
        <b-form-input
          id="input-3-1"
          v-model="companies[1].name"
          placeholder="输入股东2名称"
        ></b-form-input>
        <b-form-input
          v-model="companies[1].value"
          placeholder="输入股东2费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[1].last_value"
          placeholder="输入股东2上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-3" label="股东3:" label-for="input-4-1">
        <b-form-input
          id="input-4-1"
          v-model="companies[2].name"
          placeholder="输入股东3名称"
        ></b-form-input>
        <b-form-input
          v-model="companies[2].value"
          placeholder="输入股东3费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[2].last_value"
          placeholder="输入股东3上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-4" label="股东4:" label-for="input-5-1">
        <b-form-input
          id="input-5-1"
          v-model="companies[3].name"
          placeholder="输入股东4名称"
        ></b-form-input>
        <b-form-input
          id="input-5-2"
          v-model="companies[3].value"
          placeholder="输入股东4费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[3].last_value"
          placeholder="输入股东4上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-5" label="股东5:" label-for="input-6-1">
        <b-form-input
          id="input-6-1"
          v-model="companies[4].name"
          placeholder="输入股东5名称"
        ></b-form-input>
        <b-form-input
          id="input-6-2"
          v-model="companies[4].value"
          placeholder="输入股东5费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[4].last_value"
          placeholder="输入股东5上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-6" label="股东6:" label-for="input-7-1">
        <b-form-input
          id="input-7-1"
          v-model="companies[5].name"
          placeholder="输入股东6名称"
        ></b-form-input>
        <b-form-input
          id="input-7-2"
          v-model="companies[5].value"
          placeholder="输入股东6费用"
          type="number"
        ></b-form-input>
        <b-form-input
          v-model="companies[5].last_value"
          placeholder="输入股东6上年费用"
          type="number"
        ></b-form-input>
      </b-form-group>
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
      </b-form-group>
      </template>
      </div>

      <div v-else>
      <b-form-group id="input-group-3-1" label="公司名1:" label-for="input-2-1">
        <b-form-input
          v-model="companies[0].name"
          placeholder="输入公司1名称"
        ></b-form-input>
        <b-form-input
          v-model="companies[0].value"
          placeholder="输入公司1费用"
          type="number"
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3-2" label="公司名2:" label-for="input-3-1">
        <b-form-input
          id="input-3-1"
          v-model="companies[1].name"
          placeholder="输入公司2名称"
        ></b-form-input>
        <b-form-input
          id="input-3-2"
          v-model="companies[1].value"
          placeholder="输入公司2费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-3" label="公司名3:" label-for="input-4-1">
        <b-form-input
          id="input-4-1"
          v-model="companies[2].name"
          placeholder="输入公司3名称"
        ></b-form-input>
        <b-form-input
          id="input-4-2"
          v-model="companies[2].value"
          placeholder="输入公司3费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-4" label="公司名4:" label-for="input-5-1">
        <b-form-input
          id="input-5-1"
          v-model="companies[3].name"
          placeholder="输入公司4名称"
        ></b-form-input>
        <b-form-input
          id="input-5-2"
          v-model="companies[3].value"
          placeholder="输入公司4费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-5" label="公司名5:" label-for="input-6-1">
        <b-form-input
          id="input-6-1"
          v-model="companies[4].name"
          placeholder="输入公司5名称"
        ></b-form-input>
        <b-form-input
          id="input-6-2"
          v-model="companies[4].value"
          placeholder="输入公司5费用"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3-6" label="公司名6:" label-for="input-7-1">
        <b-form-input
          id="input-7-1"
          v-model="companies[5].name"
          placeholder="输入公司6名称"
        ></b-form-input>
        <b-form-input
          id="input-7-2"
          v-model="companies[5].value"
          placeholder="输入公司6费用"
          type="number"
        ></b-form-input>
      </b-form-group>
      </div>

      <b-button type="submit" variant="primary" @click="updateNote">修改</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    <!-- </b-form> -->
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">科目编号:{{ accNumber }}</pre>
      <pre class="m-0">科目名称:{{ accName }}</pre>
      <pre class="m-0">科目金额1:{{ accValue }}</pre>
      <pre class="m-0">科目金额2:{{ accValue2 }}</pre>
      <pre class="m-0">科目金额3:{{ accValue3 }}</pre>
      <pre class="m-0">公司:{{ companies}}</pre>

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'AccNote',
   data() {
      return {
        noteId: this.$route.params.id,
        accNumber: '',
        accName: '',
        isFixedAssets: false,
        isMoneyFunds: false,
        isPaidUpCapital: false,
        isTaxesPayable: false,
        accValue: '',
        accValue2: '',
        accValue3: '',
        companies: [
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
        ],
        accOptions: [
            { value: "1122", text: "应收账款" },
            { value: "1123", text: "预付账款" },
        ],
      }
    },
    //实时监听数据
    watch: {
        accNumber: function(val) {
            console.log(val);
            console.log("test1");
            this.accNumber = val.toString().trim().replace(/(\r\n|\n|\r)/gm, "");
            if (this.accNumber == "1601") {
                this.isFixedAssets = true;
            } else if(this.accNumber == "0"){
                console.log("test");
                this.isMoneyFunds = true;
                this.companies[0].name = "库存现金";
                this.companies[1].name = "银行存款";
            } else if(this.accNumber == "4001"){
                this.isPaidUpCapital = true;
            } else if(this.accNumber == "2221"){
                this.isTaxesPayable = true;
            } else {
                this.isFixedAssets = false;
                this.isMoneyFunds = false;
                this.isPaidUpCapital = false;
                this.isTaxesPayable = false;
            }
        },
        accValue: function(val) {
            //val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            this.accValue = val;
        },
        accValue2: function(val) {
            //val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            this.accValue2 = val;
        },
        accValue3: function(val) {
            //val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            this.accValue3 = val;
        },
        companies: {
            handler: function(val){
              console.log("process companies");
              for(let i = 0; i < val.length; i++){
                val[i].name = val[i].name.trim().replace(/(\r\n|\n|\r)/gm, "");
                val[i].value = val[i].value.trim().replace(/(\r\n|\n|\r)/gm, "");
                val[i].last_value = val[i].last_value.trim().replace(/(\r\n|\n|\r)/gm, "");
                this.companies[i].value = val[i].value;
                this.companies[i].name = val[i].name;
                this.companies[i].last_value = val[i].last_value;
              }
            },
            deep: true
        },
    },
    //DOM生命周期
    mounted() {
        this.getNote();
    },
    methods: {
      onSubmit(event) {
        //event.preventDefault();
        this.saveReport();
        this.onReset();
      },
      initCompanies(val){
        for(let i = 0; i < val.length; i++){
            console.log(val[i].name);
            //val[i].name = val[i].name.trim().replace(/(\r\n|\n|\r)/gm, "");
            //val[i].value = val[i].value.trim().replace(/(\r\n|\n|\r)/gm, "");
            this.companies[i].value = val[i].value;
            this.companies[i].name = val[i].name;
            this.companies[i].last_value = val[i].last_value;
        }
      },
      initNote(){
        console.log("init");
        this.accNumber = "";
        this.accName = "";
        this.isFixedAssets = false;
        this.isMoneyFunds = false;
        this.isPaidUpCapital = false;
        this.isTaxesPayable = fales;
        this.accValue = "";
        this.accValue2 = "";
        this.accValue3 = "";
        this.companies = [
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
          {name: '', value: '', last_value: ''},
        ];
      },
      filteCompanies(){
        for(let i = 0; i < this.companies.length; i++){
          this.companies[i].name = this.companies[i].name.trim().replace(/(\r\n|\n|\r)/gm, "");
          this.companies[i].value = this.companies[i].value.trim().replace(/(\r\n|\n|\r)/gm, "");
          if(this.companies[i].name=='' && this.companies[i].value!=''){
            this.companies[i].name = '';
            this.companies[i].value = '';
          }else if(this.companies[i].name!='' && this.companies[i].value==''){
            this.companies[i].name = '';
            this.companies[i].value = '';
          }
        }
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
            this.accValue2 = '';
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
      getNote: async function () {
        const url = this.$common.baseUrl + "acc_noter/findnote";
        this.$http.get(url, {
            params: {
                noteId: this.$route.params.id
            }}).then(response => {
              if(response.data['code']=='1'){
                this.accNumber = response.data['resData']['accNumber'];
                this.accName = response.data['resData']['accName'];
                this.accValue = response.data['resData']['accValue'];
                this.accValue2 = response.data['resData']['accValue2'];
                this.accValue3 = response.data['resData']['accValue3'];
                this.initCompanies(response.data['resData']['companies']);
              }else{
                alert(response.data['msg']);
              }
            }).catch(function (error) {
            console.log(error);
        });
      },
      updateNote: async function () {
        const url = this.$common.baseUrl + "acc_noter/updatenote";
        //this.filteCompanies();
        let response = await this.$http.get(url, {
          params: {
            noteId: this.noteId,
            accValue: this.accValue,
            accValue2: this.accValue2,
            accValue3: this.accValue3,
            companies: JSON.stringify(this.companies)
          }}).then(function (response) {
              alert(response.data['msg']);
              console.log(response);
          }).catch(function (error) {
              console.log(error);
          });
      },
      genWord: async function () {
        const url = this.$common.baseUrl + "acc_noter/genword";
        //this.filteCompanies();
        let response = await this.$http.get(url).then(function (response) {
              alert(response.data['msg']);
              console.log(response);
          }).catch(function (error) {
              console.log(error);
          });
      },
      onReset(event) {
        //event.preventDefault()
        // Reset our values
        this.accValue = ''
        this.accValue2 = ''
        this.accValue3 = ''
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
