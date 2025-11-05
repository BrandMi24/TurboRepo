// apps/app-ventas/src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";
test("muestra catálogo", ()=> {
  render(<App />);
  expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
});
