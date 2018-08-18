<template>
  <el-tabs type="border-card" style="padding-top: 10px">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 门店列表</span>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="门店名称">
          <el-input v-model="criteria.merchantName" placeholder="门店名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="startEnd"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="criteria.partnership" placeholder="请选择">
            <el-option
              v-for="item in partnerships"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="merchantListCriteria">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="merchantListData"
        border
        style="width: 100%">
        <el-table-column
          prop="merchantSid"
          label="门店序号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="门店名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="partnership"
          label="门店类型"
          align="center">
          <template slot-scope="item">
            <span v-if="item.row.partnership == 1" style="color: blue">联盟门店</span>
            <span v-else>普通门店</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间" align="center">
          <template slot-scope="item">{{ item.row.createDate | yyyyMmDdHhMmSs }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="criteria.currPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="criteria.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements"
        style="padding-top: 15px;text-align: right">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="消息中心">消息中心</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import {date_time_format_2, formatDate} from '~/assets/common/js/date'
  import {baseUrl} from "~/common/constant/constant";
  import {responseHandler} from '~/common/handler/axiosResponseHandler'

  export default {
    mixins: [responseHandler],
    data() {
      return {
        criteria: {
          merchantName: '',
          partnership: -1,
          start: '',
          end: '',
          currPage: 1,
          pageSize: 10
        },
        startEnd: [],
        merchantListData: [],
        totalElements: 0,
        partnerships: [{
          value: -1,
          label: '全部门店'
        }, {
          value: 1,
          label: '联盟门店'
        }, {
          value: 0,
          label: '普通门店'
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created() {
      this.merchantListCriteria()
    },
    computed: {
      ...mapGetters(['Authorization'])
    },
    watch: {
      startEnd: function (newVal) {
        this.criteria.start = formatDate(newVal[0], date_time_format_2);
        this.criteria.end = formatDate(newVal[1], date_time_format_2)
      }
    },
    methods: {
      merchantListCriteria() {
        console.log(JSON.stringify(this.criteria))
        axios({
          url: `${baseUrl}/api/merchant/list`,
          method: 'get',
          params: this.criteria,
          contentType: "application/json;charset=UTF-8"
        }).then((response) => {
          var res = response.data;
          this.merchantListData = res.content;
          this.totalElements = res.totalElements;
        }).catch((err) => {
          this.errorHandler(err)
        })
      },
      handleSizeChange1: function (currSize) {
        this.criteria.pageSize = currSize;
        this.criteria.currPage = 1;
        this.merchantListCriteria()
      },
      handleCurrentChange1: function (currPage) {
        this.criteria.currPage = currPage;
        this.merchantListCriteria()
      }
    }
  }
</script>

<style scoped>

</style>