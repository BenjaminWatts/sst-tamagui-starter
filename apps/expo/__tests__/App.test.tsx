import React from "react";
import { Register } from "app/features/auth/buttons";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from "app/provider";

test("onPress", async () => {
  const mockOnPress = jest.fn();
  render(
    <Provider>
      <Register loading={false} disabled={true} onPress={mockOnPress} />
    </Provider>
  );
  await screen.findByTestId("register-button");
  expect(mockOnPress).toHaveBeenCalledTimes(0);
  const btn = await screen.findByTestId("register-button");
  fireEvent.press(btn);
  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
