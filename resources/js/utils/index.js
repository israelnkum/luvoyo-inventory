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
        title: 'Cash-ups',
        link: '/cash-ups',
        children: [],
        permissions: ['Admin', 'Staff'],
        icon: 'cash-up'
    },
    /*  {
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
      },*/
    {
        title: 'Dispatch Orders',
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
        permissions: ['Admin', 'Staff'],
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
        permissions: ['Admin', 'Staff'],
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
]

export const expensesCategories = [
    'Fuel',
    'Salary',
    'Utility',
    'Bills',
    'Wages',
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


export const formatAmount = (amount) => {
    return parseFloat(amount.replace(/[^\d.-]/g, ''))
}

export const completeExport = (data, filename = 'report') => {

    const extension = data.type.split('/')[1] === 'pdf' ? 'pdf' : 'xlsx';

    if (extension === 'pdf'){
        const blobURL = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
        const iframe =  document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = blobURL;
        iframe.onload = function() {
            setTimeout(function() {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    }else{
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(new Blob([data]))
        link.setAttribute('download', `${filename + '.' + extension}`)
        document.body.appendChild(link)
        link.click()
    }
}
