import { createStore } from 'vuex'
import client from 'axios'
import qs from 'qs'
import { VueCookieNext } from 'vue-cookie-next'
import i18n from '@/i18n'
import { apiBase, apiEndpoints } from '@/shared/endpoints/api'
import { User } from '@/shared/interfaces/user.model'
import router from '../router'


const parseErrorsToInputErrorMessage = (err: any, formName: string | undefined) => {
  if (err.response) {
    const errors = err.response.data.errors
    errors.forEach((error: { message: string, field: string, errorCode: string }) => {
      if (formName) {
        const errorMessage = error.errorCode ? error.errorCode : error.message
        store.state.vuelidateExternalResults[formName] = {
          ...store.state.vuelidateExternalResults[formName],
          [error.field]: errorMessage.toString()
        }
      } else {
        store.state.vuelidateExternalResults[error.field] = [error.errorCode ? error.errorCode : error.message]
      }
    })
  }
}

const parseErrorsToGlobalAlertError = (err: any, message: string) => {
  if (err.response) {
    const errors = err.response.data.errors as { message: string, field: string, errorCode: string }[]
    if (errors) {
      errors.forEach((error: { message: string, field: string, errorCode: string }) => {
        if (!error.errorCode && !store.state.globalMessages.find(globalMessage => globalMessage.text === message)) {
          store.commit('setGlobalMessages', [...store.state.globalMessages, {
            type: 'danger',
            title: 'error',
            text: message,
            index: store.state.globalMessages.length
          }])
        } else if (error.errorCode && !store.state.globalMessages.find(globalMessage => globalMessage.text === error.errorCode)) {
          store.commit('setGlobalMessages', [...store.state.globalMessages, {
            type: 'danger',
            title: 'error',
            text: error.errorCode,
            index: store.state.globalMessages.length
          }])
        }
      })
    }
  }
}

client.defaults.baseURL = apiBase
client.interceptors.request.use(async function (config) {
  const token = VueCookieNext.getCookie('token')
  if (token && token.length > 0) {
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + token
    }
  }
  return config
}, function (error) {
  console.log('error', error)
  return Promise.reject(error)
})

client.interceptors.response.use(function (config) {
  return config
}, function (error) {
  if (
    (error.response.status === 401 || error.response.status === 403) &&
    error.response.config.url.indexOf('logout') < 0 &&
    error.response.config.url.indexOf('login') < 0
  ) store.dispatch('logout')
  if (
    ((error.response.status !== 401 && error.response.status !== 403) ||
    error.response.config.url.indexOf('login') >= 0) &&
    error.response.data.errors && error.response.data.errors.length > 0
  ) {
    const globalErrorsWithCode = error.response.data.errors.filter((err: { field: string, errorCode: string }) => err.field === 'global' && err.errorCode)
    const mappedErrors = globalErrorsWithCode.map((err: { errorCode: string }) => {
      return {
        type: 'danger',
        title: 'error',
        text: err.errorCode,
        index: store.state.globalMessages.length > 0 ? store.state.globalMessages[store.state.globalMessages.length - 1].index + 1 : 0
      }
    })
    store.commit('setGlobalMessages', [...store.state.globalMessages, ...mappedErrors])
  }
  return Promise.reject(error)
})

