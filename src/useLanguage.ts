import { ref, computed } from 'vue'
import store from '@/store/index'
import moment from 'moment'

const useLanguage = () => {
  const rtl = ref<boolean>(false)

  const setLanguage = (lang : string) : void => {
    store.commit('setLang', lang)
    moment.locale(lang)
  }

  const setRTL = (isRTL : boolean) : void => {
    rtl.value = isRTL
  }

  const getLanguage = computed(() : string => {
    return store.state.lang
  })

  const isRTL = computed(() => {
    return rtl.value
  })

  return {
    setLanguage,
    setRTL,
    getLanguage,
    isRTL
  }
}

export default useLanguage
