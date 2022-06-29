<template>
  <div class="container">
      <div>
        <!-- <b-alert show variant="success">插入成功</b-alert> -->
      </div>
      <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="营业执照号:"
        label-for="input-1"
        description="纳税人统一编码"
      >
        <b-form-input
          id="input-1"
          v-model="license"
          placeholder="营业执照号"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="客户名称:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="name"
          placeholder="输入客户名称"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="报告文号:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="number"
          placeholder="报告文号，例如003A"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="签字注册会计师1:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="accNumber1"
          :options="accountants"
          required
        >
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="签字注册会计师2:" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="accNumber2"
          :options="accountants"
          required
        >
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-6" label="报告日期:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="time"
          placeholder="输入报告日期格式MM-dd"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">提交</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">营业执照号:{{ license }}</pre>
      <pre class="m-0">客户名称:{{ name }}</pre>
      <pre class="m-0">报告日期:{{ time }}</pre>
      <pre class="m-0">报告文号:{{ number }}</pre>
      <pre class="m-0">签字注会1号:{{ accNumber1 }}</pre>
      <pre class="m-0">签字注会1名:{{ accName1 }}</pre>
      <pre class="m-0">签字注会2号:{{ accNumber2 }}</pre>
      <pre class="m-0">签字注会2名:{{ accName2 }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Report',
   data() {
      return {
        license: '',
        name: '',
        time: '',
        number: '',
        accNumber1: "370700060006",
        accName1: "林彦奎",
        accNumber2: "370700060011",
        accName2: "李继华",
        accountants: [
            { value: "370700060006", text: "林彦奎" },
            { value: "370700060011", text: "李继华" },
            { value: "110001580079", text: "邢美丽" },
            { value: "370100230028", text: "仲培利" },
            { value: "370100230030", text: "朱逸才" },
        ],
      }
    },
    //实时监听数据
    watch: {
        license: function(val) {
            val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            var re = new RegExp("^[0-9a-zA-Z]*$");
            if (re.test(val)) {
                this.license = val;
            } else {
                this.license = "";
                alert("统一社会信用码错误");
            }
        },
        name: function(val) {
            this.name = val.trim().replace(/(\r\n|\n|\r)/gm, "");
        },
        time: function(val) {
            val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            this.time = val

        },
        number: function(val) {
            val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            var re = new RegExp("^[0-9a-zA-Z]*\-*[1-9]*$");
            if (re.test(val)) {
                this.number = val;
            } else {
                this.number = "";
                alert("报告文号错误");
            }
        },
        accNumber1: function(val) {
            this.accNumber1 = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            console.log(this.accNumber1);
            for (let i = 0; i < this.accountants.length; i++) {
                if(this.accountants[i].value == this.accNumber1){
                    this.accName1 = this.accountants[i].text;
                }
            }
        },
        accNumber2: function(val) {
            this.accNumber2 = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            console.log(this.accNumber2);
            for (let i = 0; i < this.accountants.length; i++) {
                if(this.accountants[i].value == this.accNumber2){
                    this.accName2 = this.accountants[i].text;
                }
            }
        },
    },
    methods: {
      onSubmit(event) {
        //event.preventDefault();
        this.saveReport();
        this.onReset();
      },
      getSelectedText(event) {
        const options = event.target.options;
        const selectedOption = options[options.selectedIndex];
        this.accName = selectedOption.textContent;
      },
      checkRe(){
        var time_re = new RegExp("^[0-9]+\-[0-9]+$");
        var number_re = new RegExp("^[0-9]+[A-Z]?\-?[1-9]?$");
        if (!time_re.test(this.time)) {
            this.time = '';
            alert("时间格式错误");
            return false;
        }
        if (!number_re.test(this.number)) {
            this.number = '';
            alert("报告文号错误");
            return false;
        }
        if (this.accNumber1 == this.accNumber2){
            alert("签字注会1号和签字注会2号不能相同");
            return false;
        }
        return true;
      },
      saveReport: async function () {
        const url = this.$common.baseUrl + "acc_reportor/savereport";
        if(this.checkRe()){
            let response = await this.$http.get(url, {
            params: {
                year: this.year,
                license: this.license,
                name: this.name,
                time: this.time,
                number: this.number,
                accNumber1: this.accNumber1,
                accName1: this.accName1,
                accNumber2: this.accNumber2,
                accName2: this.accName2
            }}).then(function (response) {
                alert(response.data['msg']);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
      },
      onReset(event) {
        //event.preventDefault()
        // Reset our values
        this.license = ''
        this.name = ''
        this.number = ''
        this.time = ''
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
