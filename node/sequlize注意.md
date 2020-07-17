



 findAll  找到所有符合的条件的

findOne 找到第一个 符合条件的

update 只能   返回的对象使用   （）   返回变更的行数

Model.bulkCreate([…object])批量插入数据
（updateOnDuplicate是在插入的时候如果主键冲突就执行更新操作,也就是更新要有主键 ，这个传入数组，表示该表要更新的字段）   ①有主键更新  ②没主键，插入



create()    添加 新的记录  并返回 添加的数据

destroy()   删除记录  返回删除的行数



findAndCountAll          
  distinct: **true**, // findAndCountAll 多表联查 要用这个属性  DISTINCT聚合查询  （否则 计算条数可能出错）

分页：  limit  一页多少条数据

​            offset： 偏移量    计算公式（    （offset-1）*limit         ）

