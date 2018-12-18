import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main/main'
import Login from '@/view/login/login'
// 码标管理
import CodeManagement from '@/view/code-management/code-management'
// 产品管理
import ProductManagement from '@/view/product-management/product-management'
// 原料基本信息
import MaterialInfo from '@/view/material-info/material-info'
// 原料生产企业
import MaterialCompany from '@/view/material-company/material-company'
// 辅料基本信息
import AuxiliaryInfo from '@/view/auxiliary-info/auxiliary-info'
// 辅料生产企业
import AuxiliaryCompany from '@/view/auxiliary-company/auxiliary-company'
// 产线车间
import ProductionLine from '@/view/production-line/production-line'
// 行政区划
import AdministrativeDivision from '@/view/administrative-division/administrative-division'
// 权限组管理
import PermissionManagement from '@/view/permission-management/permission-management'
// 用户管理
import UserManagement from '@/view/user-management/user-management'
// 企业信息
import EnterpriseInformation from '@/view/enterprise-information/enterprise-information'
// 原料批次管理
import MaterialsBatch from '@/view/materials-batch/materials-batch'
// 辅料批次管理
import AuxiliaryBatch from '@/view/auxiliary-batch/auxiliary-batch'
// 批次生产任务
import BatchProduction from '@/view/batch-production/batch-production'
// 新增批次生产任务
import AddBatch from '@/view/batch-production/add'
// 新增批次生产任务步骤1
import Step1 from '@/view/batch-production/step1'
// 新增批次生产任务步骤2
import Step2 from '@/view/batch-production/step2'
// 新增批次生产任务步骤3
import Step3 from '@/view/batch-production/step3'
// 批次信息汇总
import Information from '@/view/batch-production/information/index'
// 批次追溯查询
import TraceBack from '@/view/trace-back/trace-back'
// 码追溯查询
import TraceBackCode from '@/view/trace-back-code/trace-back-code'
// 批次生产修改
import ModifyBatch from '@/view/batch-production/modify/index'
// 登录日志
import LoginLog from '@/view/login-log/login-log'
// 维护日志
import ProtectLog from '@/view/protect-log/protect-log'


Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/main',
      name: '主页面',
      component: Main,
      children: [
        {
          path: '/',
          redirect: '/codeManagement'
        },
        {
          path: '/codeManagement',
          name: '码标管理',
          component: CodeManagement,
          meta: {
            flag: 1
          }
        },
        {
          path: '/productManagement',
          name: '产品管理',
          component: ProductManagement,
          meta: {
            flag: 1
          }
        },
        {
          path: '/materialInfo',
          name: '原料基本信息',
          component: MaterialInfo,
          meta: {
            flag: 1
          }
        },
        {
          path: '/materialCompany',
          name: '原料生产企业',
          component: MaterialCompany,
          meta: {
            flag: 1
          }
        },
        {
          path: '/auxiliaryInfo',
          name: '辅料基本信息',
          component: AuxiliaryInfo,
          meta: {
            flag: 1
          }
        },
        {
          path: '/auxiliaryCompany',
          name: '辅料生产企业',
          component: AuxiliaryCompany,
          meta: {
            flag: 1
          }
        },
        {
          path: '/productionLine',
          name: '产线车间',
          component: ProductionLine,
          meta: {
            flag: 1
          }
        },
        {
          path: '/administrativeDivision',
          name: '行政区划',
          component: AdministrativeDivision,
          meta: {
            flag: 1
          }
        },
        {
          path: '/permissionManagement',
          name: '权限组管理',
          component: PermissionManagement,
          meta: {
            flag: 1
          }
        },
        {
          path: '/userManagement',
          name: '用户管理',
          component: UserManagement,
          meta: {
            flag: 1
          }
        },
        {
          path: '/enterpriseInformation',
          name: '企业信息',
          component: EnterpriseInformation,
          meta: {
            flag: 1
          }
        },
        {
          path: '/materialsBatch',
          name: '原料批次管理',
          component: MaterialsBatch,
          meta: {
            flag: 2
          }
        },
        {
          path: '/auxiliaryBatch',
          name: '辅料批次管理',
          component: AuxiliaryBatch,
          meta: {
            flag: 2
          }
        },
        {
          path: '/batchProduction',
          name: '批次生产任务',
          component: BatchProduction,
          meta: {
            flag: 2
          }
        },
        {
          path: '/addBatch',
          name: '新增批次生产任务',
          component: AddBatch,
          meta: {
            flag: 2
          },
          children: [
            {
              path: '/',
              redirect: '/addBatch/step1'
            },
            {
              path: '/addBatch/step1',
              name: '步骤1',
              component: Step1
            },
            {
              path: '/addBatch/step2',
              name: '步骤2',
              component: Step2
            },
            {
              path: '/addBatch/step3',
              name: '步骤3',
              component: Step3
            }
          ]
        },
        {
          path: '/modifyBatch',
          name: '修改批次生产任务',
          component: ModifyBatch.modify,
          meta: {
            flag: 2
          },
          children: [
            {
              path: '/',
              redirect: '/modifyBatch/step1'
            },
            {
              path: '/modifyBatch/step1',
              name: '步骤1',
              component: ModifyBatch.step1
            },
            {
              path: '/modifyBatch/step2',
              name: '步骤2',
              component: ModifyBatch.step2
            },
            {
              path: '/modifyBatch/step3',
              name: '步骤3',
              component: ModifyBatch.step3
            }
          ]
        },
        {
          path: '/information',
          name: '信息汇总',
          component: Information.Information,
          meta: {
            flag: 2
          },
          children: [
            {
              path: '/',
              redirect: '/information/product'
            },
            {
              path: '/information/product',
              name: '产品信息',
              component: Information.Information1
            },
            {
              path: '/information/batch',
              name: '生产批次信息',
              component: Information.Information2
            },
            {
              path: '/information/putting',
              name: '批次投料信息',
              component: Information.Information3
            },
            {
              path: '/information/task',
              name: '批次生产任务信息',
              component: Information.Information4
            },
            {
              path: '/information/random',
              name: '抽检信息',
              component: Information.Information5
            },
            {
              path: '/information/check',
              name: '检验信息',
              component: Information.Information6
            }
          ]
        },
        {
          path: '/traceBack',
          name: '批次追溯查询',
          component: TraceBack,
          meta: {
            flag: 2
          }
        },
        {
          path: '/traceBackCode',
          name: '码追溯查询',
          component: TraceBackCode,
          meta: {
            flag: 2
          }
        },
        {
          path: '/loginLog',
          name: '登录日志',
          component: LoginLog,
          meta: {
            flag: 3
          }
        },
        {
          path: '/protectLog',
          name: '维护日志',
          component: ProtectLog,
          meta: {
            flag: 3
          }
        }
      ]
    }
  ]
})
let flag = 0

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    let vm = new Vue()
    if(!vm.GLOBAL.dictionaryData[400]) {
      // 获取字典
      vm.$http({
        method: 'post',
        url: vm.$api + 'produce/personal/rs/dm/getForCombox',
        data: {}
      }).then((res) => {
        if (res.data.retCode === 1) {
          vm.GLOBAL.dictionaryData = transform(res.data.retVal)
          isNext(next)
          // next()
        }
      })

      // 获取权限资源
      vm.$http({
        url: vm.$api + 'produce/resources/rs/groups/resources/listByUser',
        method: 'post',
        data: {
          reqParam: {
            uId: localStorage.getItem('uId')
          }
        }
      }).then(res => {
        if (res.data.retCode === 1) {
          vm.GLOBAL.listByUser = userFormat(res.data.retVal)
          isNext(next)
          // next()
        }
      })

      // 获取行政区划
      vm.$http({
        method: 'post',
        url: vm.$api + 'produce/resources/rs/area/getForCombox',
        data: {}
      }).then((res) => {
        if (res.data.retCode === 1) {
          vm.GLOBAL.areaList = res.data.retVal
          isNext(next)
          // next()
        }
      })
    } else {
      next()
    }

  } else {
    next()
  }
 next(false)
})
// 字典改造
function transform (data) {
  // 启用 停用
  let arr1 = []
  let arr2 = []
  for (let i in data[400]) {
    if (data[400][i].dName === '启用' || data[400][i].dName === '停用') {
      arr1.push(data[400][i])
    }
    if (data[400][i].dName === '是' || data[400][i].dName === '否') {
      arr2.push(data[400][i])
    }
  }

  data['for1'] = arr1
  data['for2'] = arr2
  return data
}

function userFormat (data) {
  let arr = []
  data.forEach(a => {
    if(a.pid === 0) {
      a.child = []
      arr.push(a)
    }
  })
  arr.forEach(a=>{
    data.forEach(b=>{
      if(b.pid === a.pkId) {
        b.child = []
        a.child.push(b)
      }
    })
  })
  arr.forEach(a=>{
    a.child.forEach(b=>{
      data.forEach(c=>{
        if(c.pid===b.pkId) {
          b.child.push(c)
        }
      })
    })
  })
  return arr
}

function isNext (next) {
  flag++
  if (flag === 3) {
    next()
  }
}

export default router
