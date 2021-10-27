import { render, screen } from '@testing-library/react';
import App from './App';
import ProductPage from "./pages/main/ProductPage"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
it("renders without crashing", () => {
  shallow(<App />);
});

it("renders without crashing", () => {
  shallow(<ProductPage />);
});