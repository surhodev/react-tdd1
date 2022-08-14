import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dico from './Dico'

const SEARCH_TEXT = 'ma'

it('render title, searchbox and word list', () => {
  render(<Dico />)

  expect(screen.getByRole('heading')).toHaveTextContent('Dictionnaire')
  expect(screen.getByRole('textbox')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveTextContent('Chercher')

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(5)
  expect(listItems[0]).toHaveTextContent('Maison')
  expect(listItems[1]).toHaveTextContent('Mariage')
  expect(listItems[2]).toHaveTextContent('Ordinateur')
  expect(listItems[3]).toHaveTextContent('Pelouse')
  expect(listItems[4]).toHaveTextContent('Piscine')
})

it(`render text in textbox when we type "${SEARCH_TEXT}"`, async () => {
  render(<Dico />)

  expect(screen.queryByDisplayValue(SEARCH_TEXT)).toBeNull()

  await userEvent.type(screen.getByRole('textbox'), SEARCH_TEXT)

  expect(screen.getByDisplayValue(SEARCH_TEXT)).toBeInTheDocument()
})

it(`call onSearch when typing "${SEARCH_TEXT}" and clicking on button, after filter list items`, async () => {
  const onSearch = jest.fn()
  
  render(<Dico onSearch={onSearch}/>)

  await userEvent.type(screen.getByRole('textbox'), SEARCH_TEXT)
  await userEvent.click(screen.getByRole('button'))

  expect(onSearch).toHaveBeenCalledWith(SEARCH_TEXT)

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(2)
  expect(listItems[0]).toHaveTextContent('Maison')
  expect(listItems[1]).toHaveTextContent('Mariage')
})

it(`get full list when textbox is empty on button click`, async () => {
  const onSearch = jest.fn()

  render(<Dico onSearch={onSearch} />)

  await userEvent.click(screen.getByRole('button'))
  
  expect(onSearch).toHaveBeenCalledWith('')
  expect(onSearch).toHaveBeenCalledTimes(1)
  expect(screen.getAllByRole('listitem')).toHaveLength(5)

  await userEvent.type(screen.getByRole('textbox'), SEARCH_TEXT)
  await userEvent.click(screen.getByRole('button'))

  expect(onSearch).toHaveBeenCalledWith(SEARCH_TEXT)
  expect(onSearch).toHaveBeenCalledTimes(2)
  expect(screen.getAllByRole('listitem')).toHaveLength(2)

  await userEvent.clear(screen.getByRole('textbox'))
  await userEvent.click(screen.getByRole('button'))

  expect(onSearch).toHaveBeenCalledWith('')
  expect(onSearch).toHaveBeenCalledTimes(3)
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
})