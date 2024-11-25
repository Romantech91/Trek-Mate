import React from 'react'
import SocialTab from '../../client/src/components/SocialTab'
import { mount } from 'cypress/react'

describe('<SocialTab />', () => {
  it('renders', () => {
    mount(<SocialTab />)
  })
})