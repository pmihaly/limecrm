import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import appRenderer from './appRenderer';

describe('<App />', () => {
  it('should render the app name', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getByText('LimeCRM')).toBeInTheDocument();
  });

  it('should render the pictures grid', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getByTestId('picturesGrid')).toBeInTheDocument();
  });

  it('should render the <NewPictureCard />', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getByTestId('newPicturesCard')).toBeInTheDocument();
  });

  it('should render as many pictures as present', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getAllByTestId('picturesCard').length).toEqual(2);
  });
});
