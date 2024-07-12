import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/manifests',
      name: 'manifestsParent',
      children: [
        {
          path: '',
          name: 'manifests',
          component: () => import('../views/manifests/index.vue')
        },
        {
          path: 'add',
          name: 'manifestAdd',
          component: () => import('../views/manifests/add.vue')
        },
        {
          path: ':id',
          name: 'manifestEdit',
          component: () => import('../views/manifests/edit.vue')
        }
      ]
    },
    {
      path: '/images',
      name: 'imagesParent',
      children: [
        {
          path: '',
          name: 'images',
          component: () => import('../views/images/index.vue')
        },
        {
          path: ':id',
          name: 'imageView',
          component: () => import('../views/images/view.vue')
        },
        {
          path: 'add',
          name: 'imageAdd',
          component: () => import('../views/images/add.vue')
        }
      ]
    },
    {
      path: '/containers',
      name: 'containersParent',
      children: [
        {
          path: '',
          name: 'containers',
          component: () => import('../views/containers/index.vue')
        },
        {
          path: 'add',
          name: 'containerAdd',
          component: () => import('../views/containers/add.vue')
        },
        {
          path: ':id',
          name: 'containerView',
          component: () => import('../views/containers/view.vue')
        },
        {
          path: ':id/logs',
          name: 'containerLogs',
          component: () => import('../views/containers/logs.vue')
        },
        {
          path: ':id/stats',
          name: 'containerStats',
          component: () => import('../views/containers/stats.vue')
        },
        {
          path: ':id/upgrade',
          name: 'containerUpgrade',
          component: () => import('../views/containers/upgrade.vue')
        }
      ]
    },
    {
      path: '/networks',
      name: 'networksParent',
      children: [
        {
          path: '',
          name: 'networks',
          component: () => import('../views/networks/index.vue')
        },
        {
          path: 'add',
          name: 'networkAdd',
          component: () => import('../views/networks/add.vue')
        }
      ]
    }
  ]
})

export default router
