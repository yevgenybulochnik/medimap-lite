import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, Suggest } from '@blueprintjs/select'


interface HcpcsCode {
  id: string;
  code: string;
  description: string;
}

const HcpcsCodeRenderer: ItemRenderer<HcpcsCode> = (hcpcsCode, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }

  return (
    <MenuItem
      active={modifiers.active}
      id={hcpcsCode.id}
      key={hcpcsCode.id}
      label={hcpcsCode.code}
      text={hcpcsCode.description}
      onClick={handleClick}
    />
  )
}

const hcpcsCodeFilter: ItemPredicate<HcpcsCode> = (query, hcpcsCode) => {
  return hcpcsCode.description.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

interface Props {
  hcpcsCodeItems: HcpcsCode[];
  selectedhcpcsCodeItems: HcpcsCode[];
  onItemSelect: () => void;
}

const HcpcsCodeSelect = Suggest.ofType<HcpcsCode>()

const HcpcsCodeSuggest: React.SFC<Props> = (props) => {
  const {
    hcpcsCodeItems,
    selectedhcpcsCodeItems,
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
        inputValueRenderer={(item) => item.description}
        onItemSelect={onItemSelect}
        noResults={<MenuItem text='No Results' disabled />}
        fill
      />
    </FormGroup>
  )
}

export default HcpcsCodeSuggest
