<!--  -->
<template>
  <div>
    <el-container>
      <el-header style="height:70px">
        平安银行证券系统
        <span class="creategroup" @click="queryProductList">
          <i class="el-icon-tickets" style="margin-right: 15px"></i>
          <span>创建分组</span>
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <div class="flexContainer">
            <div class="flexItem">
              <div>
                <label for class="textshow">数据条数:</label>
                <el-input-number
                  size="small"
                  v-model="num1"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </div>

              <div>
                <label for class="textshow">容忍时间:</label>
                <el-input-number
                  size="small"
                  v-model="num1"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </div>
            </div>
            <div class="flexItem timer">
              <label for class="textshow">时间:</label>
              <span>10000s</span>
            </div>
          </div>
          <div class="splitline"></div>-->
          <div class="product">产品分组</div>
          <el-collapse accordion>
            <div v-for="(item,index) in items" :key="index" @click="selectChange(item)">
              <el-collapse-item>
                <template slot="title">{{item.groupName}}</template>
                <div v-for="(product,i) in item.productList" :key="i">{{product.name}}</div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column property="symbol" label="symbol"></el-table-column>
            <el-table-column property="name" label="name"></el-table-column>
            <el-table-column property="trade" label="trade"></el-table-column>
            <el-table-column property="changeratio" label="changeratio"></el-table-column>
            <el-table-column property="turnover" label="turnover"></el-table-column>
            <el-table-column property="amount" label="amount"></el-table-column>
            <el-table-column property="inamount" label="inamount"></el-table-column>
            <el-table-column property="outamount" label="outamount"></el-table-column>
            <el-table-column property="netamount" label="netamount"></el-table-column>
            <el-table-column property="ratioamount" label="ratioamount"></el-table-column>
            <el-table-column property="r0_in" label="r0_in"></el-table-column>
            <el-table-column property="r0_net" label="r0_net"></el-table-column>
            <el-table-column property="r3_in" label="r3_in"></el-table-column>
            <el-table-column property="r3_out" label="r3_out"></el-table-column>
            <el-table-column property="r3_net" label="r3_net"></el-table-column>
            <el-table-column property="r0_ratio" label="r0_ratio"></el-table-column>
            <el-table-column property="r3_ratio" label="r3_ratio"></el-table-column>
            <el-table-column property="r0x_ratio" label="r0x_ratio"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="产品列表" :visible.sync="dialogTableVisible">
      <el-table
        :data="gridData"
        height="250"
        width="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column property="symbol" label="symbol" width="150"></el-table-column>
        <el-table-column property="name" label="name" width="150"></el-table-column>
        <el-table-column property="trade" label="trade" width="150"></el-table-column>
        <el-table-column property="changeratio" label="changeratio" width="150"></el-table-column>
        <el-table-column property="turnover" label="turnover" width="150"></el-table-column>
        <el-table-column property="amount" label="amount" width="150"></el-table-column>
        <el-table-column property="inamount" label="inamount" width="150"></el-table-column>
        <el-table-column property="outamount" label="outamount" width="150"></el-table-column>
        <el-table-column property="netamount" label="netamount" width="150"></el-table-column>
        <el-table-column property="ratioamount" label="ratioamount" width="150"></el-table-column>
        <el-table-column property="r0_in" label="r0_in" width="150"></el-table-column>
        <el-table-column property="r0_net" label="r0_net" width="150"></el-table-column>
        <el-table-column property="r3_in" label="r3_in" width="150"></el-table-column>
        <el-table-column property="r3_out" label="r3_out" width="150"></el-table-column>
        <el-table-column property="r3_net" label="r3_net" width="150"></el-table-column>
        <el-table-column property="r0_ratio" label="r0_ratio" width="150"></el-table-column>
        <el-table-column property="r3_ratio" label="r3_ratio" width="150"></el-table-column>
        <el-table-column property="r0x_ratio" label="r0x_ratio" width="150"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-form :inline="true" class="demo-form-inline" style="float:left">
          <el-form-item label="创建分组">
            <el-input v-model="groupName" placeholder="请输入分组名"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreateGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryProductList,
  submitCreateGroup,
  queryProductGroupInfo,
  sendMessage
} from "@/api/api";
export default {
  data() {
    return {
      items: [
        // {
        //   groupName: "一致性 Consistency",
        //   productList: [
        //     {
        //       id: "123",
        //       name: "中石化"
        //     }
        //   ]
        // },
        // {
        //   groupName: "一致性 Consistency",
        //   productList: [
        //     {
        //       id: "123",
        //       name: "中石化"
        //     }
        //   ]
        // },
        // {
        //   groupName: "一致性 Consistency",
        //   productList: [
        //     {
        //       id: "123",
        //       name: "中石化"
        //     }
        //   ]
        // }
      ],
      name: "",
      num1: "",
      input: "",
      tableData: [],
      oldTableData: [],
      productData: [
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        },
        {
          num: 1,
          code: "01239",
          name: "首创钜大"
        }
      ],
      gridData: [], //产品表格
      dialogTableVisible: false,
      groupName: ""
    };
  },

  components: {},

  computed: {},

  mounted() {
    var socket;
    const that = this;
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
      socket = new WebSocket("ws://localhost:8090/ws");

      socket.onmessage = function(event) {
        console.log(event.data);
        var firstTime = new Date().getTime();
        var unzipStr = transBase64DataAndungzipData(event.data);
        var secondTime = new Date().getTime();
        var spendTime = Number(secondTime) - Number(firstTime);
        let data = JSON.parse(unzipStr);
        console.log(data);
        console.log(
          "解压花费毫秒数：" + spendTime + ",数据条数:" + data.length
        );
        var oldTableData = that.oldTableData;
        that.$set(that, "tableData", data);
      };

      socket.onopen = function(event) {
        // window.alert("连接开启");
        console.log("连接开启");
      };

      socket.onclose = function(event) {
        // window.alert("连接关闭");
        console.log("连接关闭");
      };
    } else {
      alert("你的浏览器不支持！");
    }

    //解压unzip数据方法
    function transBase64DataAndungzipData(unzipDataBase64) {
      var pako = require("pako");
      var strData = atob(unzipDataBase64);
      // Convert binary string to character-number array
      var charData = strData.split("").map(function(x) {
        return x.charCodeAt(0);
      });
      // Turn number array into byte-array
      var binData = new Uint8Array(charData);
      // // unzip
      var data = pako.inflate(binData);
      // Convert gunzipped byteArray back to ascii string:
      // strData   = String.fromCharCode.apply(null, new Uint16Array(data));
      var array = new Uint16Array(data);
      var res = "";
      var chunk = 8 * 1024;
      var i;
      for (i = 0; i < array.length / chunk; i++) {
        res += String.fromCharCode.apply(
          null,
          array.slice(i * chunk, (i + 1) * chunk)
        );
      }
      res += String.fromCharCode.apply(null, array.slice(i * chunk));
      strData = decodeURIComponent(res);
      return strData;
    }
  },

  methods: {
    queryProductList() {
      queryProductList({ page: 1, num: 100 })
        .then(res => {
          this.gridData = res;
          this.dialogTableVisible = true;
        })
        .catch(res => {
          this.dialogTableVisible = false;
          this.$message.error(res);
        });
    },

    submitCreateGroup() {
      if (this.groupName == "") {
        this.$message.error("请输入分组名");
        return false;
      }
      if (this.multipleSelection != undefined) {
        var obj = {};
        var param = {};
        obj.groupName = this.groupName;
        obj.productList = [];
        for (var len = 0; len < this.multipleSelection.length; len++) {
          obj.productList.push({
            symbol: this.multipleSelection[len].symbol,
            name: this.multipleSelection[len].name
          });
        }
        var data = JSON.stringify(obj);
        submitCreateGroup({ data: data }).then(res => {
          console.log(res);
          obj.groupKey = res;
          this.items.push(obj);
          this.dialogTableVisible = false;
        });
      } else {
        this.$message.error("请选择产品");
        return false;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    selectChange(activeNames) {
      queryProductGroupInfo({ groupKey: activeNames.groupKey })
        .then(res => {
          console.log("重置成功");
          sendMessage({ groupKey: activeNames.groupKey }).then(res => {
            console.log("开始发送数据");
          });
        })
        .catch(res => {
          this.$message.error(res);
        });
    },

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
    },
    handleChange() {}
  },
  handlgroup(key, keyPath) {
    console.log(key, keyPath);
  }
};
</script>
<style scoped>
.textshow {
  display: inline-block;
  border-radius: 4px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 32px;
  line-height: 32px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  font-size: 30px;
  line-height: 70px;
}

.el-header .creategroup {
  text-align: right;
  display: inline-block;
  float: right;
  font-size: 18px;
}

.el-main {
  text-align: center;
}

.el-aside {
  text-align: center;
  border-right: 1px solid #b3c0d1;
  padding-top: 20px;
}

.product {
  color: #333;
  font-weight: bold;
}

.splitline {
  border: 1px solid #b3c0d1;
}
.flexContainer {
  display: flex;
}

.flexItem {
  flex: auto;
}
.timer {
  padding-top: 15px;
}
.selected {
  background-color: red;
}
</style>