import TabSelector from './TabSelector'

export const generated = () => {
  return (
    <TabSelector
      options={['One', 'Two', 'Three']}
      defaultValue="One"
      currentValue="One"
      onChange={() => null}
    />
  )
}

export default { title: 'Components/TabSelector' }
