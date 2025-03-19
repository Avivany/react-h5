import {FC} from 'react';
import { useRouteError } from "react-router-dom";
import styles from './index.module.less'

const ErrorBoundary: FC = () => {
  const error = useRouteError() as any;
  console.log(error);
  //更加根据不同的业务场景，处理不同的错误
  return (
      <div  className={styles['err-container']}>
        <h1 className={styles.h1}>{error?.name || 'Error'}:
        </h1>
        <p style={{ fontWeight: 'bold' }}>{error?.message || error?.error?.message}</p>
        <div className={styles['err-stack']}>
          <p className={styles.p}>Render Fail:</p>
          <pre className={styles.pre}> {error?.stack || error?.error?.stack}</pre>
        </div>
        <button className={styles.button} onClick={() => location.reload()}> 重试 </button>
        <button className={styles['butn-rtn']} onClick={() => history.back()}> 返回</button>
        <button
          className={styles['butn-index']} onClick={() => (location.href = '/')}>回到首页</button>
      </div>
    )

}

export default ErrorBoundary;