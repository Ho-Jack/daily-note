package com.qfedu.dao;

import com.qfedu.pojo.Member;
import com.qfedu.pojo.MemberSearchCondition;
import com.qfedu.utils.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;

public class MemberDAOTest {

    @Test
    public void testSearchMember() {

        HashMap<String,Object> params = new HashMap<String, Object>();
        params.put("gender","女");
        params.put("minAge",18);
        //params.put("maxAge",23);
        params.put("city","武汉");

        //-----------------------------------------------------------------------
        MemberSearchCondition params2 = new MemberSearchCondition();
        params2.setGender("女");
        //params2.setMinAge(21);
        //params2.setMaxAge(30);
        //params2.setCity("武汉");

        //==========================================================================

        MemberDAO memberDAO = MyBatisUtil.getMapper(MemberDAO.class);
        List<Member> members = memberDAO.searchMember(params2);

        for (Member m: members) {
            System.out.println(m);
        }
    }

    @Test
    public void searchMemberByCity() {
        List<String> cities = new ArrayList<String>();
        cities.add("厦门");
        cities.add("宜昌");
        MemberDAO memberDAO = MyBatisUtil.getMapper(MemberDAO.class);
        List<Member> members = memberDAO.searchMemberByCity(cities);
        for (Member m: members) {
            System.out.println(m);
        }
    }


    @Test
    public void testSearchMemberByNick(){
        MemberDAO memberDAO = MyBatisUtil.getMapper(MemberDAO.class);

//        HashMap<String,Object> params = new HashMap<String, Object>();
//        params.put("keyWord","花");
        List<Member> members = memberDAO.searchMemberByNick("花");
        for (Member m: members) {
            System.out.println(m);
        }
    }

    @Test
    public void testQueryMemberById(){
        SqlSessionFactory factory =MyBatisUtil.getSqlSessionFactory();
        // 1.多个SqlSession对象必须来自于同一个SqlSessionFactory
        SqlSession sqlSession1 = factory.openSession(true);
        SqlSession sqlSession2 = factory.openSession(true);
        System.out.println(sqlSession1 == sqlSession2);

        MemberDAO memberDAO1 = sqlSession1.getMapper(MemberDAO.class);
        Member member1 = memberDAO1.queryMemberById(1);
        System.out.println(member1);
        sqlSession1.commit();  //2.第一次查询之后执行sqlSession1.commit()，会将当前sqlsession的查询结果缓存到二级缓存

        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        MemberDAO memberDAO2 = sqlSession2.getMapper(MemberDAO.class);
        Member member2 =memberDAO2.queryMemberById(1);
        System.out.println(member2);
    }

}