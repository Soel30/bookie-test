/** @jest-environment jsdom */
import "../__mocks__/indexMock";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Carousel from "@/components/common/carousel";
import BookDetail from "@/pages/detail/[slug].page";
import Loading from "@/components/common/loading";
import CardImage from "@/components/common/cardImage";
import AppBottomNav from "@/components/templates/AppBottomNav";
import GridView from "@/components/templates/postContent/gridView";
import ListView from "@/components/templates/postContent/listView";
import Bookmark from "@/pages/bookmark/index.page";

describe("Home", () => {
  it("should render search input", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const searchElement = screen.getByPlaceholderText("Search Book by Title");

    expect(searchElement).toBeInTheDocument();
  });

  it("should render carousel", () => {
    render(<Carousel items={[]} onClickThumb={() => {}} />);
    const carouselElement = screen.getByTestId("carousel");

    expect(carouselElement).toBeInTheDocument();
  });

  it("should render book detail", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <BookDetail />
      </QueryClientProvider>
    );
    const detailElement = screen.getByTestId("bookDetail");

    expect(detailElement).toBeInTheDocument();
  });

  it("should render loading", () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId("loading");

    expect(loadingElement).toBeInTheDocument();
  });

  it("should render card image", () => {
    render(<CardImage src="" />);
    const cardImageElement = screen.getByTestId("card-image");

    expect(cardImageElement).toBeInTheDocument();
  });

  it("should render bottom nav", () => {
    render(<AppBottomNav />);
    const bottomNavElement = screen.getByText("Bookmark");

    expect(bottomNavElement).toBeInTheDocument();
  });

  it("should render grid view", () => {
    render(<GridView items={[]} />);
    const gridViewElement = screen.getByTestId("gridView");

    expect(gridViewElement).toBeInTheDocument();
  });

  it("should render list view", () => {
    render(<ListView items={[]} />);
    const listViewElement = screen.getByTestId("listView");

    expect(listViewElement).toBeInTheDocument();
  });

  it("should render bookmark", () => {
    render(<Bookmark />);
    const bookmarkElement = screen.getByTestId("bookmark");

    expect(bookmarkElement).toBeInTheDocument();
  });
});
