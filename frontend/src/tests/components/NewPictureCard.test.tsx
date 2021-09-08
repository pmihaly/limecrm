import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import appRenderer from '../appRenderer';

describe('<NewPictureCard />', () => {
  it('should render the "Upload a new picture" card', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getByText('Upload a picture')).toBeInTheDocument();
  });
});
