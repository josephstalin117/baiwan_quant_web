<template>
  <div class="container">
    <div>
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">科目名称</label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="accName"
          placeholder="科目名称"
        ></b-form-input>

        <label class="sr-only" for="inline-form-input-name">科目编号</label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="accNumber"
          placeholder=""
        ></b-form-input>

      <b-button variant="primary" @click="onSubmit">查询</b-button>
      <b-button variant="success" @click="genWord">生成word文档</b-button>
      
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">科目编号:{{ accNumber }}</pre>
        <pre class="m-0">科目名称:{{ accName }}</pre>
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
          accNumber: '',
          accName: '',
          pageSize: 10,
          curPage: 1,
          fields: [
          {
            key: 'noteId',
            label: '被审公司编号',
          },
          {
            key: 'noteName',
            label: '被审公司名',
          },
          {
            key: 'noteYear',
            label: '审计年份'
          },
          {
            key: 'accName',
            label: '科目名称'
          },
          {
            key: 'accNumber',
            label: '科目编号',
          },
          {
            key: 'accValue',
            label: '金额',
            sortable: true,
          },
        ],
          items: [
          {
            "noteId": "0",
            "noteName": "被审公司",
            "noteYear": "2021",
            "accNumber": "1122",
            "accName": "应收账款",
            "accValue": "10000"
          },
          {
            "noteId": "-1",
            "noteName": "被审公司",
            "noteYear": "2021",
            "accNumber": "2202",
            "accName": "应付账款",
            "accValue": "20000"
          },
        ]
      }
    },
    //DOM生命周期
    mounted() {
        this.getNotes();
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    watch: {
      accNumber: function(val) {
        val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
        this.accNumber = val;
     },
      accName: function(val) {
        this.name = val.trim().replace(/(\r\n|\n|\r)/gm, "");
      },
      items: {
        handler: function(val){
          console.log("process items");
          for(let i = 0; i < val.length; i++){
            //val[i].accValue = val[i].accValue.trim().replace(/(\r\n|\n|\r)/gm, "");
            val[i].accValue = (val[i].accValue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.items[i].accValue = val[i].accValue;
          }
        },
          deep: true
      },
    },
    methods: {
      onSubmit(event) {
        this.findNotes();
        this.onReset();
      },
      onReset(event) {
        this.license = ''
        this.name = ''
        this.year = ''
      },
      getNotes: async function () {
        console.log(this.$common.baseUrl)
        //const url = "http://localhost:5000/acc_noter/shownotes";
        const url = this.$common.baseUrl + "acc_noter/shownotes";

        this.$http.get(url, {
            params: {
                curPage: this.curPage,
                pageSize: this.pageSize,
            }}).then(response => (this.items = response.data['resData']))
        .catch(function (error) {
            console.log(error);
        });
      },
      findNotes: async function () {
        const url = this.$common.baseUrl + "acc_noter/findnotes";
            let response = await this.$http.get(url, {
            params: {
                accName: this.accName,
                accNumber: this.accNumber,
            }}).then(response => (this.items = response.data['resData']))
            .catch(function (error) {
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