const store = createStore({
  state: {
    appLoadingText: null as string | null,
    lang: '' as string,
    loggedUser: {} as User,
    globalMessages: [] as { type: 'danger' | 'success' | 'info' | 'waring', title?: string, text: string, index: number }[],
    vuelidateExternalResults: {} as any
  },
  mutations: {
    setAppLoadingText: (state, appLoadingText: string | null) => { state.appLoadingText = appLoadingText },
    setLang: (state, newLang) => { state.lang = newLang },
    setLoggedUser: (state, loggedUser: User) => { state.loggedUser = loggedUser },
    setGlobalMessages: (state, globalMessages: any) => { state.globalMessages = globalMessages },
    setVuelidateExternalResults: (state, vuelidateExternalResults: any) => { state.vuelidateExternalResults = vuelidateExternalResults },
  },
  actions: {
    setToken: async (context, token: string) => {
      VueCookieNext.setCookie('token', token, { path: '/', domain: location.hostname })
      await context.dispatch('getLoggedUser')
    },
    removeToken: (context) => {
      VueCookieNext.removeCookie('token', { path: '/', domain: location.hostname })
      context.commit('setLoggedUser', null)
    },
    login: async (context, { email, password, remember }): Promise<string> => {
      const data = {
        email,
        password
      }
      return new Promise((resolve, reject) => {
        client({
          method: apiEndpoints.login.method,
          url: apiEndpoints.login.url,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data)
        }).then(async (resp: any) => {
          const token = resp.data.result.token
          await context.dispatch('setToken', token)
          resolve(token)
        }).catch((err: any) => {
          context.dispatch('removeToken')
          parseErrorsToInputErrorMessage(err, undefined)
          parseErrorsToGlobalAlertError(err, 'technical_problems_later')
          console.log(err)
          reject(err)
        })
      })
    },
    logout: async (context) => {
      if (context.state.loggedUser && store.state.loggedUser._id) {
        const userId = context.state.loggedUser ? context.state.loggedUser._id : null
        await context.dispatch('updateUser')
        await client.post(apiEndpoints.logout.url, { body: { userId } }).then(() => {
          context.dispatch('removeToken')
        }).catch(() => {
          context.dispatch('removeToken')
        })
      }
    },
    getLoggedUser: async (context, token) => {
      await client.get(apiEndpoints.me.url).then(async (response: any) => {
        context.commit('setLoggedUser', response.data.result)
      }, () => {
        context.commit('setLoggedUser', null)
      })
    },
    register: async (context, { email, password, passwordConfirm }) => {
      const data = {
        email,
        password,
        password_confirm: passwordConfirm
      }
      await client({
        method: apiEndpoints.register.method,
        url: apiEndpoints.register.url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      }).then((resp: any) => {
        router.push('/auth/register-success')
        return resp.data
      }).catch((err: any) => {
        parseErrorsToInputErrorMessage(err, 'registerForm')
        parseErrorsToGlobalAlertError(err, 'technical_problems_later')
        console.log(err)
      })
    },
    activate: (context, data: { email: string, token: string }): Promise<string> => {
      return new Promise((resolve, reject) => {
        client({
          method: apiEndpoints.activate.method,
          url: apiEndpoints.activate.url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + data.token
          },
          data: qs.stringify({ email: data.email })
        }).then(() => {
          resolve('')
        }).catch((err: any) => {
          parseErrorsToGlobalAlertError(err, 'technical_problems_contact_us')
          console.log(err)
          reject(err)
        })
      })
    },
    forgot: async (context, email) => {
      const data = {
        email
      }
      await client({
        method: apiEndpoints.forgot.method,
        url: apiEndpoints.forgot.url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data)
      }).then((resp: any) => {
        const token = resp.data.access_token
      }).catch((err: any) => {
        parseErrorsToInputErrorMessage(err, undefined)
        console.log(err)
      })
    },
    reset: async (context, { email, token, password, password_confirm }) => {
      const data = {
        email,
        password,
        password_confirm
      }
      await client({
        method: apiEndpoints.reset.method,
        url: apiEndpoints.reset.url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token
        },
        data: qs.stringify(data)
      }).then(() => {
        router.push('/auth')
      }).catch((err: any) => {
        parseErrorsToInputErrorMessage(err, 'resetForm')
        parseErrorsToGlobalAlertError(err, 'technical_problems_later')
        console.log(err)
      })
    },
    updateUser: async (context, userData = null) => {
      context.commit('setAppLoadingText', 'loader.savingUser')
      let data = JSON.parse(JSON.stringify(userData))
      if (!data) data = JSON.parse(JSON.stringify(context.state.loggedUser))
      await client.put(apiEndpoints.updateUser.url, data).then((response: any) => {
        context.commit('setLoggedUser', response.data.result)
        context.commit('setAppLoadingText', null)
      }, (err: any) => {
        parseErrorsToGlobalAlertError(err, 'technical_problems_later')
        context.commit('setAppLoadingText', null)
      })
    }
  },
  modules: {
  }
})

export default store
