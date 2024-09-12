import { useCallback, useEffect, useState } from "react";
import CardModel from "../../models/CardModel";
import AddCardButton from "../../components/cards/AddCardButton";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function CardsPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const allCards = await CardModel.loadAll();
    const cards = searchText ? allCards.filter(card => card.matches(searchText)) : allCards;
    setCards(cards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText]);

  useLoadEffect(async () => {
    const isCached = !!CardModel.cache.all;
    await loadCards();
    !isCached && setNotification({ message: "Cards loaded", severity: "success" });
  }, []);

  useEffect(() => {
    CardModel.cache.all && loadCards();
  }, [searchText]);

  return (
    <PageContent>
      <PaginationProvider itemCount={cards.length}>
        <CardGrid cards={cards} onChange={loadCards} />
      </PaginationProvider>
      {user?.isBusiness && <AddCardButton />}
    </PageContent>
  );
}