import { render, screen } from "@testing-library/react"
import Conversations from '../components/Conversations';

describe("App", () => {
  it("should render correctly Conversations parent component", () => {
    render(<Conversations allUsers={[]} />)
    expect(
      screen.getByText(/Créer/)
    ).toBeInTheDocument()
  })
})