import React from 'react'
import { mount } from 'enzyme'

import Select from '../../src/Select'
import Form from '../../src/Form'

function mountForm(children) {
  return mount(<Form name="myForm" action="/action" method="POST">{children}</Form>)
}

describe('Select', () => {
  it('should render a <select> element', () => {
    const wrapper = mountForm(<Select name="val" />)
    expect(wrapper.find('select').length).to.equal(1)
  })

  it('should select the first option by default', () => {
    const select = mountForm(
      <Select name="val">
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>
    ).find('select')
    expect(select.prop('value')).to.equal('one')
  })

  it('should select the initial value option', () => {
    const select = mountForm(
      <Select name="val" initial="two">
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>
    ).find('select')
    expect(select.prop('value')).to.equal('two')
  })

  it('should receive an autogenerated ID by default', () => {
    const select = mountForm(<Select name="mySelect" />).find('select')
    expect(select.prop('id')).to.equal('myForm_mySelect')
  })

  it('should pass on any props, overriding the autogenerated ID', () => {
    const select = mountForm(<Select name="val" id="mySelect" className="fancy" />).find('select')
    expect(select.prop('id')).to.be.equal('mySelect')
    expect(select.prop('className')).to.equal('fancy')
  })

  it('should also accept options as an array', () => {
    const select = mountForm(<Select name="val" options={['one', 'two', 'three']} />).find('select')
    expect(select.find('option').length).to.equal(3)

    const one = select.find('option').at(0)
    expect(one.prop('value')).to.equal('one')
    expect(one.text()).to.equal('one')

    const three = select.find('option').at(2)
    expect(three.prop('value')).to.equal('three')
    expect(three.text()).to.equal('three')
  })

  it('should also accept options as an object', () => {
    const select = mountForm(<Select name="val" options={{ one: 'One', two: 'Two', three: 'Three' }} />).find('select')
    expect(select.find('option').length).to.equal(3)

    const one = select.find('option').at(0)
    expect(one.prop('value')).to.equal('one')
    expect(one.text()).to.equal('One')

    const three = select.find('option').at(2)
    expect(three.prop('value')).to.equal('three')
    expect(three.text()).to.equal('Three')
  })

  describe('when changing selection', () => {
    it('should update its value, replacing the initial value', () => {
      const select = mountForm(
        <Select name="val" initial="two">
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </Select>
      ).find('select')
      expect(select.prop('value')).to.equal('two')
      select.simulate('change', { target: { value: 'three' } })
      expect(select.prop('value')).to.equal('three')
    })

    it('should trigger the onChange handler', () => {
      const onChange = sinon.spy()
      const select = mountForm(<Select name="val" onChange={onChange} />).find('select')
      select.simulate('change', { target: { value: 'three' } })
      expect(onChange).to.have.been.called()
    })
  })

  describe('multiple', () => {
    it('should have an empty array as default value', () => {
      const select = mountForm(
        <Select multiple name="val">
          <option value="one">One</option>
        </Select>
      ).find('select')
      expect(select.prop('value')).to.deep.equal([])
    })

    it('should accept an array as initial value', () => {
      const select = mountForm(
        <Select multiple name="val" initial={['two', 'three']}>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </Select>
      ).find('select')
      expect(select.prop('value')).to.deep.equal(['two', 'three'])
    })
  })
})
