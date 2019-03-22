# 数据库基本SQL语句大全

标签（空格分隔）： 其他

---

## 基础
1. 创建数据库： Create DATABASE database-name
2. 删除数据库： drop database dbname
3. 创建新表： creat table tablename(col 1 type [not null][primary key], col2 type2[not null]...)
4. 根据已有的表创建新表： 
    A： create table tab_new like tab_old (使用旧表创建新表)
    B： create table tab_new as select col1,col2...from tab_old definition only
5. 删除新表： drop table tabname
6. 增加一个列： alter table tabname add column col type
7. 创建视图： create view viewname as select statement

## 几个简单的基本sql语句
选择： select * from table 1 where 范围
插入： insert into table1(field1,field2)(value1, value2)
删除： delete from table 1 where 范围
更新： update table1 set field=value1 where 范围
查找： select * from table1 where fleld1, field2 [desc]
总数： select count as totalcount from table1
求和：select sum(field1) as sumvalue from table1
平均：select avg(field1) as avgvalue from table1
最大：select max(field1) as maxvalue from table1
最小：select min(field1) as minvalue from table1