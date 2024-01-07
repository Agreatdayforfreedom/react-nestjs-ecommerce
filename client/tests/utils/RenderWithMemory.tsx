import { MemoryRouter, Routes } from 'react-router-dom';

export function RenderWithMemory({
  children,
  initialEntries,
  provider = false,
}: {
  children: React.ReactElement;
  initialEntries: string[];
  provider?: boolean;
}) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      {provider ? children : <Routes>{children}</Routes>}
    </MemoryRouter>
  );
}
