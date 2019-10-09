import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const initialTabs = [
	{ category: 'Wszystko', active: true },
	{ category: 'Babeczki', active: false },
	{ category: 'Ciasta', active: false },
	{ category: 'Słodycze', active: false },
	{ category: 'Donaty', active: false },
];

export const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
	const [tabs, setActiveTab] = useState(initialTabs);
	return <TabsContext.Provider value={[tabs, setActiveTab]}>{children}</TabsContext.Provider>;
};

TabsProvider.propTypes = {
	children: PropTypes.array.isRequired,
};
