<template>
  <div class="container">
      <div>
      <b-form-textarea
        id="bibtextext"
        v-model="bibtex"
        placeholder="bibtex格式"
        rows="10"
        max-rows="6"
      ></b-form-textarea>

      <b-form-select
        id="bibtextype"
        v-model="bibtype"
        :options="bibtypeOptions"
        required
      >
      </b-form-select>
      </div>

      <b-button variant="primary" @click="getBibitem">提交</b-button>
      <b-button variant="danger" @click="onReset">重置</b-button>
    <b-card class="mt-3" header="bibitem结果">
      {{ bibitem }}
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'BibtexPaper',
   data() {
      return {
        bibtex: '',
        bibitem: '',
        bibtype: 'en_latex',
        bibtypeOptions: [
            { value: "en_latex", text: "英文-latex" },
            { value: "en_word", text: "英文-word" },
            { value: "ch_latex", text: "中文-latex" },
            { value: "ch_word", text: "中文-word" },
            { value: "en_foundation", text: "英文-基金" },
        ],
      }
    },
    //实时监听数据
    watch: {
        bibtex: function(val) {
            //val = val.trim().replace(/(\r\n|\n|\r)/gm, "");
            //var re = new RegExp("^[0-9a-zA-Z]*$");
            //if (re.test(val)) {
            //    this.license = val;
            //} else {
            //    this.license = "";
            //    alert("统一社会信用码错误");
            //}
            this.bibtex = val;
        },
    },
    methods: {
      onSubmit(event) {
        //event.preventDefault();
        this.getBibitem();
        this.onReset();
      },
      getBibitem: async function () {
        const url = this.$common.baseUrl + "acc_papers/getbibitem";
          let response = await this.$http.get(url, {
          params: {
            bibtex: this.bibtex,
            bibtype: this.bibtype
          }}).then(response => (this.bibitem = response.data['resData'])
          ).catch(function (error) {
            console.log(error);
          });
      },
      onReset(event) {
        //event.preventDefault()
        // Reset our values
        this.bibtex = '';

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
