import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main/main'
import Login from '@/view/login/login'
// 码标管理
import CodeManagement from '@/view/code-management/code-management'
import CodeManagementZY from '@/view/code-management-zy/code-management-zy'
// 产品管理
import ProductManagement from '@/view/product-management/product-management'
import ProductManagementZY from '@/view/product-management-zy/product-management-zy'
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
// 统筹批发企业
import WholesaleCompanyTC from '@/view/wholesale-company-tc/wholesale-company-tc'
// 自营批发企业
import WholesaleCompanyZY from '@/view/wholesale-company-zy/wholesale-company-zy'
// 统筹经营企业
import enterprisesManagementTc from '@/view/enterprises-management-tc/enterprises-management-tc'
// 自营经营企业
import enterprisesManagementZy from '@/view/enterprises-management-zy/enterprises-management-zy'
// 生产出入库查询
import ProductionStock from '@/view/production-stock/production-stock'
// 生产企业报告
import ProductionReport from '@/view/production-report/production-report'
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
        // {
        //   path: '/',
        //   redirect: '/codeManagement'
        // },
        {
          path: '/codeManagement',
          name: '省内码标管理',
          component: CodeManagement
        },
        {
          path: '/codeManagementZY',
          name: '中盐码标管理',
          component: CodeManagementZY
        },
        {
          path: '/productManagement',
          name: '统筹产品',
          component: ProductManagement
        },
        {
          path: '/productManagementZY',
          name: '产品管理',
          component: ProductManagementZY
        },
        {
          path: '/materialInfo',
          name: '原料基本信息',
          component: MaterialInfo
        },
        {
          path: '/materialCompany',
          name: '原料生产企业',
          component: MaterialCompany
        },
        {
          path: '/auxiliaryInfo',
          name: '辅料基本信息',
          component: AuxiliaryInfo
        },
        {
          path: '/auxiliaryCompany',
          name: '辅料生产企业',
          component: AuxiliaryCompany
        },
        {
          path: '/productionLine',
          name: '产线车间',
          component: ProductionLine
        },
        {
          path: '/administrativeDivision',
          name: '行政区划',
          component: AdministrativeDivision
        },
        {
          path: '/permissionManagement',
          name: '权限组管理',
          component: PermissionManagement
        },
        {
          path: '/userManagement',
          name: '用户管理',
          component: UserManagement
        },
        {
          path: '/enterpriseInformation',
          name: '企业信息',
          component: EnterpriseInformation,
        },
        {
          path: '/materialsBatch',
          name: '原料批次管理',
          component: MaterialsBatch,
        },
        {
          path: '/auxiliaryBatch',
          name: '辅料批次管理',
          component: AuxiliaryBatch,
        },
        {
          path: '/batchProduction',
          name: '批次生产任务',
          component: BatchProduction,
        },
        {
          path: '/addBatch',
          name: '新增批次生产任务',
          component: AddBatch,
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
          component: TraceBack
        },
        {
          path: '/traceBackCode',
          name: '码追溯查询',
          component: TraceBackCode
        },
        {
          path: '/loginLog',
          name: '登录日志',
          component: LoginLog
        },
        {
          path: '/protectLog',
          name: '维护日志',
          component: ProtectLog
        },
        {
          path: '/wholesaleCompanyTC',
          name: '统筹批发企业',
          component: WholesaleCompanyTC
        },
        {
          path: '/wholesaleCompanyZY',
          name: '自营批发企业',
          component: WholesaleCompanyZY
        },{
          path: '/enterprisesManagementTc',
          name: '统筹经营企业',
          component: enterprisesManagementTc
        },{
          path: '/enterprisesManagementZy',
          name: '自营经营企业',
          component: enterprisesManagementZy
        },
        {
          path: '/production-stock',
          name: '生产出入库查询',
          component: ProductionStock
        },
        {
          path: '/production-report',
          name: '生产企业报告',
          component: ProductionReport
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
          // 2.3
          res.data.retVal.push({
            "ord":1,
            "pid":10000,
            "pkId":10,
            "sName":"批发企业管理",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":1,
            "pid":10,
            "pkId":101,
            "sName":"统筹批发企业",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":1,
            "pid":10,
            "pkId":102,
            "sName":"自营批发企业",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":1,
            "pid":10000,
            "pkId":20,
            "sName":"经营企业管理",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":1,
            "pid":20,
            "pkId":201,
            "sName":"统筹经营企业",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":1,
            "pid":20,
            "pkId":202,
            "sName":"自营经营企业",
            "sType":2002
          })
          res.data.retVal.push({
            "ord":8,
            "pid":0,
            "pkId":40000,
            "sName":"查询中心",
            "sType":2001
          })
          res.data.retVal.push({
            "ord":8,
            "pid":40000,
            "pkId":40500,
            "sName":"生产出入库查询",
            "sType":2001
          })
          res.data.retVal.push({
            "ord":8,
            "pid":0,
            "pkId":50000,
            "sName":"报告中心",
            "sType":2001
          })
          res.data.retVal.push({
            "ord":8,
            "pid":50000,
            "pkId":50500,
            "sName":"生产企业报告",
            "sType":2001
          })
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
        if(b.pkId===10500 || b.pkId===11500 || b.pkId===11000 || b.pkId === 10 || b.pkId === 20) {
          b.hasSecond = true
          b.secondShow = false
        }
        b.child = []
        a.child.push(b)
      }
    })
  })

  // arr.forEach(a=>{
  //   a.child.forEach(b=>{
  //     data.forEach(c=>{
  //       if(c.pid===b.pkId) {
  //         c.child = []
  //         b.child.push(c)
  //       }
  //     })
  //   })
  // })   2.2
  arr.forEach(a=>{ // 2.3
    a.child.forEach(b=>{
      if(b.pkId===10500) {
        b.child.push({
          sName: '省内码标管理',
          pkId: 1,
          child: []
        })
        b.child.push({
          sName: '中盐码标管理',
          pkId: 2,
          child: []
        })
        data.forEach(c=>{
          if(c.pid===b.pkId) {
            b.child.forEach(s=>{
              c.child = []
              s.child.push(c)
            })

          }
        })
      } else if(b.pkId===11000){
        b.child.push({
          sName: '统筹产品',
          pkId: 3,
          child: []
        })
        b.child.push({
          sName: '自营产品',
          pkId: 4,
          child: []
        })
        data.forEach(c=>{
          if(c.pid===b.pkId) {
            b.child.forEach(s=>{
              c.child = []
              s.child.push(c)
            })

          }
        })
      }else {
        data.forEach(c=>{
          if(c.pid===b.pkId) {
            c.child = []
            b.child.push(c)
          }
        })
      }
    })
  })
  arr.forEach(a=>{
    a.child.forEach(b=>{
      b.child.forEach(c=>{
        data.forEach(d=>{
          if(d.pid===c.pkId) {
            c.child.push(d)
          }
        })
      })
    })
  })
  return arr
}

function isNext (next) {
  flag++
  if (flag === 3) {
    next()
    flag = 0
  }
}

export default router
