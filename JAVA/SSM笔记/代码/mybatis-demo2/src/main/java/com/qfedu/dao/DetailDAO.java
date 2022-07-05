package com.qfedu.dao;

import com.qfedu.pojo.Detail;

public interface DetailDAO {

    public int insertDetail(Detail detail);

    public Detail queryDetailByUid(int uid);
}
