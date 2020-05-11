import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/index",
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import("../views/home/index.vue"),
        meta: {
          requireAuth: true,  // 该路由项需要权限校验
        }
      },
      {
        path: '/My',
        name: 'My',
        component: () => import("../views/home/my.vue"),
        meta: {
          requireAuth: true,  // 该路由项需要权限校验
        }
      }
    ]
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import("../views/login/Signup.vue")
  },
  {
    path: '/PhoneLogin',
    name: 'PhoneLogin',
    component: () => import("../views/login/PhoneLogin.vue")
  },
  {
    path: '/AccLogin',
    name: 'AccLogin',
    component: () => import("../views/login/AccLogin.vue")
  },
  {
    path: '/ForgetPwdOne',
    name: 'ForgetPwdOne',
    component: () => import("../views/login/ForgetPwdOne.vue"),
  },
  {
    path: '/ForgetPwdTwo',
    name: 'ForgetPwdTwo',
    component: () => import("../views/login/ForgetPwdTwo.vue")
  },
  {
    path: '/News',
    name: 'News',
    component: () => import("../views/news/News.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/NewsDetail/:id/:createcode/:mobile_phone/',
    name: 'NewsDetail',
    component: () => import("../views/news/NewsDetail.vue")
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import("../views/my/aboutus.vue")
  },
  {
    path: '/pwdconfirm',
    name: 'pwdconfirm',
    component: () => import("../views/my/pwdconfirm.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/password',
    name: 'password',
    component: () => import("../views/my/password.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import("../views/my/recommend.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/share',
    name: 'share',
    component: () => import("../views/my/share.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import("../views/my/teacher.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },

  {
    path: '/user',
    name: 'user',
    component: () => import("../views/my/user.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import("../views/customer/customer.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import("../views/search/search.vue"),
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404/notFound.vue')
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: '/404'
  }


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      console.log("token存在");
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/AccLogin', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // query: { redirect: to.fullPath }
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});


export default router
