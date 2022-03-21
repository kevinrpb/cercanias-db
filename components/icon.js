import React from 'react'
import dynamic from 'next/dynamic'

const FaIcon = (name) =>
  dynamic(async () => {
    const module = await import('react-icons/fa')
    return module[name]
  })

const FiIcon = (name) =>
  dynamic(async () => {
    const module = await import('react-icons/fi')
    return module[name]
  })

const GiIcon = (name) =>
  dynamic(async () => {
    const module = await import('react-icons/gi')
    return module[name]
  })

const _imports = {
  Fa: FaIcon,
  Fi: FiIcon,
  Gi: GiIcon,
}

const ImportedIcon = (name) => {
  const prefix = name.substring(0, 2)
  return prefix in _imports ? _imports[prefix](name) : undefined
}

const _icons = {
  brainstem: 'GiBrainStem',
  calendar: 'FiCalendar',
  'chevron-down': 'FiChevronDown',
  facebook: 'FiFacebook',
  google: 'FaGoogle',
  handshake: 'FaHandshake',
  instagram: 'FiInstagram',
  menu: 'FiMenu',
  scale: 'FaBalanceScale',
  twitter: 'FiTwitter',
  whatsapp: 'FaWhatsapp',
  x: 'FiX'
}

const Icon = ({ name, className = '' }) => {
  const iconName = name in _icons ? _icons[name] : name
  const Component = ImportedIcon(iconName)

  return (
    <i className={`icon ${className}`} aria-hidden='true'>
      {Component != undefined ? <Component /> : `__icon__${name}`}
    </i>
  )
}

export default Icon
