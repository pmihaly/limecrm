import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import appRenderer, { testPictures } from '../appRenderer';

describe('<PictureCard />', () => {
  it('should be a link to the picture', () => {
    act(() => {
      appRenderer();
    });

    const pictureLink = screen.getAllByTestId('pictureLink')[1];
    expect(pictureLink).toBeInTheDocument();
    expect(pictureLink.getAttribute('href')).toContain(testPictures[1].filename);
  });

  it('should render the picture', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.getAllByTestId('picture')[1]).toBeInTheDocument();
  });

  it('should only display uploader ip address on hover', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.queryByText(testPictures[0].uploaderIp)).not.toBeInTheDocument();
  });

  it('should only display upload date on hover', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.queryByText(testPictures[0].uploadDate)).not.toBeInTheDocument();
  });

  it('should only display image resolution on hover', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.queryByText(testPictures[0].pictureDimensions.height)).not.toBeInTheDocument();
    expect(screen.queryByText(testPictures[0].pictureDimensions.width)).not.toBeInTheDocument();
  });

  it('should only display file size on hover', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.queryByText(testPictures[0].filesize)).not.toBeInTheDocument();
  });

  it('should only display description on hover', () => {
    act(() => {
      appRenderer();
    });

    expect(screen.queryByText(testPictures[0].description)).not.toBeInTheDocument();
  });
});
