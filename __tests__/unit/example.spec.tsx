import { render } from '@testing-library/react-native';
import { Text } from '@/components/ui/text';

describe('Test the text component from RNR package', () => {
  it('renders correctly a text (rnr)', () => {
    const { getByText } = render(<Text>Test Text</Text>);
    expect(getByText('Test Text')).toBeTruthy();
  });
});

