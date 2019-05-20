## Element-UI中 table组件在项目中简单封装

> 暂时还没有添加 双击列表跳转进入编辑页的事件

1. 在html里

   ``` html
      <el-table
             id="dataContainer"
             ref="dataContainer"
             :data="tableData"
             border
             stripe
             tooltip-effect="dark"
             style="width:100%;"
           >
             <el-table-column type="index" width="55" align="center">
             </el-table-column>
             <el-table-column v-for="(column, key) in columns"
                              :key="key"
                              :prop="column.prop"
                              :label="column.label"
                              :width="column.width"
                              :align="column.align || 'center'"
                              :sortable="column.sortable"
                              :show-overflow-tooltip="true">
               <template slot-scope="scope">
                 <!--普通列-->
                 <span v-if="column.type =='common'">   {{ scope.row[column.prop] }}  </span>
                 <!--图片-->
                 <div v-else-if="column.type=='img'" style="text-align:center">
                   <img :src='scope.row[column.prop]' style="width:200px; height:100px;">
                 </div>
                 <!--类型为枚举enumTag，显示为tag-->
         <div class="tag-list-wrap" v-else-if="column.type=='enumTag' && scope.row[column.prop]">
                   <template v-for="item of column.enumList">
                     <el-tag v-if="scope.row[column.prop].desc === item.desc"
                             @click.stop="$emit('tagClick', item.key)"
                             :style="item.clickable ? 'cursor: pointer;' : ''" :type="item.type">
                       {{ item.desc }}
                     </el-tag>
                   </template>
                 </div>
                 <!--类型为format-->
                 <div v-else-if="column.type ==='format'">
                   {{ column.format(scope.row[column.prop])}}
                 </div>
                 <!--有操作栏-->
                 <div v-else-if="column.type=='operations'">
             <el-button   v-for="item of column.actions" size="small"             
                 @click.stop="handleOperationsClick(item.action,scope.row)" type="text"
                 :disabled="handleDisable(item.action, scope.row)" >
                     {{ item.label }}
                   </el-button>
                 </div>
               </template>
             </el-table-column>
           </el-table>
   ```

   2. script

      ```js
       import columns from './config/columns'   //将表格栏的信息封装进columns好管理
      export default{
          data(){
              return{
             tableData: [],  // table数据 axios请求到的数据仍进来就可以渲染列表数据
              columns: columns.new(),  //拿到table的栏信息
              }
          },
          methods:{
               //操作栏，传入一个type是按钮的类型  一个row是当前行的所有信息
      handleOperationsClick(type, row) {
              switch (type) {
          case 'enable':
                  this.toEdit(row);
                  break;
                case 'disable':
                  this.doDisable(row);
                  break;
                case 'delete':
                  this.doDelete(row);
                  break;
                default:
                  break;
              },
                  
            },
          }
      }
      ```
      
      3. 在config文件夹下的columns.js
      
         >   向外导出一个 数组对象
         
         ```js
         //列表的数据模型
         import moment  from 'moment';  //引入moment.js插件需要npm 下载 主要对时间格式化
         export default {
         
         //返回数据模型实例
           new: function () {
             return [
               {
                 type:'common',
                 prop: 'name',
                 label: '昵称',//列名称
                 visible: true,//是否显示
                 sortable: false,//是否可排序
               },
         
               {
                 type:'img',
                 prop: 'picPath',
                 label: '图片',//列名称
                 width:'400px',
                 visible: true,//是否显示
                 sortable: false,//是否可排序
               },
               {
                 type: 'format',
                 prop: 'time',
                 label: '创建时间',//列名称
                 visible: true,//是否显示
                 sortable: false,//是否可排序
                 format: function(time){
                   return new moment(time).format('YYYY-MM-DD ');
                 },
               },
         
               {
                 type:'enumTag',
                 prop: 'status',
                 label: '状态',//列名称
                 visible: true,//是否显示
                 sortable: false,//是否可排序
                 enumList: [
                   {
                     key: 'enable',
                     desc: '启用',
                     type: 'success'
                   },
                   {
                     key: 'disable',
                     desc: '禁用',
                     type: 'danger'
                   },
                 ],
               },
               {
                 label: '操作',
                 width: '180',
                 type:'operations',
                 visible: true,
                 fixed: 'right',
                 align: 'center',
                 actions: [
             {
                     action:'enable',
                     label:'启用'
                   },
                   {
                     action: 'disable',
                     label: '禁用'
                   },
                   {
                     action: 'delete',
                     label: '删除'
                   },
                 ],
               }
             ]
           }
         }
         
         
      
         ```
         
         