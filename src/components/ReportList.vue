<template>
  <div class="container">
    <div>
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">客户名称</label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="name"
          placeholder="客户名称"
        ></b-form-input>

        <label class="sr-only" for="inline-form-input-name">营业执照号</label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="license"
          placeholder=""
        ></b-form-input>

        <label class="sr-only" for="inline-form-input-year">年份</label>
        <b-form-input
          id="inline-form-input-year"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="year"
          placeholder="2021"
        ></b-form-input>

      <b-button variant="primary" @click="onSubmit">查询</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">营业执照号:{{ license }}</pre>
        <pre class="m-0">客户名称:{{ name }}</pre>
        <pre class="m-0">年丰:{{ year }}</pre>
    </b-card>
    </div>
      <b-table striped hover :items="items" :per-page="pageSize" :current-page="curPage" :fields="fields" id="report-table"></b-table>
      <b-pagination
        v-model="curPage"
        :total-rows="rows"
        :per-page="pageSize"
        aria-controls="report-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ curPage }}</p>
  </div>
</template>

<script>
export default {
  name: 'ReportList',
   data() {
      return {
          name: '',
          license: '',
          year: '',
          pageSize: 10,
          curPage: 1,
          fields: [
          {
            key: 'license',
            label: '营业执照号',
          },
          {
            key: 'name',
            label: '客户名称'
          },
          {
            key: 'report_number',
            label: '报告文号'
          },
          {
            key: 'report_time',
            label: '报告时间',
            sortable: true,
          },
          {
            key: 'year',
            label: '年份',
            sortable: true,
          },
          {
            key: 'account1_name',
            label: '注会1姓名',
          },
          {
            key: 'account1_number',
            label: '注会1编号',
          },
          {
            key: 'account2_name',
            label: '注会2姓名',
          },
          {
            key: 'account2_number',
            label: '注会2编号',
          },
        ],
        items: [
          {
            "account1_name": "林彦奎",
            "account1_number": 370700060006,
            "account2_name": "李继华",
            "account2_number": 370700060011,
            "license": "12370800493950046A",
            "name": "济宁市职工技术交流站",
            "report_number": "鲁海会济审字（2021）第001A号",
            "report_time": "2021-1-19",
            "year": 2021
          },
          {
            "account1_name": "林彦奎",
            "account1_number": 370700060006,
            "account2_name": "李继华",
            "account2_number": 370700060011,
            "license": "52370481MJE236843H",
            "name": "滕州市荆河街道城北社区服务中心",
            "report_number": "鲁海会济审字（2021）第002A号",
            "report_time": "2021-1-19",
            "year": 2021
        },
        ]
      }
    },
    //DOM生命周期
    mounted() {
        this.getReports();
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
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
      year: function(val) {
            val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            var re = new RegExp("^[0-9]*$");
            if (re.test(val)) {
                this.year = val;
            } else {
                this.year = "";
                alert("年份格式错误");
            }
      },
    },
    methods: {
      onSubmit(event) {
        this.findReports();
        this.onReset();
      },
      onReset(event) {
        this.license = ''
        this.name = ''
        this.year = ''
      },
      getReports: async function () {
        const url = this.$common.baseUrl + "acc_reportor/showreports";
        this.$http.get(url, {
            params: {
                curPage: this.curPage,
                pageSize: this.pageSize,
            }}).then(response => (this.items = response.data['resData']))
        .catch(function (error) {
            console.log(error);
        });
      },
      findReports: async function () {
        const url = this.$common.baseUrl + "acc_reportor/findreports";
            let response = await this.$http.get(url, {
            params: {
                year: this.year,
                license: this.license,
                name: this.name,
                time: this.time,
            }}).then(response => (this.items = response.data['resData']))
            .catch(function (error) {
                console.log(error);
            });
      }
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
