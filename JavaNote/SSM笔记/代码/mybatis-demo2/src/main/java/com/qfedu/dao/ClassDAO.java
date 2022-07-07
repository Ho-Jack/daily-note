package com.qfedu.dao;

import com.qfedu.pojo.Clazz;

public interface ClassDAO {

    /**
     * 根据班级编号，查询班级信息
     */
    public Clazz queryClass(int classId);


}
