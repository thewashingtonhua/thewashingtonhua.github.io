import React, { FC, ChangeEvent, useState, KeyboardEvent, useRef, useEffect, useCallback } from 'react'
import './SearchInput.scss'
import SearchIcon from '../../images/ui/icons/search.svg'
import { hasWindow } from 'utils'

interface SearchInputProps {
  value: string,
  onChange?: (value: string) => void
  onSearchBegin?: () => void
  onSearchEnd?: () => void
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { value, onChange, onSearchBegin, onSearchEnd } = props

  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function _onChange (e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value
    setText(text)
    if (hasWindow()) {
      window.requestAnimationFrame(() => {
        onChange && onChange(text)
      })
    }
  }

  useEffect(() => {
    setText(value)
  }, [value])

  const cancalable = isFocused || value.length > 0

  const _onFocus = () => {
    setIsFocused(true)
    onSearchBegin && onSearchBegin()
  }

  const _onCancel = () => {
    setIsFocused(false)
    onChange && onChange('')
    onSearchEnd && onSearchEnd()

    const elem = inputRef.current as HTMLInputElement
    if (elem) {
      elem.blur()
    }
  }

  const _onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape': {
        _onCancel()
        break
      }
      case 'ArrowUp': {
        break
      }
      case 'ArrowDown': {
        break
      }
      default: {
        break
      }
    }
  }

  const renderCancelBtn = () => {
    if (!cancalable) return null

    return (
      <span className='btn-cancel' onClick={_onCancel}>取消</span>
    )
  }

  return (
    <div className='search-input'>
      <div className='search-input__icon'>
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        className='search-input__input'
        type='text'
        placeholder='搜索「童话说」'
        value={text}
        onChange={_onChange}
        onFocus={_onFocus}
        onKeyDown={_onKeyDown}
      />
      { renderCancelBtn() }
    </div>
  )
}
