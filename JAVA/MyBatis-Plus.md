**where: WHERE 语句，拼接 + WHERE 条件
and: AND 语句，拼接 + AND 字段=值
andNew: AND 语句，拼接 + AND (字段=值)
or: OR 语句，拼接 + OR 字段=值
orNew: OR 语句，拼接 + OR (字段=值)
eq: 等于=
allEq: 基于 map 内容等于=
ne: 不等于<>
gt: 大于>
ge: 大于等于>=
lt: 小于<
le: 小于等于<=
like: 模糊查询 LIKE
notLike: NOT LIKE模糊查询
in: IN 查询
notIn: NOT IN 查询
isNull: NULL 值查询
isNotNull: IS NOT NULL
groupBy: 分组 GROUP BY
having: HAVING 关键词
orderBy: 排序 ORDER BY
orderAsc: Asc 排序 ORDER BY
orderDesc: DESC 排序 ORDER BY
exists: EXISTS 条件语句
notExists: NOT EXISTS 条件语句
between: BETWEEN 条件语句
notBetween: NOT BETWEEN 条件语句
addFilter: 自由拼接 SQL
last: 拼接在最后，例如：last(“LIMIT 1”)**