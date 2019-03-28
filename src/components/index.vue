<!--  -->
<template>
  <div>
    <el-container>
      <el-header style="height:70px">平安银行证券系统</el-header>
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="S" label="代码"></el-table-column>
          <el-table-column prop="N" label="名称"></el-table-column>
          <el-table-column prop="P" label="买"></el-table-column>
          <el-table-column prop="B1" label="卖"></el-table-column>
          <el-table-column prop="H" label="现价"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
var pako = require("pako");
export default {
  data() {
    return {
      tableData:[],
      oldTableData:[],
    };
  },

  components: {},

  computed: {},

  mounted() {
    var socket;
    var timer;
    const that = this
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
      socket = new WebSocket("ws://localhost:8090/ws");

      socket.onmessage = function(event) {
        var unzipStr = transBase64DataAndungzipData(event.data);
        let data = JSON.parse(unzipStr);
        var oldTableData = that.oldTableData;
        that.$set(that, 'tableData', data);
      };

      socket.onopen = function(event) {
        window.alert("连接开启");
      };

      socket.onclose = function(event) {
        window.alert("连接关闭");
      };
    } else {
      alert("你的浏览器不支持！");
    }

    //解压unzip数据方法
    function transBase64DataAndungzipData(unzipDataBase64) {
      var pako = require("pako");
      // var pako = window.pako;
      // var pako = new pako();
      // Get some base64 encoded binary data from the server. Imagine we got this:
      // Decode base64 (convert ascii to binary)
      var strData = atob(unzipDataBase64);
      // Convert binary string to character-number array
      var charData = strData.split("").map(function(x) {
        return x.charCodeAt(0);
      });
      // Turn number array into byte-array
      var binData = new Uint8Array(charData);
      // Pako magic
      var data = pako.inflate(binData);
      // Convert gunzipped byteArray back to ascii string:
      var strData = String.fromCharCode.apply(null, new Uint16Array(data));
      
      return strData;
    }
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    selectEvent(row, column, event) { 
      this.$router.push({ name: "product", params: { id: "hello" } });
    }
  },
  
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  font-size: 30px;
  line-height: 70px;
}

.el-main {
  text-align: center;
}

/* .el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: green;
} */
</style>