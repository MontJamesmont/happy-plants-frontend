import kebabCase from 'lodash/kebabCase'
import { Component } from 'vue'

export interface Icons {
  [key: string]: Component;
}

export function getIcons () : Icons {
  const icons: Icons = {}

  const requireComponents = require.context('./icons/', false, /[\w]+Icon\.vue$/)

  requireComponents.keys().forEach(fileName => {
    const iconName = kebabCase(fileName.replace(/^\.\/(.+)Icon\.vue/, '$1'))
    const componentConfig = requireComponents(fileName)
    icons[iconName] = (componentConfig.default || componentConfig) as Icons
  })

  return icons
}
