type User ={
  id: string; // 唯一标识：用户ID
  username: string;// 用户名
  phone: string;// 用户注册或绑定的手机号
  email: string;// 用户绑定的邮箱
  avatarUrl: string;// 用户头像
  gender: 'male' | 'female' | 'other';// 性别
  birthday: Date;// 生日
  address: {
    street: string;// 街道
    county: string//区县
    city: string;// 城市
    province: string;// 省份
    detailsAddress: string;// 详细地址
  };
  registrationDate: Date;// 注册日期时间
  lastLogin: Date;// 最后登录日期时间
  accountStatus: 'active' | 'frozen' | 'pending';// 账户状态：active正常/ frozen冻结/ pending待激活
  role: 'user' | 'admin' | 'vip';// 用户角色：user普通用户/admin管理员/vip会员  
  permissions: string[]; // 用户权限
  // points: number; // 用户积分
  // coupons: Coupon[];// 用户优惠券
  // orderHistory: Order[];// 用户订单历史
  // favorites: Product[];// 用户收藏夹
}
interface State{
  token: string|null; // 用户登录凭证
  userInfo: User|null;// 用户信息
  isAuthenticated: boolean//是否已登陆
}
interface Action{
  login: (token: string, userInfo: User) => void;
  logout: () => void;
}