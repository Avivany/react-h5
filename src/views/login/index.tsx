import {Input,Button} from 'antd-mobile'
import styles from './index.module.less'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import viteLogo from '/vite.svg';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useAuthStore } from '@/store'

import { login as loginHttp } from '@/api/modules/user'

type FormData = {
  username: string,
  password: string
}
const Login=()=> {
  const navigate = useNavigate();
  const login  = useAuthStore((state) => state.login);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ username : 'admin', password: '123456'})
    useEffect(()=>{
      
    },[])
  const submitLogin = async ():Promise<void|any>=>{
    try{
      let res = await loginHttp(formData);
      login(res.token,res.userInfo)

      console.log(res)
      // navigate('/home',{replace:true})

    }catch(error){
      console.log(error)
      alert('请求错误')
    }
   
  }
  return (
    <div className={styles.login}>
        <div className={styles.content}>
            <div className={styles.logoCont1}>
                  <div className={styles.logo}>
                      <img src={viteLogo} alt="Vite logo" />
                  </div>
                  <div className={styles.title}>
                    <h1>你好，欢迎登录</h1>
                    <p>推荐使用账户登录</p>
                  </div>
            </div>
            <div className={styles.item}>
                <div className={styles.label}>账号</div>
                <div className={styles.input}>
                <Input placeholder="请输入账号" value={formData.username} onChange={(val)=>setFormData({...formData,username:val})} />
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.label}>密码</div>
                <div className={styles.input}> 
                      <Input placeholder='请输入密码' value={formData.password}  onChange={(val)=>setFormData({...formData,password:val})} type={visible?'text':'password'} />
                      <div className={styles.eye}>
                          {!visible ? (
                              <EyeInvisibleOutline fontSize={24} onClick={() => setVisible(true)} />
                          ) : (
                                  <EyeOutline fontSize={24} onClick={() => setVisible(false)} />
                          )}
                      </div>
                </div>
            </div>
              <div className={styles.loginBtn}>
                  <Button block className={styles.btn} color="primary" fill='solid' size='large' onClick={submitLogin}>登录</Button>
                  <div className={styles.link}>还没有账号,<a>立即注册</a></div>
            </div>
        </div>
    </div>
  )
}

export default Login;