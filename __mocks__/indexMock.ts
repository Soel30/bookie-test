jest.mock("slick-carousel/slick/slick.css", () => ({
  __esModule: true,
  default: "slick",
}));

jest.mock("slick-carousel/slick/slick-theme.css", () => ({
  __esModule: true,
  default: "slick-theme",
}));

// mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
