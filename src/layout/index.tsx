import { Outlet, useLocation, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from'./index.module.less'

export default function Layout() {
  const {pathname} = useLocation()
  const [isActive, setIsActive]=useState<number>(0)

  useEffect(()=>{
    return ()=>{}
  }, [pathname])
  return (
    <div className={styles['mini-container']}>
      <header className={styles['mini-header']}>
        <nav className={styles.nav}>
          <NavLink className={isActive === 0 ? `${styles['mini-nav']} ${styles.active}` : `${styles['mini-nav']}`}  onClick={() => setIsActive(0)} to='/home'>Home</NavLink >
          <NavLink className={isActive === 1 ? `${styles['mini-nav']} ${styles.active}` : `${styles['mini-nav']}`} onClick={() => setIsActive(1)}  to='/works'>作品</NavLink >
        </nav>
      </header>
      <main className={styles['min-body']}>
        <div className={styles['min-body-box']}>
        <Outlet />
        </div>
      </main>
    </div>
  )
} 