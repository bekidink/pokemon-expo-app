// __tests__/PokemonCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PokemonCard from '@/components/PokemonCard';
import { useRouter } from 'expo-router';

// Mocking the router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

const mockPokemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

describe('PokemonCard', () => {
  it('renders the pokemon name and id correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    // Senior Tip: Use Regex with 'i' flag for case-insensitive matching
    // and match the ID even if it's split across multiple Text nodes
    expect(screen.getByText(/bulbasaur/i)).toBeTruthy();
    
    // If the '#' and '001' are in different nodes, getByText might fail.
    // Use { exact: false } or a regex to find partial matches.
    expect(screen.getByText(/001/)).toBeTruthy();
  });

  it('navigates to the detail screen on press', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<PokemonCard pokemon={mockPokemon} />);
    
    // Now that we added accessibilityRole="button", this will work!
    const card = screen.getByRole('button'); 
    fireEvent.press(card);

    expect(mockPush).toHaveBeenCalledWith('/pokemon/bulbasaur');
  });
});