import React, { FC, ChangeEvent } from 'react'
import './SearchInput.scss'
import SearchIcon from '../../images/ui/icons/search.svg'

interface SearchInputProps {
  value: string,
  onChange: (value: string) => void
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { value, onChange } = props

  function _onChange (e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    onChange(value)
  }

  return (
    <div className='search-input'>
      <div className='search-input__icon'>
        <SearchIcon />
      </div>
      <input
        className='search-input__input'
        type='text'
        placeholder='搜索「童话说」'
        value={value}
        onChange={_onChange}
      />
    </div>
  )
}
