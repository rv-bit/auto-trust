import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavLink from "../../js/components/navigation-link";

describe("App Component", () => {
	it("should render the app title in h1", () => {
		render(<NavLink active={false}>Test Nav</NavLink>);
		const link = screen.getByTestId("link");

		// expect(link).toBeInTheDocument();
		// expect(link).toHaveTextContent(/Test Nav$/);
		expect(link.tagName).toBe("A");
	});
});
