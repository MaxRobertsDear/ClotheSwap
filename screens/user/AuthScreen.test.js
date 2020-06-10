import React from 'react';
import AuthScreen from './AuthScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
	const tree = renderer.create(<AuthScreen />).toJSON();
	expect(tree).toMatchInlineSnapshot();
});
