import {render, screen, cleanup} from '@testing-library/react'
import MessageList from '../components/MessageList'
import '@testing-library/jest-dom/extend-expect'

afterEach( cleanup )

test('<MessageList /> Load MessageList and check if texts are rendering right',()=>{

    render(<MessageList />)
    expect( screen.getByText('nuffsaid.com Coding Challengue')).toBeInTheDocument()
    expect( screen.getByTestId('title').tagName).toBe('H1')
    expect( screen.getByTestId('title').textContent).toBe('nuffsaid.com Coding Challengue')

    expect(screen.getByTestId('stop-play').tagName).toBe('BUTTON')
    expect(screen.getByTestId('stop-play').textContent).toBe('Stop')
    expect(screen.getByTestId('clear').tagName).toBe('BUTTON')
    expect(screen.getByTestId('clear').textContent).toBe('Clear')
})