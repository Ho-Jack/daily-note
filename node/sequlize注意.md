



 findAll  找到所有符合的条件的

findOne 找到第一个 符合条件的

update 只能   返回的对象使用   （）   返回变更的行数   返回的是数组

Model.bulkCreate([…object])批量插入数据
（updateOnDuplicate是在插入的时候如果主键冲突就执行更新操作,也就是更新要有主键 ，这个传入数组，表示该表要更新的字段）   ①有主键更新  ②没主键，插入



create()    添加 新的记录  并返回 添加的数据

destroy()   删除记录  返回删除的行数



findAndCountAll          
  distinct: **true**, // findAndCountAll 多表联查 要用这个属性  DISTINCT聚合查询  （否则 计算条数可能出错）

分页：  limit  一页多少条数据

​            offset： 偏移量    计算公式（    （offset-1）*limit         ）





事务：

```js
let transaction;
try {
	// 建立事务对象
    transaction = await this.ctx.model.transaction();
    
    // 事务增操作
    await this.ctx.model.VirtualDeptMember.create({
        JSON格式数据
    }, {
        transaction,
    });
    
    // 事务删操作
    await this.ctx.model.VirtualDeptMember.destroy({
        where: {
        	JSON格式数据
        },
    	transaction,
    });
    
    // 事务改操作
    await this.ctx.model.Device.update({
        修改的JSON数据
    }, {
        where: {
        	查询的JSON数据
        },
        transaction,
    });
    
    // 提交事务
    await transaction.commit();
} catch (err) {
	// 事务回滚
    await transaction.rollback();
}
```





联表 删除

```js
const parents = await this.ctx.model.Parent.findAll({
    where: { id: parents_id },
    include: [{
        model: this.ctx.model.Children,
        as: 'children',
    }],
});
for (const parent of parents) {
	for (const child of parent.children) {
		child.destroy();
	}
	parent.destroy();
}
```



