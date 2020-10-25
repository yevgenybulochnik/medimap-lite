import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, Suggest } from '@blueprintjs/select'
import './hcpcsCodeSuggest.scss'


interface HcpcsCode {
  code: string;
  description: string;
}

const HcpcsCodeRenderer: ItemRenderer<HcpcsCode> = (hcpcsCode, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }

  function renderDescription(desc: string) {
    if (desc.length > 100) {
      return `${desc.slice(0,100)}...`
    } else {
      return desc
    }
  }

  return (
    <MenuItem
      active={modifiers.active}
      id={hcpcsCode.code}
      key={hcpcsCode.code}
      label={renderDescription(hcpcsCode.description)}
      text={hcpcsCode.code}
      onClick={handleClick}
    />
  )
}

const hcpcsCodeFilter: ItemPredicate<HcpcsCode> = (query, hcpcsCode) => {
  if (isNaN(parseInt(query))) {
    return hcpcsCode.description.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }
  return hcpcsCode.code.indexOf(query) >= 0
}

interface Props {
  hcpcsCodeItems: HcpcsCode[];
  onItemSelect: (item: HcpcsCode) => void;
}

const HcpcsCodeSelect = Suggest.ofType<HcpcsCode>()

const HcpcsCodeSuggest: React.SFC<Props> = (props) => {
  const {
    hcpcsCodeItems,
    onItemSelect,
  } = props

  return (
    <FormGroup
      label='HCPCS Code Search'
      helperText='Search by HCPCS code or a description'
    >
      <HcpcsCodeSelect
        items={hcpcsCodeItems}
        resetOnSelect
        itemRenderer={HcpcsCodeRenderer}
        itemPredicate={hcpcsCodeFilter}
        inputValueRenderer={(item) => `${item.code} - ${item.description}`}
        onItemSelect={onItemSelect}
        noResults={<MenuItem text='No Results' disabled />}
        fill
      />
    </FormGroup>
  )
}

export default HcpcsCodeSuggest
