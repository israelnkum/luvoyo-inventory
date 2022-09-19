import Cookies from 'js-cookie'
import { Store } from './Store'
import cookie from 'cookie'
import api from './api'
export const isLoggedIn = (reqCookies = null) => {
  // if we don't have request cookies, get the cookie from client
  if (!reqCookies) {
    return !!Cookies.get('userLoggedIn')
  }

  // otherwise get cookie from server
  return !!cookie.parse(reqCookies).userLoggedIn
}

export const uploadImage = (path = 'upload', data) => {
  return new Promise((resolve, reject) => {
    api().post(`/nominee/${path}`, data).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getAge = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const activeRoles = () => {
  const state = Store.getState()
  console.log(state)
  return state.userReducer.activeRoles
}


export const SidebarMenus = [
    /*{
        title: 'HOME',
        link: '/',
        children: [],
        permissions: ['Admin'],
        icon: 'home'
    },*/
    {
        title: 'Staff',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Staff',
                link: '/staff/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Staff',
                link: '/staff',
            }
        ],
        permissions: ['Admin'],
        icon: 'pim'
    },
    {
        title: 'Suppliers',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Supplier',
                link: '/suppliers/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Suppliers',
                link: '/suppliers',
            }
        ],
        permissions: ['Admin'],
        icon: 'pim'
    },
    {
        title: 'Expenses',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Expenses',
                link: '/expenses/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Expenses',
                link: '/expenses',
            }
        ],
        permissions: ['Admin'],
        icon: 'expenses'
    },
    {
        title: 'Cash-up',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Cash-up',
                link: '/cash-ups/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Cash-ups',
                link: '/cash-ups',
            }
        ],
        permissions: ['Admin'],
        icon: 'cash-up'
    },
    {
        title: 'Order - Returns',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Return',
                link: '/dispatch-order-returns/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Returns',
                link: '/dispatch-order-returns',
            }
        ],
        permissions: ['Admin'],
        icon: 'dispatch-order'
    },
    {
        title: 'Orders',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Dispatch Order',
                link: '/dispatch-orders/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Dispatch Orders',
                link: '/dispatch-orders',
            }
        ],
        permissions: ['Admin'],
        icon: 'dispatch-order'
    },
    {
        title: 'Received Orders',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Orders',
                link: '/received-orders/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Orders',
                link: '/received-orders',
            }
        ],
        permissions: ['Admin'],
        icon: 'dispatch-order'
    },
    {
        title: 'Products',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Product',
                link: '/products/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Products',
                link: '/products',
            }
        ],
        permissions: ['Admin'],
        icon: 'product'
    },
    {
        title: 'Trucks',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Truck',
                link: '/trucks/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Trucks',
                link: '/trucks',
            }
        ],
        permissions: ['Admin'],
        icon: 'trucks'
    },
    /*{
        title: 'Business',
        link: '#',
        children: [
            {
                permission: '',
                modal: true,
                title: 'Add Business',
                link: '/businesses/add',
            },
            {
                permission: '',
                modal: false,
                title: 'All Business',
                link: '/businesses',
            }
        ],
        permissions: ['Admin'],
        icon: 'businesses'
    },*/
]

export const expensesCategories = [
    'Fuel',
    'Salary',
    'Utility',
    'Bills',
]

export const capitalize = (word) => {
    return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const getInitials = (name) => {
    if (name === '' || name === null) {
        return 'N/A'
    }
    // eslint-disable-next-line prefer-regex-literals
    const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

    const initials = [...name.matchAll(rgx)] || []
    return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()
}

export const addOrRemoveItem = (items, newItem) => {
    const i = items.findIndex(itm => itm.id === newItem.id)
    if (i > -1) items[i] = newItem
    else items.push(newItem)
    return items
}
