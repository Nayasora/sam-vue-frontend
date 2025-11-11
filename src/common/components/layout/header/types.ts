/**
 * Header component types
 */

export type IconType = 'heart' | 'package' | 'shopping-bag'

export type LogoSize = 'sm' | 'md' | 'lg'

export interface NavMenuItemProps {
  icon: IconType
  label: string
  to?: string
  badge?: number
  onClick?: () => void
}

export interface NavMenuProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

export interface MainNavbarProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

export interface MobileMenuProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

export interface AppHeaderProps {
  sticky?: boolean
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

export interface LogoProps {
  to?: string
  size?: LogoSize
}

export interface SearchInputProps {
  modelValue?: string
  placeholder?: string
}

export interface SearchInputEmits {
  'update:modelValue': [value: string]
  search: [query: string]
  submit: [query: string]
}
